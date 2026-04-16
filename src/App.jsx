import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css';

// Import All Real Pages
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Softphone from './pages/Softphone/Softphone';
import FaxCenter from './pages/Fax/FaxCenter';
import PBXManagement from './pages/PBX/PBXManagement';
import CallRecords from './pages/CDR/CallRecords';
import BillingManagement from './pages/Billing/BillingManagement';
import UserManagement from './pages/Users/UserManagement';
import Integrations from './pages/Integrations/Integrations';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/softphone" element={<Softphone />} />
          <Route path="/fax" element={<FaxCenter />} />
          <Route path="/pbx" element={<PBXManagement />} />
          <Route path="/cdr" element={<CallRecords />} />
          <Route path="/billing" element={<BillingManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
