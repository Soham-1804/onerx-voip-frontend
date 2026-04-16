import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap, 
  FileText, 
  Clock, 
  MoreHorizontal,
  Phone,
  FileUp
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import './Dashboard.css';

const callData = [
  { name: 'Mon', calls: 120 },
  { name: 'Tue', calls: 150 },
  { name: 'Wed', calls: 180 },
  { name: 'Thu', calls: 140 },
  { name: 'Fri', calls: 200 },
  { name: 'Sat', calls: 80 },
  { name: 'Sun', calls: 45 },
];

const usageData = [
  { name: 'VoIP', value: 65, color: '#00B4A6' },
  { name: 'FoIP', value: 35, color: '#0F1B2D' },
];

const recentActivity = [
  { id: 1, type: 'call', direction: 'in', contact: '+1 (416) 555-0198', time: '2 mins ago', status: 'missed' },
  { id: 2, type: 'fax', direction: 'out', contact: '+1 (604) 555-0122', time: '15 mins ago', status: 'delivered' },
  { id: 3, type: 'call', direction: 'out', contact: 'St. Mary\'s Pharmacy', time: '1 hour ago', status: 'completed' },
  { id: 4, type: 'fax', direction: 'in', contact: '+1 (416) 555-0145', time: '2 hours ago', status: 'new' },
  { id: 5, type: 'call', direction: 'in', contact: 'Dr. James Wilson', time: '3 hours ago', status: 'completed' },
];

const Dashboard = () => {
  return (
    <div className="page dashboard">
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Morning, Dr. Chen</h1>
          <p className="page-subtitle">Here's what's happening across OneRx Connect today.</p>
        </div>
        <div className="header-actions">
          <span className="plan-badge card">
            <Zap size={14} className="teal-text" /> 
            <span>Professional — 50 Lines</span>
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon calls">
            <Phone size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Calls</span>
            <div className="stat-value-container">
              <span className="stat-value">12</span>
              <span className="pulse-indicator"></span>
            </div>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon faxes-sent">
            <ArrowUpRight size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Faxes Sent Today</span>
            <span className="stat-value">48</span>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon faxes-received">
            <ArrowDownLeft size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Faxes Received Today</span>
            <span className="stat-value">32</span>
          </div>
        </div>

        <div className="quick-actions card">
          <span className="actions-label">Quick Actions</span>
          <div className="actions-buttons">
            <button className="btn btn-primary">
              <Phone size={16} /> Make Call
            </button>
            <button className="btn btn-outline">
              <FileUp size={16} /> Send Fax
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="chart-container card">
          <div className="card-header">
            <h3 className="card-title">Call Volume (7 Days)</h3>
            <button className="icon-btn"><MoreHorizontal size={18} /></button>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={callData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="calls" 
                  stroke="#00B4A6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#00B4A6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="activity-container card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <div className={`activity-icon-container ${item.type} ${item.status}`}>
                  {item.type === 'call' ? <Phone size={16} /> : <FileText size={16} />}
                </div>
                <div className="activity-details">
                  <div className="activity-main">
                    <span className="activity-contact">{item.contact}</span>
                    <span className="activity-time">{item.time}</span>
                  </div>
                  <div className="activity-meta">
                    <span className={`status-tag ${item.status}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <span className="dot"></span>
                    <span className="direction">
                      {item.direction === 'in' ? 'Inbound' : 'Outbound'}
                    </span>
                  </div>
                </div>
                <button className="item-action-btn">
                  {item.type === 'call' ? <Phone size={14} /> : <FileText size={14} />}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="usage-container card">
          <div className="card-header">
            <h3 className="card-title">Usage Split</h3>
          </div>
          <div className="donut-wrapper">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <span className="donut-total">100%</span>
              <span className="donut-label">Total Volume</span>
            </div>
            <div className="usage-legend">
              {usageData.map((item) => (
                <div key={item.name} className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
