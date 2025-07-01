import React from 'react';
import { Layout } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminPanel.css';

const { Sider, Content } = Layout;

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AdminHeader onLogout={() => navigate('/')} />
      <Layout style={{ minHeight: 'calc(100vh - 45px)' }}>
        <Sider width={160} style={{ background: 'var(--primary-color)' }}>
          <AdminSidebar />
        </Sider>
        <Layout>
          <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminPanel; 