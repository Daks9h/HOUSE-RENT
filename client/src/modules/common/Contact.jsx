import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent. Our team will get back to you shortly.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="max-width">
          <h1>Get in <span className="highlight">Touch</span></h1>
          <p>Have questions about a property or our platform? We're here to help.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="max-width">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-item">
                <div>
                  <h3>Our Office</h3>
                  <p>Arera Colony, Near Bittan Market,<br />Bhopal, MP 462016</p>
                </div>
              </div>
              
              <div className="info-item">
                <div>
                  <h3>Phone</h3>
                  <p>+91 1800-HOMIFY-NOW (toll free)<br />+91 98765 43210</p>
                </div>
              </div>

              <div className="info-item">
                <div>
                  <h3>Email</h3>
                  <p>support@homify.com<br />partners@homify.com</p>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Aarav Sharma" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="aarav@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input 
                    type="text" 
                    placeholder="Booking Inquiry" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    rows="5" 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
