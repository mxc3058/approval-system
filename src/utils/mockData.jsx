export const mockApprovals = [
  {
    id: 1,
    projectName: "2025年市场推广活动",
    content: "计划在Q1季度开展全国范围内的品牌推广活动，预算50万元",
    department: ["市场部", "品牌推广部", "线上营销团队"],
    executeDate: "2025-03-01",
    status: "pending",
    createTime: "2025-11-18 14:00:00",
    approveTime: "--",
    applicant: "张三",
    approver: "李四",
    attachments: []
  },
  {
    id: 2,
    projectName: "新员工培训计划",
    content: "为2025年新入职员工制定为期两周的培训计划",
    department: ["人力资源部", "培训发展部", "新人培养组"],
    executeDate: "2025-02-15",
    status: "approved",
    createTime: "2025-11-17 10:30:00",
    approveTime: "2025-11-17 16:45:00",
    applicant: "王五",
    approver: "李四",
    attachments: []
  }
];

export const departmentOptions = [
  {
    value: '市场部',
    label: '市场部',
    children: [
      {
        value: '品牌推广部',
        label: '品牌推广部',
        children: [
          { value: '线上营销团队', label: '线上营销团队' },
          { value: '线下活动团队', label: '线下活动团队' }
        ]
      }
    ]
  },
  {
    value: '人力资源部',
    label: '人力资源部',
    children: [
      {
        value: '培训发展部',
        label: '培训发展部',
        children: [
          { value: '新人培养组', label: '新人培养组' },
          { value: '领导力发展组', label: '领导力发展组' }
        ]
      }
    ]
  }
];