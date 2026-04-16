import React from 'react';
import { Search, Bell, User, Flag, ChevronDown } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  return (
    <header className="top-bar">
      <div className="search-container">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search for calls, faxes, or users..." className="search-input" />
        </div>
      </div>

      <div className="top-bar-actions">
        <div className="compliance-banner">
          <span className="canada-flag">🇨🇦</span>
          <span className="compliance-text">Canadian Data Residency — PIPEDA & PHIPA Compliant</span>
        </div>

        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>

        <div className="user-profile">
          <div className="avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Dr. Sarah Chen</span>
            <span className="user-role">Administrator</span>
          </div>
          <ChevronDown size={14} className="chevron" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
