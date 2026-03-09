import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Redefining <span className="highlight">Home Rental</span></h1>
          <p>Our mission is to make finding your next home as simple and professional as living in it.</p>
        </div>
      </section>

      <section className="about-mission">
        <div className="max-width">
          <div className="mission-grid">
            <div className="mission-text">
              <h2>Our Story</h2>
              <p>
                Homify was created to address a significant gap in the real estate market: the lack of a reliable, 
                transparent, and efficient house hunting platform. We believe that everyone deserves a seamless 
                experience when searching for their dream home.
              </p>
              <p>
                By building a marketplace focused on verified listings and direct communication/ 
                we ensure that both renters and owners can interact in a secure and professional environment. 
                Our platform eliminates unnecessary intermediaries and provides clear, real-time data to help you 
                make informed decisions.
              </p>
            </div>
            <div className="mission-visual">
              <div className="stat-card">
                <h3>10k+</h3>
                <p>Properties</p>
              </div>
              <div className="stat-card">
                <h3>5k+</h3>
                <p>Users</p>
              </div>
              <div className="stat-card">
                <h3>50+</h3>
                <p>Cities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="max-width">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Transparency</h3>
              <p>Clear communication and verified listings for total peace of mind.</p>
            </div>
            <div className="value-card">
              <h3>Security</h3>
              <p>A protected environment for all users to interact confidently.</p>
            </div>
            <div className="value-card">
              <h3>Efficiency</h3>
              <p>Modern tools designed to make your search fast and productive.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
