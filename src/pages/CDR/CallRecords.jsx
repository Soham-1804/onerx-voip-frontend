import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  Play, 
  Pause, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  Volume2
} from 'lucide-react';
import './CallRecords.css';

const CallRecords = () => {
  const [playingId, setPlayingId] = useState(null);

  const records = [
    { id: 1, date: '2023-10-15 14:30', from: '+1 (416) 555-0101', to: 'Ext. 101', dir: 'in', dur: '04:12', status: 'completed', recording: true },
    { id: 2, date: '2023-10-15 13:15', from: 'Ext. 105', to: '+1 (604) 555-0222', dir: 'out', dur: '12:45', status: 'completed', recording: true },
    { id: 3, date: '2023-10-15 11:20', from: '+1 (403) 555-0800', to: 'Queue: Reception', dir: 'in', dur: '00:00', status: 'missed', recording: false },
    { id: 4, date: '2023-10-15 10:05', from: '+1 (416) 555-0922', to: 'Ext. 101', dir: 'in', dur: '02:30', status: 'completed', recording: true },
    { id: 5, date: '2023-10-14 16:45', from: 'Ext. 101', to: '+1 (416) 555-0145', dir: 'out', dur: '08:15', status: 'completed', recording: true },
  ];

  return (
    <div className="page cdr-page">
      <div className="page-header">
        <h1 className="page-title">Call Detail Records (CDR)</h1>
        <p className="page-subtitle">Full audit trail and recordings for all communications.</p>
      </div>

      <div className="cdr-filters card">
        <div className="filter-group">
          <label><Calendar size={14} /> Date Range</label>
          <div className="date-picker-mock">
            <span>Oct 01, 2023 - Oct 15, 2023</span>
          </div>
        </div>
        <div className="filter-group search">
          <label><Search size={14} /> Search</label>
          <input type="text" placeholder="Search number, extension, or status..." />
        </div>
        <div className="filter-actions">
          <button className="btn btn-outline"><Filter size={16} /> Filters</button>
          <button className="btn btn-primary"><Download size={16} /> Export CSV</button>
        </div>
      </div>

      <div className="card cdr-table-container">
        <table className="cdr-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>From</th>
              <th>To</th>
              <th>Direction</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Recording</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td className="text-muted">{record.date}</td>
                <td className="font-bold">{record.from}</td>
                <td className="font-bold">{record.to}</td>
                <td>
                  <div className={`dir-badge ${record.dir}`}>
                    {record.dir === 'in' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    <span>{record.dir === 'in' ? 'Inbound' : 'Outbound'}</span>
                  </div>
                </td>
                <td className="text-muted">{record.dur}</td>
                <td>
                  <span className={`badge ${record.status === 'completed' ? 'badge-success' : 'badge-error'}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td>
                  {record.recording ? (
                    <div className="recording-control">
                      <button 
                        className={`play-btn ${playingId === record.id ? 'playing' : ''}`}
                        onClick={() => setPlayingId(playingId === record.id ? null : record.id)}
                      >
                        {playingId === record.id ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      {playingId === record.id && (
                        <div className="mini-player">
                          <div className="player-wave">
                            {[1, 2, 3, 4, 5, 2, 4, 1].map((h, i) => (
                              <div key={i} className="wave-bar" style={{ height: `${h * 4}px` }}></div>
                            ))}
                          </div>
                          <span className="player-time">01:24</span>
                        </div>
                      )}
                    </div>
                  ) : <span className="text-muted">—</span>}
                </td>
                <td className="text-right">
                  <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span className="text-muted">Showing 1-5 of 1,248 calls</span>
          <div className="pagination">
            <button className="btn-text disabled">Previous</button>
            <button className="btn-text active">1</button>
            <button className="btn-text">2</button>
            <button className="btn-text">3</button>
            <button className="btn-text">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallRecords;
