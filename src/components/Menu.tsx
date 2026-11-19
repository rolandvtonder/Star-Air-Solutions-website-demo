import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {contact, nav, tel, type PageId} from '../content';

/**
 * The menu: three slabs wipe in from the right one after another — navy,
 * signal red, paper (the logo's cold-to-hot cycle) — and the paper one stays
 * to hold the links. Hovering a link ripples it like air shimmering off a
 * condenser: an SVG turbulence + displacement filter animated per frame.
 */
export function Menu({open, current, onClose}: {open: boolean; current: PageId; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    // Move focus into the menu once the paper slab has arrived.
    const id = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: navy → red → paper, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away scrim */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-navy')} style={delay(0)} />
      <div className={slab('bg-red')} style={delay(1)} />
      <nav className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-28 pb-28 text-ink md:px-12')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => {
            const here = item.id === current;
            return (
              <li
                key={item.id}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'}}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={item.href}
                  aria-current={here ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={(e) => e.currentTarget.matches(':focus-visible') && setHover(i)}
                  onBlur={() => setHover(-1)}
                  onClick={() => here && onClose()}
                  className={`display relative inline-flex items-center gap-3 py-1 text-[clamp(38px,3.6vw,58px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {here && <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-red" />}
                  {item.label}
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-ink/45">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>

        <div className={`mt-10 space-y-5 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="caps text-ink/55">Call us</p>
            <a href={tel(contact.cell)} className="display text-[28px] text-navy hover:text-red">
              {contact.cell}
            </a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {contact.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="caps py-1 text-ink/80 hover:text-red">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
