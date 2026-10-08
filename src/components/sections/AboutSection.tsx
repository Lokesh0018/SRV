import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" style={{ padding: '10rem 0' }}>
      <div className="container">
        <h2 className="text-h2" style={{ marginBottom: '4rem' }}>Built on Precision.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <p className="text-body" style={{ color: 'var(--color-concrete)', fontSize: '1.2rem', marginBottom: '2rem' }}>
              We transform visions into enduring structures through rigorous engineering and innovative architectural design.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
              <div>
                <h3 style={{ fontSize: '3rem', color: 'var(--color-orange)', marginBottom: '0.5rem' }}>15+</h3>
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Years Experience</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', color: 'var(--color-orange)', marginBottom: '0.5rem' }}>500+</h3>
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Projects Completed</p>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            {/* The 3D scene shows underneath this, we keep this empty or add technical SVG overlays */}
            <div style={{ position: 'absolute', inset: 0, border: '1px solid var(--color-concrete)', opacity: 0.2 }}></div>
            <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '110%', height: '1px', backgroundColor: 'var(--color-orange)', opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', left: '10%', top: '-5%', height: '110%', width: '1px', backgroundColor: 'var(--color-orange)', opacity: 0.5 }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
