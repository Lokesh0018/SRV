import React from 'react';

/*
 * Technical drawing ghosted over the completed building. Coordinates live in
 * the 1600×900 stage space and are registered to .srv-l-building
 * (x 796–1532, ground y 729, roof y 414) so the lines stay on the architecture
 * and never reach the copy column. Every stroke uses pathLength="1" so GSAP
 * can draw it with a 0→1 dashoffset.
 */

const GRID_X = [810, 952, 1094, 1236, 1378, 1520];
const GRID_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
const LEVELS = [
  { y: 729, label: 'GL ±0.000' },
  { y: 624, label: 'L1 +3.600' },
  { y: 519, label: 'L2 +7.200' },
  { y: 414, label: 'RF +10.800' },
];
const MARKERS = [952, 1236, 1378];

const BlueprintOverlay: React.FC = () => (
  <svg className="srv-blueprint-svg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
    {/* Structural grid axes */}
    <g className="bp-grid">
      {GRID_X.map((x, i) => (
        <g key={x}>
          <line className="bp-draw" pathLength={1} x1={x} y1={402} x2={x} y2={746} />
          <circle className="bp-draw" pathLength={1} cx={x} cy={388} r={10} />
          <text className="bp-text" x={x} y={391.5}>{GRID_LABELS[i]}</text>
        </g>
      ))}
    </g>

    {/* Floor levels with elevations */}
    <g className="bp-levels">
      {LEVELS.map((l) => (
        <g key={l.y}>
          <line className="bp-draw" pathLength={1} x1={796} y1={l.y} x2={1532} y2={l.y} />
          <text className="bp-text bp-text-end" x={1516} y={l.y - 6}>{l.label}</text>
        </g>
      ))}
    </g>

    {/* Overall dimension string under the building */}
    <g className="bp-dims">
      <line className="bp-draw" pathLength={1} x1={810} y1={770} x2={1520} y2={770} />
      {GRID_X.map((x) => (
        <line key={x} className="bp-draw" pathLength={1} x1={x - 5} y1={775} x2={x + 5} y2={765} />
      ))}
      {GRID_X.slice(0, -1).map((x) => (
        <text key={x} className="bp-text" x={x + 71} y={762}>7 100</text>
      ))}
    </g>

    {/* Orange accents: survey sight line + setting-out markers on the ground line */}
    <g className="bp-accent">
      <path className="bp-draw" pathLength={1} d="M585 774 L952 729 L1236 729" />
      {MARKERS.map((x) => (
        <g key={x}>
          <circle className="bp-draw" pathLength={1} cx={x} cy={729} r={7} />
          <line className="bp-draw" pathLength={1} x1={x - 13} y1={729} x2={x + 13} y2={729} />
          <line className="bp-draw" pathLength={1} x1={x} y1={716} x2={x} y2={742} />
        </g>
      ))}
    </g>
  </svg>
);

export default BlueprintOverlay;
