import React from 'react';
import '../../styles/ContactSection.css';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-container">
        <h2 className="text-h2 contact-heading">Let's Build Something Real.</h2>
        <p className="contact-text">
          From conceptual architecture to structural execution, partner with SRV Associates to engineer your next vision.
        </p>
        
        <div className="contact-actions">
          <button className="btn-primary">Start Your Project</button>
        </div>

        <div className="contact-grid">
          <div>
            <h4 className="contact-label">LOCATION</h4>
            <p className="contact-info">Visakhapatnam, Andhra Pradesh<br/>India</p>
          </div>
          <div>
            <h4 className="contact-label">CONTACT</h4>
            <p className="contact-info">+91 90000 00000<br/>info@srvassociate.in</p>
          </div>
          <div>
            <h4 className="contact-label">SOCIAL</h4>
            <p className="contact-info">LinkedIn<br/>Instagram</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
