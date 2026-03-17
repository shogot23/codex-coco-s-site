import { readFileSync } from 'node:fs';

const SEARCH_ENDPOINT = 'https://duckduckgo.com/html/';
const NDL_OPENSEARCH_ENDPOINT = 'https://ndlsearch.ndl.go.jp/api/opensearch';
const DEFAULT_TIMEOUT_MS = 4000;
const DEFAULT_MAX_RESULTS_PER_QUERY = 3;
const DEFAULT_MAX_QUERIES_PER_TARGET = 5;
const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (compatible; codex-gallery-import/1.0; +https://example.invalid/gallery-import)';

const BIBLIOGRAPHIC_DOMAINS = [
  'ndlsearch.ndl.go.jp',
  'books.or.jp',
  'bookmeter.com',
  'booklog.jp',
];

const BOOKSTORE_DOMAINS = [
  'kinokuniya.co.jp',
  'honto.jp',
  'bookwalker.jp',
  'amazon.co.jp',
  'rakuten.co.jp',
  '7net.omni7.jp',
];

const PUBLISHER_HOST_HINTS = [
  'kadokawa',
  'kodansha',
  'shueisha',
  'shinchosha',
  'bunshun',
  'hayakawa',
  'iwanami',
  'chuko',
  'gentosha',
  'php',
  'diamond',
  'discover21',
  'nikkei',
  'gakken',
  'futabasha',
  'sogensha',
];

type SearchResult = {
  url: string;
  title: string;
};

type DiscoveryLink = {
  url: string;
  discoveredVia: string;
};

type SearchFixture = {
  searches?: Record<string, SearchResult[]>;
  pages?: Record<
    string,
    {
      status?: number;
      body: string;
      finalUrl?: string;
    }
  >;
};

type NdlOpenSearchRecord = {
  url: string;
  title: string;
  authors: string[];
  publisher?: string;
  relatedUrls: string[];
};

export type WebFactCheckSourceType = 'publisher' | 'bibliographic-db' | 'bookstore' | 'other';

export type WebFactCheckCandidate = {
  value: string;
  score: number;
  sources?: string[];
};

export type WebFactCheckSimilarEntry = {
  kind: 'gallery' | 'review';
  path: string;
  title: string;
  author?: string;
  score: number;
  titleScore: number;
  authorScore: number;
};

export type WebFactCheckDuplicateCandidate = {
  path: string;
  title: string;
  author?: string;
  score: number;
  reason: 'probable-duplicate' | 'strong-similar' | 'exact-similar';
};

export type WebFactCheckSource = {
  url: string;
  domain: string;
  title: string;
  sourceType: WebFactCheckSourceType;
  matchedTitle: boolean;
  matchedAuthor: boolean;
  titleMatchScore: number;
  authorMatchScore: number;
};

export type WebFactCheckResult = {
  attempted: boolean;
  skippedReason?: string;
  warnings: string[];
  queries: string[];
  sources: WebFactCheckSource[];
  duplicate?: {
    confirmed: boolean;
    path: string;
    title: string;
    author?: string;
    sourceCount: number;
    trustedSourceCount: number;
  };
  metadata?: {
    confirmed: boolean;
    title: string;
    author: string;
    sourceCount: number;
    trustedSourceCount: number;
  };
};

export type WebFactCheckInput = {
  title?: string;
  author?: string;
  titleConfidence: number;
  authorConfidence: number;
  ocrConfidence: number;
  titleCandidates: WebFactCheckCandidate[];
  authorCandidates: WebFactCheckCandidate[];
  similarEntries: WebFactCheckSimilarEntry[];
  duplicateCandidate?: WebFactCheckDuplicateCandidate;
  timeoutMs?: number;
  maxResultsPerQuery?: number;
  maxQueriesPerTarget?: number;
};

function roundConfidence(value: number): number {
  return Number(Math.max(0, Math.min(1, value)).toFixed(3));
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeForComparison(value?: string): string {
  return (value ?? '')
    .normalize('NFKC')
    .replace(/\s+/g, '')
    .replace(/[「」『』"'`’‘“”.,，、。・･!！?？:：;；/／\\()（）［］\[\]【】〔〕〈〉《》＜＞\-ー_〜~＋+＝=]/g, '')
    .toLowerCase();
}

function buildBigrams(value: string): Map<string, number> {
  const counts = new Map<string, number>();
  if (value.length < 2) {
    counts.set(value, 1);
    return counts;
  }

  for (let index = 0; index < value.length - 1; index += 1) {
    const gram = value.slice(index, index + 2);
    counts.set(gram, (counts.get(gram) ?? 0) + 1);
  }

  return counts;
}

function diceCoefficient(left: string, right: string): number {
  if (!left || !right) {
    return 0;
  }

  if (left === right) {
    return 1;
  }

  const leftBigrams = buildBigrams(left);
  const rightBigrams = buildBigrams(right);
  let overlap = 0;

  for (const [gram, leftCount] of leftBigrams.entries()) {
    const rightCount = rightBigrams.get(gram) ?? 0;
    overlap += Math.min(leftCount, rightCount);
  }

  const total =
    [...leftBigrams.values()].reduce((sum, count) => sum + count, 0) +
    [...rightBigrams.values()].reduce((sum, count) => sum + count, 0);

  return total === 0 ? 0 : (2 * overlap) / total;
}

function calculateSimilarity(left?: string, right?: string): number {
  const normalizedLeft = normalizeForComparison(left);
  const normalizedRight = normalizeForComparison(right);

  if (!normalizedLeft || !normalizedRight) {
    return 0;
  }

  if (normalizedLeft === normalizedRight) {
    return 1;
  }

  const shorter = Math.min(normalizedLeft.length, normalizedRight.length);
  const longer = Math.max(normalizedLeft.length, normalizedRight.length);
  const containment =
    normalizedLeft.includes(normalizedRight) || normalizedRight.includes(normalizedLeft)
      ? 0.82 + (shorter / longer) * 0.16
      : 0;

  return roundConfidence(Math.max(diceCoefficient(normalizedLeft, normalizedRight), containment));
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, codePoint) => String.fromCodePoint(Number(codePoint)))
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint) => String.fromCodePoint(Number.parseInt(codePoint, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(value: string): string {
  return normalizeText(
    decodeHtmlEntities(
      value
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
    )
  );
}

function extractMetaContent(html: string, attr: 'name' | 'property', key: string): string | undefined {
  const pattern = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    'i'
  );
  const match = html.match(pattern);
  return match?.[1] ? decodeHtmlEntities(match[1]) : undefined;
}

function extractHtmlTitle(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? normalizeText(decodeHtmlEntities(match[1])) : undefined;
}

function readFixture(): SearchFixture | null {
  const fixturePath = process.env.GALLERY_IMPORT_WEB_FACTCHECK_FIXTURE;
  if (!fixturePath) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(fixturePath, 'utf8')) as SearchFixture;
  } catch (error) {
    throw new Error(`web fact-check fixture を読めませんでした: ${fixturePath} (${String(error)})`);
  }
}

function resolveFixtureSearch(fixture: SearchFixture | null, query: string): SearchResult[] | null {
  if (!fixture?.searches) {
    return null;
  }

  const key = normalizeText(query);
  return fixture.searches[key] ?? null;
}

function resolveFixturePage(
  fixture: SearchFixture | null,
  url: string
): { finalUrl: string; body: string } | null {
  const page = fixture?.pages?.[url];
  if (!page || (page.status ?? 200) >= 400) {
    return null;
  }

  return {
    finalUrl: page.finalUrl ?? url,
    body: page.body,
  };
}

async function fetchText(url: string, timeoutMs: number): Promise<{ finalUrl: string; body: string }> {
  const response = await fetch(url, {
    headers: {
      'user-agent': DEFAULT_USER_AGENT,
      accept: 'text/html,application/xhtml+xml,application/xml,text/xml',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return {
    finalUrl: response.url || url,
    body: await response.text(),
  };
}

function unwrapDuckDuckGoUrl(url: string): string {
  try {
    const parsed = new URL(url, SEARCH_ENDPOINT);
    const redirected = parsed.searchParams.get('uddg');
    return redirected ? decodeURIComponent(redirected) : url;
  } catch {
    return url;
  }
}

function parseDuckDuckGoResults(html: string): SearchResult[] {
  const matches = [...html.matchAll(/<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
  return matches
    .map((match) => {
      const url = unwrapDuckDuckGoUrl(decodeHtmlEntities(match[1]));
      const title = stripHtml(match[2]);
      if (!url || !title) {
        return null;
      }

      return { url, title };
    })
    .filter((value): value is SearchResult => value !== null);
}

function extractXmlText(xml: string, tagNames: string[]): string | undefined {
  for (const tagName of tagNames) {
    const pattern = new RegExp(`<${escapeRegExp(tagName)}\\b[^>]*>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`, 'i');
    const match = xml.match(pattern);
    if (!match?.[1]) {
      continue;
    }

    const rawValue = match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
    return normalizeText(decodeHtmlEntities(rawValue.replace(/<[^>]+>/g, ' ')));
  }

  return undefined;
}

function extractAllXmlTexts(xml: string, tagNames: string[]): string[] {
  const values: string[] = [];

  for (const tagName of tagNames) {
    const pattern = new RegExp(`<${escapeRegExp(tagName)}\\b[^>]*>([\\s\\S]*?)<\\/${escapeRegExp(tagName)}>`, 'gi');
    for (const match of xml.matchAll(pattern)) {
      if (!match[1]) {
        continue;
      }

      const normalized = normalizeText(
        decodeHtmlEntities(match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' '))
      );
      if (normalized) {
        values.push(normalized);
      }
    }
  }

  return Array.from(new Set(values));
}

function extractXmlAttrValues(xml: string, tagName: string, attrNames: string[]): string[] {
  const values: string[] = [];
  const pattern = new RegExp(`<${escapeRegExp(tagName)}\\b[^>]*>`, 'gi');

  for (const match of xml.matchAll(pattern)) {
    const tag = match[0];
    for (const attrName of attrNames) {
      const attrPattern = new RegExp(`${escapeRegExp(attrName)}=["']([^"']+)["']`, 'i');
      const attrMatch = tag.match(attrPattern);
      if (attrMatch?.[1]) {
        values.push(decodeHtmlEntities(attrMatch[1]));
      }
    }
  }

  return values;
}

function parseNdlOpenSearch(xml: string): NdlOpenSearchRecord[] {
  const records: NdlOpenSearchRecord[] = [];

  for (const match of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)) {
    const block = match[1];
    const title = extractXmlText(block, ['dc:title', 'title']);
    const authors = extractAllXmlTexts(block, ['dc:creator', 'author', 'creator']);
    if (!title || authors.length === 0) {
      continue;
    }

    const relatedUrls = Array.from(
      new Set([
        ...extractXmlAttrValues(block, 'rdfs:seeAlso', ['rdf:resource', 'resource', 'href']),
        ...((extractXmlText(block, ['rdfs:seeAlso']) ? [extractXmlText(block, ['rdfs:seeAlso'])!] : []) as string[]),
      ])
    ).filter(Boolean);
    const url =
      extractXmlText(block, ['link', 'guid', 'id']) ??
      relatedUrls.find((candidate) => candidate.includes('ndlsearch.ndl.go.jp')) ??
      NDL_OPENSEARCH_ENDPOINT;

    records.push({
      url,
      title,
      authors,
      publisher: extractXmlText(block, ['dc:publisher']),
      relatedUrls,
    });
  }

  return records;
}

async function searchDuckDuckGo(
  query: string,
  timeoutMs: number,
  fixture: SearchFixture | null
): Promise<SearchResult[]> {
  const fixtureResults = resolveFixtureSearch(fixture, query);
  if (fixtureResults) {
    return fixtureResults;
  }

  const url = `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`;
  const response = await fetchText(url, timeoutMs);
  return parseDuckDuckGoResults(response.body);
}

function classifySource(url: string, siteName?: string, title?: string): WebFactCheckSourceType {
  let hostname = '';

  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return 'other';
  }

  if (BIBLIOGRAPHIC_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) {
    return 'bibliographic-db';
  }

  if (BOOKSTORE_DOMAINS.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) {
    return 'bookstore';
  }

  const combined = `${siteName ?? ''} ${title ?? ''}`.toLowerCase();
  if (
    PUBLISHER_HOST_HINTS.some((hint) => hostname.includes(hint)) ||
    (/(出版社|出版|書房|文庫)/.test(siteName ?? '') && !/(書店|通販)/.test(combined))
  ) {
    return 'publisher';
  }

  return 'other';
}

function isTrustedSourceType(sourceType: WebFactCheckSourceType): boolean {
  return sourceType === 'publisher' || sourceType === 'bibliographic-db' || sourceType === 'bookstore';
}

function evaluateStructuredSource(
  url: string,
  title: string,
  authors: string[],
  expectedTitle: string,
  expectedAuthor: string,
  siteName?: string
): WebFactCheckSource {
  const titleMatchScore = calculateSimilarity(expectedTitle, title);
  const authorMatchScore = authors.reduce((best, author) => {
    return Math.max(best, calculateSimilarity(expectedAuthor, author));
  }, 0);

  return {
    url,
    domain: new URL(url).hostname,
    title,
    sourceType: classifySource(url, siteName, title),
    matchedTitle: titleMatchScore >= 0.86,
    matchedAuthor: authorMatchScore >= 0.82,
    titleMatchScore,
    authorMatchScore,
  };
}

function evaluatePage(url: string, html: string, expectedTitle: string, expectedAuthor: string): WebFactCheckSource {
  const pageTitle =
    extractMetaContent(html, 'property', 'og:title') ??
    extractMetaContent(html, 'name', 'twitter:title') ??
    extractHtmlTitle(html) ??
    url;
  const siteName =
    extractMetaContent(html, 'property', 'og:site_name') ??
    extractMetaContent(html, 'name', 'application-name');
  const description =
    extractMetaContent(html, 'name', 'description') ??
    extractMetaContent(html, 'property', 'og:description') ??
    '';
  const visibleText = stripHtml(html);
  const normalizedVisibleText = normalizeForComparison(visibleText);
  const normalizedExpectedTitle = normalizeForComparison(expectedTitle);
  const normalizedExpectedAuthor = normalizeForComparison(expectedAuthor);
  const titleSignals = [pageTitle, description, visibleText];
  const authorSignals = [pageTitle, description, visibleText];

  const titleMatchScore = titleSignals.reduce((best, signal) => {
    return Math.max(best, calculateSimilarity(expectedTitle, signal));
  }, normalizedExpectedTitle && normalizedVisibleText.includes(normalizedExpectedTitle) ? 0.995 : 0);
  const authorMatchScore = authorSignals.reduce((best, signal) => {
    return Math.max(best, calculateSimilarity(expectedAuthor, signal));
  }, normalizedExpectedAuthor && normalizedVisibleText.includes(normalizedExpectedAuthor) ? 0.995 : 0);

  return {
    url,
    domain: new URL(url).hostname,
    title: pageTitle,
    sourceType: classifySource(url, siteName, pageTitle),
    matchedTitle: titleMatchScore >= 0.88,
    matchedAuthor: authorMatchScore >= 0.82,
    titleMatchScore,
    authorMatchScore,
  };
}

function isSearchResultsUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();
    const queryKeys = [...parsed.searchParams.keys()].map((key) => key.toLowerCase());

    if (hostname === 'honto.jp' || hostname.endsWith('.honto.jp')) {
      return pathname.includes('/search_') || pathname.includes('/search/') || pathname.endsWith('/search/detail.html');
    }

    if (hostname === 'kinokuniya.co.jp' || hostname.endsWith('.kinokuniya.co.jp')) {
      return pathname.includes('/search') || queryKeys.includes('q') || queryKeys.includes('searchtext');
    }

    if (hostname === 'books.or.jp' || hostname.endsWith('.books.or.jp')) {
      return pathname.includes('/search') || queryKeys.includes('q') || queryKeys.includes('keyword');
    }

    return pathname.includes('/search') && queryKeys.some((key) => ['q', 'query', 'keyword'].includes(key));
  } catch {
    return false;
  }
}

function normalizeDiscoveredUrl(url: string, baseUrl: string): string | null {
  try {
    const resolved = new URL(decodeHtmlEntities(url), baseUrl);
    resolved.hash = '';

    for (const key of [...resolved.searchParams.keys()]) {
      if (key.toLowerCase().startsWith('cid') || key === '__TOKEN__' || key.startsWith('utm_')) {
        resolved.searchParams.delete(key);
      }
    }

    return resolved.toString();
  } catch {
    return null;
  }
}

function extractLinkedPageUrls(url: string, html: string): DiscoveryLink[] {
  let hostname = '';

  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return [];
  }

  const patterns: RegExp[] = [];
  if (hostname === 'honto.jp' || hostname.endsWith('.honto.jp')) {
    patterns.push(
      /href=["']([^"']*(?:\/ebook\/pd_(?!review_)[^"']+\.html|\/netstore\/pd(?:-book)?_[^"']+\.html)[^"']*)["']/gi
    );
  }

  if (hostname === 'kinokuniya.co.jp' || hostname.endsWith('.kinokuniya.co.jp')) {
    patterns.push(/href=["']([^"']*\/f\/dsg-[^"']+)["']/gi);
  }

  if (hostname === 'books.or.jp' || hostname.endsWith('.books.or.jp')) {
    patterns.push(/href=["']([^"']*\/book-details\/[^"']+)["']/gi);
  }

  const discovered: DiscoveryLink[] = [];
  const seen = new Set<string>();

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const normalized = normalizeDiscoveredUrl(match[1], url);
      if (!normalized || seen.has(normalized) || isSearchResultsUrl(normalized)) {
        continue;
      }

      seen.add(normalized);
      discovered.push({
        url: normalized,
        discoveredVia: url,
      });
    }
  }

  return discovered;
}

function isConfirmedBySources(sources: WebFactCheckSource[]): boolean {
  const uniqueDomains = new Set(sources.map((source) => source.domain));
  const trustedCount = sources.filter((source) => isTrustedSourceType(source.sourceType)).length;
  return uniqueDomains.size >= 2 && trustedCount >= 1;
}

function summarizeSources(sources: WebFactCheckSource[]): { sourceCount: number; trustedSourceCount: number } {
  return {
    sourceCount: new Set(sources.map((source) => source.domain)).size,
    trustedSourceCount: new Set(
      sources
        .filter((source) => isTrustedSourceType(source.sourceType))
        .map((source) => `${source.sourceType}:${source.domain}`)
    ).size,
  };
}

function buildSearchQueries(title: string, author: string): string[] {
  const queryStem = `"${title}" "${author}"`;
  return [
    `site:ndlsearch.ndl.go.jp ${queryStem} 書籍`,
    `site:books.or.jp ${queryStem}`,
    `site:honto.jp ${queryStem}`,
    `site:kinokuniya.co.jp ${queryStem}`,
    `${queryStem} 出版社`,
  ];
}

function buildDirectSourceSearches(title: string, author: string): Array<{ label: string; url: string }> {
  const term = `${title} ${author}`.trim();
  return [
    {
      label: 'honto',
      url: `https://honto.jp/netstore/search_10${encodeURIComponent(term)}.html`,
    },
  ];
}

function buildNdlOpenSearchUrl(title: string, author: string): string {
  const params = new URLSearchParams({
    cnt: '10',
    title,
    creator: author,
  });
  return `${NDL_OPENSEARCH_ENDPOINT}?${params.toString()}`;
}

async function confirmViaNdlOpenSearch(
  title: string,
  author: string,
  fixture: SearchFixture | null,
  options: { timeoutMs: number }
): Promise<{ queries: string[]; sources: WebFactCheckSource[] }> {
  const queryUrl = buildNdlOpenSearchUrl(title, author);
  const queries = [`structured:ndl-opensearch:${queryUrl}`];
  const corroboratingSources = new Map<string, WebFactCheckSource>();
  const page = resolveFixturePage(fixture, queryUrl) ?? (await fetchText(queryUrl, options.timeoutMs));
  const records = parseNdlOpenSearch(page.body);

  for (const record of records) {
    const ndlEvaluation = evaluateStructuredSource(
      record.url,
      record.title,
      record.authors,
      title,
      author,
      record.publisher ? `${record.publisher} / 国立国会図書館サーチ` : '国立国会図書館サーチ'
    );
    if (!ndlEvaluation.matchedTitle || !ndlEvaluation.matchedAuthor) {
      continue;
    }

    corroboratingSources.set(`${ndlEvaluation.domain}:${ndlEvaluation.title}`, ndlEvaluation);

    const linkedUrls = record.relatedUrls.filter((candidate) => {
      try {
        const hostname = new URL(candidate).hostname.toLowerCase();
        return (
          hostname === 'books.or.jp' ||
          hostname.endsWith('.books.or.jp') ||
          hostname === 'kinokuniya.co.jp' ||
          hostname.endsWith('.kinokuniya.co.jp') ||
          hostname === 'honto.jp' ||
          hostname.endsWith('.honto.jp')
        );
      } catch {
        return false;
      }
    });

    for (const linkedUrl of linkedUrls) {
      queries.push(`linked:${linkedUrl}`);

      try {
        const linkedPage =
          resolveFixturePage(fixture, linkedUrl) ?? (await fetchText(linkedUrl, options.timeoutMs));
        if (isSearchResultsUrl(linkedPage.finalUrl)) {
          const discoveredDetailLinks = extractLinkedPageUrls(linkedPage.finalUrl, linkedPage.body);
          for (const detailLink of discoveredDetailLinks) {
            queries.push(`discovered:${detailLink.discoveredVia}->${detailLink.url}`);

            try {
              const detailPage =
                resolveFixturePage(fixture, detailLink.url) ?? (await fetchText(detailLink.url, options.timeoutMs));
              if (isSearchResultsUrl(detailPage.finalUrl)) {
                continue;
              }

              const detailEvaluation = evaluatePage(detailPage.finalUrl, detailPage.body, title, author);
              if (!detailEvaluation.matchedTitle || !detailEvaluation.matchedAuthor) {
                continue;
              }

              corroboratingSources.set(`${detailEvaluation.domain}:${detailEvaluation.title}`, detailEvaluation);
              if (isConfirmedBySources([...corroboratingSources.values()])) {
                return {
                  queries,
                  sources: [...corroboratingSources.values()],
                };
              }
            } catch {
              // Ignore transient misses here and keep looking for corroborating detail pages.
            }
          }

          continue;
        }

        const linkedEvaluation = evaluatePage(linkedPage.finalUrl, linkedPage.body, title, author);
        if (!linkedEvaluation.matchedTitle || !linkedEvaluation.matchedAuthor) {
          continue;
        }

        corroboratingSources.set(`${linkedEvaluation.domain}:${linkedEvaluation.title}`, linkedEvaluation);
        if (isConfirmedBySources([...corroboratingSources.values()])) {
          return {
            queries,
            sources: [...corroboratingSources.values()],
          };
        }
      } catch {
        // Ignore transient misses here and keep looking for corroborating detail pages.
      }
    }
  }

  return {
    queries,
    sources: [...corroboratingSources.values()],
  };
}

async function confirmPair(
  title: string,
  author: string,
  warnings: string[],
  fixture: SearchFixture | null,
  options: {
    timeoutMs: number;
    maxResultsPerQuery: number;
    maxQueriesPerTarget: number;
  }
): Promise<{ queries: string[]; sources: WebFactCheckSource[] }> {
  const queries = buildSearchQueries(title, author).slice(0, options.maxQueriesPerTarget);
  const executedQueries: string[] = [];
  const corroboratingSources = new Map<string, WebFactCheckSource>();
  const seenUrls = new Set<string>();

  async function fetchAndEvaluatePageCandidate(
    candidateUrl: string,
    discoveredVia?: string
  ): Promise<WebFactCheckSource[]> {
    const page = resolveFixturePage(fixture, candidateUrl) ?? (await fetchText(candidateUrl, options.timeoutMs));
    const effectiveUrl = page.finalUrl || candidateUrl;

    if (!isSearchResultsUrl(effectiveUrl)) {
      const evaluation = evaluatePage(effectiveUrl, page.body, title, author);
      return evaluation.matchedTitle && evaluation.matchedAuthor ? [evaluation] : [];
    }

    const detailLinks = extractLinkedPageUrls(effectiveUrl, page.body);
    const discoveredSources: WebFactCheckSource[] = [];

    for (const detailLink of detailLinks) {
      if (seenUrls.has(detailLink.url)) {
        continue;
      }
      seenUrls.add(detailLink.url);
      executedQueries.push(`discovered:${detailLink.discoveredVia}->${detailLink.url}`);

      try {
        const detailPage =
          resolveFixturePage(fixture, detailLink.url) ?? (await fetchText(detailLink.url, options.timeoutMs));
        if (isSearchResultsUrl(detailPage.finalUrl)) {
          continue;
        }

        const detailEvaluation = evaluatePage(detailPage.finalUrl, detailPage.body, title, author);
        if (detailEvaluation.matchedTitle && detailEvaluation.matchedAuthor) {
          discoveredSources.push(detailEvaluation);
        }
      } catch {
        // Ignore transient misses here and keep looking for corroborating detail pages.
      }
    }

    if (discoveredSources.length === 0 && discoveredVia) {
      warnings.push(`web fact-check search results page yielded no corroborating detail pages: ${candidateUrl}`);
    }

    return discoveredSources;
  }

  try {
    const structuredCheck = await confirmViaNdlOpenSearch(title, author, fixture, {
      timeoutMs: options.timeoutMs,
    });
    executedQueries.push(...structuredCheck.queries);
    for (const source of structuredCheck.sources) {
      corroboratingSources.set(`${source.domain}:${source.title}`, source);
    }

    if (isConfirmedBySources([...corroboratingSources.values()])) {
      return {
        queries: executedQueries,
        sources: [...corroboratingSources.values()],
      };
    }
  } catch (error) {
    warnings.push(`web fact-check structured search failed: ${title} / ${author} (${String(error)})`);
  }

  for (const direct of buildDirectSourceSearches(title, author)) {
    executedQueries.push(`direct:${direct.label}:${direct.url}`);

    try {
      const evaluations = await fetchAndEvaluatePageCandidate(direct.url, direct.label);
      for (const evaluation of evaluations) {
        corroboratingSources.set(`${evaluation.domain}:${evaluation.title}`, evaluation);
        if (isConfirmedBySources([...corroboratingSources.values()])) {
          return {
            queries: executedQueries,
            sources: [...corroboratingSources.values()],
          };
        }
      }
    } catch (error) {
      warnings.push(`web fact-check direct fetch failed: ${direct.url} (${String(error)})`);
    }
  }

  for (const query of queries) {
    executedQueries.push(query);
    let results: SearchResult[] = [];

    try {
      results = await searchDuckDuckGo(query, options.timeoutMs, fixture);
    } catch (error) {
      warnings.push(`web fact-check search failed: ${query} (${String(error)})`);
      continue;
    }

    for (const result of results.slice(0, options.maxResultsPerQuery)) {
      if (seenUrls.has(result.url)) {
        continue;
      }
      seenUrls.add(result.url);

      try {
        const evaluations = await fetchAndEvaluatePageCandidate(result.url, query);
        for (const evaluation of evaluations) {
          corroboratingSources.set(`${evaluation.domain}:${evaluation.title}`, evaluation);
          if (isConfirmedBySources([...corroboratingSources.values()])) {
            return {
              queries: executedQueries,
              sources: [...corroboratingSources.values()],
            };
          }
        }
      } catch (error) {
        warnings.push(`web fact-check page fetch failed: ${result.url} (${String(error)})`);
      }
    }
  }

  return {
    queries: executedQueries,
    sources: [...corroboratingSources.values()],
  };
}

function hasCandidateSignals(input: WebFactCheckInput): boolean {
  return input.titleCandidates.length > 0 || input.authorCandidates.length > 0 || input.similarEntries.length > 0;
}

export async function runWebFactCheck(input: WebFactCheckInput): Promise<WebFactCheckResult> {
  if (!hasCandidateSignals(input)) {
    return {
      attempted: false,
      skippedReason: 'no-candidates',
      warnings: [],
      queries: [],
      sources: [],
    };
  }

  const minimumOcrConfidence = input.duplicateCandidate?.reason === 'exact-similar' ? 0.3 : 0.35;
  if (input.ocrConfidence < minimumOcrConfidence) {
    return {
      attempted: false,
      skippedReason: 'low-ocr-confidence',
      warnings: [],
      queries: [],
      sources: [],
    };
  }

  const timeoutMs = input.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const maxResultsPerQuery = input.maxResultsPerQuery ?? DEFAULT_MAX_RESULTS_PER_QUERY;
  const maxQueriesPerTarget = input.maxQueriesPerTarget ?? DEFAULT_MAX_QUERIES_PER_TARGET;
  const warnings: string[] = [];
  const fixture = readFixture();
  const queries: string[] = [];
  const sources: WebFactCheckSource[] = [];

  if (input.duplicateCandidate?.author) {
    const duplicateCheck = await confirmPair(input.duplicateCandidate.title, input.duplicateCandidate.author, warnings, fixture, {
      timeoutMs,
      maxResultsPerQuery,
      maxQueriesPerTarget,
    });
    queries.push(...duplicateCheck.queries);
    sources.push(...duplicateCheck.sources);

    if (isConfirmedBySources(duplicateCheck.sources)) {
      const summary = summarizeSources(duplicateCheck.sources);
      return {
        attempted: true,
        warnings,
        queries,
        sources,
        duplicate: {
          confirmed: true,
          path: input.duplicateCandidate.path,
          title: input.duplicateCandidate.title,
          author: input.duplicateCandidate.author,
          sourceCount: summary.sourceCount,
          trustedSourceCount: summary.trustedSourceCount,
        },
      };
    }
  }

  if (input.title && input.author && input.titleConfidence >= 0.56 && input.authorConfidence >= 0.5) {
    const metadataCheck = await confirmPair(input.title, input.author, warnings, fixture, {
      timeoutMs,
      maxResultsPerQuery,
      maxQueriesPerTarget,
    });
    queries.push(...metadataCheck.queries);
    sources.push(...metadataCheck.sources);

    if (isConfirmedBySources(metadataCheck.sources)) {
      const summary = summarizeSources(metadataCheck.sources);
      return {
        attempted: true,
        warnings,
        queries,
        sources,
        metadata: {
          confirmed: true,
          title: input.title,
          author: input.author,
          sourceCount: summary.sourceCount,
          trustedSourceCount: summary.trustedSourceCount,
        },
      };
    }
  }

  return {
    attempted: queries.length > 0,
    skippedReason: queries.length === 0 ? 'no-verifiable-target' : undefined,
    warnings,
    queries,
    sources,
  };
}
