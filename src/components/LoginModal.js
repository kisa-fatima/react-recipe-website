import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/LoginModal.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { adminUsers } from '../utils/adminUsers';
import { useDispatch } from 'react-redux';
import { ADMIN_LOGIN_REQUEST } from '../store/adminAuthSaga';

const LoginModal = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Check if email/password is in adminUsers
      const admin = adminUsers.find(
        (user) => user.email === email && user.password === password
      );
      if (!admin) {
        setError('You are not authorized as an admin.');
        setLoading(false);
        return;
      }
      // Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: ADMIN_LOGIN_REQUEST, payload: { email, navigate } });
      onLogin && onLogin({ email });
    } catch (err) {
      setError('Invalid credentials or user does not exist.');
    }
    setLoading(false);
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
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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