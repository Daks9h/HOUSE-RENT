import React, { useState, useEffect } from 'react';
import { getOwnerBookings, updateBookingStatus } from '../../../services/api';
import './AllBookings.css';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real data fetch karne ke liye function
  const fetchBookings = async () => {
    try {
      const { data } = await getOwnerBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      alert(`Booking ${status} Successfully!`);
      fetchBookings(); // Page refresh to see updated status
    } catch (error) {
      alert("Error updating status");
    }
  };

  if (loading) return <div className="owner-bookings-container">Loading bookings...</div>;

  return (
    <div className="owner-bookings-container">
      <div className="owner-header">
        <h2 className="title">Booking Requests</h2>
        <p className="subtitle">Real-time requests sent by renters for your properties.</p>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card shadow-card">
            <div className="booking-main">
              <div className="tenant-info">
                <div className="avatar">{booking.userID?.name ? booking.userID.name[0] : 'U'}</div>
                <div>
                  <h4>{booking.userID?.name}</h4>
                  <p>Property: <strong>{booking.propertyId?.propertyAddress}</strong></p>
                </div>
              </div>
              <div className="status-badge" data-status={booking.bookingStatus}>
                {booking.bookingStatus}
              </div>
            </div>

            <div className="booking-details">
              <div className="detail-item">
                <span className="label">Tenant Phone</span>
                <span className="value">{booking.phone}</span>
              </div>
              <div className="detail-item">
                <span className="label">Request Time</span>
                <span className="value">{new Date(booking.createdAt).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Booking ID</span>
                <span className="value">#{booking._id.slice(-6).toUpperCase()}</span>
              </div>
            </div>

            {booking.bookingStatus === 'Pending' && (
              <div className="card-footer">
                <button className="approve-btn" onClick={() => handleStatusUpdate(booking._id, 'Approved')}>Approve</button>
                <button className="reject-btn" onClick={() => handleStatusUpdate(booking._id, 'Rejected')}>Reject</button>
              </div>
            )}
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="empty-state">
            <p>No booking requests yet. Listings that get popular will appear here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;
