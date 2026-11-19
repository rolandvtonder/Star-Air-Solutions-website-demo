import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {galleryPage} from '../content';
import {PageHero} from '../components/PageHero';
import {altFor, galleryIds, Photo, photoMeta} from '../components/Photo';
import {QuoteBand} from '../components/QuoteBand';
import {useReveals} from '../hooks/useReveals';
import {lockScroll} from '../lib/scroll';

export function Gallery() {
  const ref = useReveals<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const count = galleryIds.length;

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus({preventScroll: true});
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);

  useEffect(() => {
    lockScroll(open !== null);
    if (open === null) return;
    closeBtn.current?.focus({preventScroll: true});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  useEffect(() => () => lockScroll(false), []);

  return (
    <div ref={ref}>
      <PageHero n="05" label="Gallery" lines={galleryPage.lines} body={galleryPage.body} photo="p-111" />

      <section aria-label="Project photos" className="bg-ink px-3 py-16 md:px-8 md:py-24">
        <ul className="mx-auto max-w-[1800px] columns-2 gap-3 md:columns-3 xl:columns-4">
          {galleryIds.map((id, i) => {
            const m = photoMeta(id);
            return (
              <li key={id} className="mb-3 break-inside-avoid" data-reveal style={{'--d': `${(i % 4) * 0.06}s`} as CSSProperties}>
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(i);
                  }}
                  aria-label={`Open photo: ${altFor(id)}`}
                  className="group relative block w-full overflow-hidden bg-navy"
                  style={{aspectRatio: `${m.w} / ${m.h}`}}
                >
                  <Photo id={id} sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw" className="h-full w-full object-cover transition-transform duration-[900ms] ease-silk group-hover:scale-105" />
                  <span className="absolute inset-0 flex items-end bg-[linear-gradient(0deg,rgb(6_22_49/0.85),transparent_55%)] p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-[14px] leading-snug text-white">{altFor(id)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[65] flex flex-col bg-ink/96 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 p-4 md:p-6">
            <p className="caps text-white/70" aria-live="polite">
              {open + 1} / {count}
            </p>
            <button ref={closeBtn} type="button" onClick={close} className="caps flex min-h-12 items-center gap-3 bg-white px-6 text-ink hover:bg-sky">
              Close <span aria-hidden className="rotate-45 text-[18px] leading-none">+</span>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <Photo key={galleryIds[open]} id={galleryIds[open]} eager sizes="100vw" className="max-h-full max-w-full object-contain" />
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 grid size-12 place-items-center bg-white/10 text-white hover:bg-white/25 md:left-6 md:size-14">
              <span aria-hidden>←</span>
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 grid size-12 place-items-center bg-white/10 text-white hover:bg-white/25 md:right-6 md:size-14">
              <span aria-hidden>→</span>
            </button>
          </div>
          <p className="mx-auto max-w-[760px] px-6 py-6 text-center text-white/85">{altFor(galleryIds[open])}</p>
        </div>
      )}

      <QuoteBand />
    </div>
  );
}
