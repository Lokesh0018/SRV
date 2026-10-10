import React from 'react';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import '../../styles/ContactSection.css';

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('13-460/a, Parvathinagar, Sector 2, Healthcity, Arilova, Visakhapatnam, Andhra Pradesh 530040');

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      {/* Decorative background: faded site photo + blueprint grid */}
      <div className="contact-bg" aria-hidden="true">
        <div className="contact-bg-photo" />
        <div className="contact-bg-grid" />
      </div>

      <div className="container contact-container">
        {/* Left Column */}
        <div className="contact-left">
          <span className="contact-eyebrow">Have a project in mind?</span>
          <h2 id="contact-heading" className="contact-heading">
            Let's Build<br />
            Something <em>Real.</em>
          </h2>
          <p className="contact-text">
            From conceptual architecture to structural execution, partner with SRV Associates to bring your next vision to life.
          </p>
          <a href="mailto:info@srvassociate.in" className="contact-cta">
            Tell us about your project
            <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
          </a>
        </div>

        {/* Right Column */}
        <div className="contact-card">
          <div className="contact-row">
            <span className="contact-icon" aria-hidden="true"><MapPin size={20} strokeWidth={1.75} /></span>
            <div className="contact-body">
              <h3 className="contact-label">Registered Office</h3>
              <address className="contact-value">
                13-460/a, Parvathinagar, Sector&nbsp;2<br />
                Healthcity, Arilova<br />
                Visakhapatnam, Andhra Pradesh<br />
                PIN: 530040
              </address>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="contact-inline-link">
                Get directions <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
              </a>
            </div>
          </div>

          <a href="tel:+919573660701" className="contact-row contact-row-link">
            <span className="contact-icon" aria-hidden="true"><Phone size={20} strokeWidth={1.75} /></span>
            <span className="contact-body">
              <span className="contact-label">Telephone</span>
              <span className="contact-value">+91 9573660701</span>
            </span>
            <ArrowUpRight className="contact-row-arrow" size={18} strokeWidth={2} aria-hidden="true" />
          </a>

          <a href="mailto:hr.srvassociates@gmail.com" className="contact-row contact-row-link">
            <span className="contact-icon" aria-hidden="true"><Mail size={20} strokeWidth={1.75} /></span>
            <span className="contact-body">
              <span className="contact-label">Email Address</span>
              <span className="contact-value contact-value-break">hr.srvassociates@gmail.com</span>
            </span>
            <ArrowUpRight className="contact-row-arrow" size={18} strokeWidth={2} aria-hidden="true" />
          </a>

          <div className="contact-row">
            <span className="contact-icon" aria-hidden="true"><Clock size={20} strokeWidth={1.75} /></span>
            <div className="contact-body">
              <h3 className="contact-label">Business Hours</h3>
              <p className="contact-value">
                Monday – Saturday<br />
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
