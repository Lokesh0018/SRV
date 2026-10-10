import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ParallaxIcons.css';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxIconsProps {
  icons: { src: string; className: string }[];
  containerRef: React.RefObject<HTMLElement>;
}

const ParallaxIcons: React.FC<ParallaxIconsProps> = ({ icons, containerRef }) => {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.px-icon').forEach((icon: any, i) => {
          const speed = (i % 2 === 0 ? -0.3 : -0.5); // Move up at different speeds
          const rotateSpeed = (i % 2 === 0 ? 15 : -15); // Slight rotation

          gsap.to(icon, {
            y: () => window.innerHeight * speed,
            rotation: `+=${rotateSpeed}`,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
        });
      });
    }, el);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div ref={root} className="parallax-icons" aria-hidden="true">
      {icons.map((icon, i) => (
        <img key={i} src={icon.src} alt="" className={`px-icon ${icon.className}`} />
      ))}
    </div>
  );
};

export default ParallaxIcons;
