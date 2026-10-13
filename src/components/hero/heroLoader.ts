import gsap from 'gsap';
import { CHAPTERS } from './heroData';

const MIN_SHOW = 600; // ms — never flash the loader on a warm cache
const MAX_WAIT = 2000; // ms — on a slow line, reveal anyway rather than hold the page

/**
 * Drives the #srv-loader shell painted by index.html: progress follows the
 * hero's real readiness (display fonts + the poster, which is the video's
 * first frame), then the panel lifts away "ground to sky" and `onReveal`
 * fires so the hero intro plays as it uncovers. The video is not waited on:
 * it streams in behind the poster and takes over seamlessly once it plays.
 * Returns a cleanup function. Without the shell (in-app navigation back to
 * Home) it reveals at once.
 */
export function revealHero(video: HTMLVideoElement | null, onReveal: () => void): () => void {
  const el = document.getElementById('srv-loader');
  if (!el) {
    onReveal();
    return () => {};
  }

  el.dataset.live = '';
  const stage = el.querySelector<HTMLElement>('.ldr-stage');
  const pct = el.querySelector<HTMLElement>('.ldr-pct');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const started = performance.now();

  let fontsDone = false;
  let posterDone = !video?.poster;
  let timedOut = false;
  let shown = 0;
  let raf = 0;
  let exit: gsap.core.Tween | null = null;

  Promise.all([
    document.fonts.load('700 1em "Space Grotesk Variable"'),
    document.fonts.load('400 1em "Geist Variable"'),
  ]).catch(() => {}).finally(() => { fontsDone = true; });

  if (video?.poster) {
    // same URL as the <video poster> and the preload in index.html, so this hits the cache
    const img = new Image();
    img.src = video.poster;
    img.decode().catch(() => {}).finally(() => { posterDone = true; });
  }
  const cap = window.setTimeout(() => { timedOut = true; }, MAX_WAIT);

  const finish = () => {
    document.documentElement.classList.remove('srv-loading');
    if (video) {
      // start the footage on its opening shot, in step with the intro
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    exit = gsap.to(el, reduced
      ? { autoAlpha: 0, duration: 0.4, ease: 'power1.out', onComplete: () => el.remove() }
      : { yPercent: -100, duration: 0.95, ease: 'expo.inOut', onComplete: () => el.remove() });
    onReveal();
  };

  const tick = () => {
    const ready = (fontsDone && posterDone) || timedOut;
    const target = ready ? 1 : Math.min(0.96, (fontsDone ? 0.5 : 0) + (posterDone ? 0.5 : 0));
    // ease the displayed value toward the target; faster once everything is in
    shown += (target - shown) * (ready ? 0.18 : 0.06);
    if (ready && target - shown < 0.004) shown = 1;

    el.style.setProperty('--p', shown.toFixed(4));
    if (pct) pct.textContent = `${String(Math.round(shown * 100)).padStart(3, '0')}%`;
    if (stage) stage.textContent = shown >= 1 ? 'Ready' : CHAPTERS[Math.min(CHAPTERS.length - 1, Math.floor(shown * CHAPTERS.length))].label;

    if (shown >= 1 && performance.now() - started >= MIN_SHOW) {
      finish();
      return;
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    window.clearTimeout(cap);
    // a finished exit is left to run to completion
    if (!exit) delete el.dataset.live;
  };
}
