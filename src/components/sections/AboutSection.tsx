import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import poster from '../../assets/home-about.webp';
import '../../styles/AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '15+', label: 'Years in practice' },
  { value: '120+', label: 'Projects delivered' },
  { value: '7', label: 'Integrated disciplines' }
];

const principles = [
  { id: '01', title: 'Precision first', text: 'Every drawing, survey and calculation is checked before a single brick is laid.' },
  { id: '02', title: 'Built to endure', text: 'We specify structures and materials for decades of use, not the next handover.' },
  { id: '03', title: 'People at the centre', text: 'Spaces are designed around the people who will live and work in them.' }
];

const AboutSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about-reveal', {
          scrollTrigger: { trigger: el, start: 'top 72%' },
          y: 36,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out'
        });

        gsap.from('.about-rule', {
          scrollTrigger: { trigger: '.about-rule', start: 'top 85%' },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.inOut'
        });

        gsap.to('.about-media img', {
          scrollTrigger: { trigger: '.about-media', start: 'top bottom', end: 'bottom top', scrub: true },
          yPercent: -12,
          ease: 'none'
        });

        gsap.from('.about-stat', {
          scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });

        gsap.from('.about-principle', {
          scrollTrigger: { trigger: '.about-principles', start: 'top 85%' },
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="about-section">
      <div className="about-inner">
        <div className="about-index about-reveal">
          <span className="about-index-num">01</span>
          <span className="about-index-sep" aria-hidden="true" />
          <span>Who we are</span>
        </div>

        <div className="about-head">
          <h2 className="about-heading about-reveal">
            Building the foundation<br />of tomorrow, <em>today.</em>
          </h2>
          <div className="about-content about-reveal">
            <p className="about-text">
              SRV Associates is a construction and engineering firm dedicated to shaping enduring environments.
              We turn visionary concepts into structural reality through precision, advanced engineering and
              considered architectural design.
            </p>
            <p className="about-subtext">
              Every project is a testament to structural integrity, craft, and the people who live and work
              within the spaces we build.
            </p>
            <a href="#contact" className="about-cta">
              Start a project <ArrowUpRight size={18} strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="about-rule" aria-hidden="true" />

        <div className="about-body">
          <figure className="about-media about-reveal">
            <img src={poster} alt="Concrete structure under construction on an SRV Associates site" loading="lazy" />
            <figcaption>
              <span className="about-media-tag">On site</span>
              Visakhapatnam, Andhra Pradesh
            </figcaption>
          </figure>

          <div className="about-aside">
            <dl className="about-stats">
              {stats.map(s => (
                <div key={s.label} className="about-stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <ol className="about-principles">
              {principles.map(p => (
                <li key={p.id} className="about-principle">
                  <span className="about-principle-id">{p.id}</span>
                  <div>
                    <h3 className="about-principle-title">{p.title}</h3>
                    <p className="about-principle-text">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
