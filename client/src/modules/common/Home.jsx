import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const sliderHouses = [
    { id: 1, title: 'Luxury Villa', location: 'Mumbai', price: '₹50,000/mo', img: '/assets/houses/luxury_villa.png' },
    { id: 2, title: 'Modern Flat', location: 'Delhi', price: '₹20,000/mo', img: '/assets/houses/modern_flat.png' },
    { id: 3, title: 'Cozy Studio', location: 'Bangalore', price: '₹15,000/mo', img: '/assets/houses/cozy_studio.png' },
    { id: 4, title: 'Penthouse', location: 'Pune', price: '₹80,000/mo', img: '/assets/houses/penthouse.png' },
    { id: 5, title: 'Beach House', location: 'Goa', price: '₹45,000/mo', img: '/assets/houses/beach_house.png' },
    { id: 6, title: 'Mountain Cabin', location: 'Manali', price: '₹30,000/mo', img: '/assets/houses/mountain_cabin.png' },
  ];

  const handleBrowse = () => {
    if (user?.type === 'Renter') navigate('/renter/properties');
    else navigate('/login');
  };

  const handleListProperty = () => {
    if (user?.type === 'Owner') navigate('/owner/add-property');
    else navigate('/register');
  };

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.1 }
    );
    const element = document.querySelector('.featured-listings');
    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const featuredData = [
    { id: 1, title: 'Modern Luxury Villa', loc: 'Arera Colony, Bhopal', price: '₹45,500', bhk: '4 BHK', bath: '2 Bath', img: '/assets/houses/featured_1.png', tag: 'FOR RENT' },
    { id: 2, title: 'Premium Bedroom Suite', loc: 'Gulmohar, Bhopal', price: '₹18,200', bhk: '1 BHK', bath: '1 Bath', img: '/assets/houses/featured_2.png', tag: 'FOR SALES' },
    { id: 3, title: 'Spacious Living Lounge', loc: 'Indrapuri, Bhopal', price: '₹62,000', bhk: '5 BHK', bath: '3 Bath', img: '/assets/houses/featured_3.png', tag: 'FOR RENT' },
    { id: 4, title: 'Skyline Apartment', loc: 'Hoshangabad Road, Bhopal', price: '₹28,500', bhk: '2 BHK', bath: '2 Bath', img: '/assets/houses/featured_4.png', tag: 'FOR RENT' },
    { id: 5, title: 'Green Garden Cottage', loc: 'Bawadiya Kalan, Bhopal', price: '₹35,000', bhk: '3 BHK', bath: '2 Bath', img: '/assets/houses/featured_5.png', tag: 'FOR SALES' },
    { id: 6, title: 'Panoramic Penthouse', loc: 'Arera Hills, Bhopal', price: '₹95,000', bhk: '4 BHK', bath: '4 Bath', img: '/assets/houses/featured_6.png', tag: 'FOR RENT' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your <span className="highlight">Perfect</span> Home
            </h1>
            <p className="hero-description">
              Experience the next generation of house hunting. Verified properties, 
              direct owner contact, and seamless bookings all in one place.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={handleBrowse}>
                Explore Houses <span className="arrow">→</span>
              </button>
              <button className="btn-outline" onClick={handleListProperty}>
                List Property
              </button>
            </div>
          </div>

          <div className="hero-slider-container">
            <div className="slider-track">
              {[...sliderHouses, ...sliderHouses].map((house, index) => (
                <div key={`${house.id}-${index}`} className="slider-card">
                  <div className="slider-img-container">
                    <img src={house.img} alt={house.title} className="slider-house-img" />
                  </div>
                  <div className="slider-info">
                    <h4>{house.title}</h4>
                    <p>{house.location}</p>
                    <span className="slider-price">{house.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="process-section">
        <div className="max-width">
          <div className="section-header">
            <span className="pre-title">Basic Process</span>
            <h2 className="main-title">How Homify Works</h2>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-num">01</div>
              <h3>Create Account</h3>
              <p>Register as a Renter or Owner to access the platform features.</p>
            </div>
            <div className="process-step">
              <div className="step-num">02</div>
              <h3>Add or Find Houses</h3>
              <p>Owners can list their properties with details. Renters can search available houses.</p>
            </div>
            <div className="process-step">
              <div className="step-num">03</div>
              <h3>Request Booking</h3>
              <p>Renters can send a booking request directly for any listed property they like.</p>
            </div>
            <div className="process-step">
              <div className="step-num">04</div>
              <h3>Manage Bookings</h3>
              <p>Owners can see their incoming requests and Renters can track their booking status.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="features-section trust-bg">
        <div className="max-width">
          <div className="section-header">
            <span className="pre-title">Core Features</span>
            <h2 className="main-title">What We Offer</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card white-card">
              <div className="feature-icon-box blue">Direct</div>
              <h3>No Middlemen</h3>
              <p>Connect directly with property owners without any agent commissions or fees.</p>
            </div>
            <div className="feature-card white-card">
              <div className="feature-icon-box purple">Details</div>
              <h3>House Information</h3>
              <p>View bedroom counts, rent prices, and specific locations for every listed property.</p>
            </div>
            <div className="feature-card white-card">
              <div className="feature-icon-box green">Status</div>
              <h3>Live Tracking</h3>
              <p>Check the status of your rental applications and bookings through your dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="featured-listings">
        <div className="max-width">
          <div className="section-header">
            <h2 className="main-title">Verified Featured Listings</h2>
          </div>
          <div className={`listings-grid ${revealed ? 'animate-reveal' : ''}`}>
            {featuredData.map((item, index) => (
              <div key={item.id} className="listing-card shadow-sm" style={{ '--i': index }}>
                <div className="listing-image-wrapper">
                  <img src={item.img} alt={item.title} />
                  <span className={`listing-tag ${item.tag === 'FOR RENT' ? 'rent' : 'sale'}`}>{item.tag}</span>
                  <div className="listing-image-overlay">
                    <div className="listing-loc">{item.loc}</div>
                    <div className="listing-meta">
                      <span>{item.bhk}</span>
                      <span>{item.bath}</span>
                    </div>
                  </div>
                </div>
                <div className="listing-content">
                  <div className="listing-price">{item.price}<span>/Month</span></div>
                  <h3 className="listing-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
