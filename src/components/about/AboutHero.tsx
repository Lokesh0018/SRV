import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, BadgeCheck, GraduationCap, MapPin } from 'lucide-react';
import imgFounder from '../../assets/srv-founder.webp';
import '../../styles/AboutHero.css';

/* Column grid of the structure image (viewBox units) — bubbles A–D, levels 1–3 */
const GRID_X = [92, 238, 384, 530];
const GRID_Y = [196, 296, 396];

const AboutHero: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Blueprint strokes draw in from zero length.
        const strokes = gsap.utils.toArray<SVGGeometryElement>('.ah-draw');
        strokes.forEach((s) => {
          const len = s.getTotalLength();
          gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
        });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.ah-frame', { opacity: 0, duration: 1 }, 0)
          .from('.ah-corner', { opacity: 0, scale: 0.85, transformOrigin: '100% 0%', duration: 0.8 }, 0.2)
          .from('.ah-building', { y: 36, opacity: 0, duration: 1.3 }, 0.1)
          .to(strokes, {
            strokeDashoffset: 0, duration: 1.4, stagger: 0.05, ease: 'power2.inOut',
            // hand the dash pattern back to CSS (centrelines are dashed once drawn)
            onComplete: () => gsap.set(strokes, { clearProps: 'strokeDasharray,strokeDashoffset' }),
          }, 0.3)
          .from('.ah-bubble', { opacity: 0, scale: 0.6, transformOrigin: 'center', duration: 0.5, stagger: 0.04 }, 0.8)
          .from('.ah-card', { y: 24, opacity: 0, duration: 0.9 }, 0.6);

        // Restrained pointer parallax: each layer drifts a few px, nothing rotates.
        if (!window.matchMedia('(pointer: fine)').matches) return;
        const layers = [
          { sel: '.ah-frame', depth: 6 },
          { sel: '.ah-blueprint', depth: 4 },
          { sel: '.ah-building', depth: 12 },
          { sel: '.ah-card', depth: 8 },
        ].map(({ sel, depth }) => ({
          depth,
          x: gsap.quickTo(sel, 'x', { duration: 0.9, ease: 'power3.out' }),
          y: gsap.quickTo(sel, 'y', { duration: 0.9, ease: 'power3.out' }),
        }));

        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { l.x(-nx * l.depth); l.y(-ny * l.depth); });
        };
        const onLeave = () => layers.forEach((l) => { l.x(0); l.y(0); });

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="ah" aria-labelledby="ah-title">
      <div className="ah-gridbg" aria-hidden="true" />

      <div className="ap-container ah-inner">
        {/* ---------- copy ---------- */}
        <div className="ah-copy">
          <p className="ah-eyebrow">Structural Engineering &amp; Construction</p>

          <h1 id="ah-title" className="ah-title">About SRV Associates</h1>
          <p className="ah-accent">
            <span className="ah-accent-inner">Engineering with precision.</span>
          </p>

          <p className="ah-desc">
            Structural engineering and construction consultancy delivering thoughtful design, technical excellence and
            dependable project execution in Visakhapatnam.
          </p>

          <div className="ah-actions">
            <a href="#founder" className="ap-btn ap-btn-primary">
              Meet our team <ArrowDownRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </a>
            <a href="#expertise" className="ap-btn ap-btn-ghost">
              Explore our expertise
            </a>
          </div>

          <p className="ah-meta">
            <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
            Visakhapatnam, Andhra Pradesh
          </p>
        </div>

        {/* ---------- visual ---------- */}
        <div className="ah-visual">
          <div className="ah-frame" aria-hidden="true">
            <span className="ah-corner" />
          </div>

          <svg className="ah-blueprint" viewBox="0 0 620 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {GRID_X.map((x) => (
              <line key={`gx${x}`} className="ah-draw ah-gridline" x1={x} y1={40} x2={x} y2={470} />
            ))}
            {GRID_Y.map((y) => (
              <line key={`gy${y}`} className="ah-draw ah-gridline" x1={40} y1={y} x2={600} y2={y} />
            ))}
            {GRID_X.map((x, i) => (
              <g key={`bx${x}`} className="ah-bubble">
                <circle cx={x} cy={26} r={11} />
                <text x={x} y={30}>{'ABCD'[i]}</text>
              </g>
            ))}
            {GRID_Y.map((y, i) => (
              <g key={`by${y}`} className="ah-bubble">
                <circle cx={26} cy={y} r={11} />
                <text x={26} y={y + 4}>{i + 1}</text>
              </g>
            ))}
            {/* overall dimension line with ticks */}
            <path className="ah-draw ah-dim" d={`M${GRID_X[0]} 500 H${GRID_X[3]}`} />
            {GRID_X.map((x) => (
              <path key={`t${x}`} className="ah-draw ah-dim" d={`M${x - 5} 505 L${x + 5} 495`} />
            ))}
          </svg>

          <img
            className="ah-building"
            src="/assets/srv-hero/06-structure.webp"
            alt="Reinforced concrete frame under construction — columns, beams, slab formwork and scaffolding"
            width={1300}
            height={706}
            fetchPriority="high"
          />

          <figure className="ah-card">
            <span className="ah-avatar"><img src={imgFounder} alt="" decoding="async" /></span>
            <figcaption>
              <span className="ah-card-name">P. Narasimha Murthy</span>
              <span className="ah-card-role">Principal Structural Engineer &amp; Founder</span>
              <span className="ah-card-creds">
                <span><GraduationCap size={14} strokeWidth={2} aria-hidden="true" /> M.Tech (Structures)</span>
                <span><BadgeCheck size={14} strokeWidth={2} aria-hidden="true" /> Licensed Engineer</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
