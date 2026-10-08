import { useEffect, useState, type RefObject } from 'react';
import { CHAPTERS, VIDEO_DURATION, chapterAt, chapterProgress } from './heroData';

/**
 * Follows the background video frame-by-frame:
 *  - returns the active chapter index (React state, changes only on a cut)
 *  - writes each chapter's fill into `--p` on [data-chapter] elements and the
 *    loop "dip" into `--dip` on the root, straight to the DOM — no re-render
 *    per frame.
 */
export function useVideoChapters(
  root: RefObject<HTMLElement | null>,
  video: RefObject<HTMLVideoElement | null>,
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;

    let raf = 0;
    let last = -1;
    const bars = () => el.querySelectorAll<HTMLElement>('[data-chapter]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const tick = () => {
      // Reduced motion and never started: the poster shows the finished
      // building, so present the sequence as complete.
      const t = reduced.matches && v.paused && v.currentTime === 0
        ? VIDEO_DURATION - 0.001
        : v.currentTime % VIDEO_DURATION;
      const i = chapterAt(t);
      if (i !== last) {
        last = i;
        setActive(i);
      }
      bars().forEach((bar, n) => {
        const p = n < i ? 1 : n > i ? 0 : chapterProgress(i, t);
        bar.style.setProperty('--p', p.toFixed(4));
      });
      // warm dip across the loop seam (finished building -> bare ground)
      const dip = v.paused ? 0 : t > VIDEO_DURATION - 0.35 ? (t - (VIDEO_DURATION - 0.35)) / 0.35 : t < 0.3 ? 1 - t / 0.3 : 0;
      el.style.setProperty('--dip', (dip * dip).toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [root, video]);

  return { active, count: CHAPTERS.length };
}
