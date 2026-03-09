import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan hum API call karenge password reset link bhejne ke liye
    console.log("Reset link sent to:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="title">Forgot Password?</h2>
        
        {!isSubmitted ? (
          <>
            <p className="subtitle">
              Don't worry! Enter your registered email address and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Email sent!</h3>
            <p>
              Please check your inbox at **{email}**. We have sent the password reset instructions.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="back-btn"
            >
              Back to Login
            </button>
          </div>
        )}
        
        <div className="footer-links">
          <a href="/login" className="login-link">Remember password? Log in</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
