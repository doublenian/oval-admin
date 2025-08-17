import React, { useState } from 'react';
import {
  Card,
  Upload,
  Button,
  message,
  Steps,
  Table,
  Alert,
  Space,
  Typography,
  Divider,
} from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

export const BulkUpload: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadData, setUploadData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    {
      title: '下载模板',
      description: '下载Excel模板文件',
    },
    {
      title: '填写数据',
      description: '按照模板格式填写球场信息',
    },
    {
      title: '上传文件',
      description: '上传填写好的Excel文件',
    },
    {
      title: '确认导入',
      description: '确认数据并完成导入',
    },
  ];

  const templateColumns = [
    { title: '球场名称*', dataIndex: 'name', key: 'name' },
    { title: '位置*', dataIndex: 'location', key: 'location' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '容量*', dataIndex: 'capacity', key: 'capacity' },
    { title: '状态*', dataIndex: 'status', key: 'status' },
  ];

  const templateData = [
    {
      key: '1',
      name: '示例球场1',
      location: '北京市朝阳区',
      description: '设施完善的室外网球场',
      capacity: 100,
      status: 'active',
    },
    {
      key: '2',
      name: '示例球场2',
      location: '上海市浦东新区',
      description: '专业级别的球场设施',
      capacity: 200,
      status: 'active',
    },
  ];

  const downloadTemplate = () => {
    // 模拟下载模板
    const link = document.createElement('a');
    link.href = '/templates/court-template.xlsx';
    link.download = '球场信息导入模板.xlsx';
    link.click();
    message.success('模板下载成功');
    setCurrentStep(1);
  };

  const uploadProps = {
    name: 'file',
    accept: '.xlsx,.xls',
    showUploadList: false,
    beforeUpload: (file: File) => {
      const isExcel = file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
      if (!isExcel) {
        message.error('只能上传 Excel 文件!');
        return false;
      }
      handleFileUpload(file);
      return false;
    },
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      // 模拟解析Excel文件
      const mockData = [
        {
          key: '1',
          name: '新球场1',
          location: '北京市海淀区',
          description: '新建的现代化球场',
          capacity: 150,
          status: 'active',
          action: '新增',
        },
        {
          key: '2',
          name: '中央公园球场',
          location: '北京市朝阳区',
          description: '更新后的球场描述',
          capacity: 120,
          status: 'active',
          action: '更新',
        },
      ];
      setUploadData(mockData);
      setCurrentStep(3);
      message.success('文件解析成功');
    } catch (error) {
      message.error('文件解析失败');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      // 模拟导入数据
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success(`成功导入 ${uploadData.length} 条球场信息`);
      navigate('/courts');
    } catch (error) {
      message.error('导入失败');
    } finally {
      setLoading(false);
    }
  };

  const previewColumns = [
    ...templateColumns,
    {
      title: '操作类型',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => (
        <span className={action === '新增' ? 'text-green-600' : 'text-blue-600'}>
          {action}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Card className="mb-4">
        <Title level={3}>球场信息批量上传</Title>
        <Paragraph type="secondary">
          通过Excel文件批量导入球场信息。如果球场已存在，将更新信息；如果不存在，将创建新球场。
        </Paragraph>
      </Card>

      <Card>
        <Steps current={currentStep} items={steps} className="mb-6" />

        {currentStep === 0 && (
          <div className="text-center py-8">
            <Title level={4}>第一步：下载Excel模板</Title>
            <Paragraph>
              请先下载模板文件，按照模板格式填写球场信息
            </Paragraph>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              onClick={downloadTemplate}
            >
              下载模板文件
            </Button>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <Title level={4}>第二步：按照模板填写数据</Title>
            <Alert
              message="填写说明"
              description={
                <ul>
                  <li>带*号的字段为必填项</li>
                  <li>状态字段请填写 "active" 或 "disabled"</li>
                  <li>容量字段请填写数字</li>
                  <li>如果球场名称已存在，将更新该球场信息</li>
                </ul>
              }
              type="info"
              className="mb-4"
            />
            
            <Title level={5}>模板格式示例：</Title>
            <Table
              columns={templateColumns}
              dataSource={templateData}
              pagination={false}
              size="small"
              className="mb-4"
            />
            
            <div className="text-center">
              <Button
                type="primary"
                onClick={() => setCurrentStep(2)}
              >
                我已填写完成，继续下一步
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <Title level={4}>第三步：上传Excel文件</Title>
            <Dragger {...uploadProps} className="mb-4">
              <p className="ant-upload-drag-icon">
                <FileExcelOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽Excel文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持 .xlsx 和 .xls 格式的Excel文件
              </p>
            </Dragger>
            
            <div className="text-center">
              <Space>
                <Button onClick={() => setCurrentStep(1)}>
                  上一步
                </Button>
                <Upload {...uploadProps}>
                  <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    loading={loading}
                  >
                    选择文件上传
                  </Button>
                </Upload>
              </Space>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <Title level={4}>第四步：确认导入数据</Title>
            <Alert
              message={`共解析到 ${uploadData.length} 条球场信息`}
              type="success"
              className="mb-4"
            />
            
            <Table
              columns={previewColumns}
              dataSource={uploadData}
              pagination={false}
              scroll={{ x: true }}
              className="mb-4"
            />
            
            <div className="text-center">
              <Space>
                <Button onClick={() => setCurrentStep(2)}>
                  重新上传
                </Button>
                <Button
                  type="primary"
                  icon={<CloudUploadOutlined />}
                  loading={loading}
                  onClick={handleImport}
                >
                  确认导入
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};