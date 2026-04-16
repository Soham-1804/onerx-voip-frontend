import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-placeholder">RX</div>
            <span className="brand-name">OneRx <span className="teal-text">Connect</span></span>
          </div>
          <h1 className="login-title">Sign in to your account</h1>
          <p className="login-subtitle">Secure access for healthcare professionals</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input type="email" id="email" placeholder="dr.chen@clinic.ca" required />
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <a href="/forgot-password" title="Go to forgot password page" className="forgot-link">Forgot password?</a>
            </div>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input type="password" id="password" placeholder="••••••••" required />
            </div>
          </div>

          <div className="mfa-toggle">
            <div className="mfa-info">
              <ShieldCheck size={18} className="mfa-icon" />
              <div className="mfa-text">
                <span className="mfa-label">Multi-Factor Authentication</span>
                <span className="mfa-desc">Always enabled for medical security</span>
              </div>
            </div>
            <div className={`toggle-switch ${mfaEnabled ? 'active' : ''}`} onClick={() => setMfaEnabled(!mfaEnabled)}>
              <div className="toggle-dot"></div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <footer className="login-footer">
          <span className="canada-flag">🇨🇦</span>
          <p>Protected by Canadian healthcare privacy laws (PIPEDA/PHIPA)</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
