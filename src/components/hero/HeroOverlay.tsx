import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const HeroOverlay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="container">
        <div className="hero-content">
          <h1 className="text-hero hero-text">
            Engineering Spaces.<br />
            Building Possibilities.
          </h1>
          <p className="hero-sub hero-text">
            Structural Engineering • Architecture • Construction • Interiors
          </p>
          <div className="hero-actions hero-text">
            <button className="btn-primary">Explore Our Work</button>
            <button className="btn-secondary">Start a Project</button>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroOverlay;
