/*
 * Chapters of the hero video (hero-*.webm / hero-1280.mp4; 8 s, 24 fps). Start times are the measured scene
 * cuts (frames 39, 77, 119); the facade has no cut — glazing fades in from
 * ~6.75 s — so that boundary is set by eye.
 */
export const VIDEO_DURATION = 8;

export const CHAPTERS = [
  { start: 0, label: 'Excavation', detail: 'Site survey & earthworks' },
  { start: 1.625, label: 'Foundation', detail: 'Footings, rebar & concrete' },
  { start: 3.208, label: 'Columns', detail: 'The vertical structure rises' },
  { start: 4.958, label: 'Structure', detail: 'Frame, slabs & crane lifts' },
  { start: 6.75, label: 'Facade', detail: 'Envelope & completion' },
] as const;

/** Index of the chapter playing at time t (seconds). */
export const chapterAt = (t: number) => {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) if (t >= CHAPTERS[i].start) return i;
  return 0;
};

/** 0–1 progress through chapter i at time t. */
export const chapterProgress = (i: number, t: number) => {
  const start = CHAPTERS[i].start;
  const end = i + 1 < CHAPTERS.length ? CHAPTERS[i + 1].start : VIDEO_DURATION;
  return Math.min(1, Math.max(0, (t - start) / (end - start)));
};
