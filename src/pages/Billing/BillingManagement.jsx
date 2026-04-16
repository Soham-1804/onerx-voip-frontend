import React, { useState } from 'react';
import { 
  CreditCard, 
  BarChart3, 
  FileText, 
  ShieldCheck, 
  Check, 
  Download, 
  Plus, 
  AlertCircle 
} from 'lucide-react';
import './BillingManagement.css';

const BillingManagement = () => {
  const [activeTab, setActiveTab] = useState('plan');

  return (
    <div className="page billing-page">
      <div className="page-header">
        <h1 className="page-title">Billing & Subscription</h1>
        <p className="page-subtitle">Manage your medical communications plan, usage, and invoices.</p>
      </div>

      <div className="billing-nav card">
        <button className={`billing-nav-item ${activeTab === 'plan' ? 'active' : ''}`} onClick={() => setActiveTab('plan')}>
          <ShieldCheck size={18} /> Current Plan
        </button>
        <button className={`billing-nav-item ${activeTab === 'usage' ? 'active' : ''}`} onClick={() => setActiveTab('usage')}>
          <BarChart3 size={18} /> Usage Stats
        </button>
        <button className={`billing-nav-item ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}>
          <FileText size={18} /> Invoices
        </button>
        <button className={`billing-nav-item ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>
          <CreditCard size={18} /> Payment Methods
        </button>
      </div>

      <div className="billing-content">
        {activeTab === 'plan' && <CurrentPlanTab />}
        {activeTab === 'usage' && <UsageTab />}
        {activeTab === 'invoices' && <InvoicesTab />}
        {activeTab === 'payment' && <PaymentTab />}
      </div>
    </div>
  );
};

const CurrentPlanTab = () => {
  const tiers = [
    { name: 'Starter', price: '99', lines: '5-10', features: ['Core VoIP', 'Basic Faxing', 'Business Hours Routing'] },
    { name: 'Growth', price: '199', lines: '11-25', features: ['Advanced IVR', 'Broadcast Faxing', 'CRM Analytics'] },
    { name: 'Professional', price: '349', lines: '26-50', features: ['Unlimited SMS', 'Advanced Call Queues', 'Custom Branding'], current: true },
    { name: 'Enterprise', price: '599', lines: '51-100', features: ['Dedicated Support', 'White-glove Onboarding', 'SLA Guarantee'] },
  ];

  return (
    <div className="plan-panel">
      <div className="current-summary card">
        <div className="summary-info">
          <span className="summary-label">Current Plan</span>
          <h2 className="summary-value">Professional (50 Lines)</h2>
          <p className="summary-sub">Next renewal: Nov 12, 2023 — $349.00 CAD/month</p>
        </div>
        <div className="summary-actions">
          <button className="btn btn-outline">Cancel Subscription</button>
          <button className="btn btn-primary">Switch to Annual (Save 20%)</button>
        </div>
      </div>

      <div className="pricing-grid">
        {tiers.map(tier => (
          <div key={tier.name} className={`tier-card card ${tier.current ? 'active' : ''}`}>
            {tier.current && <span className="current-badge">Your Active Plan</span>}
            <div className="tier-header">
              <span className="tier-name">{tier.name}</span>
              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">{tier.price}</span>
                <span className="period">/mo</span>
              </div>
              <span className="tier-lines">{tier.lines} Concurrent Lines</span>
            </div>
            <ul className="tier-features">
              {tier.features.map(f => (
                <li key={f}><Check size={14} className="teal-text" /> {f}</li>
              ))}
            </ul>
            <button className={`btn ${tier.current ? 'btn-outline disabled' : 'btn-primary'}`}>
              {tier.current ? 'Current Plan' : 'Upgrade Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const UsageTab = () => (
  <div className="usage-panel grid-2">
    <div className="card">
      <h3 className="section-title">Concurrent Lines Usage</h3>
      <div className="usage-stat-container">
        <div className="stat-row">
          <div className="stat-col">
            <span className="label">Available Lines</span>
            <span className="value">50</span>
          </div>
          <div className="stat-col">
            <span className="label">Peak Usage Today</span>
            <span className="value">18</span>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-info">
            <span>Peak Utilization</span>
            <span>36%</span>
          </div>
          <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '36%' }}></div></div>
        </div>
      </div>
    </div>

    <div className="card">
      <h3 className="section-title">Fax Page Quota</h3>
      <div className="usage-stat-container">
        <div className="stat-row">
          <div className="stat-col">
            <span className="label">Total Quota</span>
            <span className="value">5,000 pgs</span>
          </div>
          <div className="stat-col">
            <span className="label">Remaining</span>
            <span className="value">1,248 pgs</span>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-info">
            <span>Pages Sent/Received</span>
            <span>75% used</span>
          </div>
          <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '75%', backgroundColor: 'var(--accent-orange)' }}></div></div>
        </div>
        <div className="overage-alert">
          <AlertCircle size={14} />
          <span>Approaching quota. Next 1,000 pages: $12.00 CAD</span>
        </div>
      </div>
    </div>
  </div>
);

const InvoicesTab = () => {
  const invoices = [
    { id: 'INV-2023-10', date: 'Oct 12, 2023', amount: '$349.00', status: 'Paid' },
    { id: 'INV-2023-09', date: 'Sep 12, 2023', amount: '$349.00', status: 'Paid' },
    { id: 'INV-2023-08', date: 'Aug 12, 2023', amount: '$382.40', status: 'Paid', note: 'Overages' },
  ];

  return (
    <div className="card invoice-container">
      <table className="billing-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Billing Date</th>
            <th>Amount (CAD)</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td className="font-bold">{inv.id}</td>
              <td className="text-muted">{inv.date}</td>
              <td className="font-bold">{inv.amount} {inv.note && <span className="overage-note">+{inv.note}</span>}</td>
              <td><span className="badge badge-success">{inv.status}</span></td>
              <td className="text-right"><button className="btn-text"><Download size={16} /> PDF</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PaymentTab = () => (
  <div className="payment-panel grid-2">
    <div className="card">
      <h3 className="section-title">Payment Methods</h3>
      <div className="saved-methods">
        <div className="method-item card">
          <div className="card-brand visa">VISA</div>
          <div className="card-details">
            <span className="digits">•••• •••• •••• 4242</span>
            <span className="expiry">Expires 12/26</span>
          </div>
          <span className="default-badge">DEFAULT</span>
          <button className="btn-text danger">Remove</button>
        </div>
        
        <button className="add-method-btn">
          <Plus size={18} /> Add New Credit Card
        </button>
        
        <div className="pad-option">
          <ShieldCheck size={18} className="teal-text" />
          <div className="pad-info">
            <span className="pad-label">Pre-Authorized Debit (PAD)</span>
            <span className="pad-desc">Recommended for clinics & pharmacies</span>
          </div>
          <button className="btn-text">Enable</button>
        </div>
      </div>
    </div>

    <div className="card stripe-mock">
      <h3 className="section-title">Billing Address</h3>
      <form className="billing-form">
        <div className="form-group"><label>Organization Name</label><input type="text" defaultValue="Downtown Wellness Clinic" /></div>
        <div className="form-group"><label>Street Address</label><input type="text" defaultValue="452 Bay St." /></div>
        <div className="grid-2">
          <div className="form-group"><label>City</label><input type="text" defaultValue="Toronto" /></div>
          <div className="form-group"><label>Province</label><select><option>Ontario (ON)</option></select></div>
        </div>
        <button className="btn btn-primary" type="button">Update Address</button>
      </form>
    </div>
  </div>
);

export default BillingManagement;
