import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Phone,
  Files,
  Network,
  History,
  CreditCard,
  Users,
  Plug,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },

  { path: '/fax', name: 'Fax Center', icon: Files },
  { path: '/pbx', name: 'PBX & Call Flow', icon: Network },
  { path: '/cdr', name: 'Call Records', icon: History },
  { path: '/billing', name: 'Billing', icon: CreditCard },
  { path: '/users', name: 'Users', icon: Users },
  { path: '/integrations', name: 'Integrations', icon: Plug },
  { path: '/settings', name: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-placeholder">RX</div>
          {!collapsed && <span className="brand-name">OneRx <span className="teal-text">Connect</span></span>}
        </div>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            {!collapsed && <span className="nav-label">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="footer-status">
            <div className="status-indicator online"></div>
            <span>System Status: Optimal</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
