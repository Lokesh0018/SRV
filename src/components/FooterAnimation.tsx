import React, { useEffect, useId, useRef, useSyncExternalStore } from 'react';
import '../styles/FooterAnimation.css';

/*
 * Decorative construction landscape behind the footer content.
 *
 * Layout rule: the footer text leaves only ~48px free along the bottom edge, so
 * every full-width layer (mountains, skyline, road, vehicle lanes) stays below
 * that line. Taller pieces (sun, crane, excavator, turbines) are placed in
 * "anchor" grids that mirror .footer-grid, so they land in the open space
 * under the Explore column or in the outer gutters and never cross text.
 *
 * Vehicles drive on two lanes. Each lane is one SVG holding several identical
 * tiles of the convoy; the SVG translates by exactly one tile per loop, so the
 * convoy is seamless and vehicles in a lane never change spacing (no collisions).
 * Wheel spin periods are derived from lane speed: period = 2πr / v.
 */

const C = {
  orange: '#F36A16',
  orangeDk: '#D2560D',
  terracotta: '#C9653C',
  char: '#2B2F36',
  charDk: '#1C1F24',
  steel: '#4B5563',
  gray: '#9CA3AF',
  light: '#D1D5DB',
  pale: '#E5E7EB',
  white: '#FFFFFF',
  glass: '#C4E3EC',
  line: '#1C1F24',
  scene: '#CBD5E1',
  sceneDk: '#B6C1CE',
};

const OUTLINE = { stroke: C.line, strokeWidth: 0.8, strokeLinejoin: 'round' as const };

/* ---------- motion preferences ---------- */

const RM_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeRM = (cb: () => void) => {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(subscribeRM, () => window.matchMedia(RM_QUERY).matches, () => false);

/** SMIL rotation that is simply omitted under reduced motion. */
const Swing: React.FC<{ values: string; dur: string; still: boolean }> = ({ values, dur, still }) =>
  still ? null : (
    <animateTransform
      attributeName="transform"
      type="rotate"
      values={values}
      dur={dur}
      keyTimes="0;0.5;1"
      calcMode="spline"
      keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
      repeatCount="indefinite"
    />
  );

/* ---------- vehicle parts (ground at y = 0, facing right) ---------- */

/** Wheel with an off-centre marker so rotation reads; spins at the lane's ground speed. */
const Wheel: React.FC<{ x: number; r: number; v: number }> = ({ x, r, v }) => (
  <g transform={`translate(${x} ${-r})`}>
    <g className="fa-wheel fa-anim" style={{ animationDuration: `${((2 * Math.PI * r) / v).toFixed(3)}s` }}>
      <circle r={r} fill={C.charDk} />
      <circle r={r * 0.58} fill={C.gray} />
      {[45, 135, 225, 315].map((a) => (
        <circle
          key={a}
          cx={r * 0.36 * Math.cos((a * Math.PI) / 180)}
          cy={r * 0.36 * Math.sin((a * Math.PI) / 180)}
          r={r * 0.09}
          fill={C.steel}
        />
      ))}
      <circle r={r * 0.18} fill={C.steel} />
      <rect x={-r * 0.07} y={-r * 0.56} width={r * 0.14} height={r * 0.16} fill={C.white} />
    </g>
  </g>
);

/** Truck cab: rounded rear roof, raked windscreen, white trim, headlight and bumper. */
const Cab: React.FC<{ x: number; w: number; h: number; body?: string; twoTone?: boolean }> = ({
  x, w, h, body = C.orange, twoTone = false,
}) => (
  <g>
    <path
      d={`M${x} -10 V${-h + 3} Q${x} ${-h} ${x + 3} ${-h} H${x + w * 0.6} L${x + w} ${-h * 0.55} V-10 Z`}
      fill={body}
      {...OUTLINE}
    />
    {twoTone && (
      <>
        <path d={`M${x} -10 V-17 H${x + w} V-10 Z`} fill={C.char} />
        <path d={`M${x + 0.4} ${-h + 3} Q${x + 0.4} ${-h + 0.4} ${x + 3} ${-h + 0.4} H${x + w * 0.6} L${x + w * 0.66} ${-h + 3.2} Z`} fill={C.char} />
      </>
    )}
    <path
      d={`M${x + 3} ${-h + 3.5} H${x + w * 0.57} L${x + w - 3} ${-h * 0.58} H${x + 3} Z`}
      fill={C.glass}
      stroke={C.line}
      strokeWidth={0.6}
    />
    <line x1={x + 4.5} y1={-h + 5} x2={x + w * 0.42} y2={-h + 5} stroke={C.white} strokeWidth={1} opacity={0.85} />
    <rect x={x + 2} y={-h * 0.5} width={w - 4} height={1.6} fill={C.white} opacity={0.9} />
    <rect x={x + w - 1.6} y={-h * 0.46} width={1.8} height={2.6} fill={C.white} />
    <rect x={x + w - 2} y={-13} width={4} height={4} rx={1} fill={C.char} />
  </g>
);

const Chassis: React.FC<{ x: number; w: number }> = ({ x, w }) => (
  <rect x={x} y={-14} width={w} height={4} fill={C.char} />
);

/* ---------- vehicles ---------- */

type VehicleProps = { v: number };

const DumpTruck: React.FC<VehicleProps> = ({ v }) => (
  <g>
    <Chassis x={4} w={92} />
    <g className="fa-dump-bed fa-anim">
      <path d="M5,-36 Q20,-42 34,-37 Q48,-43 64,-36 Z" fill={C.gray} />
      <path d="M6,-14 L66,-14 L69,-35 L2,-35 Z" fill={C.orange} {...OUTLINE} />
      {[17, 30, 43, 56].map((x) => (
        <line key={x} x1={x} y1={-33} x2={x} y2={-16} stroke={C.orangeDk} strokeWidth={1.4} />
      ))}
      <rect x={1} y={-37} width={69} height={3} rx={1} fill={C.orangeDk} {...OUTLINE} />
      <line x1={5} y1={-32} x2={40} y2={-32} stroke={C.white} strokeWidth={0.9} opacity={0.7} />
    </g>
    <Cab x={71} w={27} h={32} />
    <Wheel x={18} r={7} v={v} />
    <Wheel x={32} r={7} v={v} />
    <Wheel x={87} r={7} v={v} />
  </g>
);

const MixerTruck: React.FC<VehicleProps & { clipId: string }> = ({ v, clipId }) => (
  <g>
    <Chassis x={4} w={100} />
    <path d="M14,-14 L18,-21 L24,-14 Z" fill={C.steel} />
    <path d="M66,-14 L71,-23 L76,-14 Z" fill={C.steel} />
    <g transform="rotate(-6 42 -27)">
      <rect x={10} y={-36} width={64} height={18} rx={9} fill={C.light} {...OUTLINE} />
      <g clipPath={`url(#${clipId})`}>
        <g className="fa-drum fa-anim">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${2 + i * 12},-36 h5 l-8,18 h-5 Z`} fill={C.orange} opacity={0.9} />
          ))}
        </g>
      </g>
      <line x1={18} y1={-33.2} x2={62} y2={-33.2} stroke={C.white} strokeWidth={1.2} opacity={0.8} />
      <ellipse cx={74} cy={-27} rx={2.6} ry={7.5} fill={C.steel} />
      <path d="M11,-31 L5,-25 L4,-20" fill="none" stroke={C.char} strokeWidth={2} strokeLinecap="round" />
    </g>
    <rect x={79} y={-29} width={4} height={15} rx={2} fill={C.pale} stroke={C.line} strokeWidth={0.5} />
    <Cab x={84} w={24} h={31} />
    <Wheel x={16} r={7} v={v} />
    <Wheel x={30} r={7} v={v} />
    <Wheel x={96} r={7} v={v} />
  </g>
);

const MaterialLorry: React.FC<VehicleProps> = ({ v }) => (
  <g>
    <Chassis x={4} w={136} />
    <rect x={2} y={-18} width={108} height={5} fill={C.char} {...OUTLINE} />
    <rect x={2} y={-16} width={108} height={1.6} fill={C.orange} />
    {/* bricks */}
    <rect x={6} y={-21} width={28} height={3} fill={C.steel} />
    <rect x={7} y={-34} width={26} height={13} fill={C.terracotta} {...OUTLINE} />
    {[-29.7, -25.4].map((y) => (
      <line key={y} x1={7.5} y1={y} x2={32.5} y2={y} stroke={C.white} strokeWidth={0.6} opacity={0.75} />
    ))}
    {[13.5, 20, 26.5].map((x) => (
      <line key={x} x1={x} y1={-34} x2={x} y2={-29.7} stroke={C.white} strokeWidth={0.6} opacity={0.75} />
    ))}
    {[10, 17, 24, 30].map((x) => (
      <line key={x} x1={x} y1={-25.4} x2={x} y2={-21} stroke={C.white} strokeWidth={0.6} opacity={0.75} />
    ))}
    {/* cement bags */}
    <rect x={38} y={-21} width={30} height={3} fill={C.steel} />
    {[-25.4, -29.6, -33.8].map((y) =>
      [39, 53.5].map((x) => (
        <rect key={`${x}${y}`} x={x} y={y} width={14} height={4.2} rx={2} fill={C.pale} stroke={C.gray} strokeWidth={0.6} />
      )),
    )}
    {/* steel pipes */}
    {[-22, -25.8, -29.6].map((y) => (
      <g key={y}>
        <rect x={72} y={y} width={34} height={3.8} rx={1.9} fill={C.gray} {...OUTLINE} strokeWidth={0.5} />
        <line x1={74} y1={y + 1.1} x2={104} y2={y + 1.1} stroke={C.white} strokeWidth={0.6} opacity={0.8} />
      </g>
    ))}
    {[80, 98].map((x) => (
      <rect key={x} x={x} y={-30.6} width={2} height={12.6} fill={C.orange} />
    ))}
    {/* headboard */}
    <rect x={110} y={-36} width={3} height={23} fill={C.char} />
    <Cab x={114} w={27} h={33} twoTone />
    <Wheel x={20} r={7} v={v} />
    <Wheel x={34} r={7} v={v} />
    <Wheel x={129} r={7} v={v} />
  </g>
);

const HeavyHauler: React.FC<VehicleProps> = ({ v }) => (
  <g>
    {/* tractor */}
    <rect x={124} y={-16} width={72} height={4} fill={C.char} />
    <rect x={128} y={-21} width={18} height={5} fill={C.charDk} />
    <rect x={149} y={-15} width={12} height={6} rx={2} fill={C.gray} {...OUTLINE} strokeWidth={0.5} />
    <rect x={158} y={-42} width={2.4} height={27} rx={1} fill={C.steel} />
    <Cab x={162} w={34} h={38} />
    {/* lowboy trailer */}
    <path d="M2,-18 H114 L122,-26 H146 V-21 H125 L117,-13 H2 Z" fill={C.char} {...OUTLINE} />
    <rect x={2} y={-18} width={112} height={1.6} fill={C.orange} />
    <rect x={1} y={-17} width={2} height={3} fill={C.orange} />
    {/* cargo: road roller, chained down */}
    <line x1={46} y1={-29} x2={38} y2={-18} stroke={C.gray} strokeWidth={0.9} strokeDasharray="1.4 0.8" />
    <line x1={102} y1={-29} x2={110} y2={-18} stroke={C.gray} strokeWidth={0.9} strokeDasharray="1.4 0.8" />
    <circle cx={52} cy={-25} r={7} fill={C.charDk} />
    <circle cx={52} cy={-25} r={3.6} fill={C.gray} />
    <rect x={84} y={-37} width={19} height={4} rx={1} fill={C.orangeDk} {...OUTLINE} />
    <circle cx={94} cy={-25.5} r={7.5} fill={C.steel} {...OUTLINE} />
    <line x1={88} y1={-25.5} x2={100} y2={-25.5} stroke={C.gray} strokeWidth={1} />
    <rect x={44} y={-38} width={40} height={10} rx={2} fill={C.orange} {...OUTLINE} />
    {[50, 54, 58].map((x) => (
      <line key={x} x1={x} y1={-36} x2={x} y2={-30} stroke={C.orangeDk} strokeWidth={1.2} />
    ))}
    <rect x={64} y={-42} width={9} height={4} rx={1} fill={C.charDk} />
    <line x1={76} y1={-38} x2={79} y2={-42} stroke={C.charDk} strokeWidth={1.2} />
    <line x1={46} y1={-36.5} x2={70} y2={-36.5} stroke={C.white} strokeWidth={0.9} opacity={0.8} />
    {/* axles: three on the trailer, three on the tractor */}
    <Wheel x={12} r={6} v={v} />
    <Wheel x={25} r={6} v={v} />
    <Wheel x={38} r={6} v={v} />
    <Wheel x={134} r={7} v={v} />
    <Wheel x={149} r={7} v={v} />
    <Wheel x={185} r={7} v={v} />
  </g>
);

const UtilityPickup: React.FC<VehicleProps> = ({ v }) => (
  <g>
    <rect x={4} y={-13} width={66} height={3} fill={C.char} />
    <rect x={2} y={-24} width={38} height={14} rx={1} fill={C.white} {...OUTLINE} />
    <path d="M40,-10 V-30 Q40,-32 42,-32 H56 L64,-22 H70 Q72,-22 72,-20 V-10 Z" fill={C.white} {...OUTLINE} />
    <path d="M43,-29 H55 L61,-22.5 H43 Z" fill={C.glass} stroke={C.line} strokeWidth={0.6} />
    <rect x={2} y={-19} width={70} height={2.4} fill={C.orange} />
    <rect x={6} y={-31} width={34} height={1.6} fill={C.char} />
    {[8, 22, 36].map((x) => (
      <rect key={x} x={x} y={-31} width={1.4} height={7} fill={C.char} />
    ))}
    <rect x={45} y={-34.5} width={8} height={2.5} rx={1} fill={C.orange} />
    <rect x={70} y={-13} width={3.5} height={3.5} rx={1} fill={C.char} />
    <Wheel x={15} r={6.5} v={v} />
    <Wheel x={59} r={6.5} v={v} />
  </g>
);

const WaterTanker: React.FC<VehicleProps> = ({ v }) => (
  <g>
    <Chassis x={4} w={104} />
    <line x1={10} y1={-38.5} x2={72} y2={-38.5} stroke={C.gray} strokeWidth={0.8} />
    {[12, 30, 48, 66].map((x) => (
      <line key={x} x1={x} y1={-38.5} x2={x} y2={-35.5} stroke={C.gray} strokeWidth={0.8} />
    ))}
    <rect x={4} y={-36} width={74} height={22} rx={10} fill={C.light} {...OUTLINE} />
    <rect x={5} y={-25.5} width={72} height={2.6} fill={C.orange} />
    {[22, 40, 58].map((x) => (
      <rect key={x} x={x} y={-36} width={2.4} height={22} fill={C.gray} />
    ))}
    <line x1={14} y1={-32.5} x2={68} y2={-32.5} stroke={C.white} strokeWidth={1.2} opacity={0.85} />
    <rect x={1} y={-21} width={3} height={4} fill={C.steel} />
    <Cab x={82} w={28} h={32} />
    <Wheel x={18} r={7} v={v} />
    <Wheel x={32} r={7} v={v} />
    <Wheel x={99} r={7} v={v} />
  </g>
);

/* ---------- lanes ---------- */

const LANE_H = 46;
const GROUND_Y = 44;

type LaneVehicle = { x: number; len: number; render: (v: number) => React.ReactNode };

const Lane: React.FC<{
  className: string;
  tile: number;
  tiles: number;
  duration: number;
  reverse?: boolean;
  vehicles: LaneVehicle[];
  defs?: React.ReactNode;
}> = ({ className, tile, tiles, duration, reverse = false, vehicles, defs }) => {
  const v = tile / duration; // ground speed in viewBox units per second
  const width = tile * tiles;
  return (
    <div className={`fa-lane ${className}`}>
      <svg
        className="fa-lane-svg fa-anim"
        viewBox={`0 0 ${width} ${LANE_H}`}
        style={{
          aspectRatio: `${width} / ${LANE_H}`,
          animationDuration: `${duration}s`,
          ['--fa-shift' as string]: `${-100 / tiles}%`,
        }}
      >
        {defs && <defs>{defs}</defs>}
        {Array.from({ length: tiles }, (_, t) => (
          <g key={t} transform={`translate(${t * tile} ${GROUND_Y})`}>
            {vehicles.map((veh, i) => (
              <g
                key={i}
                transform={reverse ? `translate(${veh.x + veh.len} 0) scale(-1 1)` : `translate(${veh.x} 0)`}
              >
                {veh.render(v)}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ---------- site machinery & scenery ---------- */

const Excavator: React.FC<{ still: boolean }> = ({ still }) => (
  <svg className="fa-excavator" viewBox="-2 -76 140 78" aria-hidden="true">
    <path d="M100,0 Q118,-15 137,0 Z" fill="#D6D3CE" />
    <circle cx={112} cy={-4} r={1.2} fill={C.gray} />
    <circle cx={122} cy={-6} r={1} fill={C.gray} />
    {/* undercarriage */}
    <rect x={0} y={-12} width={62} height={12} rx={6} fill={C.char} {...OUTLINE} />
    <rect x={3} y={-10} width={56} height={8} rx={4} fill={C.charDk} />
    {[9, 20, 31, 42, 53].map((x) => (
      <circle key={x} cx={x} cy={-6} r={3} fill={C.steel} />
    ))}
    <rect x={14} y={-16} width={34} height={4} fill={C.steel} />
    {/* house & counterweight */}
    <path d="M0,-16 V-30 Q0,-35 5,-35 H32 V-16 Z" fill={C.orange} {...OUTLINE} />
    {[7, 11, 15].map((x) => (
      <line key={x} x1={x} y1={-31} x2={x} y2={-21} stroke={C.orangeDk} strokeWidth={1.4} />
    ))}
    <line x1={3} y1={-33} x2={28} y2={-33} stroke={C.white} strokeWidth={0.9} opacity={0.75} />
    {/* cab */}
    <path d="M32,-16 V-46 H45 L51,-33 V-16 Z" fill={C.char} {...OUTLINE} />
    <path d="M35,-43 H44 L48.5,-33 H35 Z" fill={C.glass} />
    {/* boom → stick → bucket, each pivoting on its own joint */}
    <g>
      <Swing values="0 47 -26;-5 47 -26;0 47 -26" dur="6s" still={still} />
      <line x1={40} y1={-20} x2={58} y2={-46} stroke={C.steel} strokeWidth={3.2} strokeLinecap="round" />
      <line x1={50} y1={-34} x2={58} y2={-46} stroke={C.pale} strokeWidth={1.5} />
      <path d="M44,-24 Q50,-52 76,-62 L82,-60 L84,-54 Q60,-48 54,-22 Z" fill={C.orange} {...OUTLINE} />
      <line x1={52} y1={-38} x2={70} y2={-56} stroke={C.white} strokeWidth={0.9} opacity={0.7} />
      <g>
        <Swing values="0 81 -58;8 81 -58;0 81 -58" dur="6s" still={still} />
        <line x1={66} y1={-57} x2={82} y2={-67} stroke={C.steel} strokeWidth={2.6} strokeLinecap="round" />
        <path d="M78,-61 L80,-68 L86,-66 L84,-62 L100,-22 L94,-20 Z" fill={C.orangeDk} {...OUTLINE} />
        <g>
          <Swing values="0 97 -21;-16 97 -21;0 97 -21" dur="6s" still={still} />
          <path d="M93,-23 L104,-22 L108,-8 Q101,-1 92,-9 Z" fill={C.charDk} {...OUTLINE} />
          <path d="M106,-9 l2.5,2.5 M102,-5.5 l1.8,3" stroke={C.charDk} strokeWidth={1.4} />
        </g>
      </g>
    </g>
  </svg>
);

/** Tower crane: lattice mast, jib and counter-jib with tie bars — deliberately no hook or cable. */
const TowerCrane: React.FC = () => (
  <svg className="fa-crane" viewBox="0 -120 150 120" aria-hidden="true">
    <rect x={38} y={-4} width={20} height={4} fill={C.sceneDk} />
    <line x1={44} y1={-4} x2={44} y2={-98} stroke={C.sceneDk} strokeWidth={1.6} />
    <line x1={52} y1={-4} x2={52} y2={-98} stroke={C.sceneDk} strokeWidth={1.6} />
    <path
      d={Array.from({ length: 12 }, (_, i) => `M44,${-4 - i * 8} L52,${-12 - i * 8}`).join(' ')}
      stroke={C.scene}
      strokeWidth={0.9}
    />
    {/* jib */}
    <line x1={14} y1={-104} x2={146} y2={-104} stroke={C.sceneDk} strokeWidth={1.4} />
    <line x1={14} y1={-99} x2={146} y2={-101} stroke={C.sceneDk} strokeWidth={1.4} />
    <path
      d={Array.from({ length: 11 }, (_, i) => `M${54 + i * 8},-104 L${58 + i * 8},-100.5`).join(' ')}
      stroke={C.scene}
      strokeWidth={0.8}
    />
    <rect x={14} y={-106} width={11} height={9} fill={C.gray} />
    {/* apex + tie bars */}
    <path d="M44,-104 L48,-119 L52,-104 Z" fill={C.sceneDk} />
    <line x1={48} y1={-119} x2={124} y2={-104} stroke={C.sceneDk} strokeWidth={0.8} />
    <line x1={48} y1={-119} x2={18} y2={-106} stroke={C.sceneDk} strokeWidth={0.8} />
    <rect x={42} y={-104} width={12} height={6} fill={C.sceneDk} />
    <rect x={52} y={-103} width={7} height={6} rx={1} fill={C.orange} />
    <rect x={55} y={-101.5} width={3} height={2.6} fill={C.glass} />
  </svg>
);

/** Three-blade wind turbine viewed head-on; blades rotate about the hub. */
const Turbine: React.FC<{ hub: number; dur: number; still: boolean; className?: string }> = ({
  hub, dur, still, className = '',
}) => {
  const L = hub * 0.38;
  const blade = `M-1.1,-2 Q2.6,${-L * 0.28} 0.7,${-L} L-0.3,${-L} Q-1.6,${-L * 0.45} -1.1,-2 Z`;
  return (
    <svg
      className={`fa-turbine ${className}`}
      viewBox={`${-L - 2} ${-hub - L - 2} ${2 * L + 4} ${hub + L + 2}`}
      style={{ height: hub + L + 2 }}
      aria-hidden="true"
    >
      <path d={`M-2.4,0 L2.4,0 L1.2,${-hub} L-1.2,${-hub} Z`} fill={C.scene} />
      <g transform={`translate(0 ${-hub})`}>
        <g>
          {!still && (
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${dur}s`} repeatCount="indefinite" />
          )}
          {[0, 120, 240].map((a) => (
            <path key={a} d={blade} fill={C.sceneDk} transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r={2.4} fill={C.gray} />
      </g>
    </svg>
  );
};

const Cloud: React.FC<{ className: string; w: number }> = ({ className, w }) => (
  <svg className={`fa-cloud fa-anim ${className}`} viewBox="0 0 60 22" style={{ width: w }} aria-hidden="true">
    <path d="M8,21 Q0,21 1,15 Q2,10 9,11 Q11,3 20,4 Q26,-1 33,4 Q41,1 44,9 Q53,7 56,13 Q60,21 51,21 Z" fill="#EEF2F6" />
  </svg>
);

/* Full-width background layers: wide viewBox, sliced so nothing is distorted. */

const MOUNTAIN_BACK = [0, 20, 130, 38, 260, 16, 380, 30, 470, 12, 600, 40, 760, 18, 880, 34, 990, 14, 1120, 42, 1260, 20, 1380, 32, 1500, 12, 1640, 38, 1790, 16, 1900, 30, 2010, 14, 2150, 40, 2290, 18, 2400, 26];
const MOUNTAIN_FRONT = [0, 8, 90, 24, 200, 6, 320, 22, 420, 4, 540, 28, 680, 8, 800, 20, 930, 6, 1050, 26, 1180, 8, 1310, 22, 1440, 6, 1570, 24, 1700, 8, 1840, 26, 1960, 6, 2080, 22, 2220, 8, 2330, 20, 2400, 10];
const ridge = (pts: number[], h: number) => {
  let d = `M0,${h}`;
  for (let i = 0; i < pts.length; i += 2) d += ` L${pts[i]},${h - pts[i + 1]}`;
  return `${d} L2400,${h} Z`;
};

const Mountains: React.FC = () => (
  <svg className="fa-wide fa-mountains" viewBox="0 0 2400 46" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <path d={ridge(MOUNTAIN_BACK, 46)} fill="#EEF1F5" />
    <path d={ridge(MOUNTAIN_FRONT, 46)} fill="#E6EAF0" />
  </svg>
);

type Bld = [x: number, w: number, h: number, kind: 'block' | 'shed' | 'silo' | 'stack'];
const SKYLINE_SEGMENT: Bld[] = [
  [20, 46, 22, 'shed'], [70, 18, 30, 'block'], [92, 10, 36, 'stack'], [150, 14, 24, 'silo'], [166, 14, 24, 'silo'],
  [240, 30, 18, 'block'], [272, 22, 28, 'block'], [360, 56, 20, 'shed'], [420, 8, 34, 'stack'],
  [500, 26, 26, 'block'], [528, 16, 20, 'block'], [610, 14, 22, 'silo'], [650, 50, 18, 'shed'], [720, 20, 32, 'block'],
];
const Skyline: React.FC = () => (
  <svg className="fa-wide fa-skyline" viewBox="0 0 2400 40" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    {[0, 800, 1600].map((off) =>
      SKYLINE_SEGMENT.map(([x, w, h, kind], i) => {
        const X = x + off;
        const top = 40 - h;
        switch (kind) {
          case 'shed':
            return (
              <path
                key={`${off}-${i}`}
                d={`M${X},40 V${top + 6} ${Array.from({ length: Math.floor(w / 10) }, (_, k) => `L${X + k * 10 + 10},${top} V${top + 6}`).join(' ')} H${X + w} V40 Z`}
                fill="#DCE2EA"
              />
            );
          case 'silo':
            return <rect key={`${off}-${i}`} x={X} y={top} width={w} height={h} rx={w / 2} fill="#D5DCE5" />;
          case 'stack':
            return <rect key={`${off}-${i}`} x={X + w / 2 - 2} y={top} width={4} height={h} fill="#D5DCE5" />;
          default:
            return (
              <g key={`${off}-${i}`}>
                <rect x={X} y={top} width={w} height={h} fill="#DCE2EA" />
                {Array.from({ length: Math.floor((h - 6) / 6) }, (_, r) => (
                  <rect key={r} x={X + 3} y={top + 4 + r * 6} width={w - 6} height={1.6} fill="#EEF1F5" />
                ))}
              </g>
            );
        }
      }),
    )}
  </svg>
);

/* ---------- scene ---------- */

const FooterAnimation: React.FC = () => {
  const still = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const drumClip = `fa-drum-${useId().replace(/:/g, '')}`;

  // Pause CSS + SMIL animation while the footer is off-screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      root.toggleAttribute('data-paused', !visible);
      root.querySelectorAll('svg').forEach((svg) => (visible ? svg.unpauseAnimations() : svg.pauseAnimations()));
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div className="footer-animation-wrapper" ref={rootRef} aria-hidden="true">
      {/* sky: sun and clouds sit behind the hills */}
      <div className="fa-anchors fa-z-sky">
        <div className="fa-slot fa-slot-sun">
          <div className="fa-sun" />
          <Cloud className="fa-cloud-sun" w={52} />
        </div>
        <div className="fa-slot fa-slot-gutter-l">
          <Cloud className="fa-cloud-gutter" w={44} />
        </div>
        <div className="fa-slot fa-slot-gutter-r">
          <Cloud className="fa-cloud-gutter" w={48} />
        </div>
      </div>

      <Mountains />
      <Skyline />

      {/* middle ground: turbines + crane in the open areas */}
      <div className="fa-anchors fa-z-mid">
        <div className="fa-slot fa-slot-gutter-l">
          <div className="fa-prop-row">
            <Turbine hub={58} dur={11} still={still} />
            <Turbine hub={80} dur={8} still={still} />
          </div>
        </div>
        <div className="fa-slot fa-slot-crane">
          <TowerCrane />
        </div>
        <div className="fa-slot fa-slot-gutter-r">
          <div className="fa-prop-row">
            <Turbine hub={74} dur={9} still={still} />
            <Turbine hub={50} dur={12} still={still} />
          </div>
        </div>
      </div>

      <div className="fa-road" />

      {/* far lane: smaller vehicles heading left */}
      <Lane
        className="fa-lane-back"
        tile={1500}
        tiles={4}
        duration={52}
        reverse
        vehicles={[
          { x: 150, len: 112, render: (v) => <WaterTanker v={v} /> },
          { x: 820, len: 72, render: (v) => <UtilityPickup v={v} /> },
        ]}
      />

      <div className="fa-anchors fa-z-site">
        <div className="fa-slot fa-slot-excavator">
          <Excavator still={still} />
        </div>
      </div>

      {/* near lane: main convoy heading right */}
      <Lane
        className="fa-lane-front"
        tile={1600}
        tiles={3}
        duration={34}
        defs={
          <clipPath id={drumClip}>
            <rect x={10} y={-36} width={64} height={18} rx={9} />
          </clipPath>
        }
        vehicles={[
          { x: 40, len: 100, render: (v) => <DumpTruck v={v} /> },
          { x: 360, len: 108, render: (v) => <MixerTruck v={v} clipId={drumClip} /> },
          { x: 690, len: 142, render: (v) => <MaterialLorry v={v} /> },
          { x: 1080, len: 196, render: (v) => <HeavyHauler v={v} /> },
        ]}
      />
    </div>
  );
};

export default FooterAnimation;
