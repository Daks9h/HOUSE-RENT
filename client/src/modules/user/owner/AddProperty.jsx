import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../../../services/api';
import './AddProperty.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  const [formData, setFormData] = useState({
    propertyType: '1 BHK',
    propertyAdType: 'Rent',
    propertyAddress: '',
    ownerContact: '',
    propertyAmt: '',
    additionalInfo: '',
    ownerName: userInfo?.name || ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please upload a property photo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Use FormData for multer handling
      const data = new FormData();
      data.append('propertyType', formData.propertyType);
      data.append('propertyAdType', formData.propertyAdType);
      data.append('propertyAddress', formData.propertyAddress);
      data.append('ownerContact', formData.ownerContact);
      data.append('propertyAmt', formData.propertyAmt);
      data.append('additionalInfo', formData.additionalInfo);
      data.append('ownerName', formData.ownerName);
      data.append('propertyImage', imageFile);

      await addProperty(data);
      alert('Property Listed Successfully!');
      navigate('/owner/all-properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <div className="form-card">
        <h2 className="form-title">List New Property</h2>
        {error && <p className="error-msg" style={{color: '#ff5a5f', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold'}}>{error}</p>}
        
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group-row">
            <div className="form-group">
              <label>Property Type</label>
              <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="Villa">Villa</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ad Type</label>
              <select name="propertyAdType" value={formData.propertyAdType} onChange={handleChange}>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
          </div>

          {/* Photo Selection Area */}
          <div className="form-group">
            <label>Property Photo <span className="required-star">*</span></label>
            <div className="file-upload-wrapper">
              <input 
                type="file" 
                id="property-photo" 
                accept="image/*" 
                onChange={handleFileChange}
                required
                style={{display: 'none'}}
              />
              <label htmlFor="property-photo" className="custom-file-upload">
                {preview ? (
                  <img src={preview} alt="Preview" className="upload-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <span>Choose Property Photo</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Full Address <span className="required-star">*</span></label>
            <input name="propertyAddress" type="text" onChange={handleChange} value={formData.propertyAddress} required />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Amount (₹) <span className="required-star">*</span></label>
              <input name="propertyAmt" type="number" onChange={handleChange} value={formData.propertyAmt} required />
            </div>
            <div className="form-group">
              <label>Your Contact <span className="required-star">*</span></label>
              <input name="ownerContact" type="text" onChange={handleChange} value={formData.ownerContact} required />
            </div>
          </div>

          <div className="form-group">
            <label>Additional Info</label>
            <textarea name="additionalInfo" rows="3" onChange={handleChange} value={formData.additionalInfo}></textarea>
          </div>

          <button type="submit" className="submit-listing-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
