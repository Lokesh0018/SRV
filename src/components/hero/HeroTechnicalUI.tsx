import React from 'react';
import { STEPS } from './heroData';

interface HeroTechnicalUIProps {
  active: number;
}

/** Small monospace annotations, like the title block on a drawing sheet. */
const HeroTechnicalUI: React.FC<HeroTechnicalUIProps> = ({ active }) => (
  <aside className="srv-hud" aria-label="Project data">
    <dl>
      <div className="srv-hud-row">
        <dt>Coordinates</dt>
        <dd>17&deg;41&prime; N<br />83&deg;13&prime; E</dd>
      </div>
      <div className="srv-hud-row">
        <dt>Project</dt>
        <dd>SRV / 001</dd>
      </div>
      <div className="srv-hud-row">
        <dt>Discipline</dt>
        <dd>Architecture + Structural</dd>
      </div>
      <div className="srv-hud-row">
        <dt>Status</dt>
        <dd>
          <span className="srv-hud-live" aria-hidden="true" />
          {active >= STEPS.length - 1 ? 'Completed' : 'In development'}
        </dd>
      </div>
      <div className="srv-hud-row">
        <dt>Phase</dt>
        <dd>{String(active + 1).padStart(2, '0')} &mdash; {STEPS[active]}</dd>
      </div>
    </dl>
  </aside>
);

export default HeroTechnicalUI;
