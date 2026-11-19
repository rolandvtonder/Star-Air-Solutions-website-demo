import {brand, contact, footerNote, mapsLink, nav, tel} from '../content';
import {useFitText} from '../hooks/useFitText';

/** Shared footer: contact details, page links, and the edge-to-edge wordmark. */
export function Footer() {
  const word = useFitText<HTMLSpanElement>();
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-20 pb-28 text-white md:px-14 md:pb-10">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="caps text-sky">{brand.tagline}</p>
          <p className="display mt-4 text-[clamp(34px,3.4vw,56px)]">
            Need it <span className="it">cool?</span>
          </p>
          <a href={tel(contact.cell)} className="display mt-2 inline-block text-[clamp(28px,2.6vw,40px)] text-sky hover:text-white">
            {contact.cell}
          </a>
        </div>
        <div>
          <p className="caps text-white/55">Pages</p>
          <ul className="mt-4 space-y-1.5">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={n.href} className="inline-block py-1 text-white/85 hover:text-sky">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="caps text-white/55">Contact</p>
          <ul className="mt-4 space-y-1.5 text-white/85">
            <li>
              <a href={tel(contact.cell)} className="inline-block py-1 hover:text-sky">Cell {contact.cell}</a>
            </li>
            <li>
              <a href={tel(contact.alt)} className="inline-block py-1 hover:text-sky">Alt {contact.alt}</a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="inline-block py-1 break-all hover:text-sky">{contact.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="caps text-white/55">Find us</p>
          <address className="mt-4 leading-relaxed text-white/85 not-italic">
            <a href={mapsLink} target="_blank" rel="noreferrer" className="hover:text-sky">
              {contact.address.join(', ')}
            </a>
            <br />
            <span className="text-white/60">{contact.postal}</span>
          </address>
          <div className="mt-4 flex flex-wrap gap-x-5">
            {contact.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="caps inline-block py-1 text-white/70 hover:text-sky">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1680px]" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap text-white/[0.07]">
          Star Air Solution
        </span>
      </div>
      <p className="caps mx-auto mt-6 max-w-[1680px] text-white/50">{footerNote}</p>
    </footer>
  );
}
