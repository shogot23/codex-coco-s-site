# Test Cases

## Task

- task-id: TASK-works-autopublish-20260928-curiosity-sprout-3min
- related plan: `plan.md`

## Must Check

- [x] 入力7ファイルが一致し、画像SHA/寸法、書誌、出典、研究との差分、historyとClaude gate証跡を再確認できる。
- [x] slug/画像衝突がなくtaxonomy IDと公開レビュー参照が有効。
- [x] draft import後は `published:false`、previewはPC/モバイルで画像・手順・出典・レビュー導線が見える。
- [x] 最終的に対象記事のみ `published:true` で公開。
- [x] 差分は対象原稿・画像と本task記録・日次worklogに限定。

## Command Checks

- [x] `npm run works:import -- <absolute-site-work.json> --dry-run`
- [x] `npm run works:import -- <absolute-site-work.json>` — `published:false` で取り込み
- [x] `npm run works:preview` — localhost:4327でdesktop画面を目視確認
- [x] `npm run test:works` — 28 passed
- [x] `npm run verify:frontend` — lint/typecheck/build成功、E2E 93 passed / 7 skipped
- [x] `npm run check:works-dist`
- [x] `npm run test:works-preview` — desktop/mobile 42 passed

## Manual Checks

- [x] previewで一覧/詳細とPC/モバイルを確認。
- [x] previewで画像、手順3件、出典、安全境界、関連公開レビューを確認。
- [ ] 公開後、cache bypass URLで一覧/詳細/レビュー相互リンク/共有画像/最適化画像を確認。

## Optional Checks

- [ ] PR checks成功、mergeable確認、merge前Claude gate全phase合格。

## Out Of Scope

- X/Instagram投稿、元worktree変更、他のinbox成果物。
