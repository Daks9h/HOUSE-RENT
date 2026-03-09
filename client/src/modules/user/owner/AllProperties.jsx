import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProperties, deleteProperty } from '../../../services/api';
import './AllProperties.css';

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProperties = async () => {
    try {
      const { data } = await getMyProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching my properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this property listing?")) {
      try {
        await deleteProperty(id);
        alert("Property removed successfully!");
        fetchMyProperties(); // Refresh list
      } catch (error) {
        alert("Error removing property");
      }
    }
  };

  const handleEdit = (id) => {
    // For now, we'll just show an alert or redirect to a future edit page
    alert("Edit functionality coming soon! For now, please remove and re-add if details changed.");
  };

  if (loading) return <div className="owner-properties-container">Loading your houses...</div>;

  return (
    <div className="owner-properties-container">
      <div className="owner-header">
        <div className="title-section">
          <h2 className="title">My Listed Houses</h2>
          <p className="subtitle">View and manage all your property advertisements.</p>
        </div>
        <Link to="/owner/add-property" className="add-new-btn">+ List New House</Link>
      </div>

      <div className="properties-list">
        {properties.map((property) => (
          <div key={property._id} className="owner-property-card">
            <div className="prop-image-area">
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
            
            <div className="prop-content-area">
              <span className="prop-type-badge">{property.propertyType}</span>
              <h3>{property.propertyAdType} {property.propertyType}</h3>
              <p className="address"><span>📍</span> {property.propertyAddress}</p>
              <p className="amount">Listing Price: <strong>₹{Number(property.propertyAmt).toLocaleString('en-IN')}</strong></p>
            </div>

            <div className="prop-actions-area">
              <div className={`ad-type-flag ${property.propertyAdType?.toLowerCase()}`}>
                For {property.propertyAdType}
              </div>
              <div className="action-buttons-row">
                <button onClick={() => handleDelete(property._id)} className="btn-owner-action remove">
                  Remove Listing
                </button>
              </div>
            </div>
          </div>
        ))}

        {properties.length === 0 && (
          <div className="empty-houses">
            <span className="icon">🏖️</span>
            <p>You haven't listed any houses yet.</p>
            <Link to="/owner/add-property" className="add-new-btn">List Your First House</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;
