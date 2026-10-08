import React from 'react';

/*
 * Technical drawing drawn over the scene. Coordinates live in the 1600×900
 * stage space so lines stay registered to the building/structure layers.
 * Every stroke uses pathLength="1" so GSAP can draw it with a 0→1 dashoffset.
 */

const GRID_X = [625, 748, 871, 994, 1117, 1240, 1363, 1486];
const GRID_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const LEVELS = [
  { y: 711, label: 'GL ±0.000' },
  { y: 607, label: 'L1 +3.600' },
  { y: 503, label: 'L2 +7.200' },
  { y: 399, label: 'RF +10.800' },
];

const BlueprintOverlay: React.FC = () => (
  <svg className="srv-blueprint-svg" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
    {/* Structural grid axes */}
    <g className="bp-grid">
      {GRID_X.map((x, i) => (
        <g key={x}>
          <line className="bp-draw" pathLength={1} x1={x} y1={330} x2={x} y2={728} />
          <circle className="bp-draw" pathLength={1} cx={x} cy={314} r={11} />
          <text className="bp-text" x={x} y={318}>{GRID_LABELS[i]}</text>
        </g>
      ))}
    </g>

    {/* Floor levels with elevations */}
    <g className="bp-levels">
      {LEVELS.map((l) => (
        <g key={l.y}>
          <line className="bp-draw bp-dash" pathLength={1} x1={600} y1={l.y} x2={1500} y2={l.y} />
          <path className="bp-draw" pathLength={1} d={`M1500 ${l.y} l-8 -8 h16 z`} />
          <text className="bp-text bp-text-end" x={1488} y={l.y - 6}>{l.label}</text>
        </g>
      ))}
    </g>

    {/* Overall dimension string */}
    <g className="bp-dims">
      <line className="bp-draw" pathLength={1} x1={625} y1={762} x2={1486} y2={762} />
      {[625, 871, 1117, 1363, 1486].map((x) => (
        <line key={x} className="bp-draw" pathLength={1} x1={x - 6} y1={768} x2={x + 6} y2={756} />
      ))}
      <text className="bp-text" x={748} y={754}>7 200</text>
      <text className="bp-text" x={994} y={754}>7 200</text>
      <text className="bp-text" x={1240} y={754}>7 200</text>
      <text className="bp-text" x={1424} y={754}>3 600</text>

      <line className="bp-draw" pathLength={1} x1={600} y1={399} x2={600} y2={711} />
      {[399, 503, 607, 711].map((y) => (
        <line key={y} className="bp-draw" pathLength={1} x1={594} y1={y + 6} x2={606} y2={y - 6} />
      ))}
    </g>

    {/* Orange accents: survey sight line + setting-out markers */}
    <g className="bp-accent">
      <path className="bp-draw" pathLength={1} d="M547 797 L748 711 L1117 711" />
      {[
        [748, 711],
        [1117, 711],
        [1363, 711],
      ].map(([x, y]) => (
        <g key={x} className="bp-marker">
          <circle className="bp-draw" pathLength={1} cx={x} cy={y} r={9} />
          <line className="bp-draw" pathLength={1} x1={x - 16} y1={y} x2={x + 16} y2={y} />
          <line className="bp-draw" pathLength={1} x1={x} y1={y - 16} x2={x} y2={y + 16} />
        </g>
      ))}
      <text className="bp-text bp-text-accent" x={566} y={812}>SET-OUT 01</text>
    </g>
  </svg>
);

export default BlueprintOverlay;
