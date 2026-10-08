import React, { useRef, useState } from 'react';
import HeroLayers from './HeroLayers';
import HeroContent from './HeroContent';
import HeroTimeline from './HeroTimeline';
import HeroTechnicalUI from './HeroTechnicalUI';
import { useHeroAnimations } from './useHeroAnimations';
import { useHeroParallax } from './useHeroParallax';
import './hero.css';

const SRVHero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useHeroAnimations(root, setStep);
  useHeroParallax(root);

  return (
    <section ref={root} className="srv-hero" aria-labelledby="srv-hero-title">
      <div className="srv-hero-frame">
        <HeroLayers />
        <div className="srv-scrim srv-scrim-copy" aria-hidden="true" />
        <div className="srv-scrim srv-scrim-ground" aria-hidden="true" />
        <HeroContent />
        <HeroTechnicalUI active={step} />
        <HeroTimeline active={step} />
      </div>
    </section>
  );
};

export default SRVHero;
