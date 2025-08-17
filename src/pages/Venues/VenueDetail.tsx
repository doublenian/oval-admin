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
  Image,
  Tooltip,
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

  // 解码球场等级和赛事标记
  const decodeCategoryTags = (category?: string) => {
    if (!category) return [];
    
    const tags: { text: string; color: string; type: 'level' | 'event' }[] = [];
    const items = category.split(',').map(item => item.trim());
    
    // 球场等级映射
    const levelMap: Record<string, { name: string; color: string }> = {
      'A': { name: '杰出', color: 'red' },
      'B': { name: '优秀', color: 'blue' },
      'N': { name: '常规', color: 'default' },
      'S': { name: '欠佳', color: 'orange' },
      'T': { name: '简陋', color: 'gray' },
      'H': { name: '历史', color: 'purple' }
    };

    // 赛事标记映射
    const eventMap: Record<string, { name: string; color: string }> = {
      'U4': { name: '欧足联四类球场', color: 'blue' },
      'U3': { name: '欧足联三类球场', color: 'blue' },
      'U2': { name: '欧足联二类球场', color: 'blue' },
      'U': { name: '欧足联认证', color: 'blue' },
      'R': { name: '洲际比赛', color: 'green' },
      'W': { name: '世界杯', color: 'gold' },
      'W1': { name: '世界杯主赛场', color: 'gold' },
      'W2': { name: '半决赛球场', color: 'gold' },
      'W3': { name: '小组赛球场', color: 'gold' },
      'O': { name: '奥运会', color: 'cyan' },
      'O1': { name: '奥运会', color: 'cyan' },
      'C1': { name: '国家体育场', color: 'magenta' }
    };

    items.forEach(item => {
      if (levelMap[item]) {
        tags.push({
          text: levelMap[item].name,
          color: levelMap[item].color,
          type: 'level'
        });
      } else if (eventMap[item]) {
        tags.push({
          text: eventMap[item].name,
          color: eventMap[item].color,
          type: 'event'
        });
      }
    });

    return tags;
  };

  // 解码球场类型
  const decodeVenueType = (type?: string) => {
    const typeMap: Record<string, string> = {
      'A': '田径场', 'B': '棒球场', 'C': '板球场',
      'F': '足球场', 'R': '英式橄榄球场', 'af': '美式橄榄球场',
      'K': '篮球', 'H': '手球', 'S': '滑冰',
      'Y': '冰球', 'Z': '综合', 'T': '网球',
      'D': '冰蓝转换', 'E': '电竞', 'G': '室内足球'
    };
    return type ? typeMap[type] || type : '-';
  };

  // 解码颜色并返回实际颜色值
  const getActualColors = (code?: string) => {
    if (!code) return [];

    const colorMap: Record<string, string> = {
      'Re': '#FF0000', // 红色
      'Or': '#FFA500', // 橙色
      'Ye': '#FFFF00', // 黄色
      'Gn': '#008000', // 绿色
      'Ch': '#00FFFF', // 青色
      'Bl': '#0000FF', // 蓝色
      'Pe': '#800080', // 紫色
      'Br': '#A52A2A', // 棕色
      'Pk': '#FFC0CB', // 粉色
      'Bk': '#000000', // 黑色
      'Wh': '#FFFFFF', // 白色
      'Gy': '#808080', // 灰色
      'Vr': '#F5F5F5', // 无座椅 (浅灰)
      'Un': '#D3D3D3'  // 未知 (浅灰)
    };

    const parts = code.split('_');
    const colors = parts[0];
    
    // 解析颜色代码
    const colorCodes = colors.match(/.{1,2}/g) || [];
    return colorCodes.map(c => ({
      code: c,
      color: colorMap[c] || '#D3D3D3',
      name: {
        'Re': '红色', 'Or': '橙色', 'Ye': '黄色', 'Gn': '绿色',
        'Ch': '青色', 'Bl': '蓝色', 'Pe': '紫色', 'Br': '棕色',
        'Pk': '粉色', 'Bk': '黑色', 'Wh': '白色', 'Gy': '灰色',
        'Vr': '无座椅', 'Un': '未知'
      }[c] || c
    }));
  };

  // 解码颜色编码
  const decodeColorCode = (code?: string) => {
    if (!code) return null;

    const colorMap: Record<string, string> = {
      'Re': '红色', 'Or': '橙色', 'Ye': '黄色', 'Gn': '绿色',
      'Ch': '青色', 'Bl': '蓝色', 'Pe': '紫色', 'Br': '棕色',
      'Pk': '粉色', 'Bk': '黑色', 'Wh': '白色', 'Gy': '灰色',
      'Vr': '无座椅', 'Un': '未知'
    };

    const compositeMap: Record<string, string> = {
      'JO': '组合', 'PI': '像素', 'PU': '纯色', 'PA': '图案', 'WD': '文字'
    };

    const parts = code.split('_');
    const colors = parts[0];
    const composite = parts[1];
    const hasWD = parts.includes('WD');

    let result = '';
    
    // 解码颜色
    const colorCodes = colors.match(/.{1,2}/g) || [];
    const colorNames = colorCodes.map(c => colorMap[c] || c).join('+');
    
    if (colorNames) result += colorNames;
    if (composite && compositeMap[composite]) {
      result += ` (${compositeMap[composite]})`;
    }
    if (hasWD) {
      result += ' 含文字';
    }

    return result || code;
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

  const categoryTags = decodeCategoryTags(venue.category);

  return (
    <div className="space-y-8">
      {/* 顶部导航和标题 */}
      <Card className="shadow-sm border-0" bodyStyle={{ padding: '24px 32px' }}>
        <div className="flex flex-col gap-6">
          {/* 返回按钮 */}
          <div>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/venues')}
              type="default"
              className="flex-shrink-0"
            >
              返回列表
            </Button>
          </div>
          
          {/* 场馆名称区域 */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* 左侧：场馆名称 */}
            <div className="flex-1">
              <Title level={1} className="mb-2 text-2xl lg:text-3xl font-bold text-gray-900">
                {venue.name}
              </Title>
            </div>
            
            {/* 右侧：英文名称和链接 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
              {venue.chinese_name && (
                <Text className="text-lg text-gray-600 sm:mr-4">
                  {venue.chinese_name}
                </Text>
              )}
              <div className="flex flex-wrap gap-2">
                {venue.link && (
                  <Button
                    type="link"
                    size="small"
                    icon={<GlobalOutlined />}
                    onClick={() => window.open(venue.link, '_blank')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    官方链接
                  </Button>
                )}
                {venue.additional_link && (
                  <Button
                    type="link"
                    size="small"
                    icon={<GlobalOutlined />}
                    onClick={() => window.open(venue.additional_link, '_blank')}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    附加链接
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Row gutter={[32, 32]}>
        {/* 主要信息 */}
        <Col xs={24}>
          {/* 基本信息 (包含所有32个字段) */}
          <Card 
            title={<><InfoCircleOutlined /> 场馆详细信息</>}
            className="mb-8 shadow-sm border-0"
            bodyStyle={{ padding: '32px' }}
          >
            <Descriptions 
              column={{ xs: 1, sm: 2, md: 3 }} 
              size="middle" 
              bordered
              labelStyle={{ 
                background: '#fafafa', 
                fontWeight: '500',
                padding: '16px',
                width: '160px'
              }}
              contentStyle={{ 
                padding: '16px'
              }}
            >
              {/* 字段1-2: 英文名和中文名 */}
              <Descriptions.Item 
                label="英文名称 (Name)"
                span={{ xs: 1, sm: 2, md: 3 }}
              >
                <Text strong className="text-lg text-blue-600">
                  {venue.name}
                </Text>
              </Descriptions.Item>
              
              <Descriptions.Item 
                label="中文名称 (ChineseName)"
                span={{ xs: 1, sm: 2, md: 3 }}
              >
                <Text className="text-base">
                  {venue.chinese_name || '-'}
                </Text>
              </Descriptions.Item>

              {/* 字段3: 等级与赛事标记 */}
              <Descriptions.Item 
                label="等级与赛事 (Category)"
                span={{ xs: 1, sm: 2, md: 3 }}
              >
                {categoryTags.length > 0 ? (
                  <Space wrap size="small">
                    {categoryTags.map((tag, index) => (
                      <Tag 
                        key={index} 
                        color={tag.color}
                        className={`px-3 py-1 ${tag.type === 'level' ? 'border-dashed' : ''}`}
                      >
                        {tag.text}
                      </Tag>
                    ))}
                  </Space>
                ) : (
                  <Text type="secondary">-</Text>
                )}
              </Descriptions.Item>

              {/* 字段4-5: 建成和更新时间 */}
              <Descriptions.Item label="建成年份 (Built)">
                <Text strong>{venue.built_year || '-'}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="更新年份 (Update)" span={2}>
                {venue.update_year ? (
                  <Text type="secondary">更新: {venue.update_year}</Text>
                ) : (
                  <Text type="secondary">-</Text>
                )}
              </Descriptions.Item>

              {/* 字段6-8: 地理位置 */}
              <Descriptions.Item 
                label={<><EnvironmentOutlined /> 地理位置</>}
                span={3}
              >
                <Space wrap size="middle">
                  <Tag color="blue">{venue.region}</Tag>
                  <Text strong>{venue.country}</Text>
                  {venue.city && <Text>{venue.city}</Text>}
                </Space>
              </Descriptions.Item>

              {/* 字段9: 建筑师 */}
              <Descriptions.Item 
                label={<><BuildOutlined /> 建筑师 (Architect)</>}
                span={3}
              >
                <Text className="text-base font-medium">{venue.architect || '-'}</Text>
              </Descriptions.Item>

              {/* 字段10: 球场类型 */}
              <Descriptions.Item label="球场类型 (Type)">
                <Text>{decodeVenueType(venue.venue_type)}</Text>
              </Descriptions.Item>

              {/* 字段11: 看台轮廓 */}
              <Descriptions.Item label="看台轮廓 (Stand)" span={2}>
                <Text>{venue.stand_contour || '-'}</Text>
              </Descriptions.Item>

              {/* 字段12-13: GA层级和容量 */}
              <Descriptions.Item label="看台层数 (GATier)">
                <Text>{venue.ga_tier || '-'}</Text>
              </Descriptions.Item>
              
              <Descriptions.Item label={<><TeamOutlined /> 总座席数 (Capacity)</>}>
                <Text strong className="text-lg text-blue-600">
                  {formatCapacity(venue.capacity)}
                </Text>
              </Descriptions.Item>

              <Descriptions.Item label="温控容量">
                <Text>{venue.temperature_capacity ? formatCapacity(venue.temperature_capacity) : '-'}</Text>
              </Descriptions.Item>

              {/* 字段17-22: 各类座席数 */}
              {venue.vip_capacity && (
                <Descriptions.Item label="VIP席位">
                  <Text strong className="text-purple-600">
                    {formatCapacity(venue.vip_capacity)}
                  </Text>
                </Descriptions.Item>
              )}
              
              {venue.hospitality_capacity && (
                <Descriptions.Item label="高档席位 (Hospitality)">
                  <Text strong className="text-green-600">
                    {formatCapacity(venue.hospitality_capacity)}
                  </Text>
                </Descriptions.Item>
              )}
              
              {venue.press_capacity && (
                <Descriptions.Item label="媒体席位 (Press)">
                  <Text strong className="text-orange-600">
                    {formatCapacity(venue.press_capacity)}
                  </Text>
                </Descriptions.Item>
              )}
              
              {venue.disabled_capacity && (
                <Descriptions.Item label="无障碍席位 (Disabled)">
                  <Text strong className="text-cyan-600">
                    {formatCapacity(venue.disabled_capacity)}
                  </Text>
                </Descriptions.Item>
              )}
              
              {venue.suites_count && (
                <Descriptions.Item label="豪华包厢 (Suites)">
                  <Text strong className="text-red-600">
                    {venue.suites_count} 间
                  </Text>
                </Descriptions.Item>
              )}

              {/* 字段23-25: 技术规格 */}
              {venue.height && (
                <Descriptions.Item label={<><VerticalAlignMiddleOutlined /> 建筑高度 (Height)</>}>
                  <Text strong>{venue.height} 米</Text>
                </Descriptions.Item>
              )}
              
              {venue.fop && (
                <Descriptions.Item label="场地尺寸 (FOP)" span={2}>
                  <Text>{venue.fop}</Text>
                </Descriptions.Item>
              )}
              
              {venue.screen_area && (
                <Descriptions.Item label="大屏尺寸 (Screen)">
                  <Text>{venue.screen_area}</Text>
                </Descriptions.Item>
              )}

              {/* 字段27-28: 面积和成本 */}
              {venue.total_area && (
                <Descriptions.Item label="总面积 (Total Area)">
                  <Text strong>{formatArea(venue.total_area)}</Text>
                </Descriptions.Item>
              )}
              
              {venue.construction_cost && (
                <Descriptions.Item label={<><DollarOutlined /> 建设成本 (Cost)</>} span={2}>
                  <Text className="text-xl font-bold text-green-600">
                    {venue.construction_cost}
                  </Text>
                </Descriptions.Item>
              )}

              {/* 字段29: 管理索引 */}
              {venue.venue_index && (
                <Descriptions.Item label="场馆编号 (Index)">
                  <Badge count={venue.venue_index} style={{ backgroundColor: '#52c41a' }}>
                    <Text>编号</Text>
                  </Badge>
                </Descriptions.Item>
              )}

              {/* 字段31-32: 编码信息 */}
              {venue.construction_code && (
                <Descriptions.Item label="屋盖结构编码" span={2}>
                  <Text code>{venue.construction_code}</Text>
                </Descriptions.Item>
              )}
              
              {venue.main_color_code && (
                <Descriptions.Item label="座椅颜色编码" span={3}>
                  <Space direction="vertical" size="small">
                    <div className="flex items-center space-x-2">
                      <Text code>{venue.main_color_code}</Text>
                      <Text type="secondary">({decodeColorCode(venue.main_color_code)})</Text>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Text className="text-sm text-gray-600">颜色预览:</Text>
                      <div className="flex space-x-1">
                        {getActualColors(venue.main_color_code).map((colorInfo, index) => (
                          <Tooltip key={index} title={colorInfo.name}>
                            <div 
                              className="w-6 h-6 rounded border border-gray-300 cursor-help shadow-sm"
                              style={{ 
                                backgroundColor: colorInfo.color,
                                border: colorInfo.color === '#FFFFFF' ? '1px solid #d9d9d9' : '1px solid rgba(0,0,0,0.1)'
                              }}
                            />
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </Space>
                </Descriptions.Item>
              )}
              
              {venue.building_size && (
                <Descriptions.Item label="建筑尺寸" span={3}>
                  <Text>{venue.building_size}</Text>
                </Descriptions.Item>
              )}

              {/* 系统信息 */}
              <Descriptions.Item label="创建时间">
                <Text type="secondary">
                  {venue.created_at ? dayjs(venue.created_at).format('YYYY-MM-DD HH:mm:ss') : '-'}
                </Text>
              </Descriptions.Item>
              
              <Descriptions.Item label="更新时间" span={2}>
                <Text type="secondary">
                  {venue.updated_at ? dayjs(venue.updated_at).format('YYYY-MM-DD HH:mm:ss') : '-'}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* 赛事与俱乐部信息 */}
          {venue.events_clubs && (
            <Card 
              title={<><TrophyOutlined /> 赛事与俱乐部 (Events & Clubs)</>}
              className="shadow-sm mb-8 border-0"
              bodyStyle={{ padding: '32px' }}
            >
              <Space wrap size="middle">
                {venue.events_clubs
                  .split(';')
                  .filter(item => item.trim())
                  .map((item, index) => (
                    <Tag 
                      key={index} 
                      color="blue" 
                      className="px-3 py-2 text-sm"
                    >
                      {item.trim()}
                    </Tag>
                  ))
                }
              </Space>
            </Card>
          )}
        </Col>
      </Row>

      {/* 图片管理 */}
      <Card 
        title={<><PictureOutlined /> 图片管理</>}
        className="shadow-sm border-0"
        bodyStyle={{ padding: '32px' }}
      >
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          className="venue-image-upload"
        >
          {fileList.length >= 50 ? null : uploadButton}
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