import React, { useState } from 'react';
import {
  Drawer,
  Descriptions,
  Button,
  Space,
  message,
  Tag,
  Divider
} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useRole } from '../contexts/RoleContext';
import StatusTag from '../components/StatusTag';

const DetailDrawer = ({ visible, record, onClose, onApprovalChange }) => {
  const { role } = useRole();
  const [approving, setApproving] = useState(false);

  if (!record) return null;

  const handleApprove = async (action) => {
    setApproving(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedRecord = {
        ...record,
        status: action === 'approve' ? 'approved' : 'rejected',
        approveTime: new Date().toLocaleString('zh-CN')
      };

      onApprovalChange(updatedRecord);
      message.success(action === 'approve' ? '审批通过！' : '审批已拒绝！');
      onClose();
    } catch (error) {
      message.error('操作失败，请重试');
    } finally {
      setApproving(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      approved: 'green',
      rejected: 'red'
    };
    return colors[status] || 'default';
  };

  return (
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