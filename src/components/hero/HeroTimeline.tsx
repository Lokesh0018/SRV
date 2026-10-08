import React from 'react';

import { STEPS } from './heroData';

interface HeroTimelineProps {
  /** Index of the current phase, driven by scroll progress */
  active: number;
}

const HeroTimeline: React.FC<HeroTimelineProps> = ({ active }) => (
  <div className="srv-timeline-wrap">
    <ol className="srv-timeline" aria-label="Project workflow">
      {STEPS.map((label, i) => (
        <li
          key={label}
          className={`srv-step${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
          aria-current={i === active ? 'step' : undefined}
        >
          <span className="srv-step-tick" aria-hidden="true" />
          <span className="srv-step-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="srv-step-label">{label}</span>
        </li>
      ))}
    </ol>
  </div>
);

export default HeroTimeline;
