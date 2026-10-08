import React, { useState } from 'react';
import '../../styles/ServicesSection.css';

const services = [
  { id: '01', title: 'Survey' },
  { id: '02', title: 'Architecture' },
  { id: '03', title: 'Structural Engineering' },
  { id: '04', title: 'Construction' },
  { id: '05', title: 'Interior Design' },
  { id: '06', title: 'Landscape & Elevation' },
  { id: '07', title: 'Vastu' }
];

const ServicesSection: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="services-section">
      <div className="container services-container">
        <h2 className="text-h2 services-heading">Our Expertise.</h2>
        
        <div className="services-list">
          {services.map(srv => (
            <div 
              key={srv.id}
              className="service-item"
              style={{
                opacity: active === srv.id ? 1 : 0.4,
              }}
              onMouseEnter={() => setActive(srv.id)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="service-id">{srv.id}</span>
              <h3 className="service-title">{srv.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
