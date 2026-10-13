import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Two-beat scroll: the first scroll clears the copy, after that the footage
 * drifts up and dissolves into the next section. One gsap.context, reverted on unmount.
 */
export function useHeroAnimations(root: RefObject<HTMLElement | null>, revealed: boolean) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !revealed) return;
    const nav = document.querySelector<HTMLElement>('.site-nav');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          // must mirror the stacked-layout media query in SRVHero.css
          stacked: '(max-width: 767px), (orientation: portrait) and (max-width: 1100px)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (c) => {
          const { stacked, motion } = c.conditions as Record<string, boolean>;
          if (!motion) {
            // Reduced motion: video fade-in only
            const fade = gsap.timeline({ defaults: { ease: 'power1.out', duration: 0.6 } });
            fade.from('.srv-video-wrap', { autoAlpha: 0, duration: 1 }, 0);
            if (nav) fade.from(nav, { autoAlpha: 0 }, 0.1);

            gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
            })
              .to('.srv-content', { autoAlpha: 0, duration: 0.35 }, 0)
              .to('.srv-dissolve', { opacity: 1, duration: 0.3 }, 0.4);
            return;
          }

          /* ---------- 1. Intro: video background settles in (text is visible immediately) ---------- */
          const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
          intro.from('.srv-video-wrap', { autoAlpha: 0, scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0);
          if (nav) intro.from(nav, { autoAlpha: 0, y: -12, duration: 0.7 }, 0.15);

          /* ---------- 2. Scroll ---------- */
          if (!stacked) {
            // Beat 1 (pinned): the first scroll only clears the copy
            const clear = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: el, start: 'top top', end: '+=45%', pin: true, scrub: 0.6 },
            });
            clear
              .to('.srv-content', { autoAlpha: 0, y: -70, duration: 1 }, 0)
              // with the copy gone the footage no longer needs the tint
              .to('.srv-tint', { opacity: 0.35, duration: 1 }, 0);

            // Beat 2 (unpinned): the hero scrolls away with the footage lagging behind
            // it (parallax: it sinks within the frame, so no edge ever shows below)
            // and the lower edge dissolves into the next section
            gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: el,
                start: () => clear.scrollTrigger!.end,
                end: () => clear.scrollTrigger!.end + el.offsetHeight,
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            })
              .to('.srv-video-wrap', { yPercent: 24, scale: 1.04 }, 0)
              .to('.srv-chapters', { autoAlpha: 0, y: -30, duration: 0.3 }, 0)
              .to('.srv-dissolve', { opacity: 1, duration: 0.45 }, 0.05);
          } else {
            // Stacked (phones / portrait tablets): same two beats, unpinned
            gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
            })
              .to('.srv-content', { autoAlpha: 0, y: -50, duration: 0.35 }, 0)
              .to('.srv-tint', { opacity: 0.4, duration: 0.35 }, 0)
              .to('.srv-video-wrap', { yPercent: 16, duration: 0.65 }, 0.35)
              .to('.srv-chapters', { autoAlpha: 0, duration: 0.2 }, 0.35)
              .to('.srv-dissolve', { opacity: 1, duration: 0.3 }, 0.4);
          }
        },
      );
    }, el);

    return () => ctx.revert();
  }, [root, revealed]);
}
