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
  Upload,
  Modal,
  Image,
  Divider,
  Badge,
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
  UploadOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { Venue, CourtImage } from '../../types';
import { venuesAPI } from '../../services/api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export const VenueDetail: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [images, setImages] = useState<CourtImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (venueId) {
      fetchVenueDetail();
      fetchVenueImages();
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

  const fetchVenueImages = async () => {
    try {
      // 模拟场馆图片数据 - 使用Unsplash图片
      const mockImages: CourtImage[] = [
        {
          id: '1',
          courtId: venueId!,
          url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          filename: '场馆外观全景.jpg',
          size: 1024000,
          uploadedAt: '2024-01-01T00:00:00.000Z',
          isMain: true,
        },
        {
          id: '2',
          courtId: venueId!,
          url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          filename: '场馆内部视角.jpg',
          size: 2048000,
          uploadedAt: '2024-01-02T00:00:00.000Z',
        },
        {
          id: '3',
          courtId: venueId!,
          url: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          filename: '航拍俯视图.jpg',
          size: 1500000,
          uploadedAt: '2024-01-03T00:00:00.000Z',
        },
        {
          id: '4',
          courtId: venueId!,
          url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          filename: '观众席视角.jpg',
          size: 1800000,
          uploadedAt: '2024-01-04T00:00:00.000Z',
        },
        {
          id: '5',
          courtId: venueId!,
          url: 'https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          filename: '夜景照明效果.jpg',
          size: 2200000,
          uploadedAt: '2024-01-05T00:00:00.000Z',
        },
        {
          id: '6',
          courtId: venueId!,
          url: 'https://images.unsplash.com/photo-1606150674109-0a50c19b5c37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          filename: '比赛现场氛围.jpg',
          size: 1600000,
          uploadedAt: '2024-01-06T00:00:00.000Z',
        },
      ];
      setImages(mockImages);
    } catch (error) {
      message.error('获取场馆图片失败');
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      // 模拟上传 - 使用Unsplash随机图片
      const randomImageUrls = [
        'https://images.unsplash.com/photo-1544919982-b61976f0ba43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ];
      const randomUrl = randomImageUrls[Math.floor(Math.random() * randomImageUrls.length)];
      
      const newImage: CourtImage = {
        id: Date.now().toString(),
        courtId: venueId!,
        url: randomUrl,
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };
      setImages([...images, newImage]);
      message.success('图片上传成功');
    } catch (error) {
      message.error('图片上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleBulkUpload = async (files: File[]) => {
    setUploading(true);
    try {
      // 模拟批量上传 - 使用Unsplash随机图片
      const randomImageUrls = [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1589992607780-84ff84e6b1a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552820728-c8353b75a827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1533711146667-b7eacd8a6d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1539015331034-28e25c54f0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ];
      
      const newImages: CourtImage[] = files.map((file, index) => ({
        id: (Date.now() + index).toString(),
        courtId: venueId!,
        url: randomImageUrls[index % randomImageUrls.length],
        filename: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      }));
      
      setImages([...images, ...newImages]);
      message.success(`成功上传 ${files.length} 张图片`);
    } catch (error) {
      message.error('批量上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = (image: CourtImage) => {
    Modal.confirm({
      title: '确认删除',
      content: `您确定要删除图片"${image.filename}"吗？`,
      okType: 'danger',
      onOk: async () => {
        try {
          setImages(images.filter(img => img.id !== image.id));
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
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

  const uploadProps = {
    name: 'image',
    multiple: true,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file: File, fileList: File[]) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件!');
        return false;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('图片大小不能超过 10MB!');
        return false;
      }
      
      // 如果是多选，批量上传
      if (fileList.length > 1) {
        handleBulkUpload(fileList);
      } else {
        handleUpload(file);
      }
      return false;
    },
  };

  const draggerProps = {
    name: 'images',
    multiple: true,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file: File, fileList: File[]) => {
      const validFiles = fileList.filter(f => {
        const isImage = f.type.startsWith('image/');
        const isLt10M = f.size / 1024 / 1024 < 10;
        return isImage && isLt10M;
      });
      
      if (validFiles.length !== fileList.length) {
        message.error('部分文件格式不支持或文件过大');
      }
      
      if (validFiles.length > 0) {
        handleBulkUpload(validFiles);
      }
      return false;
    },
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
        extra={
          <Space>
            <Upload {...uploadProps}>
              <Button 
                icon={<UploadOutlined />} 
                loading={uploading}
                type="primary"
                ghost
              >
                单张上传
              </Button>
            </Upload>
            <Text type="secondary">
              共 {images.length} 张图片
            </Text>
          </Space>
        }
      >
        {/* 上传区域 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={16}>
            <Dragger {...draggerProps} style={{ height: 120 }}>
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined style={{ fontSize: 32, color: '#1890ff' }} />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域批量上传</p>
              <p className="ant-upload-hint">
                支持 JPG、PNG、GIF 格式，单个文件不超过 10MB
              </p>
            </Dragger>
          </Col>
          <Col xs={24} lg={8}>
            <div className="h-full flex flex-col justify-center items-center bg-gray-50 rounded-lg p-4">
              <PictureOutlined style={{ fontSize: 24, color: '#8c8c8c' }} />
              <Text type="secondary" className="mt-2">
                支持格式：JPG、PNG、GIF
              </Text>
              <Text type="secondary">
                最大文件：10MB
              </Text>
              <Text type="secondary">
                批量上传：无限制
              </Text>
            </div>
          </Col>
        </Row>

        <Divider orientation="left">场馆图片展示</Divider>
        
        {/* 图片展示网格 */}
        {images.length === 0 ? (
          <Empty 
            description="暂无图片，请上传场馆图片"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ padding: '40px 0' }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image) => (
              <div key={image.id} className="relative group bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-12 bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="object-cover w-full h-48 transition-transform group-hover:scale-105"
                  />
                </div>
                
                {/* 图片操作按钮 */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Space>
                    <Button
                      type="primary"
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        Modal.info({
                          title: '图片预览',
                          width: 800,
                          content: (
                            <div className="text-center">
                              <img src={image.url} alt={image.filename} style={{ maxWidth: '100%', maxHeight: '70vh' }} />
                            </div>
                          ),
                          okText: '关闭',
                        });
                      }}
                      className="shadow-lg"
                    />
                    <Button
                      type="primary"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteImage(image)}
                      className="shadow-lg"
                    />
                  </Space>
                </div>
                
                {/* 图片信息 */}
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Text 
                      ellipsis={{ tooltip: image.filename }} 
                      className="text-sm font-medium text-gray-900 flex-1 mr-2"
                    >
                      {image.filename}
                    </Text>
                    {image.isMain && (
                      <Tag color="gold" size="small">主图</Tag>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{(image.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span>{dayjs(image.uploadedAt).format('MM/DD')}</span>
                  </div>
                  
                  {/* 图片状态 */}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <Space size="small">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Text type="secondary" className="text-xs">已上传</Text>
                    </Space>
                    <Button 
                      type="link" 
                      size="small" 
                      className="p-0 h-auto text-xs"
                      onClick={() => {
                        // 设为主图功能
                        const updatedImages = images.map(img => ({
                          ...img,
                          isMain: img.id === image.id
                        }));
                        setImages(updatedImages);
                        message.success('已设为主图');
                      }}
                      disabled={image.isMain}
                    >
                      {image.isMain ? '主图' : '设为主图'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};