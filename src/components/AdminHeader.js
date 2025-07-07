import React from 'react';
import { Button, Tooltip, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { FaHome } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ADMIN_LOGOUT_REQUEST } from '../store/adminAuthSaga';

const MOBILE_BREAKPOINT = 700;

const AdminHeader = ({ onLogout, showDashboardButton }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminEmail = useSelector((state) => state.adminAuth.adminEmail);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= MOBILE_BREAKPOINT);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      dispatch({ type: ADMIN_LOGOUT_REQUEST, payload: { navigate } });
    }
  };

  // Get initial from email
  const getInitial = (email) => {
    if (!email) return '?';
    return email.trim().charAt(0).toUpperCase();
  };

  return (
    <>
      <style>{`
        .admin-header-override.main-header {
          height: 45px !important;
          min-height: 45px !important;
          line-height: 45px !important;
          padding: 0 16px !important;
        }
        .admin-header-override .logo {
          font-size: 20px !important;
          height: 45px !important;
        }
        .admin-header-avatar {
          border: 2px solid var(--primary-color);
          background: #fff;
          color: var(--primary-color);
          font-weight: 700;
          margin-left: 0px;
          cursor: pointer;
          user-select: none;
          box-sizing: border-box;
        }
        .admin-header-btn {
          transition: background 0.15s, color 0.15s;
        }
        .admin-header-btn:hover, .admin-header-btn:focus {
          background: #f0e6f6 !important;
          color: var(--primary-color) !important;
        }
        .admin-header-btn:hover .anticon, .admin-header-btn:focus .anticon {
          color: var(--primary-color) !important;
        }
      `}</style>
      <div
        className="main-header admin-header-override"
        style={{
          width: '100%',
          background: 'var(--primary-color)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(120,64,98,0.08)',
          zIndex: 10,
          borderBottom: '0.5px solid var(--primary-color)',
        }}
      >
        <div className="logo" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arvo, serif', fontWeight: 400, letterSpacing: 1 }}>
          <span className="logo-main">pinch</span>
          <span className="logo-of">of</span>
          <span className="logo-main">yum</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {showDashboardButton ? (
            <Button
              type="default"
              icon={<MdDashboard size={18} />}
              onClick={() => navigate('/log-in/admin/dashboard')}
              style={{ background: '#fff', color: 'var(--primary-color)', border: 'none', fontWeight: 600, height: 32, display: 'flex', alignItems: 'center', fontSize: 16, padding: '0 10px' }}
              className="admin-header-btn"
            >
              {!isMobile && 'Dashboard'}
            </Button>
          ) : (
            <Button
              type="default"
              icon={<FaHome size={18} />}
              onClick={() => navigate('/')}
              style={{ background: '#fff', color: 'var(--primary-color)', border: 'none', fontWeight: 600, height: 32, display: 'flex', alignItems: 'center', fontSize: 16, padding: '0 10px' }}
              className="admin-header-btn"
            >
              {!isMobile && 'Home'}
            </Button>
          )}
          <Button
            type="default"
            icon={<LogoutOutlined style={{ color: 'var(--primary-color)', fontSize: 16, fontWeight: 600 }} />}
            onClick={handleLogout}
            style={{ background: '#fff', color: 'var(--primary-color)', border: 'none', fontWeight: 600, height: 32, display: 'flex', alignItems: 'center', fontSize: 16, padding: '0 10px' }}
            className="admin-header-btn"
          >
            {!isMobile && 'Log Out'}
          </Button>
          <Tooltip title={adminEmail ? `Logged in as ${adminEmail}` : ''} placement="bottom">
            <Avatar className="admin-header-avatar" size={32}>
              {getInitial(adminEmail)}
            </Avatar>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
