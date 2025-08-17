import React, { useState, useEffect } from 'react';
import {
  Card,
  Upload,
  Button,
  Modal,
  message,
  Image,
  Space,
  Typography,
  Row,
  Col,
  Empty,
  Spin,
} from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { CourtImage, Court } from '../../types';
import { courtAPI } from '../../services/api';

const { Title, Text } = Typography;
const { Dragger } = Upload;

export const CourtImages: React.FC = () => {
  const { courtId } = useParams<{ courtId: string }>();
  const navigate = useNavigate();
  const [court, setCourt] = useState<Court | null>(null);
  const [images, setImages] = useState<CourtImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (courtId) {
      fetchCourtAndImages();
    }
  }, [courtId]);

  const fetchCourtAndImages = async () => {
    setLoading(true);
    try {
      // 模拟数据
      const mockCourt: Court = {
        id: courtId!,
        name: '中央公园球场',
        location: '北京市朝阳区',
        description: '设施完善的室外网球场',
        capacity: 100,
        status: 'active',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        images: [],
      };

      const mockImages: CourtImage[] = [
        {
          id: '1',
          courtId: courtId!,
          url: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400',
          filename: 'court1.jpg',
          size: 1024000,
          uploadedAt: '2024-01-01T00:00:00.000Z',
          isMain: true,
        },
        {
          id: '2',
          courtId: courtId!,
          url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
          filename: 'court2.jpg',
          size: 2048000,
          uploadedAt: '2024-01-02T00:00:00.000Z',
        },
      ];

      setCourt(mockCourt);
      setImages(mockImages);
    } catch (error) {
      message.error('获取球场信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      // 模拟上传
      const newImage: CourtImage = {
        id: Date.now().toString(),
        courtId: courtId!,
        url: URL.createObjectURL(file),
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

  const uploadProps = {
    name: 'image',
    multiple: true,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file: File) => {
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
      handleUpload(file);
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

  return (
    <div>
      <Card className="mb-4">
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/courts')}
              >
                返回
              </Button>
              <Title level={3} className="mb-0">
                {court?.name} - 图片管理
              </Title>
            </Space>
          </Col>
          <Col>
            <Text type="secondary">
              共 {images.length} 张图片
            </Text>
          </Col>
        </Row>
      </Card>

      <Card title="上传图片" className="mb-4">
        <Dragger {...uploadProps} className="mb-4">
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
            支持单个或批量上传。支持 JPG、PNG、GIF 等格式，单个文件不超过 10MB
          </p>
        </Dragger>
        
        <Space>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={uploading}>
              选择文件上传
            </Button>
          </Upload>
          <Button
            icon={<CloudUploadOutlined />}
            onClick={() => navigate(`/courts/${courtId}/bulk-upload-images`)}
          >
            批量上传图片
          </Button>
        </Space>
      </Card>

      <Card title="球场图片">
        {images.length === 0 ? (
          <Empty description="暂无图片" />
        ) : (
          <div className="image-grid">
            {images.map((image) => (
              <div key={image.id} className="image-card">
                <Image
                  src={image.url}
                  alt={image.filename}
                  preview={{
                    mask: (
                      <div className="text-center">
                        <EyeOutlined />
                        <br />
                        预览
                      </div>
                    ),
                  }}
                />
                <div className="image-actions">
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteImage(image)}
                  />
                </div>
                <div className="p-2">
                  <Text ellipsis className="block text-xs">
                    {image.filename}
                  </Text>
                  <Text type="secondary" className="block text-xs">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                  {image.isMain && (
                    <Text type="success" className="block text-xs">
                      主图
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};