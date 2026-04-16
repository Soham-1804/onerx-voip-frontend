import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import './Login.css'; // Reuse Login styles

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-placeholder">RX</div>
            <span className="brand-name">OneRx <span className="teal-text">Connect</span></span>
          </div>
          <h1 className="login-title">Reset your password</h1>
          <p className="login-subtitle">Enter your email to receive a reset link</p>
        </div>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); alert('Reset link sent!'); navigate('/login'); }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input type="email" id="email" placeholder="dr.chen@clinic.ca" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Send Reset Link <RefreshCw size={18} />
          </button>
        </form>

        <div className="auth-footer-links" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button onClick={() => navigate('/login')} className="btn btn-outline" style={{ border: 'none', color: 'var(--text-muted)' }}>
            <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
