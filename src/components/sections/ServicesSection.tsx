import React, { useState } from 'react';

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
      <div className="container" style={{ position: 'relative', height: '100%' }}>
        <h2 className="text-h2" style={{ position: 'absolute', top: 0, left: '2rem' }}>Our Expertise.</h2>
        
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '2rem', 
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {services.map(srv => (
            <div 
              key={srv.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                opacity: active === srv.id ? 1 : 0.4,
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={() => setActive(srv.id)}
              onMouseLeave={() => setActive(null)}
            >
              <span style={{ color: 'var(--color-orange)', fontSize: '0.8rem', fontWeight: 600 }}>{srv.id}</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 400 }}>{srv.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
