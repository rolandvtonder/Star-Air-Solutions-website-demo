import {useEffect, useRef, useState} from 'react';
import {panels, url} from '../content';
import {Photo} from './Photo';

/**
 * Three tall panels slide in from the right one after another — air
 * conditioning, ducting, cold rooms — each over its own job photo, tinted in
 * one of the logo's colours. Each panel links to the services page.
 */
export function ServicePanels() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-label="What we do" className="relative overflow-hidden bg-ink">
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[3px] max-md:h-auto max-md:grid-cols-1">
        {panels.map((p, i) => (
          <a
            key={p.id}
            href={url('/services/')}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[78svh] max-md:min-h-[480px] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: p.tint}}
          >
            <Photo
              id={p.photo}
              sizes="(max-width: 767px) 100vw, 34vw"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity transition-[transform,opacity] duration-[1200ms] ease-silk group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 opacity-55 mix-blend-multiply" style={{background: p.tint}} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(6_22_49/0.7),transparent_45%,rgb(6_22_49/0.55))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-28 md:p-9 md:pt-32">
              <div>
                <p className="caps text-white/70">0{i + 1}</p>
                <h2 className="display mt-3 text-[clamp(40px,3.8vw,68px)] text-white">
                  <span className="block">{p.name[0]}</span>
                  <span className="it block">{p.name[1]}</span>
                </h2>
                <dl className={`mt-6 space-y-3 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  {p.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/65">{k}</dt>
                      <dd className="text-[16px] font-medium text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className="caps inline-flex items-center gap-3 self-start border-b border-white/60 pb-1 text-white transition-[gap] duration-500 group-hover:gap-5">
                Explore services <span aria-hidden>→</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
