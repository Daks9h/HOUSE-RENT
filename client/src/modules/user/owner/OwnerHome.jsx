import React, { useState, useEffect } from 'react';
import './OwnerHome.css';
import { Link } from 'react-router-dom';
import { getOwnerStats } from '../../../services/api';

const OwnerHome = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    recentEnquiries: 0 // This can be tied to a future messages/enquiries schema
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getOwnerStats();
        setStats({
          ...stats,
          totalProperties: data.totalProperties,
          pendingBookings: data.pendingBookings,
          totalRevenue: data.totalRevenue
        });
      } catch (error) {
        console.error("Error fetching owner stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const ownerStats = [
    { id: 1, title: 'Total Properties', count: stats.totalProperties, icon: '🏠', color: '#4e73df' },
    { id: 2, title: 'Pending Bookings', count: stats.pendingBookings, icon: '⏳', color: '#f6c23e' },
    { id: 3, title: 'Recent Enquiries', count: stats.recentEnquiries, icon: '💬', color: '#1cc88a' },
    { id: 4, title: 'Total Revenue', count: `₹${stats.totalRevenue.toLocaleString()}`, icon: '💰', color: '#36b9cc' },
  ];

  if (loading) return <div className="owner-dashboard">Loading your stats...</div>;

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header">
        <h2 className="title">Owner Dashboard</h2>
        <p className="subtitle">Welcome! Here is a summary of your properties' performance.</p>
      </div>

      {/* Stats Cards Section */}
      <div className="owner-stats-grid">
        {ownerStats.map(stat => (
          <div key={stat.id} className="owner-stat-card" style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.count}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="dashboard-sections">
        <div className="action-card">
          <h3>Quick Actions</h3>
          <div className="action-btns-grid">
            <Link to="/owner/add-property" className="quick-btn plus">Add New Property</Link>
            <Link to="/owner/all-properties" className="quick-btn list">Manage Listings</Link>
            <Link to="/owner/bookings" className="quick-btn book">View Bookings</Link>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Notifications</h3>
          <ul className="activity-list">
            {stats.pendingBookings > 0 ? (
              <li>
                <span className="dot yellow"></span>
                <p>You have <strong>{stats.pendingBookings}</strong> pending booking requests waiting for approval.</p>
              </li>
            ) : (
              <p style={{color: '#888', fontStyle: 'italic'}}>No new notifications.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
