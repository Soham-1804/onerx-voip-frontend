import React, { useState } from 'react';
import { 
  FileUp, 
  Inbox, 
  Send as SendIcon, 
  Layers, 
  Search, 
  Download, 
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Plus
} from 'lucide-react';
import './FaxCenter.css';

const FaxCenter = () => {
  const [activeTab, setActiveTab] = useState('send');

  return (
    <div className="page fax-page">
      <div className="page-header">
        <h1 className="page-title">Fax Center (FoIP)</h1>
        <p className="page-subtitle">HIPAA & PHIPA Compliant Digital Faxing for Canadian Healthcare.</p>
      </div>

      <div className="fax-tabs card">
        <button 
          className={`fax-tab ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          <FileUp size={18} /> Send Fax
        </button>
        <button 
          className={`fax-tab ${activeTab === 'inbox' ? 'active' : ''}`}
          onClick={() => setActiveTab('inbox')}
        >
          <Inbox size={18} /> Inbox <span className="tab-badge">3</span>
        </button>
        <button 
          className={`fax-tab ${activeTab === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          <SendIcon size={18} /> Sent
        </button>
        <button 
          className={`fax-tab ${activeTab === 'broadcast' ? 'active' : ''}`}
          onClick={() => setActiveTab('broadcast')}
        >
          <Layers size={18} /> Broadcast
        </button>
      </div>

      <div className="fax-content">
        {activeTab === 'send' && <SendFaxTab />}
        {activeTab === 'inbox' && <InboxTab />}
        {activeTab === 'sent' && <SentTab />}
        {activeTab === 'broadcast' && <BroadcastTab />}
      </div>
    </div>
  );
};

const SendFaxTab = () => (
  <div className="fax-tab-panel send-panel">
    <div className="panel-grid">
      <div className="panel-left card">
        <h3 className="section-title">New Fax</h3>
        <form className="fax-form">
          <div className="form-group">
            <label>Recipient Fax Number</label>
            <input type="text" placeholder="+1 (___) ___-____" />
          </div>
          
          <div className="upload-area">
            <FileUp size={32} className="teal-text" />
            <div className="upload-text">
              <span className="main-text">Click to upload or drag & drop</span>
              <span className="sub-text">PDF, TIFF, or JPG (Max 20MB)</span>
            </div>
            <input type="file" className="file-input" />
          </div>

          <div className="cover-page-toggle card">
            <div className="toggle-main">
              <div className="toggle-info">
                <span className="toggle-label">Include Cover Page</span>
                <span className="toggle-desc">Use organization letterhead</span>
              </div>
              <div className="toggle-switch active"><div className="toggle-dot"></div></div>
            </div>
            <select className="template-select">
              <option>Clinical Referral Template</option>
              <option>Patient Records Request</option>
              <option>Generic Medical Cover</option>
            </select>
          </div>

          <button type="button" className="btn btn-primary send-btn">
            Send Fax Now
          </button>
        </form>
      </div>
      
      <div className="panel-right card">
        <h3 className="section-title">Fax Preview</h3>
        <div className="fax-preview-placeholder">
          <div className="preview-skeleton">
            <div className="sk-line header"></div>
            <div className="sk-line body"></div>
            <div className="sk-line body"></div>
            <div className="sk-line body short"></div>
          </div>
          <span className="preview-text">Upload a document to see preview</span>
        </div>
      </div>
    </div>
  </div>
);

const InboxTab = () => {
  const faxes = [
    { id: 1, from: '+1 (416) 555-0101', time: '10:45 AM', pages: 3, status: 'New', caller: 'St. Joseph\'s Hospital' },
    { id: 2, from: '+1 (604) 555-0922', time: 'Yesterday', pages: 12, status: 'Read', caller: 'PharmaPlus #402' },
    { id: 3, from: '+1 (403) 555-0155', time: 'Oct 12, 2023', pages: 1, status: 'Read', caller: 'Unknown Sender' },
  ];

  return (
    <div className="card">
      <div className="table-header">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search inbox..." />
        </div>
        <div className="table-actions">
          <button className="btn btn-outline btn-sm">Filter</button>
          <button className="btn btn-outline btn-sm">Export</button>
        </div>
      </div>
      <table className="fax-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Received</th>
            <th>Pages</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {faxes.map(fax => (
            <tr key={fax.id}>
              <td>
                <div className="fax-sender">
                  <span className="sender-name">{fax.caller}</span>
                  <span className="sender-num">{fax.from}</span>
                </div>
              </td>
              <td className="text-muted">{fax.time}</td>
              <td className="text-muted">{fax.pages} pg</td>
              <td>
                <span className={`badge ${fax.status === 'New' ? 'badge-success' : 'badge-info'}`}>
                  {fax.status}
                </span>
              </td>
              <td className="text-right">
                <div className="action-btns">
                  <button className="icon-btn-sm" title="Download PDF"><Download size={16} /></button>
                  <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SentTab = () => {
  const history = [
    { id: 1, to: '+1 (416) 555-0800', time: '11:20 AM', pages: 5, status: 'delivered' },
    { id: 2, to: '+1 (604) 555-0111', time: '09:15 AM', pages: 2, status: 'failed' },
    { id: 3, to: '+1 (403) 555-0555', time: 'Yesterday', pages: 8, status: 'pending' },
  ];

  return (
    <div className="card">
      <table className="fax-table">
        <thead>
          <tr>
            <th>To</th>
            <th>Sent Time</th>
            <th>Pages</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map(fax => (
            <tr key={fax.id}>
              <td className="font-medium">{fax.to}</td>
              <td className="text-muted">{fax.time}</td>
              <td className="text-muted">{fax.pages} pg</td>
              <td>
                <div className={`status-display ${fax.status}`}>
                  {fax.status === 'delivered' && <CheckCircle size={14} />}
                  {fax.status === 'failed' && <XCircle size={14} />}
                  {fax.status === 'pending' && <Clock size={14} />}
                  <span>{fax.status.charAt(0).toUpperCase() + fax.status.slice(1)}</span>
                </div>
              </td>
              <td className="text-right">
                <button className="btn-text">View Log</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BroadcastTab = () => (
  <div className="card broadcast-panel">
    <div className="broadcast-header">
      <div className="header-info">
        <h3 className="section-title">Fax Broadcast</h3>
        <p className="text-muted">Send one document to multiple recipients at once.</p>
      </div>
      <button className="btn btn-primary"><Plus size={16} /> New Broadcast</button>
    </div>

    <div className="broadcast-config-grid">
      <div className="config-card">
        <div className="config-icon"><Inbox size={20} /></div>
        <div className="config-details">
          <span className="config-label">Recipient List</span>
          <span className="config-value">pharmacy_partners.csv (45 recipients)</span>
        </div>
        <button className="btn-text">Change</button>
      </div>

      <div className="config-card">
        <div className="config-icon"><FileUp size={20} /></div>
        <div className="config-details">
          <span className="config-label">Document</span>
          <span className="config-value">Holiday_Notice_v2.pdf</span>
        </div>
        <button className="btn-text">Change</button>
      </div>

      <div className="config-card">
        <div className="config-icon"><Calendar size={20} /></div>
        <div className="config-details">
          <span className="config-label">Scheduled For</span>
          <span className="config-value">Oct 20, 2023 at 08:00 AM</span>
        </div>
        <button className="btn-text">Edit</button>
      </div>
    </div>

    <div className="delivery-progress card">
      <div className="progress-header">
        <span className="progress-title">Live Delivery Status</span>
        <span className="progress-stat">65% Complete</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: '65%' }}></div>
      </div>
      <div className="progress-stats-row">
        <div className="p-stat"><strong>29</strong> Delivered</div>
        <div className="p-stat"><strong>2</strong> Failed</div>
        <div className="p-stat"><strong>14</strong> Pending</div>
      </div>
    </div>
  </div>
);

export default FaxCenter;
