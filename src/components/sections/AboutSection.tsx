import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import poster from '../../assets/home-about.webp';
import imgCones from '../../assets/construction-cones.webp';
import imgGlasses from '../../assets/construction-glasses.webp';
import imgHelmet from '../../assets/construction-helmet.webp';
import imgMegaphone from '../../assets/construction-megaphone.webp';
import imgVest from '../../assets/construction-vest.webp';
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
        gsap.to('.about-media img', {
          scrollTrigger: { trigger: '.about-media', start: 'top bottom', end: 'bottom top', scrub: true },
          yPercent: -12,
          ease: 'none'
        });

        // Parallax floating objects - increased distance for noticeable effect
        const parallaxConfig = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true };
        gsap.to('.obj-cones', { y: '-70vh', rotation: 45, ease: 'none', scrollTrigger: parallaxConfig });
        gsap.to('.obj-glasses', { y: '90vh', rotation: -40, ease: 'none', scrollTrigger: parallaxConfig });
        gsap.to('.obj-helmet', { y: '-50vh', rotation: 20, ease: 'none', scrollTrigger: parallaxConfig });
        gsap.to('.obj-megaphone', { y: '100vh', rotation: -60, ease: 'none', scrollTrigger: parallaxConfig });
        gsap.to('.obj-vest', { y: '-80vh', rotation: 30, ease: 'none', scrollTrigger: parallaxConfig });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="about-section">
      <div className="about-parallax-objects" aria-hidden="true">
        <img src={imgCones} className="parallax-obj obj-cones" alt="" loading="lazy" decoding="async" />
        <img src={imgGlasses} className="parallax-obj obj-glasses" alt="" loading="lazy" decoding="async" />
        <img src={imgHelmet} className="parallax-obj obj-helmet" alt="" loading="lazy" decoding="async" />
        <img src={imgMegaphone} className="parallax-obj obj-megaphone" alt="" loading="lazy" decoding="async" />
        <img src={imgVest} className="parallax-obj obj-vest" alt="" loading="lazy" decoding="async" />
      </div>
      
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
