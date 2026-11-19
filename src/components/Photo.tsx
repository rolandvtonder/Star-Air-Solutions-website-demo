import type {CSSProperties} from 'react';
import manifest from '../photos.json';
import {captions} from '../content';

type Meta = {src: string; w: number; h: number};
const photos = manifest as Record<string, Meta>;

export const photoUrl = (id: string, size: 'lg' | 'sm' = 'lg') => `${import.meta.env.BASE_URL}media/${id}-${size}.webp`;
export const photoMeta = (id: string): Meta => photos[id] ?? {src: '', w: 4, h: 3};
export const altFor = (id: string) => captions[id] ?? 'Star Air Solution installation';

/** Every job photo, in a stable order, minus flyers and the logo card. */
export const galleryIds = Object.keys(captions);

/**
 * A job photo with a responsive srcset and its real dimensions, so the
 * browser reserves space before it loads (no layout shift).
 */
export function Photo({
  id,
  className = '',
  sizes = '100vw',
  eager = false,
  alt,
  style,
}: {
  id: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  alt?: string;
  style?: CSSProperties;
}) {
  const m = photoMeta(id);
  const lgW = Math.min(1600, m.w);
  const smW = Math.min(800, m.w);
  return (
    <img
      src={photoUrl(id, 'lg')}
      srcSet={`${photoUrl(id, 'sm')} ${smW}w, ${photoUrl(id, 'lg')} ${lgW}w`}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt ?? altFor(id)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
