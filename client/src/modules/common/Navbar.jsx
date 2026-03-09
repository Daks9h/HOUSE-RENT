import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setMenuOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="nav-left">
          <Link to="/" className="brand-logo">Homify</Link>
        </div>

        {/* Center: Main Links */}
        <div className={`nav-center ${menuOpen ? 'mobile-open' : ''}`}>
          <ul className="centered-links">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </div>

        {/* Right: Auth/User Actions */}
        <div className={`nav-right ${menuOpen ? 'mobile-open' : ''}`}>
          {!user ? (
            <div className="auth-actions">
              <Link to="/login" className="login-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="register-action-btn" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          ) : (
            <div className="user-actions">
              <span className="hi-user" style={{ fontWeight: 700, color: '#4a5568', marginRight: '10px' }}>
                Hi, {user?.name || user?.type}
              </span>
              
              {/* Conditional dropdowns based on user type */}
              {user.type === 'Admin' && (
                <div className="area-dropdown">
                  <Link to="/admin" className="area-label admin" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
                    Dashboard
                  </Link>
                </div>
              )}

              {user.type === 'Owner' && (
                <div className="area-dropdown">
                  <span className="area-label owner">Owner Area</span>
                  <div className="dropdown-menu">
                    <Link to="/owner" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/owner/add-property" onClick={() => setMenuOpen(false)}>Add Property</Link>
                    <Link to="/owner/bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                    <Link to="/owner/all-properties" onClick={() => setMenuOpen(false)}>My Houses</Link>
                  </div>
                </div>
              )}

              {user.type === 'Renter' && (
                <div className="area-dropdown">
                  <span className="area-label renter">Renter Area</span>
                  <div className="dropdown-menu">
                    <Link to="/renter" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/renter/properties" onClick={() => setMenuOpen(false)}>Search Houses</Link>
                    <Link to="/renter/bookings" onClick={() => setMenuOpen(false)}>My Bookings</Link>
                  </div>
                </div>
              )}

              <button onClick={handleLogout} className="navbar-logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
