import type {CSSProperties} from 'react';
import {brand, home, projects, url} from '../content';
import {Eyebrow, Lines} from '../components/Heading';
import {HomeHero} from '../components/HomeHero';
import {altFor, Photo} from '../components/Photo';
import {QuoteBand} from '../components/QuoteBand';
import {ServicePanels} from '../components/ServicePanels';
import {useReveals} from '../hooks/useReveals';

export function Home() {
  const ref = useReveals<HTMLDivElement>();
  const names = projects.map((p) => p.name);

  return (
    <div ref={ref}>
      <HomeHero />
      <ServicePanels />

      {/* Welcome */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <div data-reveal>
              <Eyebrow n="01">{home.intro.kicker}</Eyebrow>
            </div>
            <h2 className="display mt-6 text-[clamp(48px,6vw,104px)] text-navy" data-reveal>
              <Lines lines={home.intro.title} />
            </h2>
            <p className="lede mt-8 max-w-[620px] text-ink/80" data-reveal>
              We are <strong className="font-semibold text-navy">{brand.legal}</strong>. {home.intro.body}
            </p>
            <a href={url('/about/')} className="caps mt-10 inline-flex min-h-12 items-center gap-3 bg-navy px-7 text-white transition-colors hover:bg-blue" data-reveal>
              About us <span aria-hidden>→</span>
            </a>

            <dl className="mt-16 grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
              {home.stats.map(([v, k], i) => (
                <div key={k} className="bg-paper py-6 pr-4" data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
                  <dd className="display text-[clamp(44px,4vw,64px)] text-red">{v}</dd>
                  <dt className="caps mt-2 text-ink/65">{k}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative min-h-[420px]" data-reveal>
            <Photo id="p-113" sizes="(max-width: 1023px) 100vw, 45vw" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 max-w-[260px] bg-navy p-6 text-white max-sm:left-4 max-sm:-bottom-8">
              <p className="caps text-sky">Licensed & insured</p>
              <p className="mt-2 leading-snug text-white/85">Government, healthcare, commercial, industrial and residential clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project names marquee */}
      <section aria-label="Recent project sites" className="marquee-wrap overflow-hidden border-y border-white/10 bg-ink py-8">
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...names, ...names].map((n, i) => (
            <span key={i} aria-hidden={i >= names.length} className="display flex items-center gap-12 text-[clamp(30px,3vw,48px)] text-white/85">
              {n}
              <span aria-hidden className="size-2.5 rounded-full bg-red" />
            </span>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section className="bg-ink px-5 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div data-reveal>
                <Eyebrow n="02" light>
                  Recent work
                </Eyebrow>
              </div>
              <h2 className="display mt-6 text-[clamp(48px,6vw,104px)]" data-reveal>
                <span className="block">From hospitals</span>
                <span className="it block text-sky">to rooftops.</span>
              </h2>
            </div>
            <a href={url('/projects/')} className="caps inline-flex min-h-12 items-center gap-3 self-start border border-white/40 px-7 hover:bg-white hover:text-ink md:self-auto" data-reveal>
              All projects <span aria-hidden>→</span>
            </a>
          </div>

          <div className="mt-14 grid gap-[3px] md:grid-cols-3">
            {[
              {photo: 'p-123', kind: 'VRF & ducting', title: 'Plant & ductwork'},
              {photo: 'p-25', kind: 'Chilled water', title: 'Pumps & pipework'},
              {photo: 'p-111', kind: 'VRV systems', title: 'Rooftop plant'},
            ].map(({photo, kind, title}, i) => (
              <a key={photo} href={url('/gallery/')} className="group relative block aspect-[4/5] overflow-hidden bg-navy" data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties}>
                <Photo id={photo} alt="" sizes="(max-width: 767px) 100vw, 33vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(6_22_49/0.92),transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="caps text-sky">{kind}</p>
                  <h3 className="display mt-2 text-[clamp(30px,2.6vw,44px)]">{title}</h3>
                  <p className="mt-2 text-white/80">{altFor(photo)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand />
    </div>
  );
}
