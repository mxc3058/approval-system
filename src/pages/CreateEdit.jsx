import React, { useState, useEffect } from 'react';
import {
  Form,//表单
  Input,//输入框
  Button,//按钮
  Card,//卡片
  DatePicker,//日期选择器
  message,//消息提示
  Space,//间距
  
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import DepartmentCascader from '../components/DepartmentCascader';
import { mockApprovals } from '../utils/mockData';
import { PageHeader } from '@ant-design/pro-components';  
const { TextArea } = Input;

const CreateEdit = () => {
  const [form] = Form.useForm();//表单实例
  const navigate = useNavigate();//路由导航
  const { id } = useParams();//获取路由参数
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);//是否编辑模式

  //加载编辑数据
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const record = mockApprovals.find(item => item.id === parseInt(id));// 从mock数据中查找对应记录
      if (record) {
        // 填充表单数据
        form.setFieldsValue({
          projectName: record.projectName,
          content: record.content,
          department: record.department,
          executeDate: dayjs(record.executeDate)//字符串转换为dayjs对象
        });
      }
    }
  }, [id, form]);//依赖id和form变化时执行useEffect
   //提交表单
  const handleSubmit = async (values) => {
    setLoading(true);//提交加载状态
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));//模拟API调用等待
      // 构建提交数据
      const approvalData = {
        ...values,
        executeDate: values.executeDate.format('YYYY-MM-DD'),//格式化日期
        id: isEditing ? parseInt(id) : Date.now(),//新建时用时间戳作为ID
        status: 'pending',
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),//创建时间
        approveTime: '--',
        applicant: '当前用户', // 实际项目中从登录信息获取
        approver: '审批人'
      };

      console.log('提交数据:', approvalData);
      
      message.success(isEditing ? '审批单更新成功！' : '审批单创建成功！');
      navigate('/')//返回列表页
    } catch (error) {
      message.error('提交失败，请重试');
    } finally {
      setLoading(false);
    }
  };
//草稿保存
  const handleSaveDraft = () => {
    form.validateFields()
      .then(values => {
        console.log('保存草稿:', values);
        message.success('草稿保存成功');
      })
      .catch(error => {
        console.log('表单验证失败:', error);
      });
  };

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        title={isEditing ? '编辑审批单' : '新建审批单'}
        onBack={() => navigate('/')}
        backIcon={<ArrowLeftOutlined />}
        extra={[
          <Button key="draft" onClick={handleSaveDraft}>
            保存草稿
          </Button>
        ]}
      />
      
      <Card style={{ marginTop: 16 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          
          //表单初始值
          initialValues={{
            projectName: '',
            content: '',
            department: [],
            executeDate: dayjs().add(7, 'day') // 默认执行日期为一周后
          }}
        >
          {/* 四个表单字段 */}
          <Form.Item
            name="projectName"
            label="审批项目"
            rules={[
              { required: true, message: '请输入审批项目名称' },
              { max: 20, message: '审批项目名称不能超过20个字符' }
            ]}
          >
            <Input 
              placeholder="请输入审批项目名称，最多20个字符" 
              showCount 
              maxLength={20}
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="审批内容"
            rules={[
              { required: true, message: '请输入审批内容' },
              { max: 300, message: '审批内容不能超过300个字符' }
            ]}
          >
            <TextArea
              rows={4}
              placeholder="请输入审批内容，最多300个字符"
              showCount
              maxLength={300}
            />
          </Form.Item>

          <Form.Item
            name="department"
            label="申请部门"
            rules={[{ required: true, message: '请选择申请部门' }]}
          >
            <DepartmentCascader />
          </Form.Item>

          <Form.Item
            name="executeDate"
            label="执行日期"
            rules={[{ required: true, message: '请选择执行日期' }]}
          >
            <DatePicker 
              style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                loading={loading}
              >
                {isEditing ? '更新审批单' : '提交审批'}
              </Button>
              <Button onClick={() => navigate('/')}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEdit;