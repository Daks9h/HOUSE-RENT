import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'Renter',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await register(formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      if (data.type === 'Admin') navigate('/admin');
      else if (data.type === 'Owner') navigate('/owner');
      else navigate('/renter');

      // Force reload to update Navbar status
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="title">Create Account</h2>
          <p className="subtitle">Join our platform and start your search.</p>
          {error && <p className="error-msg" style={{color: '#e74a3b', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name <span className="required-star">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address <span className="required-star">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password <span className="required-star">*</span></label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selector">
              <label className={`role-option ${formData.type === 'Renter' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="type"
                  value="Renter"
                  checked={formData.type === 'Renter'}
                  onChange={handleChange}
                />
                Renter
              </label>
              <label className={`role-option ${formData.type === 'Owner' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="type"
                  value="Owner"
                  checked={formData.type === 'Owner'}
                  onChange={handleChange}
                />
                Owner
              </label>
              <label className={`role-option ${formData.type === 'Admin' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="type"
                  value="Admin"
                  checked={formData.type === 'Admin'}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
