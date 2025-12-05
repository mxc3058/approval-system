import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { RoleProvider } from './contexts/RoleContext';
import RoleSwitch from './components/RoleSwitch';
import List from './pages/List';
import CreateEdit from './pages/CreateEdit';
import 'antd/dist/reset.css';

import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RoleProvider>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            {/* 顶部导航 */}
            <Header 
              style={{ 
                background: '#fff', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 24px'
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                🚀 企业审批系统
              </div>
              <RoleSwitch />
            </Header>

            {/* 主要内容区域 */}
            <Content style={{ background: '#f0f2f5' }}>
              <Routes>{/* 路由配置 */}  
                <Route path="/" element={<List />} />
                <Route path="/create" element={<CreateEdit />} />
                <Route path="/edit/:id" element={<CreateEdit />} />
                <Route path="*" element={<Navigate to="/" replace />} />{/*未匹配路径重定向到主页*/ }
              </Routes>
            </Content>
          </Layout>
        </Router>
      </RoleProvider>
    </ConfigProvider>
  );
}

export default App;
