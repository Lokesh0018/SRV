import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const art = (layer: string) => `.srv-l-${layer} .srv-layer-art`;

/**
 * Intro build-up, idle site activity, the pinned scroll story and the exit
 * into the next section. Everything lives in one gsap.context so React
 * re-renders / StrictMode never duplicate tweens, and unmount reverts it all.
 */
export function useHeroAnimations(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const nav = document.querySelector<HTMLElement>('.site-nav');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          // must mirror the stacked-layout media query in hero.css
          stacked: '(max-width: 767px), (orientation: portrait) and (max-width: 1100px)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (c) => {
          const { stacked, motion } = c.conditions as Record<string, boolean>;
          if (!motion) return; // static composition, everything already visible

          /* ---------- 1. Intro: build the site, then the copy ---------- */
          // Each beat owns a half-second window; tweens may run a little past
          // their window so the hand-offs overlap softly instead of stepping.
          const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
          intro
            // 0.0–1.0  sky + landscape
            .from(art('sky'), { autoAlpha: 0, scale: 1.05, duration: 1.4, ease: 'power2.out' }, 0)
            .from(art('landscape'), { autoAlpha: 0, y: 18, duration: 1.1 }, 0.3)
            .from('.srv-haze', { autoAlpha: 0, duration: 1.2 }, 0.4)
            // 1.0–1.5  terrain + building
            .from(art('terrain'), { autoAlpha: 0, y: 36 }, 1.0)
            .from(art('building'), { autoAlpha: 0, y: 44, duration: 1.2, ease: 'expo.out' }, 1.15)
            // 1.5–2.0  blueprint draws, structure resolves under it
            .from(art('blueprint'), { clipPath: 'inset(0% 100% 0% 0%)', duration: 1, ease: 'power2.inOut' }, 1.5)
            .from('.bp-draw', { strokeDashoffset: 1, duration: 0.9, stagger: 0.01, ease: 'power2.inOut' }, 1.5)
            .from('.bp-text', { autoAlpha: 0, duration: 0.5, stagger: 0.015 }, 1.85)
            .from(art('structure'), { autoAlpha: 0, y: 24 }, 1.6)
            // 2.0–2.5  crane
            .from(art('crane'), { autoAlpha: 0, x: 36, duration: 1.1 }, 2.0)
            // 2.5–3.0  foreground construction, back to front
            .from(art('survey'), { autoAlpha: 0, y: 14, duration: 0.7 }, 2.5)
            .from(art('signage'), { autoAlpha: 0, y: 14, duration: 0.7 }, 2.55)
            .from(art('workers'), { autoAlpha: 0, y: 18, duration: 0.8 }, 2.65)
            .from([art('mixer'), art('excavator')], { autoAlpha: 0, x: 40, duration: 0.9, stagger: 0.1 }, 2.75)
            .from('.srv-dust, .srv-rays', { autoAlpha: 0, duration: 1.4 }, 2.5);
          // 3.0–3.5  navigation
          if (nav) intro.from(nav, { autoAlpha: 0, y: -14, duration: 0.7 }, 3.0);
          intro
            // 3.5–4.0  headline
            .from('.srv-eyebrow', { autoAlpha: 0, y: 12, duration: 0.6 }, 3.5)
            .from('.srv-title-line', { autoAlpha: 0, y: 40, duration: 0.85, stagger: 0.08, ease: 'expo.out' }, 3.58)
            // 4.0–4.5  supporting line, CTA, statistics
            .from('.srv-lede', { autoAlpha: 0, y: 16, duration: 0.7 }, 4.0)
            .from('.srv-actions', { autoAlpha: 0, y: 16, duration: 0.7 }, 4.1)
            .from('.srv-facts', { autoAlpha: 0, y: 12, duration: 0.7 }, 4.2);

          /* ---------- 2. Idle site activity (continuous) ---------- */
          // Trolley travels along the (mirrored) jib: toward the mast it climbs at
          // the jib's 0.21 slope; 1.779 converts rig-width % to rig-height %
          const along = (x: number) => ({ xPercent: x, yPercent: -x * 0.21 * 1.779 });
          gsap.fromTo('.srv-crane-trolley', along(-8),
            { ...along(14), duration: 13, ease: 'sine.inOut', repeat: -1, yoyo: true });
          // Hook lowers/raises; cables stretch with it so they stay attached
          const hookDrop = 30; // % of hook height
          gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 5.5, ease: 'sine.inOut' } })
            .to('.srv-crane-hook', { yPercent: hookDrop }, 0)
            .to('.srv-crane-cables', { scaleY: 1 + (hookDrop * 13.24) / 17.223 / 100 }, 0);
          gsap.to('.srv-crane-cables, .srv-crane-hook', {
            rotation: 0.8, transformOrigin: '50% 0%', duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true,
          });

          gsap.fromTo('.srv-survey-ring', { scale: 0.85, opacity: 0.4 },
            { scale: 1.1, opacity: 1, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to('.srv-survey-dot', { opacity: 0.45, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true });

          gsap.to('.srv-l-workers img', { y: -2, scale: 1.006, transformOrigin: '50% 100%', duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to('.srv-l-mixer img', { y: 1.5, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to('.srv-l-mixer img', { x: 6, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to('.srv-l-excavator img', { rotation: -0.6, transformOrigin: '78% 92%', duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true });

          /* ---------- 3. Scroll: parallax + story ---------- */
          const layers = gsap.utils.toArray<HTMLElement>('.srv-layer[data-depth]');
          // Phase 2 lift: every layer rises faster than the page, nearer layers
          // fastest, so the whole site floats up and away. Nothing fades.
          const lift = (t: HTMLElement) => -Number(t.dataset.depth) * window.innerHeight * 2.2;

          if (!stacked) {
            // Phase 1 (pinned): the first scroll only clears the copy
            const clear = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: '+=45%',
                pin: true,
                scrub: 0.6,
              },
            });
            clear
              .to('.srv-content', { autoAlpha: 0, y: -70, duration: 1 }, 0)
              .to('.srv-scrim-copy', { opacity: 0, duration: 1 }, 0);

            // Phase 2 (unpinned): the hero scrolls away and its layers flow up
            // into the air while the next section rises in beneath them
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
              .to(layers, { y: (_i, t: HTMLElement) => lift(t) }, 0)
              .to('.srv-scrim-ground', { opacity: 0, duration: 0.4 }, 0)
              .to('.srv-dissolve', { opacity: 1, duration: 0.35 }, 0);
          } else {
            // Stacked (phones / portrait tablets): same two beats, unpinned —
            // copy clears over the first stretch, then the layers lift
            gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: el, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true,
              },
            })
              .to('.srv-content', { autoAlpha: 0, y: -50, duration: 0.35 }, 0)
              .to(layers, { y: (_i, t: HTMLElement) => lift(t) * 0.6, duration: 0.65 }, 0.35)
              .to('.srv-scrim-ground', { opacity: 0, duration: 0.3 }, 0.35)
              .to('.srv-dissolve', { opacity: 1, duration: 0.25 }, 0.35);
          }
        },
      );
    }, el);

    return () => ctx.revert();
  }, [root]);
}
