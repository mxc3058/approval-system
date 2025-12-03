import React from "react";
import { Tag } from "antd";

const StatusTag = ({ status }) => {
const statussConfig={
     pending: { color: 'orange', text: '待审批' },
    approved: { color: 'green', text: '已通过' },
    rejected: { color: 'red', text: '已拒绝' }
};
const config=statussConfig[status] || { color: 'default', text: '未知' };
return <Tag color={config.color}>{config.text}</Tag>;

};
export default StatusTag;