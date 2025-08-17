import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Descriptions,
  Tag,
  Space,
  Typography,
  Spin,
  Upload,
  Modal,
  Badge,
  Row,
  Col,
  Empty,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  CalendarOutlined,
  BuildOutlined,
  DollarOutlined,
  VerticalAlignMiddleOutlined,
  InfoCircleOutlined,
  TrophyOutlined,
  SettingOutlined,
  PictureOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { Venue } from '../../types';
import { venuesAPI } from '../../services/api';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const VenueDetail: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 图片管理相关状态
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: '场馆外观全景1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-2',
      name: '场馆外观全景2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-3',
      name: '场馆内部视角1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-4',
      name: '场馆内部视角2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-5',
      name: '观众席视角1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-6',
      name: '观众席视角2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1594736797933-d0ace586471a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-7',
      name: '航拍俯视图1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-8',
      name: '航拍俯视图2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-9',
      name: '夜景照明1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-10',
      name: '夜景照明2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-11',
      name: '比赛现场1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-12',
      name: '比赛现场2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1493996698904-8e1fd7a1c23b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-13',
      name: '建筑结构1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-14',
      name: '建筑结构2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-15',
      name: '入口大厅1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1606107557309-4d5b4beab4a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-16',
      name: '入口大厅2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1589482871932-cd327bef1844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-17',
      name: '媒体中心1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-18',
      name: '媒体中心2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1544548222-b8f03e6b888c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-19',
      name: 'VIP包厢1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1606107557309-4d5b4beab4a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-20',
      name: 'VIP包厢2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-21',
      name: '更衣室1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-22',
      name: '更衣室2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-23',
      name: '训练场地1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1544548222-b8f03e6b888c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-24',
      name: '训练场地2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-25',
      name: '停车场1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1558618047-ac8d3ac44a5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-26',
      name: '停车场2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1558618047-ac8d3ac44a5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-27',
      name: '周边环境1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-28',
      name: '周边环境2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-29',
      name: '建设施工1.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
    {
      uid: '-30',
      name: '建设施工2.jpg',
      status: 'done',
      url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
  ]);

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

  // 处理图片预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // 处理文件列表变化
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  // 上传按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

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
    if (!category) return '未分类';
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

  const formatArea = (area?: number) => {
    if (!area) return '-';
    return `${area.toLocaleString()} 万平方米`;
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
    <div className="space-y-6">
      {/* 顶部导航和标题 */}
      <Card className="shadow-sm">
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/venues')}
                size="large"
              >
                返回列表
              </Button>
              <div>
                <Title level={2} className="mb-2">
                  {venue.name}
                </Title>
                {venue.chinese_name && (
                  <Text type="secondary" className="text-lg block">
                    {venue.chinese_name}
                  </Text>
                )}
                <Space className="mt-2">
                  <Tag color="blue" className="px-3 py-1">
                    <EnvironmentOutlined /> {venue.region}
                  </Tag>
                  {venue.category && (
                    <Tag color={getCategoryColor(venue.category)} className="px-3 py-1">
                      <TrophyOutlined /> {getCategoryName(venue.category)}
                    </Tag>
                  )}
                  {venue.venue_index && (
                    <Badge count={venue.venue_index} style={{ backgroundColor: '#52c41a' }}>
                      <Tag className="px-3 py-1">场馆编号</Tag>
                    </Badge>
                  )}
                </Space>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              {venue.link && (
                <Button
                  type="primary"
                  icon={<GlobalOutlined />}
                  onClick={() => window.open(venue.link, '_blank')}
                >
                  官方链接
                </Button>
              )}
              {venue.additional_link && (
                <Button
                  icon={<GlobalOutlined />}
                  onClick={() => window.open(venue.additional_link, '_blank')}
                >
                  附加链接
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* 左侧主要信息 */}
        <Col xs={24} lg={16}>
          {/* 基本信息 */}
          <Card 
            title={<><InfoCircleOutlined /> 基本信息</>}
            className="mb-6 shadow-sm"
          >
            <Descriptions column={2} size="middle" bordered>
              <Descriptions.Item 
                label={<><EnvironmentOutlined /> 完整位置</>}
                span={2}
              >
                <Space wrap>
                  <Tag color="blue">{venue.region}</Tag>
                  <Text strong>{venue.country}</Text>
                  {venue.city && <Text type="secondary">{venue.city}</Text>}
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item label={<><TeamOutlined /> 总容量</>}>
                <Text strong className="text-lg text-blue-600">
                  {formatCapacity(venue.capacity)} 人
                </Text>
              </Descriptions.Item>
              
              <Descriptions.Item label={<><CalendarOutlined /> 建成年份</>}>
                <Space>
                  <Text strong>{venue.built_year || '-'}</Text>
                  {venue.update_year && (
                    <Text type="secondary">(更新: {venue.update_year})</Text>
                  )}
                </Space>
              </Descriptions.Item>
              
              <Descriptions.Item 
                label={<><BuildOutlined /> 建筑师</>}
                span={2}
              >
                <Text className="text-base">{venue.architect || '-'}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="场馆类型">
                {venue.venue_type || '-'}
              </Descriptions.Item>
              
              <Descriptions.Item label="GA层级">
                {venue.ga_tier || '-'}
              </Descriptions.Item>
              
              {venue.stand_contour && (
                <Descriptions.Item label="看台轮廓" span={2}>
                  {venue.stand_contour}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {/* 技术规格 */}
          <Card 
            title={<><SettingOutlined /> 技术规格</>}
            className="mb-6 shadow-sm"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Descriptions column={1} size="small" bordered>
                  {venue.height && (
                    <Descriptions.Item label={<><VerticalAlignMiddleOutlined /> 高度</>}>
                      <Text strong>{venue.height} 米</Text>
                    </Descriptions.Item>
                  )}
                  {venue.total_area && (
                    <Descriptions.Item label="总面积">
                      <Text strong>{formatArea(venue.total_area)}</Text>
                    </Descriptions.Item>
                  )}
                  {venue.building_size && (
                    <Descriptions.Item label="建筑尺寸">
                      <Text>{venue.building_size}</Text>
                    </Descriptions.Item>
                  )}
                  {venue.fop && (
                    <Descriptions.Item label="场地尺寸(FOP)">
                      <Text>{venue.fop}</Text>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Col>
              <Col xs={24} md={12}>
                <Descriptions column={1} size="small" bordered>
                  {venue.screen_area && (
                    <Descriptions.Item label="屏幕面积">
                      <Text>{venue.screen_area}</Text>
                    </Descriptions.Item>
                  )}
                  {venue.temperature_capacity && (
                    <Descriptions.Item label="温控容量">
                      <Text>{formatCapacity(venue.temperature_capacity)} 人</Text>
                    </Descriptions.Item>
                  )}
                  {venue.construction_code && (
                    <Descriptions.Item label="建设代码">
                      <Text code>{venue.construction_code}</Text>
                    </Descriptions.Item>
                  )}
                  {venue.main_color_code && (
                    <Descriptions.Item label="主色调">
                      <Space>
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: venue.main_color_code }}
                        />
                        <Text code>{venue.main_color_code}</Text>
                      </Space>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Col>
            </Row>
          </Card>

          {/* 赛事与俱乐部信息 */}
          {venue.events_clubs && (
            <Card 
              title={<><TrophyOutlined /> 赛事与俱乐部</>}
              className="mb-6 shadow-sm"
            >
              <Paragraph className="text-base leading-relaxed">
                {venue.events_clubs}
              </Paragraph>
            </Card>
          )}

          {/* 系统信息 */}
          <Card 
            title="系统信息"
            className="shadow-sm"
          >
            <Descriptions column={2} size="small">
              <Descriptions.Item label="创建时间">
                {venue.created_at ? dayjs(venue.created_at).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {venue.updated_at ? dayjs(venue.updated_at).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* 右侧容量和投资信息 */}
        <Col xs={24} lg={8}>
          {/* 容量详情 */}
          <Card 
            title={<><TeamOutlined /> 容量详情</>}
            className="mb-6 shadow-sm"
          >
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <Text type="secondary" className="block text-sm">总容量</Text>
                <Text className="text-2xl font-bold text-blue-600">
                  {formatCapacity(venue.capacity)} 人
                </Text>
              </div>
              
              <Descriptions column={1} size="small">
                {venue.vip_capacity && (
                  <Descriptions.Item label="VIP 席位">
                    <Text strong className="text-purple-600">
                      {formatCapacity(venue.vip_capacity)} 人
                    </Text>
                  </Descriptions.Item>
                )}
                {venue.hospitality_capacity && (
                  <Descriptions.Item label="接待席位">
                    <Text strong className="text-green-600">
                      {formatCapacity(venue.hospitality_capacity)} 人
                    </Text>
                  </Descriptions.Item>
                )}
                {venue.press_capacity && (
                  <Descriptions.Item label="媒体席位">
                    <Text strong className="text-orange-600">
                      {formatCapacity(venue.press_capacity)} 人
                    </Text>
                  </Descriptions.Item>
                )}
                {venue.disabled_capacity && (
                  <Descriptions.Item label="无障碍席位">
                    <Text strong className="text-cyan-600">
                      {formatCapacity(venue.disabled_capacity)} 人
                    </Text>
                  </Descriptions.Item>
                )}
                {venue.suites_count && (
                  <Descriptions.Item label="豪华套房">
                    <Text strong className="text-red-600">
                      {venue.suites_count} 间
                    </Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          </Card>

          {/* 投资信息 */}
          {venue.construction_cost && (
            <Card 
              title={<><DollarOutlined /> 投资信息</>}
              className="shadow-sm"
            >
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <Text type="secondary" className="block text-sm">建设成本</Text>
                <Text className="text-xl font-bold text-green-600">
                  {venue.construction_cost}
                </Text>
              </div>
            </Card>
          )}
        </Col>
      </Row>

      {/* 图片管理 */}
      <Card 
        title={<><PictureOutlined /> 图片管理</>}
        className="shadow-sm"
      >
        {fileList.length >= 50 ? null : uploadButton}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </Card>
    </div>
  );
};