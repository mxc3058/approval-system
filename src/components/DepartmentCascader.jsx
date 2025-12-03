import React from 'react';
import { Cascader } from 'antd';
import { departmentOptions } from '../utils/mockData';

const DepartmentCascader = ({ value, onChange, ...props }) => {
  return (
    <Cascader
      options={departmentOptions}
      placeholder="请选择申请部门"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default DepartmentCascader;