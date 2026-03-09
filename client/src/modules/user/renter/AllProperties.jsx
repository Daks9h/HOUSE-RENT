import React, { useState, useEffect } from 'react';
import { getAllProperties, bookProperty } from '../../../services/api';
import './AllProperties.css';

const RenterProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [adTypeFilter, setAdTypeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Booking Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ phone: '' });
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await getAllProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    let results = properties;

    if (searchTerm) {
      results = results.filter(p => 
        p.propertyAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (adTypeFilter !== 'All') {
      results = results.filter(p => p.propertyAdType === adTypeFilter);
    }

    if (typeFilter !== 'All') {
      results = results.filter(p => p.propertyType === typeFilter);
    }

    setFilteredProperties(results);
  };

  // Trigger search on filter change
  useEffect(() => {
    handleSearch();
  }, [adTypeFilter, typeFilter]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleOpenBooking = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDetails.phone) return alert("Contact number is required");
    
    setBookingLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await bookProperty({
        propertyId: selectedProperty._id,
        phone: bookingDetails.phone,
        userName: userInfo.name
      });
      alert("Application sent! The owner will review your request.");
      setShowModal(false);
      setBookingDetails({ phone: '' });
    } catch (error) {
      alert("Failed to send booking request.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="renter-view-container">Searching available homes...</div>;

  return (
    <div className="renter-view-container">
      {/* Sub-nav tabs style as seen in reference */}
      <div className="renter-tabs">
        <button className="tab-btn active">All Properties</button>
        <button className="tab-btn" onClick={() => window.location.href='/renter/bookings'}>Booking History</button>
      </div>

      <div className="discovery-area">
        <div className="filter-row">
          <div className="search-wrap">
            <input 
              type="text" 
              placeholder="Search by Address..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="addr-input"
            />
            <button className="filter-go-btn" onClick={handleSearch}>🔍 Search</button>
          </div>

          <div className="dropdown-wraps">
            <select value={adTypeFilter} onChange={(e) => setAdTypeFilter(e.target.value)}>
              <option value="All">All Ad Types</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>

            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
            </select>
          </div>
        </div>

        <div className="prop-results-grid">
          {filteredProperties.map((property) => (
            <div key={property._id} className="modern-prop-card">
              <div className="prop-visual">
                {property.propertyImage ? (
                  <img 
                    src={`http://localhost:5000/uploads/${property.propertyImage}`} 
                    alt="Property" 
                    className="house-preview-img" 
                  />
                ) : (
                  '🏠'
                )}
              </div>
              <div className="prop-details">
                <h3 className="addr-title">{property.propertyAddress}</h3>
                <div className="meta-info">
                  <span className="type-tag">{property.propertyType} - {property.propertyAdType}</span>
                </div>
                
                <div className="owner-box">
                  <p><strong>Owner:</strong> {property.ownerName || 'Unknown'}</p>
                  <p><strong>Availability:</strong> <span className="avail-status">Available</span></p>
                  <p className="price-line"><strong>Price:</strong> ₹{Number(property.propertyAmt).toLocaleString('en-IN')}</p>
                </div>

                <button 
                  className="get-info-btn"
                  onClick={() => handleOpenBooking(property)}
                >
                  Get Info / Book
                </button>
              </div>
            </div>
          ))}

          {filteredProperties.length === 0 && (
            <div className="no-props">No properties found matching these filters.</div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="booking-modal-overlay" onClick={(e) => { if(e.target.className === 'booking-modal-overlay') setShowModal(false) }}>
          <div className="booking-modal">
            <div className="modal-header">
              <div className="modal-icon">📩</div>
              <h3>Complete Your Request</h3>
              <p className="modal-subtitle">The owner will receive your contact details and reach out to you shortly.</p>
            </div>
            
            <div className="property-summary-mini">
              <span>📍</span>
              <p>{selectedProperty?.propertyAddress}</p>
            </div>

            <form onSubmit={handleBookingSubmit}>
              <div className="modal-form-group">
                <label>Verify Your Contact Number <span className="required-star">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. +91 98765 43210" 
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({ phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  Close
                </button>
                <button type="submit" className="btn-confirm" disabled={bookingLoading}>
                  {bookingLoading ? 'Sending...' : 'Confirm Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenterProperties;
