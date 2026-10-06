const readerFacingFields = Object.freeze([
  'title',
  'description',
  'readerWorry',
  'imageAlt',
  'bookTitle',
  'bookConnection',
  'completion',
  'question',
  'evidenceNote',
  'safetyNote',
  'body',
]);

// Keep this deliberately narrow. The detector catches known audit/third-person regressions;
// it does not determine whether a book claim or a personal experience is true.
const relapseRules = Object.freeze([
  { name: 'review voice attributed to a public review', pattern: /(?:公開)?レビューから受け取った/ },
  { name: 'viewpoint attributed to a public review', pattern: /(?:公開)?レビューにある(?:見方|問い|考え方|記述|経験|示唆)/ },
  { name: 'viewpoint received from a review', pattern: /(?:公開)?レビューで受け取った/ },
  { name: 'viewpoint attributed to a public review', pattern: /(?<!系統的)(?<!系統的な)(?:公開)?レビューが示す/ },
  { name: 'user described as a third-party review author', pattern: /(?:公開)?レビュー(?:筆者|の筆者)/ },
  { name: 'AI review lookup status exposed to readers', pattern: /(?:公開)?レビュー(?:の内容)?(?:を|は)(?:確認|参照)(?:しました|した|済み|済|している)/ },
  { name: 'AI original-text reading status exposed to readers', pattern: /原著(?:全文|本文)(?:は|を|について)?(?:未読|未確認|読んでいない|確認していない|確認できていない)/ },
  { name: 'publisher/review audit status exposed to readers', pattern: /出版社[^。]{0,30}(?:書誌|紹介|目次)[^。]{0,30}(?:公開)?レビュー[^。]{0,20}(?:確認|参照)(?:しました|した|済み|済)/ },
  { name: 'AI publisher-material lookup status exposed to readers', pattern: /出版社提供(?:の)?(?:書誌|紹介|目次)[^。]{0,24}(?:確認|参照)(?:しました|した|済み|済|できた)/ },
]);

export { readerFacingFields };

function fieldValue(frontmatter, field) {
  const line = frontmatter.split(/\r?\n/).find((item) => item.startsWith(`${field}:`));
  if (!line) return null;
  const raw = line.slice(field.length + 1).trim();
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === 'string' ? parsed : raw;
  } catch {
    return raw;
  }
}

function markdownEntries(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) return [['markdown', markdown]];
  const [, frontmatter, body] = match;
  const entries = [];
  for (const field of readerFacingFields) {
    if (field === 'body') continue;
    const value = fieldValue(frontmatter, field);
    if (value !== null) entries.push([field, value]);
  }
  const sources = fieldValue(frontmatter, 'sources');
  if (sources !== null) {
    try {
      const parsed = JSON.parse(sources);
      if (Array.isArray(parsed)) parsed.forEach((source, index) => {
        if (typeof source?.label === 'string') entries.push([`sources[${index}].label`, source.label]);
      });
      else entries.push(['sources', sources]);
    } catch {
      entries.push(['sources', sources]);
    }
  }
  entries.push(['body', body]);
  return entries;
}

function entriesFor(copy) {
  if (typeof copy === 'string') return markdownEntries(copy);
  if (!copy || typeof copy !== 'object') return [];

  const entries = readerFacingFields
    .filter((field) => typeof copy[field] === 'string')
    .map((field) => [field, copy[field]]);
  if (Array.isArray(copy.sources)) {
    copy.sources.forEach((source, index) => {
      if (typeof source?.label === 'string') entries.push([`sources[${index}].label`, source.label]);
    });
  }
  return entries;
}

function scan(entries) {
  const violations = [];
  for (const [field, value] of entries) {
    for (const rule of relapseRules) {
      const match = value.match(rule.pattern);
      if (match) violations.push({ field, phrase: match[0], rule: rule.name });
    }
  }
  return violations;
}

export function findReaderFacingVoiceViolations(copy) {
  const entries = entriesFor(copy);
  const violations = scan(entries);
  if (typeof copy === 'string' && violations.length === 0) {
    // Fallback catches unusual/multiline YAML forms without adding a YAML parser dependency.
    return scan([['markdown', copy]]);
  }
  return violations;
}

export function assertReaderFacingWorkCopy(copy, source = 'work copy') {
  const [violation] = findReaderFacingVoiceViolations(copy);
  if (violation) {
    throw new Error(`Known reader-facing voice relapse in ${source} (${violation.field}): ${JSON.stringify(violation.phrase)}`);
  }
}
