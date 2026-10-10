import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import '../../styles/IdeaSection.css';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: '01',
    title: 'The land',
    copy: 'Survey, soil and site conditions shape every decision before a single line is drawn.',
  },
  {
    num: '02',
    title: 'The structure',
    copy: 'Load paths, materials and safety margins are engineered early, so the design can stand as intended.',
  },
  {
    num: '03',
    title: 'The people',
    copy: 'Spaces planned around how families and teams will actually live, move and work inside them.',
  },
];

/** Bridge out of the hero: continues the "ground to sky" story. */
const IdeaSection: React.FC = () => {
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
            start: 'top 72%',
            toggleActions: 'play none none reverse'
          },
        })
          .from('.idea-index', { autoAlpha: 0, y: 12, duration: 0.6 })
          .from('.idea-title-line', { autoAlpha: 0, y: 36, duration: 0.9, stagger: 0.1, ease: 'expo.out' }, 0.1)
          .from('.idea-aside > *', { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.08 }, 0.35)
          .from('.idea-rule-line', { scaleX: 0, duration: 1.2, ease: 'power2.inOut' }, 0.5)
          .from('.idea-rule-tick', { autoAlpha: 0, duration: 0.4, stagger: 0.08 }, 0.9)
          .from('.idea-pillar', { autoAlpha: 0, y: 28, duration: 0.8, stagger: 0.12 }, 0.9);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="idea" className="idea-section" aria-labelledby="idea-title">
      <div className="idea-inner">
        <header className="idea-head">
          <div>
            <p className="idea-index">
              <span className="idea-index-num">02</span>
              <span className="idea-index-sep" aria-hidden="true" />
              Approach
            </p>
            <h2 className="idea-title" id="idea-title">
              <span className="idea-title-mask"><span className="idea-title-line">From idea</span></span>
              <span className="idea-title-mask">
                <span className="idea-title-line">to built <em>form.</em></span>
              </span>
            </h2>
          </div>

          <div className="idea-aside">
            <p className="idea-copy">
              Every project begins with understanding the land, the structure, and the people who will
              use the space.
            </p>
            <a className="idea-link" href="#contact">
              How we work
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </header>

        {/* dimension line — the same drawing language as the hero blueprint */}
        <div className="idea-rule" aria-hidden="true">
          <span className="idea-rule-line" />
          {PILLARS.map((p, i) => (
            <span key={p.num} className="idea-rule-tick" style={{ left: `${(i / PILLARS.length) * 100}%` }} />
          ))}
          <span className="idea-rule-tick" style={{ left: '100%' }} />
        </div>

        <ol className="idea-pillars">
          {PILLARS.map((p) => (
            <li key={p.num} className="idea-pillar">
              <span className="idea-pillar-num">{p.num}</span>
              <h3 className="idea-pillar-title">{p.title}</h3>
              <p className="idea-pillar-copy">{p.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default IdeaSection;
