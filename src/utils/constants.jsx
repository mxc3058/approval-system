// 审批状态常量
export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const STATUS_TEXT = {
  pending: '待审批',
  approved: '已通过',
  rejected: '已拒绝'
};

// 角色常量
export const ROLE = {
  APPLICANT: 'applicant',
  APPROVER: 'approver'
};

// 本地存储键名
export const STORAGE_KEYS = {
  APPROVALS: 'approval_system_data',
  USER_ROLE: 'user_role'
};