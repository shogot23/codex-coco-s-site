# 実装計画

- 承認者: Codex（ユーザーの表記指定に基づく自己承認）。reviewer: Claude CLI / glm-5.3。実装前にarchレビューを行う。
- src/、public/、tests/にあるブランド表記を「読書with Coco」へ機械的に統一する。
- docs/brand/の3文書、design doctrine、frontend playbook、AGENTS.mdの表記を合わせる。ブランド戦略に正式表記を明記する。
- 検証: npm run lint → npm run typecheck → npm run build → npm run test:e2e。最後にnpm run verify:frontend。旧表記の残存と生成HTML・RSS・SEOを確認する。
- Claudeのarch / grouped diff / cross-checkを通す。commit・公開は本依頼に含めない。

visual thesis: 既存の本・ココちゃん・学びの構図とタイポを維持する。
content plan: 本文とSEOを同じブランド表記に揃える。
interaction thesis: 既存CTAと遷移を維持し、desktop/mobileで表示を確認する。

## Fixed replacement scope
- Classification: publish/dev-critical.
- Canonical spelling is exactly `読書with Coco`, as directly requested by the user. No space before with; one ASCII space before Coco; capital C only.
- Replace only Japanese-prefixed variants `読書 with Coco` and `読書withCoco` (case-insensitive variants included). English Reading with Coco is out of scope.
- Only visible copy, metadata, body text and corresponding test expectations change. Identifiers (URL/slug, domain, package name, CSS class, data attribute names, import paths) must stay unchanged.
- Existing review occurrences are the site's own commentary, not quotations.
- Current documentation inventory: AGENTS.md, CLAUDE.md, README.md, DESIGN.md, the three brand docs, design doctrine, frontend playbook. Historical task/daily records remain as history.
- User instruction supersedes conflicting brand spelling in existing docs.
