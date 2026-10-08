import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Pause, Play } from 'lucide-react';
import { CHAPTERS } from './heroData';

interface HeroChaptersProps {
  active: number;
  playing: boolean;
  onToggle: () => void;
}

/**
 * Construction chapters, synced to the background video. Each segment's line
 * fills with playback (--p is written by useVideoChapters); the active
 * chapter's description swaps in on every scene cut.
 */
const HeroChapters: React.FC<HeroChaptersProps> = ({ active, playing, onToggle }) => {
  const list = useRef<HTMLOListElement>(null);

  useLayoutEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.srv-chapter.is-active .srv-chapter-detail',
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      gsap.fromTo('.srv-chapter.is-active .srv-chapter-label',
        { color: '#ffffff' },
        { color: 'var(--srv-orange)', duration: 0.4, ease: 'power2.out' });
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    <div className="srv-chapters">
      <ol ref={list} className="srv-chapter-list" aria-label="Construction sequence">
        {CHAPTERS.map((c, i) => (
          <li
            key={c.label}
            data-chapter={i}
            className={`srv-chapter${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
            aria-current={i === active ? 'step' : undefined}
          >
            <span className="srv-chapter-track" aria-hidden="true">
              <span className="srv-chapter-fill" />
            </span>
            <span className="srv-chapter-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="srv-chapter-label">{c.label}</span>
            <span className="srv-chapter-detail">{c.detail}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        className="srv-video-toggle"
        onClick={onToggle}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        aria-pressed={!playing}
      >
        {playing ? <Pause size={14} strokeWidth={2} /> : <Play size={14} strokeWidth={2} />}
      </button>
    </div>
  );
};

export default HeroChapters;
