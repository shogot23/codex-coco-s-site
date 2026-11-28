# Test Cases

## Task

- task-id: TASK-works-autopublish-20261127-back-to-the-cup-1min
- related plan: `plan.md`

## Must Check

- [ ] 実turn_contextが `gpt-6-luna / max`、元repoは無変更、branchは最新 `origin/main` 起点。
- [ ] 原本 `site-work.json` とPNGが指定SHAに一致し、最新mainにslug/画像の衝突がない。
- [ ] KADOKAWA公式の書名・著者・紙ISBN、既存レビューtitle/slug/published、本との接続箇所を照合する。
- [ ] Colombo et al.の対象・無作為割付・数分の感覚への注意・1週間後の自己評価を確認し、研究条件と30秒短縮版の差を保つ。
- [ ] dry-run後の通常importはslugと画像の2ファイルのみを追加し、frontmatterが `published:false`。既存 `scripts/work-import.test.mjs` の `dry run does not write; import forces draft; repeated import preserves bytes` とコピーガードに合致する。
- [ ] 一覧と詳細がPC/mobile viewportで崩れず、画像・番号付き手順・研究出典・関連レビューの本導線が表示される。
- [ ] 一覧の `.work-worry` /説明文、詳細の `#steps` 番号付き手順、完了説明、`.work-question` に具体的な悩み・任意の30秒・見方の余地・休む/相談/終了の選択がある。PC/mobile previewの目視と、既存 `tests/e2e/works.spec.ts` の `work and book round trip: back-to-the-cup-1min` の実行で表示・round-tripを確認する。テストコードは変更しない。
- [ ] 公開文は `pbi-input.md` の公開前4点チェックに従い、previewと最終Markdownで確認する。
- [ ] 公開切替後も対象slug不変で、対象Markdownの `published` だけが変更される。
- [ ] mainへのPR差分に当回の1件とタスク/日次記録以外がなく、CIが全て成功する。
- [ ] Pages完了後、一覧・詳細・関連レビュー相互リンク・共有画像が実URLで200になり、公開HTMLが参照する最適化画像がdistとbyte一致する。

## Conditional Fixed-Count Recovery

- [ ] 実行した `npm run test:works` が35件中34 pass / 1 failで、唯一の失敗が既存の固定件数36件期待であり、実数37件である。
- [ ] `origin/main` のMarkdown36件と今回追加した対象Markdown1件だけの差であることを確認し、他の失敗があればこの手順を使わず停止する。
- [ ] PBI/plan/test-casesの限定amendmentをClaude `glm-5.3` でreviewし、blocking 0を確認するまでテストコードを変更しない。
- [ ] review合格後に限り、既存テスト名の `36` と `assert.equal` の期待値 `36` を `37` にする2行だけを変更し、`npm run test:works` を再実行する。ほかのtest・期待値・テスト方式・新規テストは変更しない。

## Command Checks

- [ ] `npm run test:works`
- [ ] `npm run verify:frontend`（lint、typecheck、build、E2Eを順に含む）
- [ ] `npm run check:works-dist`
- [ ] `git diff --check`

## Manual Checks

- [ ] `npm run works:preview` のPC・mobile viewportで一覧・詳細・画像・手順・出典・本への導線を目視。
- [ ] 4点の公開文チェックをpreviewと最終Markdown双方で行い、Claudeレビューにも同じ観点を含める。
- [ ] 本番URLのHTML、noindex除去、関連レビューURL、OG/Twitter画像URLと実画像のSHA/byteを別に照合。

## Out Of Scope

- [ ] X/Instagramへの実投稿、他のinbox成果物・過去成果物の公開、固定件数テストの2行限定例外以外のtest/期待値変更、CI runner/依存/レイアウト変更。
