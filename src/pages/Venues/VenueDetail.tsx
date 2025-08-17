import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Descriptions,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  Spin,
  message,
  Empty,
} from 'antd';
import {
  ArrowLeftOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  BuildOutlined,
  DollarOutlined,
  HeightOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { Venue } from '../../types';
import { venuesAPI } from '../../services/api';

const { Title, Text, Paragraph } = Typography;

export const VenueDetail: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (venueId) {
      fetchVenueDetail();
    }
  }, [venueId]);

  const fetchVenueDetail = async () => {
    setLoading(true);
    try {
      const venueData = await venuesAPI.getVenue(venueId!);
      setVenue(venueData);
    } catch (error) {
      message.error('获取场馆详情失败');
    } finally {
      setLoading(false);
    }
  };

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
    return capacity.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!venue) {
    return (
      <Card>
        <Empty description="场馆信息不存在" />
      </Card>
    );
  }

  return (
    <div>
      <Card className="mb-4">
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/venues')}
              >
                返回列表
              </Button>
              <div>
                <Title level={3} className="mb-0">
                  {venue.name}
                </Title>
                {venue.chinese_name && (
                  <Text type="secondary" className="text-lg">
                    {venue.chinese_name}
                  </Text>
                )}
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              {venue.category && (
                <Tag color={getCategoryColor(venue.category)} className="text-sm px-3 py-1">
                  {getCategoryName(venue.category)}
                </Tag>
              )}
              {venue.link && (
                <Button
                  type="primary"
                  icon={<GlobalOutlined />}
                  onClick={() => window.open(venue.link, '_blank')}
                >
                  查看详情
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={16}>
        <Col xs={24} lg={16}>
          <Card title="基本信息" className="mb-4">
            <Descriptions column={2} size="middle">
              <Descriptions.Item 
                label={<span><EnvironmentOutlined /> 位置</span>}
                span={2}
              >
                <Space>
                  <Tag color="blue">{venue.region}</Tag>
                  <Text strong>{venue.country}</Text>
                  <Text type="secondary">{venue.city}</Text>
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label={<span><TeamOutlined /> 容量</span>}>
                {formatCapacity(venue.capacity)} 人
              </Descriptions.Item>
              
              <Descriptions.Item label={<span><CalendarOutlined /> 建成年份</span>}>
                {venue.built_year || '-'}
                {venue.update_year && ` (更新: ${venue.update_year})`}
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<span><BuildOutlined /> 建筑师</span>}
                span={2}
              >
                {venue.architect || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item label="场馆类型">
                {venue.venue_type || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item label="GA层级">
                {venue.ga_tier || '-'}
              </Descriptions.Item>
              
              {venue.height && (
                <Descriptions.Item label={<span><HeightOutlined /> 高度</span>}>
                  {venue.height} 米
                </Descriptions.Item>
              )}
              
              {venue.building_size && (
                <Descriptions.Item label="建筑尺寸">
                  {venue.building_size}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {venue.events_clubs && (
            <Card title="赛事与俱乐部">
              <Paragraph>
                {venue.events_clubs}
              </Paragraph>
            </Card>
          )}
        </Col>

        <Col xs={24} lg={8}>
          <Card title="容量详情" className="mb-4">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="总容量">
                {formatCapacity(venue.capacity)} 人
              </Descriptions.Item>
              {venue.vip_capacity && (
                <Descriptions.Item label="VIP 席位">
                  {formatCapacity(venue.vip_capacity)} 人
                </Descriptions.Item>
              )}
              {venue.hospitality_capacity && (
                <Descriptions.Item label="接待席位">
                  {formatCapacity(venue.hospitality_capacity)} 人
                </Descriptions.Item>
              )}
              {venue.press_capacity && (
                <Descriptions.Item label="媒体席位">
                  {formatCapacity(venue.press_capacity)} 人
                </Descriptions.Item>
              )}
              {venue.disabled_capacity && (
                <Descriptions.Item label="无障碍席位">
                  {formatCapacity(venue.disabled_capacity)} 人
                </Descriptions.Item>
              )}
              {venue.suites_count && (
                <Descriptions.Item label="套房数量">
                  {venue.suites_count} 间
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          <Card title="技术参数" className="mb-4">
            <Descriptions column={1} size="small">
              {venue.total_area && (
                <Descriptions.Item label="总面积">
                  {venue.total_area} 万平方米
                </Descriptions.Item>
              )}
              {venue.screen_area && (
                <Descriptions.Item label="屏幕面积">
                  {venue.screen_area}
                </Descriptions.Item>
              )}
              {venue.fop && (
                <Descriptions.Item label="场地尺寸">
                  {venue.fop}
                </Descriptions.Item>
              )}
              {venue.stand_contour && (
                <Descriptions.Item label="看台轮廓">
                  {venue.stand_contour}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {venue.construction_cost && (
            <Card title="投资信息">
              <Descriptions column={1} size="small">
                <Descriptions.Item label={<span><DollarOutlined /> 建设成本</span>}>
                  {venue.construction_cost}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};