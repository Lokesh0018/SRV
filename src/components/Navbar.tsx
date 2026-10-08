import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-content">
        <Link to="/" className="logo">SRV</Link>
        <ul className="nav-links">
          <li><Link to="/#about" className="nav-link">About</Link></li>
          <li><Link to="/#services" className="nav-link">Services</Link></li>
          <li><Link to="/#projects" className="nav-link">Projects</Link></li>
          <li><Link to="/#expertise" className="nav-link">Expertise</Link></li>
        </ul>
        <button className="btn-primary" style={{ display: 'none' }} className="start-btn">Start a Project</button>
      </div>
    </nav>
  );
};

export default Navbar;
