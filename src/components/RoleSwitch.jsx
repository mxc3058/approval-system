import React from 'react';
import { Button, Space } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { useRole } from '../contexts/RoleContext';
import { spaceChildren } from 'antd/es/button';

const RoleSwitch = () => {
  const { role, toggleRole } = useRole();
  
  return (
    <Space>
      <span>当前角色：</span>
      <Button
        type={role === 'applicant' ? 'primary' : 'default'}
        icon={role === 'applicant' ? <UserOutlined /> : <TeamOutlined />}
        onClick={toggleRole}
      >
        {role === 'applicant' ? '申请人' : '审批人'}
      </Button>
    </Space>
  );
};
export default RoleSwitch;