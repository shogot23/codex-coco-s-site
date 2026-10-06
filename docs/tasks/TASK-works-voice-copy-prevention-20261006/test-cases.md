# Test cases

1. Shared detector rejects each relapse phrase as an independent fixture, including `公開レビューから受け取った`, `公開レビューが示す`, `レビュー筆者`, `公開レビューを確認しました`, `原著本文は未読`, and `出版社提供目次を確認しました`. For each of `title`, `description`, `readerWorry`, `imageAlt`, `bookTitle`, `bookConnection`, `completion`, `question`, `evidenceNote`, `safetyNote`, `sources[].label`, and body, a relapse phrase is rejected with the field named in the diagnostic.
2. `works:import --dry-run` rejects a relapse package before returning success; normal import rejects it before writing a Markdown file or copying media.
3. Existing Markdown direct edit containing a relapse phrase makes a subprocess `node scripts/check-works-dist.mjs` fail before published/draft distribution checks, including a minimal synthetic fixture where expected dist files exist. A clean-copy fixture with missing/incomplete dist assets still produces the existing missing-asset failure.
4. The current 19 work Markdown files pass the detector unchanged.
5. Allowed counterexamples pass: `系統的レビューが示す` and other systematic/meta-analysis research statements in evidence notes; `未検証` / study limitations; the source label `著者所属機関の原著全文`; reader instructions “確認できた/まだ不明”; first-person reading voice; and explicit everyday adaptation/quotation boundaries.
6. Run repository checks: `npm run test:works`, `npm run verify:frontend`, `npm run check:works-dist`; inspect preview desktop/mobile and confirm existing work copy is unchanged.
7. Claude review must be valid/ok with zero blocking issues at required plan/implementation/final gates; GitHub PR checks and Pages deployment must succeed before completion.
