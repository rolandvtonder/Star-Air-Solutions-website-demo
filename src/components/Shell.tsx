import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {brand, contact, whatsapp, type PageId, url} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {lockScroll, scrollToHash, startScroll} from '../lib/scroll';
import {Footer} from './Footer';
import {Menu} from './Menu';

const LEAVE_MS = 650;

/**
 * Everything every page shares: the logo, the menu button and menu, the
 * fixed quote button, the footer, the grain, and the page transition — a
 * navy curtain that wipes off as a page arrives and wipes back in before the
 * browser moves to the next one.
 */
export function Shell({page, children}: {page: PageId; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => startScroll(reduced), [reduced]);

  // Let the first frame paint covered, then pull the curtain away.
  useEffect(() => {
    let b = 0;
    const a = requestAnimationFrame(() => (b = requestAnimationFrame(() => setArrived(true))));
    // Background tabs pause animation frames; never leave the page covered.
    const fallback = window.setTimeout(() => setArrived(true), 400);
    // Coming back with the browser's back button restores this page from
    // cache mid-transition; drop the curtain again.
    const onShow = (e: PageTransitionEvent) => e.persisted && setLeaving(false);
    window.addEventListener('pageshow', onShow);
    return () => {
      cancelAnimationFrame(a);
      cancelAnimationFrame(b);
      window.clearTimeout(fallback);
      window.removeEventListener('pageshow', onShow);
    };
  }, []);

  useEffect(() => lockScroll(open), [open]);

  const close = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus({preventScroll: true});
  }, []);

  // Intercept same-site links so the curtain can run before the page changes.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      if (url.pathname === location.pathname) {
        setOpen(false);
        if (url.hash) scrollToHash(url.hash);
        return;
      }
      setOpen(false);
      setLeaving(true);
      window.setTimeout(() => location.assign(url.href), reduced ? 0 : LEAVE_MS);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reduced]);

  return (
    <>
      <a href="#main" className="caps fixed top-3 left-3 z-[80] -translate-y-24 bg-paper px-4 py-3 text-ink focus:translate-y-0">
        Skip to content
      </a>

      {/* Logo and name together in one white badge, readable on any background and screen size. */}
      <a
        href={url('/')}
        aria-label={`${brand.name} — home`}
        className="fixed top-4 left-4 z-[55] flex h-12 items-center gap-2 rounded-xl bg-white pr-4 pl-1.5 shadow-[0_6px_24px_rgb(0_0_0/0.25)] md:top-6 md:left-10 md:h-14 md:gap-2.5 md:pr-5 md:pl-2"
      >
        <img src={url('media/logo-mark.png')} alt="" width={256} height={235} className="h-10 w-auto md:h-11" />
        <span className="display text-[17px] leading-[0.92] tracking-[0.04em] text-ink md:text-[20px]">
          Star Air
          <br />
          Solution
        </span>
      </a>

      <button
        ref={menuBtn}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-4 z-[55] flex min-h-12 items-center gap-4 px-6 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-white' : 'bg-ink/55 text-white hover:bg-ink/80'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={page === 'contact' ? whatsapp() : url('contact/')}
        target={page === 'contact' ? '_blank' : undefined}
        rel={page === 'contact' ? 'noreferrer' : undefined}
        className="caps fixed right-4 bottom-4 z-[55] flex min-h-12 items-center gap-2 bg-red px-7 text-white shadow-[0_10px_30px_rgb(227_30_36/0.35)] transition-colors duration-300 hover:bg-ember md:right-8 md:bottom-7"
      >
        {page === 'contact' ? (
          <>
            WhatsApp <em className="font-medium normal-case">{contact.cell}</em>
          </>
        ) : (
          <>
            Request a <em className="font-medium normal-case">quote</em>
          </>
        )}
      </a>

      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />

      <Menu open={open} current={page} onClose={close} />

      {/* Page transition: arriving curtain wipes off left, leaving one wipes in from the right. */}
      {!reduced && (
        <>
          <div
            aria-hidden
            className={`pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-navy transition-transform duration-[900ms] ease-wipe ${
              arrived ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <img src={url('media/logo-mark.png')} alt="" className="w-20 rounded-2xl bg-white p-2.5 opacity-90" />
          </div>
          <div
            aria-hidden
            className={`fixed inset-0 z-[70] bg-navy transition-transform duration-[650ms] ease-wipe ${
              leaving ? 'translate-x-0' : 'pointer-events-none translate-x-full'
            }`}
          />
        </>
      )}
      <div className="grain" aria-hidden />
    </>
  );
}
