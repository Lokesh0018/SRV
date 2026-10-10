import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Building2, Paintbrush, Trees, Map, Hammer, PencilRuler, Compass } from 'lucide-react';
import '../../styles/ServicesSection.css';

import imgConstruction from '../../assets/service-construction.webp';
import imgInterior from '../../assets/service-interior-design.webp';
import imgLandscape from '../../assets/service-landscape.webp';
import imgSurvey from '../../assets/service-survey works.webp';
import imgStructural from '../../assets/service-structural design.webp';
import imgArchitectural from '../../assets/service-architectural planning.webp';
import imgVastu from '../../assets/service-vastu.webp';

import imgVest from '../../assets/construction-vest.webp';
import imgGlasses from '../../assets/construction-glasses.webp';
import imgCones from '../../assets/construction-cones.webp';
import imgTape from '../../assets/construction-measuring-tape.webp';
import imgHammer from '../../assets/construction-hammer.webp';
import imgHelmet from '../../assets/construction-helmet.webp';
import imgMegaphone from '../../assets/construction-megaphone.webp';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: '01',
    title: 'Constructions',
    desc: 'End-to-end building and construction services focusing on uncompromised structural integrity and superior quality.',
    icon: Building2,
    image: imgConstruction
  },
  {
    id: '02',
    title: 'Interior Designs & 3D Walkthrough',
    desc: 'Immersive and bespoke interior concepts, visualized through highly detailed 3D walkthroughs for precise planning.',
    icon: Paintbrush,
    image: imgInterior
  },
  {
    id: '03',
    title: 'Landscape & Elevations',
    desc: 'Striking exterior elevations and lush landscape planning designed to harmonize with the built environment.',
    icon: Trees,
    image: imgLandscape
  },
  {
    id: '04',
    title: 'Survey Works',
    desc: 'Accurate site surveying and topographical mappings to establish perfect foundations for any development.',
    icon: Map,
    image: imgSurvey
  },
  {
    id: '05',
    title: 'Structural Designs',
    desc: 'Advanced engineering and structural framing that ensure durability, safety, and architectural brilliance.',
    icon: Hammer,
    image: imgStructural
  },
  {
    id: '06',
    title: 'Architectural Planning',
    desc: 'Strategic layout and blueprint design optimizing spatial flow, utility, and modern aesthetics.',
    icon: PencilRuler,
    image: imgArchitectural
  },
  {
    id: '07',
    title: 'Vastu Consultant & Architecture',
    desc: 'Harmonious architectural design rooted in traditional Vastu principles for balanced, positive living spaces.',
    icon: Compass,
    image: imgVastu
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
          scrollTrigger: { 
            trigger: el, 
            start: 'top 80%',
            invalidateOnRefresh: true
          },
        })
          .from('.service-item', { autoAlpha: 0, duration: 0.8, stagger: 0.1 });

        // Parallax effect for 3D addons
        gsap.utils.toArray('.section-addon').forEach((addon: any, index) => {
          const speed = (index % 3 + 1) * 80;
          const yMove = index % 2 === 0 ? speed : -speed;
          gsap.to(addon, {
            y: yMove,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
              invalidateOnRefresh: true
            }
          });
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="services" className="services-section">
      <div className="services-addons" aria-hidden="true">
        <img src={imgCones} alt="" className="section-addon addon-1" loading="lazy" />
        <img src={imgHelmet} alt="" className="section-addon addon-2" loading="lazy" />
        <img src={imgTape} alt="" className="section-addon addon-3" loading="lazy" />
        <img src={imgHammer} alt="" className="section-addon addon-4" loading="lazy" />
        <img src={imgGlasses} alt="" className="section-addon addon-5" loading="lazy" />
        <img src={imgMegaphone} alt="" className="section-addon addon-6" loading="lazy" />
        <img src={imgVest} alt="" className="section-addon addon-7" loading="lazy" />
      </div>
      <div className="services-inner">
        <header className="services-header">
          <div className="services-index">
            <span className="services-index-num">02</span>
            <span className="services-index-sep" aria-hidden="true" />
            <span>Expertise</span>
          </div>
          <h2 className="services-title">
            Integrated <span style={{ color: 'var(--color-accent)' }}>Disciplines.</span>
          </h2>
        </header>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article key={s.id} className="service-item">
              <div className="service-item-bg-wrapper">
                <img src={s.image} alt={s.title} className="service-item-bg" loading="lazy" />
                <div className="service-item-overlay"></div>
              </div>
              <div className="service-item-head">
                <div className="service-item-meta">
                  <s.icon size={28} strokeWidth={1.5} className="service-item-main-icon" />
                  <span className="service-item-id">{s.id}</span>
                </div>
              </div>
              <div className="service-item-bottom">
                <div className="service-item-title-row">
                  <h3 className="service-item-title">{s.title}</h3>
                  <ArrowRight size={24} strokeWidth={1} className="service-item-icon" />
                </div>
                <div className="service-item-desc-wrapper">
                  <p className="service-item-desc">{s.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
