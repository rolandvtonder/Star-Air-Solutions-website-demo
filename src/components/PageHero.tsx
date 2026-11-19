import {useEffect, useRef} from 'react';
import type {Line} from '../content';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Eyebrow, Lines} from './Heading';
import {Photo} from './Photo';

/**
 * The header for inner pages: one job photo with a slow push-in, the page's
 * stacked headline, and the same blur / dim / pull-back as you scroll on.
 */
export function PageHero({n, label, lines, body, photo}: {n: string; label: string; lines: Line[]; body: string; photo: string}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        if (!el || !stage.current) return;
        const r = el.getBoundingClientRect();
        const p = clamp(-r.top / r.height);
        stage.current.style.transform = `translate3d(0, ${(p * r.height * 0.45).toFixed(1)}px, 0) scale(${(1 - p * 0.07).toFixed(4)})`;
        stage.current.style.filter = p > 0.01 ? `blur(${(p * 14).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return (
    <section ref={root} className="relative h-[82svh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <Photo id={photo} eager className="kenburns h-full w-full object-cover" style={{animationDuration: '14s'}} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(6_22_49/0.82),rgb(6_22_49/0.4)_60%,rgb(6_22_49/0.15))]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(48px,9vh,96px)] md:px-14">
          <Eyebrow n={n} light>
            {label}
          </Eyebrow>
          <h1 className="display mt-6 text-[clamp(56px,8vw,150px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <Lines lines={lines} />
          </h1>
          <p className="lede mt-6 max-w-[520px] text-white/85">{body}</p>
        </div>
      </div>
    </section>
  );
}
