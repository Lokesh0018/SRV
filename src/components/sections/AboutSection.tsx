import React from 'react';
import '../../styles/AboutSection.css';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="text-h2 about-heading">Built on Precision.</h2>
        <div className="about-grid">
          <div>
            <p className="text-body about-text">
              We transform visions into enduring structures through rigorous engineering and innovative architectural design.
            </p>
            <div className="stats-grid">
              <div>
                <h3 className="stat-number">15+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
              <div>
                <h3 className="stat-number">500+</h3>
                <p className="stat-label">Projects Completed</p>
              </div>
            </div>
          </div>
          <div className="about-graphics-container">
            {/* The 3D scene shows underneath this, we keep this empty or add technical SVG overlays */}
            <div className="about-graphic-border"></div>
            <div className="about-graphic-line-h"></div>
            <div className="about-graphic-line-v"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
