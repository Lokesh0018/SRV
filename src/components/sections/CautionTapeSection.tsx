import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/CautionTapeSection.css';

gsap.registerPlugin(ScrollTrigger);

const CautionTapeSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top-=500px', // Extended buffer so it never pauses while on screen
            scrub: 1, 
            invalidateOnRefresh: true, 
          }
        });

        // Tapes moving horizontally
        tl.to('.tape-upper', {
          xPercent: -15, // Move left (15% of 300vw = 45vw)
          ease: 'none',
        }, 0);

        tl.to('.tape-lower', {
          xPercent: 15, // Move right
          ease: 'none',
        }, 0);

        // Center wordmark reveal (fade in and slightly scale as you scroll down)
        tl.fromTo('.tape-center-wordmark', {
          autoAlpha: 0,
          scale: 0.8,
        }, {
          autoAlpha: 1,
          scale: 1,
          ease: 'power1.inOut',
        }, 0.2);
      });
    }, el);

    // Refresh ScrollTrigger to account for images/videos loading above and pushing this section down
    const to1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const to2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const to3 = setTimeout(() => ScrollTrigger.refresh(), 1500);

    return () => {
      clearTimeout(to1);
      clearTimeout(to2);
      clearTimeout(to3);
      ctx.revert();
    };
  }, []);

  // Generate repeating brand elements
  const renderBranding = () => Array.from({ length: 20 }).map((_, i) => (
    <div key={i} className="tape-brand-panel" aria-hidden="true">
      <span className="brand-srv">SRV</span>
    </div>
  ));

  return (
    <section ref={root} className="caution-tape-section">
      <div className="tape-center-reveal" aria-hidden="true">
        <span className="tape-center-wordmark">SRV</span>
      </div>
      <div className="tape-wrapper">
        <div className="tape tape-upper">
          <div className="tape-content">{renderBranding()}</div>
        </div>
        <div className="tape tape-lower">
          <div className="tape-content">{renderBranding()}</div>
        </div>
      </div>
    </section>
  );
};

export default CautionTapeSection;
