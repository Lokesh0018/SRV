import React from 'react';

import { ASSET_DIR } from './heroData';

interface HeroLayerProps {
  /** File name inside /assets/srv-hero, e.g. "04-building.webp" */
  src?: string;
  /** Scroll parallax speed (0 = fixed, 0.4 = fast foreground) */
  depth: number;
  /** Max pointer drift in px */
  mouse: number;
  /** Positioning / per-layer styling hook, e.g. "srv-l-building" */
  className: string;
  alt?: string;
  eager?: boolean;
  /** Intrinsic size so the browser reserves space before decode */
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

/**
 * One depth plane of the hero environment.
 *
 * Three nested elements so each motion source owns its own transform:
 *   .srv-layer       → scroll parallax + scroll story (GSAP, [data-depth])
 *   .srv-layer-mover → pointer parallax (GSAP quickTo, [data-mouse])
 *   .srv-layer-art   → intro + idle motion
 */
const HeroLayer: React.FC<HeroLayerProps> = ({
  src,
  depth,
  mouse,
  className,
  alt = '',
  eager = false,
  width,
  height,
  children,
}) => (
  <div className={`srv-layer ${className}`} data-depth={depth} aria-hidden={alt ? undefined : true}>
    <div className="srv-layer-mover" data-mouse={mouse}>
      <div className="srv-layer-art">
        {src && (
          <img
            src={`${ASSET_DIR}/${src}`}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            decoding="async"
            draggable={false}
          />
        )}
        {children}
      </div>
    </div>
  </div>
);

export default HeroLayer;
