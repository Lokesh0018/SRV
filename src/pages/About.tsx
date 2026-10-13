import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  Compass,
  GraduationCap,
  Handshake,
  Lightbulb,
  Map,
  PencilRuler,
  Sofa,
  Trophy,
} from 'lucide-react';
import '../styles/AboutPage.css';
import AboutHero from '../components/about/AboutHero';
import ParallaxIcons from '../components/ParallaxIcons';

import imgStructural from '../assets/service-structural-design.webp';
import imgArchitectural from '../assets/service-architectural-planning.webp';
import imgInterior from '../assets/service-interior-design.webp';
import imgVastu from '../assets/service-vastu.webp';
import imgSurvey from '../assets/service-survey-works.webp';
import imgConstruction from '../assets/service-construction.webp';

import iconHelmet from '../assets/construction-helmet.webp';
import iconTape from '../assets/construction-measuring-tape.webp';
import iconCones from '../assets/construction-cones.webp';
import iconVest from '../assets/construction-vest.webp';
import iconGlasses from '../assets/construction-glasses.webp';
import iconMegaphone from '../assets/construction-megaphone.webp';

/* Where the CTAs point. */
const CONTACT_HREF = '/contact';
const SERVICES_HREF = '/services';

import imgFounder from '../assets/srv-founder.webp';

/* Swap in the founder's portrait (e.g. an import from ../assets) when available. */
const FOUNDER_PHOTO: string | null = imgFounder;

const EXPERTISE = ['Structural Design', 'Construction Management', 'Architectural Planning', 'Survey & Layout'];

const STATS = [
  { value: '10+', label: 'Years of excellence' },
  { value: '50+', label: 'Projects delivered' },
  { value: '100%', label: 'Client satisfaction' },
];

const SERVICES = [
  { title: 'Structural Engineering', desc: 'Expert structural design, analysis, and consultation for buildings of all types and scales.', icon: Building2, image: imgStructural },
  { title: 'Architectural Design', desc: 'Creative architectural solutions blending functionality with stunning aesthetics.', icon: PencilRuler, image: imgArchitectural },
  { title: 'Interior Design', desc: 'Transform spaces with personalized interior designs and 3D visualizations.', icon: Sofa, image: imgInterior },
  { title: 'Vastu Consultancy', desc: 'Harmonize traditional Vastu principles with modern engineering excellence.', icon: Compass, image: imgVastu },
  { title: 'Survey & Planning', desc: 'Precise land surveys, topographic mapping, and comprehensive site planning.', icon: Map, image: imgSurvey },
  { title: 'Project Management', desc: 'End-to-end project oversight ensuring timely delivery and quality assurance.', icon: ClipboardCheck, image: imgConstruction },
];

const REASONS = [
  { title: 'Proven Expertise', text: 'Two decades of successful project delivery across diverse sectors' },
  { title: 'Quality Assurance', text: 'Unwavering commitment to safety standards and quality control' },
  { title: 'Client-Centric', text: 'Your vision is our priority—personalized solutions for every need' },
  { title: 'Innovation', text: 'Cutting-edge technology combined with time-tested engineering principles' },
];

const PILLARS = [
  { title: 'Industry Leader', text: 'Recognized as one of the leading structural engineering consultants in Visakhapatnam with a proven track record of excellence.', icon: Trophy },
  { title: 'Innovative Solutions', text: 'Leveraging latest technology and engineering methodologies to deliver optimal, cost-effective solutions.', icon: Lightbulb },
  { title: 'Trust & Integrity', text: 'Built on foundations of transparency, ethical practices, and long-lasting client relationships.', icon: Handshake },
];

const SectionIndex: React.FC<{ num: string; label: string }> = ({ num, label }) => (
  <div className="ap-index ap-reveal">
    <span className="ap-index-num">{num}</span>
    <span className="ap-index-sep" aria-hidden="true" />
    <span>{label}</span>
  </div>
);

const About: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const expertiseRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'About | SRV Associates – Structural Engineering Experts';

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <main ref={root} className="about-page">
      <ParallaxIcons
        containerRef={root}
        icons={[
          { src: iconHelmet, className: 'px-icon-about-1' },
          { src: iconTape, className: 'px-icon-about-2' },
          { src: iconCones, className: 'px-icon-about-3' },
          { src: iconVest, className: 'px-icon-about-4' },
        ]}
      />
      <AboutHero />

      {/* ---------- founder ---------- */}
      <section id="founder" className="ap-founder" aria-labelledby="ap-founder-name">
        <div className="ap-container ap-founder-grid">
          <aside className="ap-profile ap-reveal">
            <div className="ap-portrait">
              {FOUNDER_PHOTO ? (
                <img src={FOUNDER_PHOTO} alt="P. Narasimha Murthy, Principal Structural Engineer and Founder of SRV Associates" loading="lazy" decoding="async" />
              ) : (
                <div className="ap-portrait-placeholder" role="img" aria-label="P. Narasimha Murthy">
                  <span className="ap-monogram">PNM</span>
                </div>
              )}
              <span className="ap-portrait-tag">Founder</span>
            </div>

            <div className="ap-profile-body">
              <h2 id="ap-founder-name" className="ap-profile-name">P. Narasimha Murthy</h2>
              <p className="ap-profile-role">Principal Structural Engineer &amp; Founder</p>
              <p className="ap-profile-fields">Structural Engineering · Construction · Consultancy</p>

              <ul className="ap-badges" aria-label="Credentials">
                <li><GraduationCap size={18} strokeWidth={1.75} aria-hidden="true" /> M.Tech (Structures)</li>
                <li><BadgeCheck size={18} strokeWidth={1.75} aria-hidden="true" /> Licensed Engineer</li>
              </ul>

              <div className="ap-actions">
                <Link to={CONTACT_HREF} className="ap-btn ap-btn-primary">
                  Hire Us <ArrowUpRight size={18} strokeWidth={2.25} aria-hidden="true" />
                </Link>
                <Link to={SERVICES_HREF} className="ap-btn ap-btn-ghost">
                  View Services
                </Link>
              </div>
            </div>
          </aside>

          <div className="ap-founder-copy">
            <SectionIndex num="01" label="Meet the founder" />

            <ul className="ap-chips ap-reveal" aria-label="Areas of expertise">
              {EXPERTISE.map((e) => <li key={e}>{e}</li>)}
            </ul>

            <div className="ap-bio">
              <p className="ap-bio-lead ap-reveal">
                With over 20 years of distinguished experience in structural engineering, P. Narasimha Murthy has been
                the driving force behind SRV Associates' success in the Visakhapatnam region. His expertise spans across
                residential, commercial, and infrastructure projects, bringing innovative solutions and unwavering
                commitment to quality.
              </p>
              <p className="ap-reveal">
                As a licensed structural engineer with an M.Tech specialization, he combines technical excellence with a
                deep understanding of client needs, ensuring every project is delivered with precision, safety, and
                aesthetic appeal.
              </p>
              <p className="ap-reveal">
                Our comprehensive service portfolio includes RCC structural design, building construction, architectural
                planning, interior design, landscape development, land surveying, and Vastu consultancy throughout
                Visakhapatnam.
              </p>
            </div>

            <dl className="ap-stats ap-reveal">
              {STATS.map((s) => (
                <div key={s.label} className="ap-stat">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>

            <figure className="ap-quote ap-reveal">
              <blockquote>
                “Engineering safe, efficient, and elegant structures — balancing innovation with practical execution for
                every project.”
              </blockquote>
              <figcaption>— P. Narasimha Murthy</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section id="expertise" ref={expertiseRef} className="ap-services" aria-labelledby="ap-services-title">
        <ParallaxIcons
          containerRef={expertiseRef}
          icons={[
            { src: iconGlasses, className: 'px-icon-expertise-1' },
            { src: iconMegaphone, className: 'px-icon-expertise-2' },
          ]}
        />
        <div className="ap-container">
          <div className="ap-section-head">
            <SectionIndex num="02" label="What we do" />
            <h2 id="ap-services-title" className="ap-h2 ap-reveal">
              Comprehensive <em>Engineering Solutions</em>
            </h2>
            <p className="ap-lede ap-reveal">From concept to completion, we deliver excellence across all aspects of construction</p>
          </div>

          <ul className="ap-service-grid">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="ap-service ap-reveal">
                  <div className="ap-service-media">
                    <img src={s.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="ap-service-body">
                    <span className="ap-service-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.75} /></span>
                    <span className="ap-service-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="ap-service-title">{s.title}</h3>
                    <p className="ap-service-desc">{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- why choose us ---------- */}
      <section className="ap-why" aria-labelledby="ap-why-title">
        <div className="ap-container ap-why-grid">
          <div className="ap-why-copy">
            <SectionIndex num="03" label="Why choose us" />
            <h2 id="ap-why-title" className="ap-h2 ap-reveal">
              Excellence in <em>Every Project</em>
            </h2>
            <p className="ap-lede ap-reveal">
              At SRV Associates, we don't just build structures—we create lasting legacies. Our commitment to quality,
              innovation, and client satisfaction sets us apart in the industry.
            </p>
            <ul className="ap-reasons">
              {REASONS.map((r) => (
                <li key={r.title} className="ap-reason ap-reveal">
                  <span className="ap-check" aria-hidden="true"><Check size={16} strokeWidth={2.5} /></span>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ul className="ap-pillars">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.title} className="ap-pillar ap-reveal">
                  <span className="ap-pillar-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.75} /></span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section ref={ctaRef} className="ap-cta" aria-labelledby="ap-cta-title">
        <ParallaxIcons
          containerRef={ctaRef}
          icons={[
            { src: iconHelmet, className: 'px-icon-cta-1' },
            { src: iconTape, className: 'px-icon-cta-2' },
          ]}
        />
        <div className="ap-container">
          <div className="ap-cta-card ap-reveal">
            <div>
              <h2 id="ap-cta-title" className="ap-cta-title">Ready to Start Your Next Project?</h2>
              <p className="ap-cta-text">Let's transform your vision into reality with expert engineering and design solutions</p>
            </div>
            <div className="ap-actions">
              <Link to={CONTACT_HREF} className="ap-btn ap-btn-light">
                Get Free Consultation <ArrowRight size={18} strokeWidth={2.25} aria-hidden="true" />
              </Link>
              <Link to={SERVICES_HREF} className="ap-btn ap-btn-outline-light">
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
