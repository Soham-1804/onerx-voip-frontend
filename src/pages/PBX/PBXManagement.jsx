import React, { useState } from 'react';
import { 
  Network, 
  Users, 
  Clock, 
  Music, 
  Hash, 
  PhoneCall, 
  Plus, 
  Settings2, 
  ArrowRight,
  Play,
  Share2,
  Trash2,
  Edit2
} from 'lucide-react';
import './PBXManagement.css';

const PBXManagement = () => {
  const [activeSection, setActiveSection] = useState('ivr');

  return (
    <div className="page pbx-page">
      <div className="page-header">
        <h1 className="page-title">PBX & Call Management</h1>
        <p className="page-subtitle">Configure intelligent call routing, IVR, and ring groups.</p>
      </div>

      <div className="pbx-nav card">
        <button className={`pbx-nav-item ${activeSection === 'ivr' ? 'active' : ''}`} onClick={() => setActiveSection('ivr')}>
          <Network size={18} /> IVR Flow Builder
        </button>
        <button className={`pbx-nav-item ${activeSection === 'groups' ? 'active' : ''}`} onClick={() => setActiveSection('groups')}>
          <Users size={18} /> Ring Groups
        </button>
        <button className={`pbx-nav-item ${activeSection === 'queues' ? 'active' : ''}`} onClick={() => setActiveSection('queues')}>
          <PhoneCall size={18} /> Call Queues
        </button>
        <button className={`pbx-nav-item ${activeSection === 'time' ? 'active' : ''}`} onClick={() => setActiveSection('time')}>
          <Clock size={18} /> Time Routing
        </button>
        <button className={`pbx-nav-item ${activeSection === 'did' ? 'active' : ''}`} onClick={() => setActiveSection('did')}>
          <Hash size={18} /> DID Management
        </button>
      </div>

      <div className="pbx-content">
        {activeSection === 'ivr' && <IVRBuilder />}
        {activeSection === 'groups' && <RingGroups />}
        {activeSection === 'queues' && <CallQueues />}
        {activeSection === 'time' && <TimeRouting />}
        {activeSection === 'did' && <DIDManagement />}
      </div>
    </div>
  );
};

const IVRBuilder = () => (
  <div className="ivr-builder card">
    <div className="builder-header">
      <h3 className="section-title">Main Clinic Greeting (Flow)</h3>
      <div className="builder-actions">
        <button className="btn btn-outline btn-sm"><Settings2 size={14} /> Variables</button>
        <button className="btn btn-primary btn-sm"><Plus size={14} /> Add Node</button>
      </div>
    </div>

    <div className="visual-flow">
      <div className="flow-node start">
        <div className="node-label">Inbound Call</div>
        <div className="node-content">Primary DID: +1 (416) 555-0001</div>
        <div className="flow-connector"></div>
      </div>

      <div className="flow-node greeting">
        <div className="node-type">Greeting / IVR</div>
        <div className="node-content">
          <Play size={14} className="teal-text" /> 
          <span>"Welcome to Downtown Clinic..."</span>
        </div>
        <div className="flow-connector horizontal"></div>
        <div className="options-container">
          <div className="option-branch">
            <div className="option-label">Press 1</div>
            <div className="flow-connector"></div>
            <div className="flow-node action">
              <div className="node-label">Ring Group</div>
              <div className="node-content">Pharmacy Team</div>
            </div>
          </div>
          <div className="option-branch">
            <div className="option-label">Press 2</div>
            <div className="flow-connector"></div>
            <div className="flow-node action">
              <div className="node-label">Call Queue</div>
              <div className="node-content">Billing & Reception</div>
            </div>
          </div>
          <div className="option-branch">
            <div className="option-label">Press 3</div>
            <div className="flow-connector"></div>
            <div className="flow-node action">
              <div className="node-label">Voicemail</div>
              <div className="node-content">General Inbox</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RingGroups = () => {
  const groups = [
    { id: 1, name: 'Pharmacy Team', extensions: '101, 102, 105', strategy: 'Ring All', status: 'Active' },
    { id: 2, name: 'Clinical Staff', extensions: '201, 202, 203, 204', strategy: 'Round Robin', status: 'Active' },
    { id: 3, name: 'Urgent Care', extensions: '007, 008', strategy: 'Linear', status: 'Inactive' },
  ];

  return (
    <div className="card">
      <div className="table-header">
        <h3 className="section-title">Ring Groups</h3>
        <button className="btn btn-primary btn-sm"><Plus size={14} /> New Group</button>
      </div>
      <table className="pbx-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Extensions</th>
            <th>Strategy</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map(group => (
            <tr key={group.id}>
              <td className="font-bold">{group.name}</td>
              <td className="text-muted">{group.extensions}</td>
              <td>{group.strategy}</td>
              <td>
                <span className={`badge ${group.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                  {group.status}
                </span>
              </td>
              <td className="text-right">
                <div className="action-btns">
                  <button className="icon-btn-sm"><Edit2 size={14} /></button>
                  <button className="icon-btn-sm danger"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CallQueues = () => (
  <div className="pbx-settings-grid">
    <div className="card queue-config">
      <h3 className="section-title">General Reception Queue</h3>
      <div className="form-group">
        <label>Max Wait Time (Minutes)</label>
        <input type="number" defaultValue="5" />
      </div>
      <div className="form-group">
        <label>Overflow Action</label>
        <select>
          <option>Forward to Voicemail</option>
          <option>Forward to External Number</option>
          <option>Hang Up</option>
        </select>
      </div>
      <div className="form-group">
        <label>Music on Hold</label>
        <div className="moh-selector">
          <Music size={16} />
          <span>Patient_Calm_v2.mp3</span>
          <button className="btn-text">Upload</button>
        </div>
      </div>
      <button className="btn btn-primary">Save Configuration</button>
    </div>
  </div>
);

const TimeRouting = () => (
  <div className="card time-routing">
    <div className="routing-toggle">
      <div className="header-info">
        <h3 className="section-title">Business Hours Schedule</h3>
        <p className="text-muted">Enabled — Automatically switches routes based on time.</p>
      </div>
      <div className="toggle-switch active"><div className="toggle-dot"></div></div>
    </div>
    <div className="schedule-table">
      {['Monday - Friday', 'Saturday', 'Sunday'].map(day => (
        <div key={day} className="schedule-row">
          <span className="day-label">{day}</span>
          <div className="time-range">
            <input type="time" defaultValue={day.includes('Sun') ? '00:00' : '08:00'} disabled={day.includes('Sun')} />
            <span>to</span>
            <input type="time" defaultValue={day.includes('Sun') ? '00:00' : '18:00'} disabled={day.includes('Sun')} />
          </div>
          <div className={`status-text ${day.includes('Sun') ? 'closed' : 'open'}`}>
            {day.includes('Sun') ? 'Closed' : 'Open'}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DIDManagement = () => {
  const dids = [
    { number: '+1 (416) 555-0001', label: 'Main Clinic', route: 'Main IVR', type: 'Local' },
    { number: '+1 (800) 555-9000', label: 'Toll Free Support', route: 'Support Queue', type: 'Toll-Free' },
    { number: '+1 (604) 555-0922', label: 'Pharmacy Direct', route: 'Ext 105', type: 'Local' },
  ];

  return (
    <div className="card">
      <div className="table-header">
        <h3 className="section-title">Active Phone Numbers (DID)</h3>
        <div className="header-btns">
          <button className="btn btn-outline btn-sm">Port In Number</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Purchase New</button>
        </div>
      </div>
      <table className="pbx-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Label</th>
            <th>Route To</th>
            <th>Type</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dids.map(did => (
            <tr key={did.number}>
              <td className="font-bold">{did.number}</td>
              <td className="text-muted">{did.label}</td>
              <td>{did.route}</td>
              <td><span className="type-badge">{did.type}</span></td>
              <td className="text-right">
                <button className="icon-btn-sm"><Settings2 size={14} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PBXManagement;
