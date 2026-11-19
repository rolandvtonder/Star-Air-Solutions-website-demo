import type {Line} from '../content';

/** Stacked display lines; the copy decides which lines are italic. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'pl-[1.2em] max-sm:pl-0' : ''}`}>
          {l.t}
        </span>
      ))}
    </>
  );
}

/** Small numbered label above a section title, e.g. "02 — Services". */
export function Eyebrow({n, children, light = false}: {n?: string; children: string; light?: boolean}) {
  return (
    <p className={`caps flex items-center gap-3 ${light ? 'text-sky' : 'text-blue'}`}>
      {n && <span className={light ? 'text-white/60' : 'text-ink/50'}>{n}</span>}
      <span aria-hidden className={`h-px w-8 ${light ? 'bg-sky' : 'bg-red'}`} />
      {children}
    </p>
  );
}
