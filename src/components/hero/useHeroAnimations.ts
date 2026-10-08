import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS } from './heroData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Intro timed to the video's opening scene, then the two-beat scroll:
 * the first scroll clears the copy, after that the footage drifts up and
 * dissolves into the next section. One gsap.context, reverted on unmount.
 */
export function useHeroAnimations(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const nav = document.querySelector<HTMLElement>('.site-nav');
    const firstCut = CHAPTERS[1].start; // 1.625 s: excavation -> foundation

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
          if (!motion) return; // static poster + fully visible copy

          /* ---------- 1. Intro: lands inside the excavation shot ---------- */
          const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
          intro.from('.srv-video-wrap', { autoAlpha: 0, scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0);
          if (nav) intro.from(nav, { autoAlpha: 0, y: -12, duration: 0.7 }, 0.15);
          intro
            .from('.srv-eyebrow', { autoAlpha: 0, y: 12, duration: 0.6 }, 0.3)
            .from('.srv-title-line', { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0.4)
            .from('.srv-lede', { autoAlpha: 0, y: 14 }, 0.95)
            .from('.srv-actions', { autoAlpha: 0, y: 14 }, 1.05)
            .from('.srv-facts', { autoAlpha: 0, y: 12 }, 1.2)
            // the chapter bar arrives on the first scene cut
            .from('.srv-chapters', { autoAlpha: 0, y: 18, duration: 0.7 }, firstCut - 0.05);

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
  }, [root]);
}
