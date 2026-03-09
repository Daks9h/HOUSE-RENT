import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../../../services/api';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="renter-history-container">Loading booking records...</div>;

  return (
    <div className="renter-history-container">
      {/* Sub-nav tabs style matching reference */}
      <div className="renter-tabs">
        <button className="tab-btn" onClick={() => window.location.href='/renter/properties'}>All Properties</button>
        <button className="tab-btn active">Booking History</button>
      </div>

      <div className="history-table-card">
        <div className="card-header">
          <h3>All My Bookings</h3>
        </div>

        <div className="table-responsive">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property Address</th>
                <th>Seller Name</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="id-cell">{booking._id.substring(0, 12)}...</td>
                  <td className="addr-cell">{booking.propertyId?.propertyAddress || 'N/A'}</td>
                  <td>{booking.ownerID?.name || 'Owner Name'}</td>
                  <td>{booking.phone}</td>
                  <td>
                    <span className={`status-pill ${booking.bookingStatus?.toLowerCase()}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-row">No booking requests made yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
