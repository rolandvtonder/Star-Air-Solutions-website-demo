import type {CSSProperties} from 'react';
import {areas, contact, tel} from '../content';
import {Eyebrow, Lines} from './Heading';

/** "Areas we travel to": the towns we serve, grouped by province. */
export function ServiceAreas({n}: {n: string}) {
  return (
    <section aria-labelledby="areas-h" className="relative overflow-hidden bg-ink px-5 py-24 md:px-14 md:py-32">
      {/* Faint cycle ring from the logo, purely decorative. */}
      <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute -bottom-40 -left-40 size-[560px] text-sky/[0.06] max-md:size-[380px]">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="24" />
      </svg>

      <div className="relative mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-24">
        <div>
          <div data-reveal>
            <Eyebrow n={n} light>
              Areas we travel to
            </Eyebrow>
          </div>
          <h2 id="areas-h" className="display mt-6 text-[clamp(52px,6.4vw,112px)]" data-reveal>
            <Lines lines={areas.lines} />
          </h2>
          <p className="lede mt-6 max-w-[460px] text-white/80" data-reveal>
            {areas.body}
          </p>
        </div>

        <div className="grid gap-px self-start bg-white/15 sm:grid-cols-2">
          {areas.regions.map((r, i) => (
            <div key={r.name} className="bg-ink p-8 md:p-10" data-reveal style={{'--d': `${i * 0.1}s`} as CSSProperties}>
              <p className="caps text-sky">{r.name}</p>
              <ul className="mt-6 space-y-3">
                {r.places.map((pl) => (
                  <li key={pl} className="display flex items-center gap-4 text-[clamp(28px,2.4vw,40px)]">
                    <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-red" />
                    {pl}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="bg-navy p-8 text-[17px] text-white/85 sm:col-span-2 md:px-10" data-reveal>
            {areas.note.split('Call us')[0]}
            <a href={tel(contact.cell)} className="font-semibold text-sky underline-offset-4 hover:underline">
              Call us on {contact.cell}
            </a>
            {areas.note.split('Call us')[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
