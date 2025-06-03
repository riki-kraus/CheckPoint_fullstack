import { useState } from 'react';
import { Alert } from '@mui/material';
import { Modal } from 'antd';
import { motion } from 'framer-motion';
import "../styles/LoginModal.css";
import { LoginService } from '../services/loginService';
import GoogleLogin from './GoogleLogin';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (email: string, messageType: string, message: string) => void;
}

const LoginModal = ({ isOpen, onClose, onSuccessLogin }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 15px rgba(128, 90, 213, 0.3)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setMessageType("error");
      setMessage("אנא מלא את כל השדות");
      return;
    }
  
    const result = await LoginService.login({ email, password });
  
    if (result.success) {
      setMessageType("success");
      setMessage("Login successful");
      onSuccessLogin(email, "success", "Login successful");
      onClose();
    } else {
      setMessageType("error");
      setMessage(result.error || "שגיאה לא ידועה");
      onSuccessLogin(email, "error", result.error || "שגיאה לא ידועה");
    }
  };
  

  return (
    <Modal
      title="Sign In to ExamAI"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="login-modal"
    >
      <div className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <motion.button
          className="login-btn"
          onClick={handleLogin}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Login
        </motion.button>

        {message && (
          <Alert severity={messageType} sx={{ marginTop: 2 }}>
            {message}
          </Alert>
        )}

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-login-container">
          {/* future Google Login button */}
        
          <GoogleLogin onSuccessLogin={onSuccessLogin} />
          

        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
