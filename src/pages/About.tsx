import type {CSSProperties} from 'react';
import {about, brand, contact} from '../content';
import {Eyebrow} from '../components/Heading';
import {PageHero} from '../components/PageHero';
import {Photo} from '../components/Photo';
import {QuoteBand} from '../components/QuoteBand';
import {ServiceAreas} from '../components/ServiceAreas';
import {useReveals} from '../hooks/useReveals';

export function About() {
  const ref = useReveals<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero n="02" label="About us" lines={about.lines} body={about.body} photo="p-114" />

      {/* Overview */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <div data-reveal>
              <Eyebrow n="01">Company overview</Eyebrow>
            </div>
            <h2 className="display mt-6 text-[clamp(48px,5.6vw,96px)] text-navy" data-reveal>
              <span className="block">Built on</span>
              <span className="it block">our good name.</span>
            </h2>
            <dl className="mt-12 space-y-5 border-t border-ink/15 pt-8" data-reveal>
              {[
                ['Registered', brand.founded],
                ['Reg. No', brand.reg],
                ['Director', contact.director],
                ['Serving', contact.region],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[130px_1fr] gap-4">
                  <dt className="caps text-ink/55">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-6">
            {about.overview.map((p, i) => (
              <p key={i} className="lede text-ink/80" data-reveal>
                {p}
              </p>
            ))}
            <ul className="flex flex-wrap gap-2 pt-4" data-reveal aria-label="Who we work for">
              {about.sectors.map((s) => (
                <li key={s} className="caps border border-navy/25 px-4 py-2 text-navy">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="grid bg-navy md:grid-cols-2">
        {[
          {k: 'Our mission', v: about.mission, tint: 'bg-navy'},
          {k: 'Our vision', v: about.vision, tint: 'bg-ink'},
        ].map((b, i) => (
          <div key={b.k} className={`${b.tint} px-5 py-20 md:px-14 md:py-28`}>
            <div data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties}>
              <Eyebrow n={`0${i + 2}`} light>
                {b.k}
              </Eyebrow>
              <p className="display mt-8 max-w-[640px] text-[clamp(30px,2.8vw,46px)] leading-[1.05] normal-case">{b.v}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Director + values */}
      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36">
        <div className="mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <figure className="relative" data-reveal>
            <Photo id="p-1b" sizes="(max-width: 1023px) 100vw, 40vw" className="aspect-[4/5] w-full object-cover" />
            <figcaption className="absolute right-0 bottom-0 left-0 bg-[linear-gradient(0deg,rgb(6_22_49/0.92),transparent)] p-7 pt-20 text-white">
              <p className="caps text-sky">Our team on site</p>
              <p className="mt-2 text-white/85">Running refrigerant pipework on a rooftop VRV installation.</p>
            </figcaption>
          </figure>
          <div className="self-center">
            <div data-reveal>
              <Eyebrow n="04">What we stand for</Eyebrow>
            </div>
            <h2 className="display mt-6 text-[clamp(48px,5.6vw,96px)] text-navy" data-reveal>
              <span className="block">Good people.</span>
              <span className="it block">Good work.</span>
            </h2>
            <ol className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
              {about.values.map(([k, v], i) => (
                <li key={k} className="grid grid-cols-[56px_1fr] gap-4 py-7" data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
                  <span className="display text-[28px] text-red">0{i + 1}</span>
                  <div>
                    <h3 className="display text-[clamp(30px,2.4vw,40px)] text-navy">{k}</h3>
                    <p className="mt-2 text-[17px] leading-relaxed text-ink/75">{v}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 border-l-4 border-red bg-white p-7 shadow-[0_10px_40px_rgb(6_22_49/0.08)]" data-reveal>
              <p className="caps text-ink/55">Founder & director</p>
              <p className="display mt-2 text-[clamp(30px,2.6vw,42px)] text-navy">{contact.director}</p>
              <p className="mt-2 text-ink/75">Founded Star Air Solution in {brand.founded} and still leads the work.</p>
            </div>
          </div>
        </div>
      </section>

      <ServiceAreas n="05" />

      <QuoteBand />
    </div>
  );
}
