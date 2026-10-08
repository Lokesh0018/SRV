import React from 'react';
import { ArrowRight } from 'lucide-react';

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

const HeroContent: React.FC = () => (
  <div className="srv-content">
    <p className="srv-eyebrow">
      <span className="srv-eyebrow-brand">SRV Associates</span>
      <span className="srv-eyebrow-disciplines">Architecture &middot; Engineering &middot; Construction</span>
    </p>

    <h1 className="srv-title" id="srv-hero-title">
      <span className="srv-title-mask"><span className="srv-title-line">Engineering</span></span>
      <span className="srv-title-mask"><span className="srv-title-line">spaces.</span></span>
      <span className="srv-title-mask"><span className="srv-title-line srv-title-accent">Building</span></span>
      <span className="srv-title-mask"><span className="srv-title-line srv-title-accent">possibilities.</span></span>
    </h1>

    <p className="srv-lede">
      From precise surveying and structural engineering to architecture, construction and
      interiors&nbsp;&mdash; we transform ideas into spaces built to last.
    </p>

    <div className="srv-actions">
      <button type="button" className="srv-btn srv-btn-primary" onClick={() => scrollToId('projects')}>
        Explore our work
        <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button type="button" className="srv-btn srv-btn-ghost" onClick={() => scrollToId('contact')}>
        Start a project
      </button>
    </div>

    <dl className="srv-facts">
      <div className="srv-fact">
        <dt>15+</dt>
        <dd>Years experience</dd>
      </div>
      <div className="srv-fact">
        <dt>100+</dt>
        <dd>Projects</dd>
      </div>
      <div className="srv-fact">
        <dt>Visakhapatnam</dt>
        <dd>Andhra Pradesh</dd>
      </div>
    </dl>
  </div>
);

export default HeroContent;
