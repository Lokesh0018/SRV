import React, { useEffect, useRef, useState } from 'react';
import HeroVideo from './HeroVideo';
import HeroContent from './HeroContent';
import { useHeroAnimations } from './useHeroAnimations';
import '../../styles/SRVHero.css';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SRVHero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(prefersReduced);
  // true once the visitor pauses/plays themselves — we stop auto-managing then
  const userChoice = useRef(false);

  // Timeline removed per user request
  useHeroAnimations(root);

  // the nav switches to its light treatment while it sits over the footage
  useEffect(() => {
    document.body.dataset.heroDark = '';
    return () => { delete document.body.dataset.heroDark; };
  }, []);

  // No longer keeping track of playing state since timeline is removed

  // pause while the hero is off-screen; resume when it returns
  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v || reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (userChoice.current) return;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);



  return (
    <section ref={root} className="srv-hero" aria-labelledby="srv-hero-title">
      <div className="srv-hero-frame">
        <HeroVideo videoRef={video} reduced={reduced} />
        <HeroContent />

      </div>
    </section>
  );
};

export default SRVHero;
