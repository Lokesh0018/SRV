import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  MapPin,
  ScanSearch,
  Building2,
  Boxes,
  Construction,
  Sofa,
  Trees,
  BadgeCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = ['Structural Engineering', 'Architecture', 'Construction', 'Interiors'];

const STATS = [
  { value: '15+', label: ['Years', 'Experience'] },
  { value: '100+', label: ['Projects', 'Completed'] },
  { value: '7', label: ['Integrated', 'Services'] },
];

const STEPS = [
  { label: 'Survey', Icon: ScanSearch },
  { label: 'Architecture', Icon: Building2 },
  { label: 'Structure', Icon: Boxes },
  { label: 'Construction', Icon: Construction },
  { label: 'Interiors', Icon: Sofa },
  { label: 'Landscape', Icon: Trees },
  { label: 'Completed', Icon: BadgeCheck },
];

// Depth of each layer: how far it travels as the hero scrolls out (yPercent)
// and how strongly it follows the pointer (px).
const SCROLL_DEPTH = { scene: 18, haze: 30, content: -22, bokeh: 55, timeline: -10 };
const POINTER_DEPTH = { scene: 14, haze: 22, bokeh: 40, content: -8 };

const HeroOverlay: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Entry: scene settles in, copy rises, timeline draws across
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
        intro
          .from('.hp-scene', { scale: 1.12, duration: 2.2, ease: 'power2.out' }, 0)
          .from('.hp-reveal', { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.25)
          .from('.hp-track-fill', { scaleX: 0, duration: 1.6, ease: 'power2.inOut' }, 0.6)
          .from('.hp-step', { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, 0.8);

        // Scroll parallax: each layer drifts at its own speed
        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
        (Object.keys(SCROLL_DEPTH) as (keyof typeof SCROLL_DEPTH)[]).forEach((key) => {
          gsap.to(`[data-depth="${key}"]`, {
            yPercent: SCROLL_DEPTH[key],
            ease: 'none',
            scrollTrigger: scrub,
          });
        });
        gsap.to('.hp-content', { autoAlpha: 0, ease: 'none', scrollTrigger: { ...scrub, end: '70% top' } });

        // Pointer parallax (fine pointers only)
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const movers = (Object.keys(POINTER_DEPTH) as (keyof typeof POINTER_DEPTH)[]).map((key) => ({
          depth: POINTER_DEPTH[key],
          x: gsap.quickTo(`[data-pointer="${key}"]`, 'x', { duration: 1.1, ease: 'power3.out' }),
          y: gsap.quickTo(`[data-pointer="${key}"]`, 'y', { duration: 1.1, ease: 'power3.out' }),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.depth * -1);
            m.y(ny * m.depth * -1);
          });
        };
        const el = root.current!;
        el.addEventListener('pointermove', onMove);
        return () => el.removeEventListener('pointermove', onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="hp" aria-labelledby="hero-heading">
      {/* Layer 1: photographic scene */}
      <div className="hp-layer" data-depth="scene" aria-hidden="true">
        <div className="hp-layer hp-pointer" data-pointer="scene">
          <div className="hp-scene" />
        </div>
      </div>

      {/* Layer 2: warm sunlight haze */}
      <div className="hp-layer" data-depth="haze" aria-hidden="true">
        <div className="hp-layer hp-pointer" data-pointer="haze">
          <div className="hp-sun" />
        </div>
      </div>

      {/* Legibility wash for the copy side */}
      <div className="hp-wash" aria-hidden="true" />

      {/* Layer 3: copy */}
      <div className="hp-layer hp-content-wrap" data-depth="content">
        <div className="hp-pointer hp-content-pointer" data-pointer="content">
          <div className="hp-content">
            <p className="hp-eyebrow hp-reveal">From vision to reality</p>

            <h1 className="hp-heading" id="hero-heading">
              <span className="hp-reveal">Engineering</span>
              <span className="hp-reveal">spaces.</span>
              <span className="hp-reveal hp-accent">Building</span>
              <span className="hp-reveal hp-accent">possibilities.</span>
            </h1>

            <ul className="hp-services hp-reveal">
              {SERVICES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <div className="hp-actions hp-reveal">
              <button type="button" className="hp-btn hp-btn-solid" onClick={() => scrollTo('projects')}>
                Explore our work
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </button>
              <button type="button" className="hp-btn hp-btn-outline" onClick={() => scrollTo('contact')}>
                Start a project
              </button>
            </div>

            <dl className="hp-stats hp-reveal">
              {STATS.map((s) => (
                <div className="hp-stat" key={s.value}>
                  <dt className="hp-stat-value">{s.value}</dt>
                  <dd className="hp-stat-label">
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </dd>
                </div>
              ))}
              <div className="hp-stat hp-stat-loc">
                <dt>
                  <MapPin size={18} strokeWidth={2.25} aria-hidden="true" />
                  <span className="hp-loc-city">Visakhapatnam</span>
                </dt>
                <dd className="hp-stat-label">Andhra Pradesh</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Layer 4: out-of-focus foreground light */}
      <div className="hp-layer hp-bokeh-layer" data-depth="bokeh" aria-hidden="true">
        <div className="hp-layer hp-pointer" data-pointer="bokeh">
          <span className="hp-bokeh hp-bokeh-1" />
          <span className="hp-bokeh hp-bokeh-2" />
          <span className="hp-bokeh hp-bokeh-3" />
          <span className="hp-bokeh hp-bokeh-4" />
        </div>
      </div>

      {/* Ground shade behind the timeline */}
      <div className="hp-ground" aria-hidden="true" />

      {/* Layer 5: process timeline */}
      <div className="hp-timeline-wrap" data-depth="timeline">
        <ol className="hp-timeline" aria-label="Our process">
          <span className="hp-track" aria-hidden="true">
            <span className="hp-track-fill" />
          </span>
          {STEPS.map(({ label, Icon }, i) => (
            <li className={`hp-step${i === 0 ? ' is-active' : ''}`} key={label}>
              <span className="hp-step-icon">
                <Icon size={26} strokeWidth={1.25} aria-hidden="true" />
              </span>
              <span className="hp-step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="hp-step-label">{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HeroOverlay;
