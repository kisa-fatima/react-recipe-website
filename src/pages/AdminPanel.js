import React from 'react';
import { Layout } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import '../styles/AdminPanel.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAdmin } from '../store/adminAuthSlice';

const { Sider, Content } = Layout;

const getSidebarWidth = () => (window.innerWidth <= 700 ? 48 : 160);

const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.adminAuth.isAdminLoggedIn);
  const [sidebarWidth, setSidebarWidth] = React.useState(getSidebarWidth());

  React.useEffect(() => {
    const handleResize = () => setSidebarWidth(getSidebarWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/log-in');
    }
  }, [isAdminLoggedIn, navigate]);

  const onLogout = () => {
    dispatch(logoutAdmin());
    // navigation will be handled by the effect above
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AdminHeader onLogout={onLogout} />
      <Layout style={{ minHeight: 'calc(100vh - 45px)' }}>
        <Sider width={sidebarWidth} style={{ background: 'var(--primary-color)', transition: 'width 0.2s' }}>
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