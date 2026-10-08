import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-cta-wrap">
        <div className="container footer-cta-content">
          <h2 className="footer-cta-title">
            Let's build your <span className="text-orange">vision</span>.
          </h2>
          <a href="#contact" className="footer-cta-btn">
            Start a project
            <svg
              className="btn-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <a href="#" className="footer-logo">
              <img src="/SRV_Logo.jpg" alt="SRV Associates Logo" />
            </a>
            <p className="footer-desc">
              Comprehensive architectural and structural engineering solutions. From ground to sky.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">IN</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Twitter">TW</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#idea">Our Process</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <address className="footer-address">
              <p>SRV Associates</p>
              <p>123 Business Tower,</p>
              <p>Sector 62, Noida,</p>
              <p>Uttar Pradesh, India</p>
              <p className="footer-contact-link">
                <a href="mailto:info@srvassociate.in">info@srvassociate.in</a>
              </p>
              <p className="footer-contact-link">
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} SRV Associates. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
