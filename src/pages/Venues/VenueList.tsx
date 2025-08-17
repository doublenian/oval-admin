import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Card,
  Row,
  Col,
  Select,
  Tooltip,
  message,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Venue } from '../../types';
import { venuesAPI } from '../../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

export const VenueList: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const response = await venuesAPI.getVenues({
        page: 1,
        pageSize: 50,
        region: selectedRegion !== 'all' ? selectedRegion : undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
      });
      setVenues(response.data);
    } catch (error) {
      message.error('获取场馆列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchVenues();
  };

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = !searchText || 
      venue.name.toLowerCase().includes(searchText.toLowerCase()) ||
      venue.chinese_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      venue.city?.toLowerCase().includes(searchText.toLowerCase()) ||
      venue.country?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || venue.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || venue.category === selectedCategory;
    
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'A': return 'red';
      case 'B': return 'blue';
      case 'S': return 'green';
      case 'N': return 'orange';
      default: return 'default';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'A': return 'A级场馆';
      case 'B': return 'B级场馆';
      case 'S': return '特殊场馆';
      case 'N': return '标准场馆';
      default: return category;
    }
  };

  const formatCapacity = (capacity?: number) => {
    if (!capacity) return '-';
    if (capacity >= 1000) {
      return `${(capacity / 1000).toFixed(1)}K`;
    }
    return capacity.toString();
  };

  const columns = [
    {
      title: '场馆名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text: string, record: Venue) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          {record.chinese_name && (
            <div className="text-sm text-gray-500">{record.chinese_name}</div>
          )}
        </div>
      ),
    },
    {
      title: '位置',
      key: 'location',
      width: 200,
      render: (_, record: Venue) => (
        <div className="flex items-center space-x-1">
          <EnvironmentOutlined className="text-gray-400" />
          <div>
            <div className="text-sm font-medium">{record.country}</div>
            <div className="text-xs text-gray-500">{record.city}</div>
          </div>
        </div>
      ),
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      width: 120,
      render: (region: string) => (
        <Tag color="blue">{region}</Tag>
      ),
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (category: string) => (
        <Tag color={getCategoryColor(category)}>
          {getCategoryName(category)}
        </Tag>
      ),
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 100,
      render: (capacity: number) => (
        <div className="flex items-center space-x-1">
          <TeamOutlined className="text-gray-400" />
          <span>{formatCapacity(capacity)}</span>
        </div>
      ),
      sorter: (a: Venue, b: Venue) => (a.capacity || 0) - (b.capacity || 0),
    },
    {
      title: '建成年份',
      dataIndex: 'built_year',
      key: 'built_year',
      width: 100,
      render: (year: number) => year ? (
        <div className="flex items-center space-x-1">
          <CalendarOutlined className="text-gray-400" />
          <span>{year}</span>
        </div>
      ) : '-',
      sorter: (a: Venue, b: Venue) => (a.built_year || 0) - (b.built_year || 0),
    },
    {
      title: '建筑师',
      dataIndex: 'architect',
      key: 'architect',
      width: 200,
      render: (architect: string) => (
        <Tooltip title={architect || '未知'}>
          <span className="text-sm text-gray-600 truncate block max-w-[180px]">
            {architect || '未知'}
          </span>
        </Tooltip>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, venue: Venue) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/venues/${venue.id}`)}
          >
            查看
          </Button>
          {venue.link && (
            <Button
              type="link"
              icon={<GlobalOutlined />}
              onClick={() => window.open(venue.link, '_blank')}
            >
              链接
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const regions = ['Asia', 'Europe', 'North America', 'South America'];
  const categories = ['A', 'B', 'S', 'N'];

  return (
    <Card>
      <Row justify="space-between" align="middle" className="mb-4">
        <Col>
          <h2 className="text-xl font-semibold">全球场馆数据库</h2>
          <p className="text-gray-500 mt-1">
            共收录 {filteredVenues.length} 个场馆信息
          </p>
        </Col>
      </Row>

      <Row gutter={16} className="mb-4">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Input
            placeholder="搜索场馆名称、城市或国家"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Select
            placeholder="选择区域"
            value={selectedRegion}
            onChange={setSelectedRegion}
            style={{ width: '100%' }}
          >
            <Option value="all">全部区域</Option>
            {regions.map(region => (
              <Option key={region} value={region}>{region}</Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Select
            placeholder="选择类别"
            value={selectedCategory}
            onChange={setSelectedCategory}
            style={{ width: '100%' }}
          >
            <Option value="all">全部类别</Option>
            {categories.map(category => (
              <Option key={category} value={category}>
                {getCategoryName(category)}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button type="primary" onClick={handleSearch} block>
            搜索
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredVenues}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1200 }}
        pagination={{
          total: filteredVenues.length,
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        }}
        size="small"
      />
    </Card>
  );
};