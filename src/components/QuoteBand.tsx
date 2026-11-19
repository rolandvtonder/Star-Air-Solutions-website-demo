import {contact, tel, whatsapp, url} from '../content';
import {Eyebrow} from './Heading';

/** Closing call-to-action used at the bottom of most pages. */
export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-red px-5 py-24 text-white md:px-14 md:py-32">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute -top-24 -right-24 size-[520px] text-white/10 max-md:size-[340px]">
        <path d="M100 10a90 90 0 1 1-63.6 26.4" fill="none" stroke="currentColor" strokeWidth="22" />
        <path d="M18 18l24 6-6 24z" fill="currentColor" />
      </svg>
      <div className="relative mx-auto flex max-w-[1680px] flex-col gap-10 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <Eyebrow light>Request a quote</Eyebrow>
          <h2 className="display mt-6 text-[clamp(52px,7vw,124px)]">
            <span className="block">Let’s keep</span>
            <span className="it block">your cool.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          <a href={url('/contact/')} className="caps flex min-h-14 items-center justify-center bg-white px-8 text-ink transition-colors hover:bg-ink hover:text-white">
            Get a quote
          </a>
          <a href={tel(contact.cell)} className="caps flex min-h-14 items-center justify-center border border-white/70 px-8 transition-colors hover:bg-white hover:text-red">
            Call {contact.cell}
          </a>
          <a href={whatsapp('Hi Star Air Solution, I would like a quote.')} target="_blank" rel="noreferrer" className="caps flex min-h-14 items-center justify-center border border-white/70 px-8 transition-colors hover:bg-white hover:text-red">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
