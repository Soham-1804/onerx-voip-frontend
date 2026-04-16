import React, { useState } from 'react';
import { 
  Building2, 
  Palette, 
  Bell, 
  ShieldCheck, 
  Database, 
  Globe, 
  Lock, 
  Eye,
  Camera,
  Check
} from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('org');

  return (
    <div className="page settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Configure your workspace, security, and branding preferences.</p>
      </div>

      <div className="settings-container grid-sidebar">
        <nav className="card settings-nav">
          <button className={`settings-nav-item ${activeTab === 'org' ? 'active' : ''}`} onClick={() => setActiveTab('org')}>
            <Building2 size={18} /> Organization Profile
          </button>
          <button className={`settings-nav-item ${activeTab === 'branding' ? 'active' : ''}`} onClick={() => setActiveTab('branding')}>
            <Palette size={18} /> White-label Branding
          </button>
          <button className={`settings-nav-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} /> Notifications
          </button>
          <button className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <ShieldCheck size={18} /> Security & Privacy
          </button>
          <button className={`settings-nav-item ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>
            <Database size={18} /> Data Residency
          </button>
        </nav>

        <div className="settings-content">
          {activeTab === 'org' && <OrgSettings />}
          {activeTab === 'branding' && <BrandingSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'data' && <DataResidencySettings />}
        </div>
      </div>
    </div>
  );
};

const OrgSettings = () => (
  <div className="card settings-panel">
    <h3 className="panel-title">Organization Profile</h3>
    <form className="settings-form">
      <div className="logo-upload">
        <div className="current-logo">
          <Building2 size={32} />
        </div>
        <button type="button" className="btn btn-outline btn-sm"><Camera size={14} /> Change Logo</button>
      </div>
      <div className="form-group">
        <label>Clinic/Organization Name</label>
        <input type="text" defaultValue="Downtown Wellness Clinic" />
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label>Primary Timezone</label>
          <select defaultValue="EST">
            <option value="EST">(GMT-05:00) Eastern Time (Canada)</option>
            <option value="PST">(GMT-08:00) Pacific Time (Canada)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Primary Phone (DID)</label>
          <input type="text" defaultValue="+1 (416) 555-0001" />
        </div>
      </div>
      <button type="button" className="btn btn-primary">Save Changes</button>
    </form>
  </div>
);

const BrandingSettings = () => {
  const [primaryColor, setPrimaryColor] = useState('#00B4A6');

  return (
    <div className="card settings-panel">
      <h3 className="panel-title">White-label Branding</h3>
      <p className="text-muted">Customize the platform look for your staff and clients.</p>
      
      <div className="branding-preview card">
        <div className="preview-sidebar" style={{ backgroundColor: '#0F1B2D' }}>
          <div className="preview-logo" style={{ backgroundColor: primaryColor }}>RX</div>
        </div>
        <div className="preview-main">
          <div className="preview-header"></div>
          <div className="preview-btn" style={{ backgroundColor: primaryColor }}>Primary Button</div>
        </div>
      </div>

      <form className="settings-form">
        <div className="form-group">
          <label>Primary Brand Color</label>
          <div className="color-picker-input">
            <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
            <input type="text" value={primaryColor} readOnly />
          </div>
        </div>
        <div className="form-group">
          <label>Platform Name (White-label)</label>
          <input type="text" defaultValue="OneRx Connect" />
        </div>
        <button type="button" className="btn btn-primary">Apply Branding</button>
      </form>
    </div>
  );
};

const NotificationSettings = () => (
  <div className="card settings-panel">
    <h3 className="panel-title">Notification Preferences</h3>
    <div className="notification-list">
      <div className="notif-item">
        <div className="notif-info">
          <span className="notif-label">Missed Call Alerts</span>
          <span className="notif-desc">Receive email when you miss an inbound call.</span>
        </div>
        <div className="toggle-switch active"><div className="toggle-dot"></div></div>
      </div>
      <div className="notif-item">
        <div className="notif-info">
          <span className="notif-label">Fax Failure Notifications</span>
          <span className="notif-desc">Immediate alerts for failed outgoing faxes.</span>
        </div>
        <div className="toggle-switch active"><div className="toggle-dot"></div></div>
      </div>
      <div className="notif-item">
        <div className="notif-info">
          <span className="notif-label">Weekly Usage Report</span>
          <span className="notif-desc">Summary of VoIP and Fax volume.</span>
        </div>
        <div className="toggle-switch"><div className="toggle-dot"></div></div>
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div className="card settings-panel">
    <h3 className="panel-title">Security & Privacy</h3>
    <div className="security-list">
      <div className="security-card card">
        <ShieldCheck className="teal-text" />
        <div className="sec-info">
          <span className="sec-label">Multi-Factor Authentication (MFA)</span>
          <span className="sec-desc">Mandatory for all medical staff accounts.</span>
        </div>
        <span className="badge badge-success">Enforced</span>
      </div>
      
      <div className="form-group" style={{ marginTop: '1.5rem' }}>
        <label>Auto Logout / Session Timeout</label>
        <select defaultValue="30">
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">1 Hour</option>
        </select>
      </div>

      <div className="audit-log-section">
        <h4 className="sub-title">Recent Security Events</h4>
        <div className="audit-log mini-table">
          <div className="log-row">
            <span className="log-time">Today, 10:15</span>
            <span className="log-event">Password Changed</span>
            <span className="log-user">J. Wilson</span>
          </div>
          <div className="log-row">
            <span className="log-time">Yesterday, 09:22</span>
            <span className="log-event">MFA Verified</span>
            <span className="log-user">S. Chen</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DataResidencySettings = () => (
  <div className="card settings-panel">
    <h3 className="panel-title"><Globe size={20} /> Data Residency & Compliance</h3>
    <div className="residency-banner">
      <span className="canada-flag-lg">🇨🇦</span>
      <div className="banner-text">
        <h3>Canadian Data Centers Only</h3>
        <p>All voice recordings, fax images, and logs are stored exclusively on Canadian soil (Toronto/Montreal) to maintain PIPEDA & PHIPA compliance.</p>
      </div>
    </div>
    
    <div className="compliance-checklist">
      <div className="check-item"><Check size={16} className="teal-text" /> SOC2 Type II Certified</div>
      <div className="check-item"><Check size={16} className="teal-text" /> PIPEDA Compliant</div>
      <div className="check-item"><Check size={16} className="teal-text" /> PHIPA (Ontario) Compliant</div>
      <div className="check-item"><Check size={16} className="teal-text" /> E911 Address Verified</div>
    </div>

    <div className="form-group" style={{ marginTop: '2rem' }}>
      <label>Emergency (E911) Address</label>
      <div className="address-display card">
        <Building2 size={16} className="text-muted" />
        <span>452 Bay St., Suite 200, Toronto, ON M5H 2G8</span>
        <button className="btn-text">Update</button>
      </div>
    </div>
  </div>
);

export default Settings;
