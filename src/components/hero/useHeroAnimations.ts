import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STEPS } from './heroData';

gsap.registerPlugin(ScrollTrigger);

const art = (layer: string) => `.srv-l-${layer} .srv-layer-art`;

/**
 * Intro build-up, idle site activity, the pinned scroll story and the exit
 * into the next section. Everything lives in one gsap.context so React
 * re-renders / StrictMode never duplicate tweens, and unmount reverts it all.
 */
export function useHeroAnimations(root: RefObject<HTMLElement | null>, onStep: (step: number) => void) {
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
          const intro = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });
          intro
            .from(art('sky'), { autoAlpha: 0, scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0)
            .from(art('landscape'), { autoAlpha: 0, y: 20, duration: 1.4 }, 0.2)
            .from(art('terrain'), { autoAlpha: 0, y: 40 }, 0.4)
            .from(art('building'), { autoAlpha: 0, y: 46, duration: 1.4, ease: 'expo.out' }, 0.6)
            .from(art('blueprint'), { clipPath: 'inset(0% 100% 0% 0%)', duration: 1.6, ease: 'power2.inOut' }, 0.8)
            .from('.bp-draw', { strokeDashoffset: 1, duration: 1.4, stagger: 0.012, ease: 'power2.inOut' }, 0.8)
            .from('.bp-text', { autoAlpha: 0, duration: 0.6, stagger: 0.02 }, 1.4)
            .from(art('structure'), { autoAlpha: 0, y: 30, duration: 1.3 }, 1.0)
            .from(art('crane'), { autoAlpha: 0, x: 40, duration: 1.5 }, 1.2)
            .from(art('survey'), { autoAlpha: 0, y: 24 }, 1.4)
            .from(art('signage'), { autoAlpha: 0, y: 24 }, 1.6)
            .from(art('workers'), { autoAlpha: 0, y: 20 }, 1.8)
            .from([art('mixer'), art('excavator')], { autoAlpha: 0, x: 50, duration: 1.3, stagger: 0.1 }, 2.0)
            .from('.srv-dust, .srv-rays', { autoAlpha: 0, duration: 2 }, 1.6);
          if (nav) intro.from(nav, { autoAlpha: 0, y: -16, duration: 0.9 }, 2.2);
          intro
            .from('.srv-eyebrow', { autoAlpha: 0, y: 16, duration: 0.8 }, 2.4)
            .from('.srv-title-line', { autoAlpha: 0, y: 40, duration: 1, stagger: 0.09, ease: 'expo.out' }, 2.6)
            .from('.srv-lede', { autoAlpha: 0, y: 20, duration: 0.9 }, 2.9)
            .from('.srv-actions', { autoAlpha: 0, y: 20, duration: 0.9 }, 3.1)
            .from('.srv-facts', { autoAlpha: 0, y: 16, duration: 0.9 }, 3.3)
            .from('.srv-hud', { autoAlpha: 0, duration: 1.2 }, 3.3)
            .from('.srv-timeline-wrap', { autoAlpha: 0, y: 16, duration: 0.9 }, 3.5)
            .from('.srv-step', { autoAlpha: 0, duration: 0.6, stagger: 0.05 }, 3.6);

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
          const setStep = (p: number) => onStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));

          if (!stacked) {
            // Pinned: survey → design → engineering → construction → completion
            const story = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: '+=130%',
                pin: true,
                scrub: 0.8,
                onUpdate: (self) => setStep(self.progress),
              },
            });
            layers.forEach((layer) => {
              story.to(layer, { y: -Number(layer.dataset.depth) * 240, duration: 1 }, 0);
            });
            story
              .to('.srv-content', { autoAlpha: 0, y: -60, duration: 0.3 }, 0.02)
              .to('.srv-scrim-copy', { opacity: 0.2, duration: 0.35 }, 0.05)
              .to('.srv-hud', { opacity: 0.4, duration: 0.3 }, 0.05)
              // the scene drifts toward centre once the copy has cleared
              .to('.srv-stage', { xPercent: -5, duration: 0.6, ease: 'power1.inOut' }, 0.1)
              // design: the drawing takes over
              .to('.srv-l-blueprint', { opacity: 0.8, duration: 0.2 }, 0.05)
              .to('.srv-l-drawing', { opacity: 1, duration: 0.2 }, 0.05)
              // engineering: frame steps forward
              .to('.srv-l-structure', { scale: 1.05, duration: 0.25 }, 0.25)
              .to('.srv-l-blueprint', { opacity: 0.3, duration: 0.2 }, 0.3)
              // construction: machinery leans in
              .to('.srv-l-mixer, .srv-l-excavator, .srv-l-workers, .srv-l-signage', { scale: 1.05, duration: 0.25 }, 0.5)
              .to('.srv-l-excavator', { xPercent: -4, duration: 0.25 }, 0.5)
              // completion: structure resolves into the finished building
              .to('.srv-l-structure', { opacity: 0, clipPath: 'inset(0% 0% 0% 100%)', duration: 0.25 }, 0.75)
              .to('.srv-l-blueprint, .srv-l-drawing', { opacity: 0.12, duration: 0.25 }, 0.75)
              .to('.srv-l-building', { scale: 1.06, duration: 0.25 }, 0.75)
              .to('.srv-l-survey, .srv-l-signage', { opacity: 0.55, duration: 0.25 }, 0.75)
              .to('.srv-rays', { opacity: 1, duration: 0.25 }, 0.75);

            // Exit: hero eases back as the next section slides over it
            const next = document.getElementById('idea');
            if (next) {
              gsap.to('.srv-hero-frame', {
                scale: 0.96,
                y: -40,
                ease: 'none',
                scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 30%', scrub: true },
              });
            }
          } else {
            // Stacked (phones / portrait tablets): lighter, unpinned parallax
            gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: el, start: 'top top', end: 'bottom top', scrub: true,
                onUpdate: (self) => setStep(self.progress),
              },
            })
              .to(layers, { y: (_i, t: HTMLElement) => -Number(t.dataset.depth) * 160 }, 0)
              .to('.srv-content', { autoAlpha: 0.2, y: -40 }, 0);
          }

          return () => onStep(0);
        },
      );
    }, el);

    return () => ctx.revert();
  }, [root, onStep]);
}
