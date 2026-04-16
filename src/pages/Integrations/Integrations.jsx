import React from 'react';
import { 
  Plug, 
  ExternalLink, 
  CheckCircle, 
  Settings, 
  RefreshCw, 
  Key, 
  Webhook, 
  MoreVertical,
  Plus
} from 'lucide-react';
import './Integrations.css';

const Integrations = () => {
  const integrations = [
    { name: 'Salesforce', status: 'Connected', logo: 'SF', desc: 'Sync call logs and patient records directly to Salesforce health cloud.' },
    { name: 'HubSpot', status: 'Connected', logo: 'HS', desc: 'Automatically log calls and faxes as activities in HubSpot CRM.' },
    { name: 'Microsoft 365', status: 'Not Connected', logo: 'M365', desc: 'Enable email-to-fax and sync calendar for presence status.' },
    { name: 'Zoho CRM', status: 'Not Connected', logo: 'Z', desc: 'Integrate clinic communications with Zoho CRMs workflows.' },
    { name: 'Google Workspace', status: 'Connected', logo: 'G', desc: 'Search and attach documents from Google Drive to outgoing faxes.' },
  ];

  return (
    <div className="page integrations-page">
      <div className="page-header">
        <h1 className="page-title">Integrations</h1>
        <p className="page-subtitle">Connect OneRx Connect with your clinical ecosystem.</p>
      </div>

      <div className="integrations-grid">
        {integrations.map(app => (
          <div key={app.name} className="integration-card card">
            <div className="card-top">
              <div className={`app-logo ${app.name.toLowerCase().replace(' ', '')}`}>
                {app.logo}
              </div>
              <div className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                {app.status}
              </div>
            </div>
            <div className="app-info">
              <h3 className="app-name">{app.name}</h3>
              <p className="app-desc">{app.desc}</p>
            </div>
            <div className="card-actions">
              {app.status === 'Connected' ? (
                <>
                  <button className="btn btn-outline btn-sm"><Settings size={14} /> Configure</button>
                  <button className="btn btn-primary btn-sm btn-icon"><RefreshCw size={14} /></button>
                </>
              ) : (
                <button className="btn btn-primary btn-sm btn-full">Connect {app.name}</button>
              )}
            </div>
          </div>
        ))}
        
        <div className="integration-card card add-custom">
          <div className="custom-icon">
            <Plug size={32} />
          </div>
          <h3 className="app-name">Custom API</h3>
          <p className="app-desc">Build your own integration using our robust REST API and Webhooks.</p>
          <button className="btn btn-outline btn-full">View API Docs <ExternalLink size={14} /></button>
        </div>
      </div>

      <div className="api-section-grid">
        <div className="card api-keys-panel">
          <div className="card-header">
            <h3 className="card-title"><Key size={20} /> API Keys</h3>
            <button className="btn btn-outline btn-sm"><Plus size={14} /> Generate New</button>
          </div>
          <div className="api-keys-list">
            <div className="api-key-item">
              <div className="key-info">
                <span className="key-label">Production Key (Healthcare-API-v1)</span>
                <span className="key-value">pk_live_••••••••••••••••••••42cd</span>
              </div>
              <div className="key-actions">
                <button className="btn-text">Revoke</button>
                <button className="btn-text primary">Copy</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card webhooks-panel">
          <div className="card-header">
            <h3 className="card-title"><Webhook size={20} /> Recent Webhook Events</h3>
            <span className="badge badge-success">Active</span>
          </div>
          <div className="events-list">
            <div className="event-item">
              <span className="event-time">2 mins ago</span>
              <span className="event-type">call.completed</span>
              <span className="event-status success">200 OK</span>
            </div>
            <div className="event-item">
              <span className="event-time">1 hour ago</span>
              <span className="event-type">fax.received</span>
              <span className="event-status success">200 OK</span>
            </div>
            <div className="event-item">
              <span className="event-time">4 hours ago</span>
              <span className="event-type">user.login</span>
              <span className="event-status fail">500 ERR</span>
            </div>
          </div>
          <button className="btn-text view-all">View Event Log</button>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
