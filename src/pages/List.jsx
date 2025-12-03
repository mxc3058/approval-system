import React, { useState, useMemo } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  DatePicker,
  Card,
  Row,
  Col
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import { mockApprovals } from '../utils/mockData';
import StatusTag from '../components/StatusTag';
import DepartmentCascader from '../components/DepartmentCascader';
import DetailDrawer from './DetailDrawer';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const List = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const [approvals, setApprovals] = useState(mockApprovals);
  const [filters, setFilters] = useState({
    status: '',
    projectName: '',
    department: [],
    createTime: []
  });
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // 根据角色和筛选条件过滤数据
  const filteredData = useMemo(() => {
    let data = approvals;
    
    // 审批人视角只显示待审批任务
    if (role === 'approver') {
      data = data.filter(item => item.status === 'pending');
    }
    
    // 状态筛选
    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }
    
    // 项目名称模糊搜索
    if (filters.projectName) {
      data = data.filter(item => 
        item.projectName.includes(filters.projectName)
      );
    }
    
    // 部门筛选
    if (filters.department.length > 0) {
      data = data.filter(item => 
        JSON.stringify(item.department) === JSON.stringify(filters.department)
      );
    }
    
    return data;
  }, [approvals, filters, role]);

  const columns = [
    {
      title: '审批项目',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: '审批内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '申请部门',
      dataIndex: 'department',
      key: 'department',
      render: (department) => department.join(' - '),
    },
    {
      title: '执行日期',
      dataIndex: 'executeDate',
      key: 'executeDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '审批时间',
      dataIndex: 'approveTime',
      key: 'approveTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => {
            setSelectedRecord(record);
            setDetailVisible(true);
          }}>
            查看详情
          </Button>
          {role === 'applicant' && record.status === 'pending' && (
            <Button type="link" onClick={() => navigate(`/edit/${record.id}`)}>
              编辑
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        {/* 筛选区域 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={6}>
            <Search
              placeholder="搜索审批项目"
              allowClear
              onSearch={(value) => handleFilterChange('projectName', value)}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="审批状态"
              allowClear
              style={{ width: '100%' }}
              onChange={(value) => handleFilterChange('status', value)}
            >
              <Option value="pending">待审批</Option>
              <Option value="approved">已通过</Option>
              <Option value="rejected">已拒绝</Option>
            </Select>
          </Col>
          <Col span={6}>
            <DepartmentCascader
              style={{ width: '100%' }}
              onChange={(value) => handleFilterChange('department', value)}
            />
          </Col>
          <Col span={6}>
            <RangePicker
              style={{ width: '100%' }}
              onChange={(dates) => handleFilterChange('createTime', dates)}
            />
          </Col>
        </Row>

        {/* 操作按钮 */}
        <div style={{ marginBottom: 16 }}>
          {role === 'applicant' && (
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/create')}
            >
              新建审批
            </Button>
          )}
        </div>

        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 详情抽屉 */}
      <DetailDrawer
        visible={detailVisible}
        record={selectedRecord}
        onClose={() => setDetailVisible(false)}
        onApprovalChange={(newRecord) => {
          setApprovals(prev => 
            prev.map(item => item.id === newRecord.id ? newRecord : item)
          );
        }}
      />
    </div>
  );
};

export default List;