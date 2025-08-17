import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  message,
  Card,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  PlayCircleOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Court } from '../../types';
import { courtAPI } from '../../services/api';
import dayjs from 'dayjs';

export const CourtList: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourts();
  }, [currentPage, pageSize]);

  const fetchCourts = async () => {
    setLoading(true);
    try {
      const response = await courtAPI.getCourts({
        page: currentPage,
        pageSize: pageSize,
        search: searchText,
      });
      setCourts(response.data);
      setTotal(response.total);
    } catch (error) {
      message.error('获取球场列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (court: Court) => {
    const newStatus = court.status === 'active' ? 'disabled' : 'active';
    const action = newStatus === 'disabled' ? '禁用' : '启用';
    
    Modal.confirm({
      title: `确认${action}球场`,
      content: `您确定要${action}球场"${court.name}"吗？`,
      onOk: async () => {
        try {
          // await courtAPI.toggleCourtStatus(court.id, newStatus);
          const updatedCourts = courts.map(c =>
            c.id === court.id ? { ...c, status: newStatus } : c
          );
          setCourts(updatedCourts);
          message.success(`${action}成功`);
        } catch (error) {
          message.error(`${action}失败`);
        }
      },
    });
  };

  const handleDelete = (court: Court) => {
    Modal.confirm({
      title: '确认删除',
      content: `您确定要删除球场"${court.name}"吗？此操作不可恢复。`,
      okType: 'danger',
      onOk: async () => {
        try {
          // await courtAPI.deleteCourt(court.id);
          setCourts(courts.filter(c => c.id !== court.id));
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleSearch = () => {
    setCurrentPage(1); // 重置到第一页
    fetchCourts();
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
    }
  };

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchText.toLowerCase()) ||
    court.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: '球场名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      width: 200,
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 100,
      render: (capacity: number) => `${capacity}人`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      width: 300,
      render: (_, court: Court) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/courts/${court.id}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<PictureOutlined />}
            onClick={() => navigate(`/courts/${court.id}/images`)}
          >
            图片
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/courts/${court.id}/edit`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            icon={court.status === 'active' ? <StopOutlined /> : <PlayCircleOutlined />}
            onClick={() => handleToggleStatus(court)}
          >
            {court.status === 'active' ? '禁用' : '启用'}
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(court)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <h2 className="text-xl font-semibold">球场管理</h2>
          <p className="text-gray-500 mt-1">
            共收录 {total} 个球场信息
          </p>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="搜索球场名称或位置"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 300 }}
            />
            <Button type="default" onClick={handleSearch}>
              搜索
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/courts/create')}
            >
              新增球场
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={courts}
        rowKey="id"
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
          onChange: handlePageChange,
          onShowSizeChange: handlePageChange,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        size="small"
      />
    </Card>
  );
};