import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '../data/services';
import ParallaxIcons from '../components/ParallaxIcons';
import iconTape from '../assets/construction-measuring-tape.webp';
import iconHelmet from '../assets/construction-helmet.webp';
import iconCones from '../assets/construction-cones.webp';
import iconGlasses from '../assets/construction-glasses.webp';
import iconHammer from '../assets/construction-hammer.webp';
import '../styles/ServicesPage.css';

const CONTACT_HREF = '/contact';

const Services: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const activeService = SERVICES[activeIndex];

  React.useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * SERVICES.length);
        } while (next === prev);
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovering]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Services | SRV Associates';

    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          // the 7 builds cell by cell: across the bar, then down the stem
          .from('.sp-cell-item', { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, 0.1);
      });
    }, el);

    return () => {
      ctx.revert();
      document.title = prevTitle;
    };
  }, []);

  return (
    <main ref={root} className="services-page">
      {/* ---------- hero: all seven disciplines at a glance ---------- */}
      <section className="sp-hero" aria-labelledby="sp-title">
        <div className="sp-hero-grid" aria-hidden="true" />
        <div className="sp-container sp-hero-inner">
          <div className="sp-hero-head">
            <p className="sp-eyebrow">Our Services</p>
            <h1 id="sp-title" className="sp-title">
              Seven disciplines. <em>One integrated practice.</em>
            </h1>
          </div>

          <div className="sp-hero-copy">
            <p className="sp-lede" style={{ minHeight: '5.5rem' }}>
              <span key={activeService.id} className="sp-lede-animate" style={{ display: 'block' }}>
                {activeService.desc}
              </span>
            </p>
            <div className="sp-hero-actions">
              <Link to={CONTACT_HREF} className="sp-btn">
                Get Free Consultation <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <a href={`#${SERVICES[0].slug}`} className="sp-btn-ghost">
                View all services <ArrowDown size={16} strokeWidth={2.25} aria-hidden="true" />
              </a>
            </div>
            <dl className="sp-facts">
              <div><dt>Disciplines</dt><dd>07</dd></div>
              <div><dt>Scope</dt><dd>Concept → Completion</dd></div>
              <div><dt>Based in</dt><dd>Visakhapatnam</dd></div>
            </dl>
          </div>

          {/* One solid "7": 01–03 are cells of the bar, 04–07 slices of the slanted stem */}
          <div className="sp-seven" role="navigation" aria-label="Jump to a service">
            <ol className="sp-cells">
              {SERVICES.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <li 
                    key={s.id} 
                    className="sp-cell-item"
                    onMouseEnter={() => { setActiveIndex(idx); setIsHovering(true); }}
                    onMouseLeave={() => setIsHovering(false)}
                    onFocus={() => { setActiveIndex(idx); setIsHovering(true); }}
                    onBlur={() => setIsHovering(false)}
                  >
                    <a href={`#${s.slug}`} className={`sp-cell ${idx === activeIndex ? 'is-active' : ''}`}>
                      <span className="sp-cell-num">{s.id}</span>
                      <span className="sp-cell-main">
                        <span className="sp-cell-icon" aria-hidden="true"><Icon size={20} strokeWidth={1.75} /></span>
                        <span className="sp-cell-label">{s.short}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- individual service cards ---------- */}
      <section ref={listRef} className="sp-list" aria-label="Service details">
        <ParallaxIcons
          containerRef={listRef}
          icons={[
            { src: iconTape, className: 'px-icon-services-1' },
            { src: iconHelmet, className: 'px-icon-services-2' },
            { src: iconCones, className: 'px-icon-services-3' },
            { src: iconGlasses, className: 'px-icon-services-4' },
            { src: iconHammer, className: 'px-icon-services-5' },
          ]}
        />
        <div className="sp-container">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={s.id} id={s.slug} className={`sp-card${i % 2 ? ' is-flipped' : ''}`} aria-labelledby={`${s.slug}-title`}>
                <div className="sp-card-media">
                  <img src={s.image} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="sp-card-badge">{s.id} / 07</span>
                </div>
                <div className="sp-card-body">
                  <span className="sp-card-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.75} /></span>
                  <h2 id={`${s.slug}-title`} className="sp-card-title">{s.title}</h2>
                  <p className="sp-card-desc">{s.desc}</p>
                  {s.detail && <p className="sp-card-detail">{s.detail}</p>}
                  <ul className="sp-card-scope" aria-label={`${s.title} scope`}>
                    {s.scope.map((item) => (
                      <li key={item}><Check size={16} strokeWidth={2.5} aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                  <Link to={`${CONTACT_HREF}?service=${s.slug}`} className="sp-card-link">
                    Discuss your project <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section ref={ctaRef} className="sp-cta" aria-labelledby="sp-cta-title">
        <ParallaxIcons
          containerRef={ctaRef}
          icons={[
            { src: iconHelmet, className: 'px-icon-cta-1' },
            { src: iconTape, className: 'px-icon-cta-2' },
          ]}
        />
        <div className="sp-container">
          <div className="sp-cta-card">
            <div>
              <h2 id="sp-cta-title" className="sp-cta-title">Ready to Start Your Next Project?</h2>
              <p className="sp-cta-text">Let's transform your vision into reality with expert engineering and design solutions</p>
            </div>
            <Link to={CONTACT_HREF} className="sp-btn">
              Get Free Consultation <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
