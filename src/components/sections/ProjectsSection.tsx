import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/ProjectsSection.css';

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
    <section id="projects" ref={sectionRef} className="projects-section">
      <div ref={containerRef} className="projects-container">
        {[1, 2, 3].map((i) => (
          <div key={i} className="project-panel">
            <div className="project-bg" />
            
            <div className="project-content">
              <span className="project-category">Commercial Structure</span>
              <h3 className="text-h2 project-title">Project Alpha {i}</h3>
              <p className="project-desc">Complete structural design and architectural planning for a modern 20-story commercial complex in Visakhapatnam.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
