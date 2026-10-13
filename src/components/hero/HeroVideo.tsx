import React, { type RefObject } from 'react';
import heroVideo1920 from '../../assets/hero-1920.webm';
import heroVideo960 from '../../assets/hero-960.webm';
import heroVideoMp4 from '../../assets/hero-1280.mp4';

interface HeroVideoProps {
  videoRef: RefObject<HTMLVideoElement | null>;
}

// Small screens get the 960 px encode and poster. The posters live in public/
// so index.html can preload them before the bundle arrives; they match the
// video's first frame, so the swap to footage is seamless.
const MOBILE = '(max-width: 800px)';
const isMobile = typeof window !== 'undefined' && window.matchMedia(MOBILE).matches;
const poster = isMobile ? '/media/hero-poster-960.webp' : '/media/hero-poster-1600.webp';

/**
 * Full-bleed construction time-lapse. Decorative (the story is repeated in
 * the chapter bar), so it is hidden from assistive tech and never focusable.
 */
const HeroVideo: React.FC<HeroVideoProps> = ({ videoRef }) => (
  <div className="srv-video-wrap" aria-hidden="true">
    <video
      ref={videoRef}
      className="srv-video"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
    >
      <source src={heroVideo960} type="video/webm" media={MOBILE} />
      <source src={heroVideo1920} type="video/webm" />
      <source src={heroVideoMp4} type="video/mp4" />
    </video>
  </div>
);

export default HeroVideo;
