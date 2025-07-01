import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const AdminHeader = ({ onLogout }) => {
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
        }}
      >
        <div className="logo" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arvo, serif', fontWeight: 400, letterSpacing: 1 }}>
          <span className="logo-main">pinch</span>
          <span className="logo-of">of</span>
          <span className="logo-main">yum</span>
        </div>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={onLogout}
          style={{ background: 'var(--primary-color)', border: 'none', fontWeight: 600, height: 32, display: 'flex', alignItems: 'center', fontSize: 14, padding: '0 12px' }}
        >
          Log Out
        </Button>
      </div>
    </>
  );
};

export default AdminHeader;
