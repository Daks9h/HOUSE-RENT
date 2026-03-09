import React from 'react';
import './AllPropertiesCards.css';

/**
 * AllPropertiesCards - Ek reusable component jo property ki details card format mein dikhata hai.
 * @param {Object} property - Property ka data (title, location, price, etc.)
 * @param {Function} onActionClick - Jab action button click ho (optional)
 * @param {String} actionLabel - Button par kya likhna hai (e.g., "View", "Book")
 */
const AllPropertiesCards = ({ property, onActionClick, actionLabel }) => {
  return (
    <div className="universal-property-card">
      {/* Featured image or emoji placeholder */}
      <div className="card-media">
        <span className="media-placeholder">{property.image || '🏠'}</span>
        {property.isFeatured && <span className="featured-tag">Featured</span>}
      </div>

      <div className="card-details">
        {/* Category and Rating if available */}
        <div className="meta-info">
          <span className="property-type-label">{property.type}</span>
          {property.rating && <span className="rating-star">★ {property.rating}</span>}
        </div>

        <h3 className="property-name-title">{property.title}</h3>
        <p className="property-location-info">📍 {property.location}</p>

        <div className="card-footer-action">
          <div className="price-container">
            <span className="amount">{property.price}</span>
            <span className="per-mon">/month</span>
          </div>
          
          {actionLabel && (
            <button 
              className="action-trigger-btn" 
              onClick={() => onActionClick && onActionClick(property.id)}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesCards;
