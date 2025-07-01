import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginModal.css';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const LoginModal = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (username && password) {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          onLogin && onLogin({ username });
          onClose();
          navigate('/admin');
        } else {
          setError('Invalid admin credentials.');
        }
      } else {
        setError('Please enter both username and password.');
      }
    }, 800);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="login-modal"
      title={<span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiLogIn size={22} style={{ color: 'var(--primary-color)' }} /> Login</span>}
    >
      <div className="login-modal-fields">
        <Input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          size="large"
          className="login-modal-input"
          autoFocus
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          size="large"
          className="login-modal-input"
        />
        {error && <div className="login-modal-error">{error}</div>}
        <Button
          type="primary"
          block
          size="large"
          loading={loading}
          style={{ background: 'var(--primary-color)', borderColor: 'var(--primary-color)', marginTop: 16 }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal; 