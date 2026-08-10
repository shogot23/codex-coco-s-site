import derivativeManifest from '../../public/media/manifest.json';

export type ImageMetadata = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type MediaRole = 'card' | 'detail' | 'hero';

type Derivative = { path: string; width: number; height?: number };
type ManifestEntry = {
  width?: number;
  height?: number;
  variants: Record<MediaRole, Record<string, { avif: Derivative; webp: Derivative }>>;
  social: Derivative;
};

const manifestEntries = derivativeManifest.entries as Record<string, ManifestEntry>;

export const isAbsoluteUrl = (value: string): boolean =>
  /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value);

export function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : `${base}/`;
}

export function withBase(assetPath: string, base: string): string {
  const baseWithSlash = normalizeBase(base);
  if (!assetPath) return baseWithSlash;
  if (isAbsoluteUrl(assetPath) || assetPath.startsWith(baseWithSlash)) return assetPath;
  return `${baseWithSlash}${assetPath.replace(/^\/+/, '')}`;
}

export function resolveAssetUrl(assetPath: string, base: string, site: URL): string {
  return new URL(withBase(assetPath, base), site).toString();
}

export function buildSrcSet(
  sources: readonly { src: string; width: number }[],
  base: string
): string | undefined {
  if (sources.length === 0) return undefined;
  return sources.map(({ src, width }) => `${withBase(src, base)} ${width}w`).join(', ');
}

const normalizeManifestKey = (assetPath: string, base: string): string => {
  const baseWithSlash = normalizeBase(base);
  let normalized = assetPath;
  if (isAbsoluteUrl(normalized)) {
    try {
      normalized = new URL(normalized).pathname;
    } catch {
      return assetPath;
    }
  }
  if (normalized.startsWith(baseWithSlash)) normalized = normalized.slice(baseWithSlash.length - 1);
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  return normalized;
};

const derivativeUrl = (path: string, base: string) => withBase(`/media/${path}`, base);

export function getResponsiveMedia(assetPath: string, base: string, role: MediaRole = 'card') {
  const entry = manifestEntries[normalizeManifestKey(assetPath, base)];
  if (!entry?.variants?.[role]) {
    return {
      src: withBase(assetPath, base),
      avifSrcSet: undefined,
      webpSrcSet: undefined,
      width: undefined,
      height: undefined,
      optimized: false,
    };
  }

  const variants = Object.values(entry.variants[role]).sort((left, right) => left.webp.width - right.webp.width);
  const fallback = variants[0]!;
  return {
    src: derivativeUrl(fallback.webp.path, base),
    avifSrcSet: variants.map(({ avif }) => `${derivativeUrl(avif.path, base)} ${avif.width}w`).join(', '),
    webpSrcSet: variants.map(({ webp }) => `${derivativeUrl(webp.path, base)} ${webp.width}w`).join(', '),
    width: fallback.webp.width,
    height: fallback.webp.height,
    optimized: true,
  };
}

export function getSocialImage(assetPath: string, base: string): string {
  const entry = manifestEntries[normalizeManifestKey(assetPath, base)];
  return entry?.social?.path ? derivativeUrl(entry.social.path, base) : withBase(assetPath, base);
}
