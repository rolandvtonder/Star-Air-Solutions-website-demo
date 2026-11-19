import {useEffect, useRef, useState} from 'react';
import {home} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Lines} from './Heading';
import {Photo} from './Photo';

const SLIDE_MS = 6000;

/**
 * The home hero: job photos slowly push in and cross-fade (the still-photo
 * stand-in for a looping film) under the big stacked headline. Scrolling on,
 * the stage blurs, dims and shrinks back — a camera pull-back as the page
 * transition. The slideshow stops off screen and for reduced motion.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [offscreen, setOffscreen] = useState(false);
  const offRef = useRef(false);
  const running = !reduced && !offscreen;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % home.slides.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        if (!el || !stage.current) return;
        const r = el.getBoundingClientRect();
        const h = window.innerHeight;
        const p = clamp(-r.top / h);
        const off = p >= 0.98;
        // Only touches React state when crossing the threshold, not every frame.
        if (off !== offRef.current) {
          offRef.current = off;
          setOffscreen(off);
        }
        stage.current.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        stage.current.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return (
    <section ref={root} id="top" aria-label="Introduction" className="relative h-svh min-h-[640px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {home.slides.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-silk ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <Photo
              id={s.id}
              eager={i === 0}
              className={`h-full w-full object-cover ${i === active ? 'kenburns' : ''}`}
              style={{animationPlayState: running ? 'running' : 'paused'}}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(6_22_49/0.78),rgb(6_22_49/0.35)_55%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(6_22_49/0.7),transparent)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(110px,16vh,170px)] md:px-14">
          <h1 className="display text-[clamp(64px,9vw,168px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <span className="sr-only">Star Air Solution — HVAC contractor. </span>
            <Lines lines={home.lines} indentFirst />
          </h1>
          <p className="caps mt-8 ml-[clamp(0px,19vw,330px)] max-w-[340px] text-[13px] text-white/90 max-md:ml-0">{home.body}</p>
        </div>
      </div>

    </section>
  );
}
