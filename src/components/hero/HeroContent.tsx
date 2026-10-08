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
      <span className="srv-eyebrow-num">01 /</span> FROM GROUND TO SKY
    </p>

    <h1 className="srv-title" id="srv-hero-title">
      <span className="srv-title-mask"><span className="srv-title-line">ENGINEERING</span></span>
      <span className="srv-title-mask"><span className="srv-title-line">SPACES.</span></span>
      <span className="srv-title-mask srv-title-mask-accent"><span className="srv-title-line srv-title-accent">BUILDING</span></span>
      <span className="srv-title-mask srv-title-mask-accent"><span className="srv-title-line srv-title-accent">POSSIBILITIES.</span></span>
    </h1>

    <p className="srv-lede">
      Structural Engineering &middot; Architecture &middot; Construction &middot; Interiors
    </p>

    <div className="srv-actions">
      <button type="button" className="srv-btn srv-btn-primary" onClick={() => scrollToId('projects')}>
        EXPLORE OUR WORK
        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
      </button>
      <button type="button" className="srv-btn srv-btn-ghost" onClick={() => scrollToId('contact')}>
        START A PROJECT
      </button>
    </div>

    <dl className="srv-facts">
      <div className="srv-fact">
        <dt>15+</dt>
        <dd>Years</dd>
      </div>
      <div className="srv-fact">
        <dt>100+</dt>
        <dd>Projects</dd>
      </div>
      <div className="srv-fact">
        <dt>Vizag</dt>
        <dd>Based</dd>
      </div>
    </dl>
  </div>
);

export default HeroContent;
