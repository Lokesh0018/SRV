import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import '../../styles/ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: '01',
    title: 'Constructions',
    desc: 'End-to-end building and construction services focusing on uncompromised structural integrity and superior quality.',
  },
  {
    id: '02',
    title: 'Interior Designs & 3D Walkthrough',
    desc: 'Immersive and bespoke interior concepts, visualized through highly detailed 3D walkthroughs for precise planning.',
  },
  {
    id: '03',
    title: 'Landscape & Elevations',
    desc: 'Striking exterior elevations and lush landscape planning designed to harmonize with the built environment.',
  },
  {
    id: '04',
    title: 'Survey Works',
    desc: 'Accurate site surveying and topographical mappings to establish perfect foundations for any development.',
  },
  {
    id: '05',
    title: 'Structural Designs',
    desc: 'Advanced engineering and structural framing that ensure durability, safety, and architectural brilliance.',
  },
  {
    id: '06',
    title: 'Architectural Planning',
    desc: 'Strategic layout and blueprint design optimizing spatial flow, utility, and modern aesthetics.',
  },
  {
    id: '07',
    title: 'Vastu Consultant & Architecture',
    desc: 'Harmonious architectural design rooted in traditional Vastu principles for balanced, positive living spaces.',
  }
];

const ServicesSection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: el, start: 'top 75%' },
        })
          .from('.services-index', { autoAlpha: 0, y: 12, duration: 0.6 })
          .from('.services-title', { autoAlpha: 0, y: 24, duration: 0.8 }, 0.1)
          .from('.service-item', { autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.1 }, 0.2);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="services-section">
      <div className="services-inner">
        <header className="services-header">
          <div className="services-index">
            <span className="services-index-num">02</span>
            <span className="services-index-sep" aria-hidden="true" />
            <span>Expertise</span>
          </div>
          <h2 className="services-title">Integrated disciplines.</h2>
        </header>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article key={s.id} className="service-item">
              <div className="service-item-head">
                <span className="service-item-id">{s.id}</span>
                <ArrowRight size={24} strokeWidth={1} className="service-item-icon" />
              </div>
              <h3 className="service-item-title">{s.title}</h3>
              <p className="service-item-desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
