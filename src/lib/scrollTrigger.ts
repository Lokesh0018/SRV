import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mobile browsers resize the viewport when the URL bar shows/hides while
// scrolling; without this every such resize recalculates every trigger.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Keeps trigger positions correct as the page settles (fonts swapping in,
 * lazy images and the footer scene loading, route content mounting) by
 * refreshing once whenever the page height actually changes. This replaces
 * fixed refresh timers scattered through the pages: one debounced refresh
 * instead of several, and none at all when nothing moved.
 * Returns a cleanup function.
 */
export function refreshOnLayoutChange(target: Element = document.body): () => void {
  if (!('ResizeObserver' in window)) return () => {};

  let lastHeight = target.scrollHeight;
  let timer = 0;

  const ro = new ResizeObserver(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const h = target.scrollHeight;
      // pin spacers resize the page during a refresh; only react to real changes
      if (Math.abs(h - lastHeight) < 2) return;
      ScrollTrigger.refresh();
      lastHeight = target.scrollHeight;
    }, 150);
  });
  ro.observe(target);

  // web fonts change line heights everywhere once they arrive
  document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

  return () => {
    ro.disconnect();
    window.clearTimeout(timer);
  };
}

export { gsap, ScrollTrigger };
