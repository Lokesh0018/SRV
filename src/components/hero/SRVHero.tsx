import React, { useRef } from 'react';
import HeroLayers from './HeroLayers';
import HeroContent from './HeroContent';
import { useHeroAnimations } from './useHeroAnimations';
import { useHeroParallax } from './useHeroParallax';
import '../../styles/SRVHero.css';

const SRVHero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  useHeroAnimations(root);
  useHeroParallax(root);

  return (
    <section ref={root} className="srv-hero" aria-labelledby="srv-hero-title">
      <div className="srv-hero-frame">
        <HeroLayers />
        <div className="srv-scrim srv-scrim-copy" aria-hidden="true" />
        <div className="srv-scrim srv-scrim-ground" aria-hidden="true" />
        {/* dissolves the hero's lower edge into the next section as the layers lift */}
        <div className="srv-scrim srv-dissolve" aria-hidden="true" />
        <HeroContent />
      </div>
    </section>
  );
};

export default SRVHero;
