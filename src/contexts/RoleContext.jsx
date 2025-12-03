import react, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('applicant'); // 默认角色为申请人

 const toggleRole = () => {
    setRole((prevRole) => (prevRole === 'applicant' ? 'approver' : 'applicant'));
  };

  return (
    <RoleContext.Provider value={{ role, setRole,toggleRole }}>
      {children}
    </RoleContext.Provider>
  );

}

export const useRole = () => useContext(RoleContext);