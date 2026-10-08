import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll setup
      gsap.to('.project-panel', {
        xPercent: -100 * (3 - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + containerRef.current?.offsetWidth
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ height: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-charcoal)' }}>
      <div 
        ref={containerRef}
        style={{ 
          display: 'flex', 
          width: '300vw',
          height: '100%' 
        }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="project-panel" style={{ width: '100vw', height: '100%', position: 'relative', padding: '10rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'url("https://via.placeholder.com/1920x1080/222222/555555?text=Project+Visual")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            
            <div style={{ position: 'relative', zIndex: 1, color: 'var(--color-warm-white)', maxWidth: '600px' }}>
              <span style={{ color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>Commercial Structure</span>
              <h3 className="text-h2" style={{ marginBottom: '1rem' }}>Project Alpha {i}</h3>
              <p style={{ color: '#aaa' }}>Complete structural design and architectural planning for a modern 20-story commercial complex in Visakhapatnam.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
