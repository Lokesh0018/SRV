import React, { type RefObject } from 'react';
import heroVideo from '../../assets/hero-bg.webm';
import posterStart from '../../assets/hero-poster.webp';
import posterFinal from '../../assets/hero-poster-final.webp';

interface HeroVideoProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** prefers-reduced-motion: don't autoplay, show the finished building */
  reduced: boolean;
}

/**
 * Full-bleed construction time-lapse. Decorative (the story is repeated in
 * the chapter bar), so it is hidden from assistive tech and never focusable.
 */
const HeroVideo: React.FC<HeroVideoProps> = ({ videoRef, reduced }) => (
  <div className="srv-video-wrap" aria-hidden="true">
    <video
      ref={videoRef}
      className="srv-video"
      src={heroVideo}
      poster={reduced ? posterFinal : posterStart}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload={reduced ? 'none' : 'auto'}
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
    />
  </div>
);

export default HeroVideo;
