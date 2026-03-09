import React, { useState, useEffect } from 'react';
import { adminGetBookings } from '../../services/api';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await adminGetBookings();
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

  if (loading) return <div>Loading Bookings...</div>;

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Owner ID</th>
            <th>Property ID</th>
            <th>Tenant ID</th>
            <th>Tenant Name</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              {/* Note: The backend schema for Booking current holds OwnerId under Property logic, assuming property populated owner or it's just the property itself. We'll show propertyId for now safely. */}
              <td title={(booking.propertyId?.ownerId || 'N/A')}>
                 {booking.propertyId?.ownerId || 'Unknown Owner'}
              </td>
              <td style={{color: '#8b5cf6', fontWeight: '600'}} title={booking.propertyId?.propertyAddress}>
                {booking.propertyId?._id || booking.propertyId}
              </td>
              <td title={booking.userID?.email}>{booking.userID?._id || booking.userID}</td>
              <td>{booking.userID?.name || 'N/A'}</td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan="5" style={{textAlign: 'center', padding: '30px'}}>
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookings;
