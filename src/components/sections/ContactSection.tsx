import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" style={{ backgroundColor: 'var(--color-navy)', color: 'var(--color-warm-white)', padding: '10rem 0' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h2 className="text-h2" style={{ marginBottom: '2rem' }}>Let's Build Something Real.</h2>
        <p style={{ color: 'var(--color-concrete)', fontSize: '1.2rem', marginBottom: '4rem' }}>
          From conceptual architecture to structural execution, partner with SRV Associates to engineer your next vision.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
          <button className="btn-primary">Start Your Project</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem', textAlign: 'left' }}>
          <div>
            <h4 style={{ color: 'var(--color-orange)', marginBottom: '1rem', fontSize: '0.8rem' }}>LOCATION</h4>
            <p style={{ color: '#aaa' }}>Visakhapatnam, Andhra Pradesh<br/>India</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-orange)', marginBottom: '1rem', fontSize: '0.8rem' }}>CONTACT</h4>
            <p style={{ color: '#aaa' }}>+91 90000 00000<br/>info@srvassociate.in</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-orange)', marginBottom: '1rem', fontSize: '0.8rem' }}>SOCIAL</h4>
            <p style={{ color: '#aaa' }}>LinkedIn<br/>Instagram</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
