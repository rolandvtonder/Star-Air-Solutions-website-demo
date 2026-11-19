import type {CSSProperties} from 'react';
import {services} from '../content';
import {Eyebrow} from '../components/Heading';
import {PageHero} from '../components/PageHero';
import {Photo} from '../components/Photo';
import {QuoteBand} from '../components/QuoteBand';
import {useReveals} from '../hooks/useReveals';

export function Services() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero n="03" label="Services" lines={services.lines} body={services.body} photo="p-123" />

      {/* Jump links */}
      {/* The jump bar sticks only while the four core services are on screen. */}
      <div>
      {/* Sits level with the fixed logo and menu button, leaving room for both. */}
      <nav aria-label="Core services" className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur-md max-md:hidden">
        <ul className="mx-auto flex min-h-[100px] max-w-[1680px] items-center justify-center gap-1 pr-[170px] pl-[220px]">
          {services.core.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="caps flex min-h-11 items-center gap-2 px-4 whitespace-nowrap text-ink/75 hover:text-red">
                <span className="text-red">0{i + 1}</span> {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Four core services, alternating sides */}
      <div className="bg-paper text-ink">
        {services.core.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24 px-5 py-20 md:px-14 md:py-28">
            <div className={`mx-auto grid max-w-[1680px] items-center gap-12 lg:grid-cols-2 lg:gap-24 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="relative overflow-hidden" data-reveal>
                <Photo id={s.photo} sizes="(max-width: 1023px) 100vw, 50vw" className="aspect-[5/4] w-full object-cover" />
                <span className="display absolute top-4 left-5 text-[clamp(72px,8vw,140px)] text-white/90 drop-shadow-[0_4px_20px_rgb(0_0_0/0.4)]">0{i + 1}</span>
              </div>
              <div>
                <div data-reveal>
                  <Eyebrow n={`0${i + 1}`}>Core service</Eyebrow>
                </div>
                <h2 id={`${s.id}-h`} className="display mt-6 text-[clamp(56px,6.4vw,112px)] text-navy" data-reveal>
                  {s.title}
                </h2>
                <p className="lede mt-6 max-w-[600px] text-ink/80" data-reveal>
                  {s.body}
                </p>
                <ul className="mt-8 space-y-3" data-reveal>
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-4 text-[17px] font-medium text-ink">
                      <svg aria-hidden viewBox="0 0 20 20" className="size-5 shrink-0 text-red">
                        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
      </div>

      {/* Systems we work on */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <div data-reveal>
            <Eyebrow n="05" light>
              Systems we work on
            </Eyebrow>
          </div>
          <h2 className="display mt-6 text-[clamp(48px,6vw,104px)]" data-reveal>
            <span className="block">Heating. Cooling.</span>
            <span className="it block text-sky">Fresh air.</span>
          </h2>
          <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.systems.map(([k, v], i) => (
              <li key={k} className="bg-ink p-8 transition-colors duration-500 hover:bg-navy" data-reveal style={{'--d': `${(i % 3) * 0.08}s`} as CSSProperties}>
                <span aria-hidden className="block h-[3px] w-10 bg-red" />
                <h3 className="display mt-6 text-[clamp(28px,2.2vw,36px)]">{k}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{v}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[720px] text-white/70" data-reveal>
            Customers can buy HVAC systems and components directly from the manufacturer or at retail price from us — either way, we install, commission and look after them.
          </p>
        </div>
      </section>

      <QuoteBand />
    </div>
  );
}
