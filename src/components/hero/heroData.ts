/*
 * Chapters of the hero video (hero-*.webm / hero-1280.mp4; 8 s, 24 fps). Start
 * times are the measured scene cuts (frames 39, 77, 119); the facade has no
 * cut — glazing fades in from ~6.75 s — so that boundary is set by eye.
 * The intro loader (heroLoader.ts) steps through the labels as it fills.
 */
export const CHAPTERS = [
  { start: 0, label: 'Excavation', detail: 'Site survey & earthworks' },
  { start: 1.625, label: 'Foundation', detail: 'Footings, rebar & concrete' },
  { start: 3.208, label: 'Columns', detail: 'The vertical structure rises' },
  { start: 4.958, label: 'Structure', detail: 'Frame, slabs & crane lifts' },
  { start: 6.75, label: 'Facade', detail: 'Envelope & completion' },
] as const;
