import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  Shield, 
  Phone, 
  Key, 
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import './UserManagement.css';

const UserManagement = () => {
  const [showAddPanel, setShowAddPanel] = useState(false);

  const users = [
    { id: 1, name: 'Dr. Sarah Chen', ext: '101', role: 'Admin', status: 'Active', email: 's.chen@onerx.ca', lastActive: 'Online' },
    { id: 2, name: 'James Wilson', ext: '102', role: 'Agent', status: 'Active', email: 'j.wilson@onerx.ca', lastActive: '2 mins ago' },
    { id: 3, name: 'Emily Rodriguez', ext: '103', role: 'Agent', status: 'Offline', email: 'e.rod@onerx.ca', lastActive: '1 day ago' },
    { id: 4, name: 'Mark Thompson', ext: '104', role: 'Viewer', status: 'Active', email: 'm.thompson@onerx.ca', lastActive: 'Online' },
    { id: 5, name: 'Clinical Reception', ext: '0', role: 'Agent', status: 'Active', email: 'frontdesk@onerx.ca', lastActive: 'Online' },
  ];

  return (
    <div className="page users-page">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">Manage healthcare staff, extensions, and access permissions.</p>
      </div>

      <div className="users-actions card">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search by name, extension, or email..." />
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddPanel(true)}>
          <UserPlus size={18} /> Add User
        </button>
      </div>

      <div className="card users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name & Contact</th>
              <th>Extension</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Active</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info-cell">
                    <div className="user-avatar-sm">{user.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="user-contact">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="font-bold">Ext. {user.ext}</td>
                <td>
                  <div className={`role-badge ${user.role.toLowerCase()}`}>
                    <Shield size={12} />
                    <span>{user.role}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-pill-sm ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td className="text-muted">{user.lastActive}</td>
                <td className="text-right">
                  <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Slide-over Panel */}
      {showAddPanel && (
        <div className="overlay" onClick={() => setShowAddPanel(false)}>
          <div className="slide-over" onClick={e => e.stopPropagation()}>
            <div className="panel-header">
              <h2 className="panel-title">Add New User</h2>
              <button className="close-btn" onClick={() => setShowAddPanel(false)}><X size={20} /></button>
            </div>
            
            <form className="panel-form" onSubmit={(e) => { e.preventDefault(); setShowAddPanel(false); }}>
              <div className="form-section">
                <h3 className="section-label">General Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="e.g. Dr. John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john.doe@clinic.ca" required />
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-label">Telephony Settings</h3>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Extension Number</label>
                    <input type="text" placeholder="e.g. 106" />
                  </div>
                  <div className="form-group">
                    <label>Assigned DID</label>
                    <select>
                      <option>None (Extension only)</option>
                      <option>+1 (416) 555-0001</option>
                      <option>+1 (604) 555-0922</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>SIP Password</label>
                  <div className="input-with-action">
                    <input type="text" value="●●●●●●●●●●●●" readOnly />
                    <button type="button" className="btn-text"><Key size={14} /> Regenerate</button>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-label">Role & Permissions</h3>
                <div className="role-selector">
                  <div className="role-option active">
                    <div className="role-header">
                      <Shield size={16} />
                      <span className="role-name">Administrator</span>
                      <Check size={14} className="active-check" />
                    </div>
                    <p className="role-desc">Full access to billing, PBX, and user management.</p>
                  </div>
                  <div className="role-option">
                    <div className="role-header">
                      <Phone size={16} />
                      <span className="role-name">Agent</span>
                    </div>
                    <p className="role-desc">Access to softphone, fax, and own call records.</p>
                  </div>
                </div>
              </div>

              <div className="panel-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddPanel(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create User Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
