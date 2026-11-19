import {useState, type CSSProperties} from 'react';
import {projects, projectsPage, type Sector} from '../content';
import {Eyebrow} from '../components/Heading';
import {PageHero} from '../components/PageHero';
import {Photo} from '../components/Photo';
import {QuoteBand} from '../components/QuoteBand';
import {useReveals} from '../hooks/useReveals';

const sectors: ('All' | Sector)[] = ['All', 'Healthcare', 'Public', 'Education', 'Transport', 'Commercial'];

export function Projects() {
  const ref = useReveals<HTMLDivElement>();
  const [filter, setFilter] = useState<'All' | Sector>('All');
  const list = filter === 'All' ? projects : projects.filter((p) => p.sector === filter);

  return (
    <div ref={ref}>
      <PageHero n="04" label="Projects" lines={projectsPage.lines} body={projectsPage.body} photo="p-113" />

      <section className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div data-reveal>
                <Eyebrow n="01">References</Eyebrow>
              </div>
              <h2 className="display mt-6 text-[clamp(48px,6vw,104px)] text-navy" data-reveal>
                <span className="block">Our recent</span>
                <span className="it block">projects.</span>
              </h2>
            </div>
            <div role="group" aria-label="Filter projects by sector" className="flex flex-wrap gap-2" data-reveal>
              {sectors.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={filter === s}
                  onClick={() => setFilter(s)}
                  className={`caps min-h-11 border px-5 transition-colors ${
                    filter === s ? 'border-navy bg-navy text-white' : 'border-ink/20 text-ink/75 hover:border-navy hover:text-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {list.length} {list.length === 1 ? 'project' : 'projects'}
          </p>

          <ol className="mt-14 border-t border-ink/15">
            {list.map((p) => {
              const n = projects.indexOf(p) + 1;
              return (
                <li key={p.name} className="group grid grid-cols-[48px_1fr] gap-x-5 gap-y-2 border-b border-ink/15 py-7 transition-colors duration-300 hover:bg-white md:grid-cols-[72px_1.3fr_1.2fr_1fr_120px] md:items-baseline md:px-4">
                  <span className="display text-[26px] text-red">{String(n).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display text-[clamp(30px,2.6vw,46px)] text-navy">{p.name}</h3>
                    <p className="caps mt-1 text-ink/55">{p.place}</p>
                  </div>
                  <p className="col-start-2 text-[17px] text-ink/85 md:col-start-auto">{p.scope}</p>
                  <p className="col-start-2 text-ink/60 md:col-start-auto">
                    <span className="sr-only">Main contractor: </span>
                    {p.contractor}
                  </p>
                  <span className="caps col-start-2 self-start justify-self-start bg-frost px-3 py-1 text-blue md:col-start-auto md:justify-self-end">{p.sector}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Contractors */}
      <section className="bg-navy px-5 py-20 md:px-14 md:py-28">
        <div className="mx-auto grid max-w-[1680px] gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div data-reveal>
            <Eyebrow n="02" light>
              Who we work with
            </Eyebrow>
            <p className="lede mt-6 max-w-[460px] text-white/80">
              We deliver HVAC packages for main and mechanical contractors across KwaZulu-Natal and the Eastern Cape. References are available on request.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-white/15">
            {projectsPage.contractors.map((c, i) => (
              <li key={c} className="display bg-navy p-8 text-[clamp(26px,2.4vw,40px)]" data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* On site strip */}
      <section aria-label="On site" className="grid grid-cols-2 gap-[3px] bg-ink md:grid-cols-4">
        {['p-114', 'p-333', 'p-211', 'p-25'].map((id) => (
          <Photo key={id} id={id} sizes="(max-width: 767px) 50vw, 25vw" className="aspect-square w-full object-cover" />
        ))}
      </section>

      <QuoteBand />
    </div>
  );
}
