import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo');

  const handleRestrictedLink = (e, path) => {
    e.preventDefault();
    if (!userInfo) {
      alert("Please sign up or login to explore this feature!");
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-brand-column">
          <Link to="/" className="footer-logo">Homify</Link>
          <p className="brand-bio">
            Simplifying house hunting for the modern world. Find your perfect stay with verified listings and professional service.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">Twitter</a>
            <a href="#" className="social-icon">Instagram</a>
            <a href="#" className="social-icon">LinkedIn</a>
          </div>
        </div>

        <div className="footer-links-column">
          <h4>Platform</h4>
          <ul>
            <li>
              <a href="/renter/properties" onClick={(e) => handleRestrictedLink(e, '/renter/properties')}>
                Browse Houses
              </a>
            </li>
            <li>
              <a href="/owner/add-property" onClick={(e) => handleRestrictedLink(e, '/owner/add-property')}>
                List a Property
              </a>
            </li>
            <li><Link to="/register">Join as Member</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/about">Careers</Link></li>
          </ul>
        </div>

        <div className="footer-links-column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="bottom-content">
          <p>© 2026 Homify Inc. Designed for trust and transparency.</p>
          <p className="contact-details">Arera Colony, Bhopal, MP | 1800-HOMIFY-NOW</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
