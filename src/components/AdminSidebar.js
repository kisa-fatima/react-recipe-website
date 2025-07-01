import React from 'react';
import { Menu } from 'antd';
import { BookOutlined, GlobalOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ensure dashboard is selected for both /admin and /admin/dashboard
  let selectedKey = location.pathname;
  if (selectedKey === '/admin') selectedKey = '/admin/dashboard';

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined style={{ color: '#fff', fontSize: 16 }} />,
      label: 'Dashboard',
    },
    {
      key: '/admin/recipes',
      icon: <BookOutlined style={{ color: '#fff', fontSize: 16 }} />,
      label: 'Recipes',
    },
    {
      key: '/admin/cuisines',
      icon: <GlobalOutlined style={{ color: '#fff', fontSize: 16 }} />,
      label: 'Cuisines',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h3 className="admin-sidebar-title">Admin Panel</h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
        className="admin-sidebar-menu"
      />
    </div>
  );
};

export default AdminSidebar; 