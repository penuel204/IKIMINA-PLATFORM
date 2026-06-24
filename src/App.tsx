import React, { useState } from 'react';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/member/Dashboard';
import TreasurerConsole from './components/admin/TreasurerConsole';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'member' | 'admin'>('member');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email: string, role: 'member' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('member');
    setUserEmail('');
  };

  if (!isAuthenticated) {
    return <SignIn onLogin={handleLogin} />;
  }

  if (userRole === 'admin') {
    return <TreasurerConsole onLogout={handleLogout} />;
  }

  return <Dashboard onLogout={handleLogout} userEmail={userEmail} />;
}

export default App;