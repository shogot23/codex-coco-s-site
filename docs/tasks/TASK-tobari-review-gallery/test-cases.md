# Test Cases

## Task

- task-id: TASK-tobari-review-gallery
- related plan: `plan.md`

## Must Check

- [x] レビュー詳細・一覧に追加され、本文に書名・試し読み案内がない
- [x] ギャラリー詳細・一覧に追加され、`generated_at` と Review へのリンクがある
- [x] Review から同じ作品の Gallery へ到達できる
- [x] Review は指定 infographic、Gallery は修正済み別画像を使う
- [x] Gallery frontmatter の `visualOrigin` は `ai-generated` で、公開画像の表紙と帯にある読める題名・著者名・文章と意匠が実物写真と一致する
- [x] Review frontmatter の題名・著者が文藝春秋公式書誌と一致し、ISBN・出版社は `pbi-input.md` に記録されている
- [x] もしも HTTPS URL が `pbi-input.md` の URL 期待値と Review/Gallery とも文字列完全一致し、購入を主役にしていない
- [x] 元画像の SHA が作業前基線値 `c36fa282341a548937a0ccded63546f0ec99d3547ff34c49b5732cf05800e3ba` と一致し、非公開表紙写真・修正画像の寸法と SHA、infographic の `cmp`、manifest の `entries[path]` を確認
- [x] 実物写真と公開候補を等倍および2倍拡大で並べ、題名・両著者名・帯の読める文章・色面と人物配置を一字ずつ照合する。誤字・欠字・架空表記が0件であることを記録する
- [x] 新規ファイル以外の変更が manifest と task 記録だけに限定される

## Commands

- [x] `npm run check:content`
- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`
- [x] `git diff --check`

## Manual / Release

- [x] 生成 HTML の本文、画像、相互リンク、アフィリエイト開き方・開示を確認
- [x] `dist/` の Review/Gallery HTML で `i.moshimo.com/af/i/impression`、`width="1"`、`height="1"`、`1x1` を検索し、計測 img 0件を確認
- [x] Pages 公開 HTML で同じ文字列を検索し、計測 img 0件を確認
- [x] desktop/mobile のレビュー・ギャラリー表示と横スクロールを確認
- [x] Claude review gate の diff と cross-check が成立し、blocking 0を確認
- [x] PR state/draft/mergeable/changed files/checks 確認後 squash merge
- [x] main と origin/main の一致、Pages 成功、公開 HTML/最適化画像の HTTP 成功

## Out Of Scope

- 他作品の本文や既存 UI の改修
