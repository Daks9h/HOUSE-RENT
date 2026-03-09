import React, { useState, useEffect } from 'react';
import { getRenterStats, getMyBookings } from '../../../services/api';
import './RenterHome.css';
import { Link } from 'react-router-dom';

const RenterHome = () => {
  const [stats, setStats] = useState({
    activeBookings: 0,
    savedHouses: 0,
    pendingRequests: 0,
    spentTotal: 0
  });
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const statsRes = await getRenterStats();
        setStats(statsRes.data);

        const bookingsRes = await getMyBookings();
        // Take last 3 bookings as "recent updates"
        const recent = bookingsRes.data.slice(-3).map(b => ({
          indicator: b.bookingStatus === 'Approved' ? 'success' : (b.bookingStatus === 'Rejected' ? 'danger' : 'warning'),
          text: `Your request for "${b.propertyId?.propertyAddress || 'a property'}" is ${b.bookingStatus}.`,
          time: new Date(b.createdAt).toLocaleDateString()
        }));
        setRecentUpdates(recent.reverse());
      } catch (error) {
        console.error("Error fetching renter dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const houseStats = [
    { id: 1, title: 'Active Bookings', count: stats.activeBookings, icon: '🔑', color: '#4e73df' },
    { id: 3, title: 'Pending Requests', count: stats.pendingRequests, icon: '⏳', color: '#36b9cc' },
    { id: 4, title: 'Spent Total', count: `₹${stats.spentTotal.toLocaleString('en-IN')}`, icon: '💸', color: '#1cc88a' },
  ];

  if (loading) return <div className="renter-dashboard">Refreshing your data...</div>;

  return (
    <div className="renter-dashboard">
      <div className="dashboard-header">
        <h2 className="title">Renter Dashboard</h2>
        <p className="subtitle">Welcome! View your real-time booking status and stats below.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="renter-stats-grid">
        {houseStats.map(stat => (
          <div key={stat.id} className="renter-stat-card">
            <div className="stat-icon-box" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.count}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Blocks */}
      <div className="renter-sections">
        <div className="main-actions shadow-card">
          <h3>Quick Links</h3>
          <div className="action-grid">
            <Link to="/renter/properties" className="renter-action-btn search">
              Search New House 🔎
            </Link>
            <Link to="/renter/bookings" className="renter-action-btn bookings">
              My Bookings 📑
            </Link>
          </div>
        </div>

        <div className="recent-notifications shadow-card">
          <h3>Recent Updates</h3>
          {recentUpdates.length > 0 ? (
            recentUpdates.map((update, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-indicator ${update.indicator}`}></div>
                <div className="activity-text">
                  {update.text}
                  <span className="time">{update.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-activity">No recent activity found. Start searching!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenterHome;
