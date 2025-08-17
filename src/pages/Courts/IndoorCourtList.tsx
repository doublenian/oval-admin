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

export const IndoorCourtList: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    setLoading(true);
    try {
      // 模拟室内球场数据
      const mockCourts: Court[] = [
        {
          id: '1',
          name: '室内羽毛球场A',
          location: '北京市朝阳区体育馆',
          description: '专业室内羽毛球场，配备空调系统',
          capacity: 50,
          status: 'active',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          images: [],
        },
        {
          id: '2',
          name: '室内网球场B',
          location: '上海市浦东新区',
          description: '国际标准室内网球场',
          capacity: 80,
          status: 'active',
          createdAt: '2024-01-02T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z',
          images: [],
        },
        {
          id: '3',
          name: '室内篮球场C',
          location: '广州市天河区',
          description: '多功能室内篮球场',
          capacity: 200,
          status: 'disabled',
          createdAt: '2024-01-03T00:00:00.000Z',
          updatedAt: '2024-01-03T00:00:00.000Z',
          images: [],
        },
      ];
      setCourts(mockCourts);
    } catch (error) {
      message.error('获取室内球场列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (court: Court) => {
    const newStatus = court.status === 'active' ? 'disabled' : 'active';
    const action = newStatus === 'disabled' ? '禁用' : '启用';
    
    Modal.confirm({
      title: `确认${action}球场`,
      content: `您确定要${action}室内球场"${court.name}"吗？`,
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
      content: `您确定要删除室内球场"${court.name}"吗？此操作不可恢复。`,
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
            onClick={() => navigate(`/indoor-courts/${court.id}`)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<PictureOutlined />}
            onClick={() => navigate(`/indoor-courts/${court.id}/images`)}
          >
            图片
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/indoor-courts/${court.id}/edit`)}
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
          <h2 className="text-xl font-semibold">室内球场管理</h2>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="搜索球场名称或位置"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/indoor-courts/create')}
            >
              新增球场
            </Button>
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredCourts}
        rowKey="id"
        loading={loading}
        pagination={{
          total: filteredCourts.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        }}
      />
    </Card>
  );
};