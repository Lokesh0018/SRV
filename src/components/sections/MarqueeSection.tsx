import React from 'react';
import '../../styles/MarqueeSection.css';

/**
 * Marquee — a slim dark band that sits directly under the hero.
 * Disciplines and credentials loop across the screen; a static list
 * is rendered for screen readers and for reduced-motion visitors.
 */

const ITEMS: ReadonlyArray<{ label: string; accent?: boolean }> = [
  { label: 'Structural Engineering' },
  { label: 'Architectural Design' },
  { label: 'Construction Management' },
  { label: 'Site Surveying' },
  { label: 'Interiors' },
  { label: '15+ Years', accent: true },
  { label: '100+ Projects', accent: true },
  { label: 'Based in Vizag', accent: true },
];

const Track: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <ul className="marquee-track" aria-hidden={hidden || undefined}>
    {ITEMS.map((item) => (
      <li key={item.label} className={`marquee-item${item.accent ? ' is-accent' : ''}`}>
        <span className="marquee-mark" aria-hidden="true" />
        <span className="marquee-label">{item.label}</span>
      </li>
    ))}
  </ul>
);

const MarqueeSection: React.FC = () => (
  <section className="marquee-section" aria-label="What we do">
    <div className="marquee-viewport">
      <div className="marquee-rail">
        {/* first copy is read by assistive tech; the clones only fill the loop */}
        <Track />
        <Track hidden />
        <Track hidden />
      </div>
    </div>
  </section>
);

export default MarqueeSection;
