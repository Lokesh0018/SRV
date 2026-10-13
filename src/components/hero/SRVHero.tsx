import React, { useEffect, useRef, useState } from 'react';
import HeroVideo from './HeroVideo';
import HeroContent from './HeroContent';
import { useHeroAnimations } from './useHeroAnimations';
import { revealHero } from './heroLoader';
import '../../styles/SRVHero.css';

const SRVHero: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  // true once the visitor pauses/plays themselves — we stop auto-managing then
  const userChoice = useRef(false);

  // Timeline removed per user request
  // the intro waits until the loader lifts off a fully ready hero
  const [revealed, setRevealed] = useState(false);
  useEffect(() => revealHero(video.current, () => setRevealed(true)), []);
  useHeroAnimations(root, revealed);

  // the nav switches to its light treatment while it sits over the footage
  useEffect(() => {
    document.body.dataset.heroDark = '';
    return () => { delete document.body.dataset.heroDark; };
  }, []);

  // No longer keeping track of playing state since timeline is removed

  // pause while the hero is off-screen; resume when it returns. The footage
  // also plays under prefers-reduced-motion: it's a slow, decorative loop.
  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    // React sets `muted` only as a property, never the attribute; Safari/iOS
    // refuse autoplay without it, so set both and start playback explicitly.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.play().catch(() => {});
    const io = new IntersectionObserver(([entry]) => {
      if (userChoice.current) return;
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);



  return (
    <section ref={root} id="home" className="srv-hero" aria-labelledby="srv-hero-title">
      <div className="srv-hero-frame">
        <HeroVideo videoRef={video} />
        <HeroContent />

      </div>
    </section>
  );
};

export default SRVHero;
