import React from 'react';
import { Menu } from 'antd';
import { BookOutlined, DashboardOutlined } from '@ant-design/icons';
import { FaBowlFood } from 'react-icons/fa6';
import { GiMeal } from 'react-icons/gi';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

const isMobile = () => window.innerWidth <= 700;

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobile, setMobile] = React.useState(isMobile());

  React.useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure dashboard is selected for both /log-in/admin and /log-in/admin/dashboard
  let selectedKey = location.pathname;
  if (selectedKey === '/log-in/admin') selectedKey = '/log-in/admin/dashboard';

  const menuItems = [
    {
      key: '/log-in/admin/dashboard',
      icon: <DashboardOutlined style={{ color: '#fff', fontSize: 16 }} />,
      label: mobile ? null : 'Dashboard',
    },
    {
      key: '/log-in/admin/recipes',
      icon: <BookOutlined style={{ color: '#fff', fontSize: 16 }} />,
      label: mobile ? null : 'Recipes',
    },
    {
      key: '/log-in/admin/cuisines',
      icon: <GiMeal style={{ color: '#fff', fontSize: 18 }} />,
      label: mobile ? null : 'Cuisines',
    },
  ];

  return (
    <div className={`admin-sidebar${mobile ? ' admin-sidebar-mobile' : ''}`}>
      <div className="admin-sidebar-header">
        <h3 className="admin-sidebar-title">{mobile ? '' : 'Admin Panel'}</h3>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="admin-sidebar-menu"
      />
    </div>
  );
};

export default AdminSidebar; 