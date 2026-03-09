import React, { useState, useEffect } from 'react';
import { adminGetProperties } from '../../services/api';

const AllProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const { data } = await adminGetProperties();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <div>Loading Properties...</div>;

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Owner ID</th>
            <th>Property Type</th>
            <th>Property Ad Type</th>
            <th>Property Address</th>
            <th>Owner Contact</th>
            <th>Property Amt</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>{property._id}</td>
              <td title={property.ownerId?.name}>{property.ownerId?._id || property.ownerId}</td>
              <td><span className="role-badge">{property.propertyType}</span></td>
              <td>{property.propertyAdType}</td>
              <td>
                <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={property.propertyAddress}>
                  {property.propertyAddress}
                </div>
              </td>
              <td>{property.ownerContact}</td>
              <td style={{ color: '#16a34a', fontWeight: '800' }}>
                ₹{Number(property.propertyAmt).toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
          {properties.length === 0 && (
            <tr>
              <td colSpan="7" style={{textAlign: 'center', padding: '30px'}}>
                No properties found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProperty;
