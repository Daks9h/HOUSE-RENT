import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('users');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    // If we're strictly on /admin or /admin/, redirect to users
    if (location.pathname === '/admin' || location.pathname === '/admin/') {
      navigate('/admin/users');
    } else if (location.pathname.includes('/admin/properties')) {
      setActiveTab('properties');
    } else if (location.pathname.includes('/admin/bookings')) {
      setActiveTab('bookings');
    } else {
      setActiveTab('users');
    }
  }, [location.pathname, navigate]);

  const handleTabClick = (tab) => {
    if (tab === 'users') navigate('/admin/users');
    if (tab === 'properties') navigate('/admin/properties');
    if (tab === 'bookings') navigate('/admin/bookings');
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <div className="admin-layout">
      {/* Light Navbar */}
      <nav className="admin-navbar">
        <div className="admin-nav-container">
          <div className="brand-logo-admin">Homify</div>
          <div className="admin-nav-right">
            <span className="hi-admin">Hi, {userInfo?.name || 'Admin'}</span>
            <button onClick={handleLogout} className="admin-logout-btn">Log Out</button>
          </div>
        </div>
      </nav>

      <div className="admin-main-content">
        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => handleTabClick('users')}
          >
            All Users
          </button>
          <button 
            className={`admin-tab ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => handleTabClick('properties')}
          >
            All Properties
          </button>
          <button 
            className={`admin-tab ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => handleTabClick('bookings')}
          >
            All Bookings
          </button>
        </div>

        {/* Content Area */}
        <div className="admin-content-box">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
