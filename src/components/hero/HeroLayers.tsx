import React from 'react';
import HeroLayer from './HeroLayer';
import { ASSET_DIR } from './heroData';


/*
 * The 2.5D environment. Layers sit inside a 16:9 "stage" that covers the hero
 * (see .srv-stage) so every asset keeps its aspect ratio and the composition
 * holds at any viewport. Depth = scroll speed, mouse = max pointer drift (px).
 *
 * Order follows the brief, with one exception: the crane stands *behind* the
 * finished building (its mast rises from the far side of the site instead of
 * ending in mid-air in front of the facade) and is mirrored so the jib and hook
 * work over the structural frame, where a real crane would be lifting.
 */
const HeroLayers: React.FC = () => (
  <div className="srv-env" aria-hidden="true">
    <div className="srv-stage">
      <HeroLayer className="srv-l-sky" src="01-sky.webp" depth={0.05} mouse={2} eager width={1672} height={941} />
      <HeroLayer className="srv-l-landscape" src="02-landscape.webp" depth={0.1} mouse={5} eager width={1672} height={482} />
      <div className="srv-haze" />

      {/* Crane mast + jib: behind the finished building */}
      <HeroLayer className="srv-l-crane" src="07-crane.webp" depth={0.3} mouse={18} width={1400} height={787} />

      <HeroLayer className="srv-l-terrain" src="03-terrain.webp" depth={0.15} mouse={8} eager width={1671} height={489} />
      <HeroLayer className="srv-l-building" src="04-building.webp" depth={0.2} mouse={10} eager width={1500} height={643} />
      <div className="srv-rays" />

      {/* Crane trolley rig: same geometry + depth as the crane so it stays on the
          jib, but in front of the building because the jib reaches forward over
          the structural frame. Trolley slides, hook rides on the cables. */}
      <HeroLayer className="srv-l-crane srv-l-crane-rig" depth={0.3} mouse={18}>
        <div className="srv-crane-trolley">
          <img className="srv-crane-piece srv-crane-trolley-img" src={`${ASSET_DIR}/07-crane-trolley.webp`} alt="" loading="lazy" />
          <img className="srv-crane-piece srv-crane-cables" src={`${ASSET_DIR}/07-crane-cables.webp`} alt="" loading="lazy" />
          <img className="srv-crane-piece srv-crane-hook" src={`${ASSET_DIR}/07-crane-hook.webp`} alt="" loading="lazy" />
        </div>
      </HeroLayer>

      <HeroLayer className="srv-l-blueprint" src="05-blueprint.webp" depth={0.25} mouse={14} width={1500} height={771} />
      <HeroLayer className="srv-l-structure" src="06-structure.webp" depth={0.25} mouse={16} width={1300} height={706} />
      <HeroLayer className="srv-l-drawing" depth={0.25} mouse={14}>
        {/* removed BlueprintOverlay as requested by user */}
      </HeroLayer>

      <HeroLayer className="srv-l-survey" src="08-survey.webp" depth={0.35} mouse={20} width={900} height={482}>
        <span className="srv-survey-target">
          <span className="srv-survey-ring" />
          <span className="srv-survey-dot" />
        </span>
      </HeroLayer>
      <HeroLayer className="srv-l-signage" src="09-signage.webp" depth={0.35} mouse={22} width={900} height={486} />
      <HeroLayer className="srv-l-workers" src="10-workers.webp" depth={0.38} mouse={24} width={1100} height={609} />
      <HeroLayer className="srv-l-mixer" src="11-mixer.webp" depth={0.4} mouse={26} width={1000} height={542} />
      <HeroLayer className="srv-l-excavator" src="12-excavator.webp" depth={0.4} mouse={30} width={1200} height={668} />

      <div className="srv-dust" />
    </div>
  </div>
);

export default HeroLayers;
