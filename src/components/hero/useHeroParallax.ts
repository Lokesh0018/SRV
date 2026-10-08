import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';

/**
 * Pointer parallax: every `.srv-layer-mover[data-mouse]` drifts up to its
 * data-mouse value (px) against the pointer. Desktop + fine pointer only.
 */
export function useHeroParallax(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const movers = gsap.utils.toArray<HTMLElement>('[data-mouse]', el).map((node) => ({
          depth: Number(node.dataset.mouse) || 0,
          x: gsap.quickTo(node, 'x', { duration: 1.2, ease: 'power3.out' }),
          y: gsap.quickTo(node, 'y', { duration: 1.2, ease: 'power3.out' }),
        }));

        const onMove = (e: PointerEvent) => {
          // normalised -1 … 1 from the viewport centre
          const nx = (e.clientX / window.innerWidth) * 2 - 1;
          const ny = (e.clientY / window.innerHeight) * 2 - 1;
          for (const m of movers) {
            m.x(-nx * m.depth);
            m.y(-ny * m.depth * 0.6);
          }
        };
        const onLeave = () => movers.forEach((m) => { m.x(0); m.y(0); });

        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      });
    }, el);

    return () => ctx.revert();
  }, [root]);
}
