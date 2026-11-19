import {useEffect, useRef, useState, type FormEvent, type ReactNode} from 'react';
import {brand, contact, contactPage, mapsLink, tel, whatsapp} from '../content';
import {Eyebrow} from '../components/Heading';
import {PageHero} from '../components/PageHero';
import {useReveals} from '../hooks/useReveals';

type Field = 'name' | 'phone' | 'email' | 'area' | 'property' | 'service' | 'message';
type Values = Record<Field, string>;

const empty: Values = {name: '', phone: '', email: '', area: '', property: '', service: '', message: ''};
const labels: Record<Field, string> = {
  name: 'Your name',
  phone: 'Phone number',
  email: 'Email (optional)',
  area: 'Town / suburb',
  property: 'Type of property',
  service: 'What do you need?',
  message: 'Tell us about the job',
};

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.name.trim()) e.name = 'Please enter your name so we know who to ask for.';
  if (v.phone.replace(/\D/g, '').length < 9) e.phone = 'Please enter a phone number with at least 9 digits, e.g. 072 599 0798.';
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'That email doesn’t look right — check for a missing @ or dot, or leave it empty.';
  if (!v.service) e.service = 'Please choose the service you need.';
  if (v.message.trim().length < 10) e.message = 'Please add a few words about the job (at least 10 characters).';
  return e;
}

/** The quote request as plain text, ready for WhatsApp or email. */
function compose(v: Values) {
  return [
    `Quote request — ${brand.name} website`,
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email ? `Email: ${v.email}` : null,
    v.area ? `Area: ${v.area}` : null,
    v.property ? `Property: ${v.property}` : null,
    `Service: ${v.service}`,
    '',
    v.message,
  ]
    .filter((l) => l !== null)
    .join('\n');
}

export function Contact() {
  const ref = useReveals<HTMLDivElement>();
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState<null | 'whatsapp' | 'email'>(null);
  const summary = useRef<HTMLDivElement>(null);
  const via = useRef<'whatsapp' | 'email'>('whatsapp');
  const [attempt, setAttempt] = useState(0);

  // After a failed submit, move focus to the error summary once it has rendered.
  useEffect(() => {
    if (attempt) summary.current?.focus();
  }, [attempt]);

  const errors = validate(values);
  const show = (f: Field) => (submitted || touched[f]) && errors[f];
  const errorList = Object.entries(errors) as [Field, string][];

  const set = (f: Field) => (e: {target: {value: string}}) => setValues((v) => ({...v, [f]: e.target.value}));
  const blur = (f: Field) => () => setTouched((t) => ({...t, [f]: true}));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (errorList.length) {
      setAttempt((a) => a + 1);
      return;
    }
    const text = compose(values);
    if (via.current === 'whatsapp') {
      window.open(whatsapp(text), '_blank', 'noopener');
    } else {
      location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Quote request from ${values.name}`)}&body=${encodeURIComponent(text)}`;
    }
    setSent(via.current);
  };

  const input =
    'mt-2 block min-h-12 w-full border bg-white px-4 py-3 text-[16px] text-ink outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/30';
  const border = (f: Field) => (show(f) ? 'border-red' : 'border-ink/20');

  const field = (f: Field, required: boolean, el: ReactNode) => (
    <div className={f === 'message' ? 'sm:col-span-2' : ''}>
      <label htmlFor={f} className="caps text-ink/75">
        {labels[f]}
        {required && (
          <span className="text-red" aria-hidden>
            {' '}
            *
          </span>
        )}
      </label>
      {el}
      {show(f) && (
        <p id={`${f}-err`} className="mt-2 flex gap-2 text-[15px] text-ember">
          <span aria-hidden>!</span>
          {errors[f]}
        </p>
      )}
    </div>
  );

  const aria = (f: Field) => ({
    id: f,
    name: f,
    value: values[f],
    onChange: set(f),
    onBlur: blur(f),
    'aria-invalid': !!show(f) || undefined,
    'aria-describedby': show(f) ? `${f}-err` : undefined,
  });

  return (
    <div ref={ref}>
      <PageHero n="06" label="Contact" lines={contactPage.lines} body={contactPage.body} photo="p-wa-2026-11-18-at-20-25-35" />

      <section className="bg-paper px-5 py-20 text-ink md:px-14 md:py-28">
        <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
          {/* Details */}
          <div>
            <div data-reveal>
              <Eyebrow n="01">Talk to us</Eyebrow>
            </div>
            <h2 className="display mt-6 text-[clamp(44px,5vw,84px)] text-navy" data-reveal>
              <span className="block">Call, WhatsApp</span>
              <span className="it block">or write.</span>
            </h2>

            <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15" data-reveal>
              <li className="py-6">
                <p className="caps text-ink/55">Cell</p>
                <a href={tel(contact.cell)} className="display text-[clamp(32px,3vw,46px)] text-navy hover:text-red">
                  {contact.cell}
                </a>
              </li>
              <li className="py-6">
                <p className="caps text-ink/55">Alternative</p>
                <a href={tel(contact.alt)} className="display text-[clamp(32px,3vw,46px)] text-navy hover:text-red">
                  {contact.alt}
                </a>
              </li>
              <li className="py-6">
                <p className="caps text-ink/55">Email</p>
                <a href={`mailto:${contact.email}`} className="text-[20px] font-medium break-all text-navy hover:text-red">
                  {contact.email}
                </a>
              </li>
              <li className="py-6">
                <p className="caps text-ink/55">Address</p>
                <address className="mt-1 text-[18px] leading-relaxed not-italic">
                  {contact.address.join(', ')}
                  <br />
                  <span className="text-ink/60">{contact.postal}</span>
                </address>
                <a href={mapsLink} target="_blank" rel="noreferrer" className="caps mt-3 inline-flex min-h-11 items-center gap-2 text-blue hover:text-red">
                  Open in Google Maps <span aria-hidden>↗</span>
                </a>
              </li>
              <li className="py-6">
                <p className="caps text-ink/55">Director</p>
                <p className="mt-1 text-[18px] font-medium">{contact.director}</p>
              </li>
            </ul>
          </div>

          {/* Quote form */}
          <div className="bg-white p-6 shadow-[0_20px_60px_rgb(6_22_49/0.08)] md:p-12" data-reveal>
            <Eyebrow n="02">Request a quote</Eyebrow>
            <p className="mt-4 text-[17px] text-ink/75">
              Fill this in and choose how to send it — it opens WhatsApp or your email app with everything filled in. Fields marked <span className="text-red">*</span> are required.
            </p>

            {submitted && errorList.length > 0 && (
              <div ref={summary} tabIndex={-1} role="alert" className="mt-8 border-l-4 border-red bg-red/5 p-5 outline-none">
                <p className="font-semibold text-ember">
                  Please fix {errorList.length} {errorList.length === 1 ? 'thing' : 'things'} before sending:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {errorList.map(([f, msg]) => (
                    <li key={f}>
                      <a href={`#${f}`} onClick={(e) => (e.preventDefault(), document.getElementById(f)?.focus())} className="text-ember underline">
                        {msg}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sent && (
              <div role="status" className="mt-8 border-l-4 border-blue bg-frost p-5">
                <p className="font-semibold text-navy">Your quote request is ready in {sent === 'whatsapp' ? 'WhatsApp' : 'your email app'}.</p>
                <p className="mt-1 text-ink/75">Just press send there. If nothing opened, call us on {contact.cell}.</p>
              </div>
            )}

            <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
              {field('name', true, <input {...aria('name')} autoComplete="name" required className={`${input} ${border('name')}`} />)}
              {field('phone', true, <input {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel" required className={`${input} ${border('phone')}`} />)}
              {field('email', false, <input {...aria('email')} type="email" autoComplete="email" className={`${input} ${border('email')}`} />)}
              {field('area', false, <input {...aria('area')} autoComplete="address-level2" className={`${input} ${border('area')}`} />)}
              {field(
                'property',
                false,
                <select {...aria('property')} className={`${input} ${border('property')}`}>
                  <option value="">Choose…</option>
                  {contactPage.property.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>,
              )}
              {field(
                'service',
                true,
                <select {...aria('service')} required className={`${input} ${border('service')}`}>
                  <option value="">Choose…</option>
                  {contactPage.services.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>,
              )}
              {field(
                'message',
                true,
                <textarea {...aria('message')} rows={5} required placeholder="e.g. 3 split units for a new office, about 40 m² each" className={`${input} ${border('message')} resize-y`} />,
              )}
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                <button type="submit" onClick={() => (via.current = 'whatsapp')} className="caps flex min-h-14 flex-1 items-center justify-center gap-2 bg-red px-8 text-white transition-colors hover:bg-ember">
                  Send via WhatsApp
                </button>
                <button type="submit" onClick={() => (via.current = 'email')} className="caps flex min-h-14 flex-1 items-center justify-center gap-2 border border-navy px-8 text-navy transition-colors hover:bg-navy hover:text-white">
                  Send via email
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
