import React, { useState } from 'react';
import {
  Drawer,//抽屉
  Descriptions,//描述列表
  Button,//按钮
  Space,  //间距
  message,//消息提示
  Tag,//标签
  Divider  //分割线
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useRole } from '../contexts/RoleContext';
import StatusTag from '../components/StatusTag';

const DetailDrawer = ({ visible, record, onClose, onApprovalChange }) => {
  const { role } = useRole();
  const [approving, setApproving] = useState(false);//加载状态

  if (!record) return null;
  
  //  设置加载状态
  const handleApprove = async (action) => {
    setApproving(true);
    try {
     
      // 用时延模拟API调用等待
      await new Promise(resolve => setTimeout(resolve, 800));
       
      // 构建更新后的记录
      const updatedRecord = {
        ...record,
        status: action === 'approve' ? 'approved' : 'rejected',
        approveTime: new Date().toLocaleString('zh-CN')
      };
       // 通知父组件数据已更新

      onApprovalChange(updatedRecord);
      // 显示成功提示
      message.success(action === 'approve' ? '审批通过！' : '审批已拒绝！');
       // 关闭抽屉
      onClose();
    } catch (error) {
      message.error('操作失败，请重试');
    } finally {
     // 无论成功失败，都关闭加载状态
      setApproving(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      approved: 'green',
      rejected: 'red'
    };//状态对应颜色
    return colors[status] || 'default';
  };

  return (
    // 详情抽屉
    <Drawer
      title="审批单详情"
      placement="right"
      onClose={onClose}
      open={visible}
      width={600}
      extra={
        role === 'approver' && record.status === 'pending' && (
          <Space>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              loading={approving}
              onClick={() => handleApprove('approve')}
            >
              通过
            </Button>
            <Button
              danger
              icon={<CloseOutlined />}
              loading={approving}
              onClick={() => handleApprove('reject')}
            >
              拒绝
            </Button>
          </Space>
        )
      }
    >
      {/* 详情描述列表 */}
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="审批项目">
          {record.projectName}
        </Descriptions.Item>
        
        <Descriptions.Item label="审批内容">
          <div style={{ 
            background: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '4px',
            whiteSpace: 'pre-wrap'
          }}>
            {record.content}
          </div>
        </Descriptions.Item>
        
        <Descriptions.Item label="申请部门">
          {record.department.join(' - ')}
        </Descriptions.Item>
        
        <Descriptions.Item label="执行日期">
          {record.executeDate}
        </Descriptions.Item>
        
        <Descriptions.Item label="当前状态">
          <StatusTag status={record.status} />
        </Descriptions.Item>
        
        <Descriptions.Item label="申请人">
          <Tag color="blue">{record.applicant}</Tag>
        </Descriptions.Item>
        
        <Descriptions.Item label="审批人">
          <Tag color="purple">{record.approver}</Tag>
        </Descriptions.Item>
        
        <Descriptions.Item label="创建时间">
          {record.createTime}
        </Descriptions.Item>
        
        <Descriptions.Item label="审批时间">
          {record.approveTime}
        </Descriptions.Item>
      </Descriptions>

      {/* 审批记录区域 */}
      <Divider orientation="left" style={{ marginTop: 24 }}>
        审批记录
      </Divider>
      
      <div style={{ padding: '8px 0' }}>
        {record.status === 'pending' ? (
          <div style={{ color: '#999', textAlign: 'center' }}>
            暂无审批记录
          </div>
        ) : (
          <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '4px' }}>
            <div><strong>审批结果：</strong>
              <Tag color={getStatusColor(record.status)} style={{ marginLeft: 8 }}>
                {record.status === 'approved' ? '通过' : '拒绝'}
              </Tag>
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>审批时间：</strong>{record.approveTime}
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>审批人：</strong>{record.approver}
            </div>
          </div>
        )}
      </div>

      {/* 操作说明 */}
      {role === 'approver' && record.status === 'pending' && (
        <>
          <Divider orientation="left">操作说明</Divider>
          <div style={{ color: '#666', fontSize: '12px' }}>
            <p>• 点击"通过"按钮：审批单状态将变为"已通过"</p>
            <p>• 点击"拒绝"按钮：审批单状态将变为"已拒绝"</p>
            <p>• 审批操作不可撤销，请谨慎操作</p>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default DetailDrawer;