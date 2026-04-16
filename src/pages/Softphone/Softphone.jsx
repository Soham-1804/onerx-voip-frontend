import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mic, 
  MicOff, 
  Pause, 
  Play, 
  Users, 
  ArrowRightLeft, 
  Clock, 
  PhoneOff,
  User,
  Hash,
  Delete,
  Volume2
} from 'lucide-react';
import './Softphone.css';

const Softphone = () => {
  const [dialedNumber, setDialedNumber] = useState('');
  const [activeCall, setActiveCall] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [status, setStatus] = useState('Available');

  useEffect(() => {
    let interval;
    if (activeCall && !isOnHold) {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCall, isOnHold]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDial = (num) => {
    if (dialedNumber.length < 15) {
      setDialedNumber(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setDialedNumber(prev => prev.slice(0, -1));
  };

  const startCall = () => {
    if (dialedNumber) {
      setActiveCall(true);
      setCallTime(0);
      setStatus('On Call');
    }
  };

  const endCall = () => {
    setActiveCall(false);
    setCallTime(0);
    setStatus('Available');
    setIsMuted(false);
    setIsOnHold(false);
  };

  const recentCalls = [
    { name: 'Dr. James Wilson', number: '+1 (416) 555-0982', time: '10:30 AM', duration: '05:22' },
    { name: 'General Hospital - Radiology', number: '+1 (604) 555-0122', time: 'Yesterday', duration: '12:45' },
    { name: 'St. Mary\'s Pharmacy', number: '+1 (416) 555-0145', time: 'Yesterday', duration: '03:10' },
  ];

  return (
    <div className="page softphone-page">
      <div className="page-header">
        <h1 className="page-title">VoIP Softphone</h1>
        <p className="page-subtitle">Premium WebRTC Desktop Dialer — Ext. 101 (Dr. Sarah Chen)</p>
      </div>

      <div className="softphone-grid">
        <div className="dialer-container card">
          <div className="dialer-header">
            <div className={`status-pill ${status.toLowerCase().replace(' ', '-')}`}>
              <div className="status-dot"></div>
              <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={activeCall}>
                <option>Available</option>
                <option>Busy</option>
                <option>DND</option>
                <option>Away</option>
              </select>
            </div>
          </div>

          <div className="call-display">
            {activeCall ? (
              <div className="active-call-view">
                <div className="caller-avatar">
                  <User size={40} />
                </div>
                <div className="caller-info">
                  <span className="caller-id">{dialedNumber}</span>
                  <span className="call-status">{isOnHold ? 'On Hold' : 'In Progress'}</span>
                  <span className="call-timer">{formatTime(callTime)}</span>
                </div>
              </div>
            ) : (
              <div className="dial-input-view">
                <input 
                  type="text" 
                  value={dialedNumber} 
                  placeholder="Enter number..." 
                  readOnly 
                  className="dial-input"
                />
                <button className="backspace-btn" onClick={handleBackspace}>
                  <Delete size={20} />
                </button>
              </div>
            )}
          </div>

          <div className="dialpad-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((btn) => (
              <button 
                key={btn} 
                className="dial-btn" 
                onClick={() => handleDial(btn.toString())}
                disabled={activeCall}
              >
                <span className="btn-main">{btn}</span>
                <span className="btn-sub">{getBtnSub(btn)}</span>
              </button>
            ))}
          </div>

          <div className="call-actions">
            {!activeCall ? (
              <button className="btn-call" onClick={startCall} disabled={!dialedNumber}>
                <Phone size={24} />
              </button>
            ) : (
              <div className="active-actions">
                <div className="action-row">
                  <button 
                    className={`control-btn ${isMuted ? 'active' : ''}`} 
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    <span>Mute</span>
                  </button>
                  <button 
                    className={`control-btn ${isOnHold ? 'active' : ''}`} 
                    onClick={() => setIsOnHold(!isOnHold)}
                  >
                    {isOnHold ? <Play size={20} /> : <Pause size={20} />}
                    <span>Hold</span>
                  </button>
                  <button className="control-btn">
                    <ArrowRightLeft size={20} />
                    <span>Transfer</span>
                  </button>
                  <button className="control-btn">
                    <Users size={20} />
                    <span>Merge</span>
                  </button>
                </div>
                <button className="btn-end-call" onClick={endCall}>
                  <PhoneOff size={24} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="recent-calls-container card">
          <div className="card-header">
            <h3 className="card-title">Recent Calls</h3>
            <Clock size={18} className="teal-text" />
          </div>
          <div className="recent-list">
            {recentCalls.map((call, idx) => (
              <div key={idx} className="recent-item">
                <div className="recent-avatar">
                  <User size={16} />
                </div>
                <div className="recent-info">
                  <span className="recent-name">{call.name}</span>
                  <span className="recent-sub">{call.number} • {call.time}</span>
                </div>
                <div className="recent-meta">
                  <span className="recent-duration">{call.duration}</span>
                  <button className="call-back-btn" onClick={() => { setDialedNumber(call.number); startCall(); }}>
                    <Phone size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="view-more-btn">View All History</button>
        </div>

        <div className="softphone-settings card">
          <h3 className="card-title">Audio Settings</h3>
          <div className="audio-devices">
            <div className="audio-item">
              <span className="audio-label">Output Device</span>
              <select className="audio-select">
                <option>Default - Speakers (Realtek)</option>
                <option>USB Headset (Logitech)</option>
              </select>
            </div>
            <div className="audio-item">
              <span className="audio-label">Input Device</span>
              <select className="audio-select">
                <option>Default - Microhone (Realtek)</option>
                <option>USB Headset (Logitech)</option>
              </select>
            </div>
            <div className="volume-control">
              <Volume2 size={16} color="var(--text-muted)" />
              <input type="range" className="volume-slider" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getBtnSub = (btn) => {
  const map = {
    '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL', '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ', '0': '+'
  };
  return map[btn] || '';
};

export default Softphone;
