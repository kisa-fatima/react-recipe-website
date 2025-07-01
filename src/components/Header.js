import React, { useState, useEffect } from 'react';
import { Layout, Menu, Row, Col, Button, Drawer } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SearchDrawer from './SearchDrawer';
import { FaUserAlt } from 'react-icons/fa';
import LoginModal from './LoginModal';

const { Header: AntHeader } = Layout;

const navItems = [
  { key: 'home', label: <Link to="/">HOME</Link> },
  { key: 'about', label: <Link to="/about">ABOUT</Link> },
  { key: 'recipes', label: <Link to="/recipes">RECIPES</Link> },
  { key: 'start-here', label: <Link to="/start-here">START HERE</Link> },
];

const MOBILE_BREAKPOINT = 900;

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="header-wrapper">
      <div className="top-bar">
        <span className="top-bar-text">
          <span role="img" aria-label="heart">💛</span> OUR RECIPES, YOUR INBOX. <span className="signup"><b>SIGN UP</b></span>
        </span>
      </div>
      <AntHeader className="main-header">
        <Row align="middle" justify="space-between" style={{ width: '100%' }}>
          <Col flex="none">
            <div className="logo">
              <span className="logo-main">pinch</span><span className="logo-of">of</span><span className="logo-main">yum</span>
            </div>
          </Col>
          <Col flex="auto">
            {isMobile ? (
              <>
                <Button className="mobile-menu-btn" type="text" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />
                <Drawer
                  title={<div className="logo"><span className="logo-main">pinch</span><span className="logo-of">of</span><span className="logo-main">yum</span></div>}
                  placement="right"
                  onClose={() => setDrawerVisible(false)}
                  open={drawerVisible}
                  className="mobile-drawer"
                >
                  <Menu mode="vertical" className="nav-menu-mobile" selectable={false} items={navItems} onClick={() => setDrawerVisible(false)} />
                  <Button type="text" icon={<SearchOutlined />} className="search-btn" onClick={() => setSearchDrawerOpen(true)} />
                  <Button type="text" icon={<FaUserAlt size={20} style={{ color: 'var(--primary-color)' }} />} className="login-btn" onClick={() => setLoginModalOpen(true)} style={{ marginLeft: 8 }} />
                </Drawer>
              </>
            ) : (
              <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1.5em' }}>
                <Menu mode="horizontal" className="nav-menu" selectable={false} items={navItems} />
                <Button type="text" icon={<SearchOutlined />} className="search-btn" onClick={() => setSearchDrawerOpen(true)} />
                <Button type="text" icon={<FaUserAlt size={20} style={{ color: 'var(--primary-color)' }} />} className="login-btn" onClick={() => setLoginModalOpen(true)} style={{ marginLeft: 8 }} />
              </div>
            )}
          </Col>
        </Row>
      </AntHeader>
      <SearchDrawer open={searchDrawerOpen} onClose={() => setSearchDrawerOpen(false)} />
      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  );
};

export default Header;
