# Status

- task-id: TASK-works-autopublish-20261016-choose-your-part-note-3min
- date: 2026-10-16 JST
- status: IN_PROGRESS — import、preview、指定ローカル検証を完了。Claude最終diff、PR/CI、merge、Pages公開URLと画像の確認が残る。
- branch: codex/publish-choose-your-part-note-3min
- base: 567001ec557eacf3f308db939928f1fb6dfdeb83
- worktree: /Users/shogo/.codex/worktrees/choose-your-part-note-3min/codex-coco-s-site-main

## Completed

- 制作jobから納品された7ファイルのSHA-256を指定値と再照合し、全件一致。import画像も納品PNGと同じSHA。source `site-work.json` は `published:false` のまま。
- `works:import --dry-run` と通常importが成功。bookTitleは公開レビューtitle「ストイック・マインドセット」と一致し、relatedReviewは `stoic-mindset`。slug/画像の衝突なし。
- 対象Markdownは `published:false` のまま、localhost:4327の一覧・詳細をPC 1440×1000とmobile 390×844で確認。ココちゃん・書影・3手順・問い・安全注記・研究の限界・本への導線を目視し、横はみ出しなし。詳細からレビューへ移り、既存レビューのhero AVIF 358×448とgallery AVIF 163×204も生成後に読み込まれた。
- 内容確認後、repo側の対象Markdownだけ `published:true` に変更。制作元7ファイルには変更なし。
- 初回 `npm run test:works` は34/35。新規Markdown追加により、固定件数22を確認するテストだけが実数23と不一致だった。PlanGateに理由と範囲を記録し、`scripts/work-import.test.mjs` のテスト名と件数assertだけ22→23へ変更。reader-copy guardは変更していない。再実行は35/35成功。
- `npm run verify:frontend`: lint/typecheck/build/e2e成功。typecheckは0 errors/warnings/hints、Playwrightは115 passed / 7 skipped。新規workのPC/mobile round-tripも通過。
- `npm run check:works-dist`: 成功。対象詳細routeと480/1080 WebPを確認。公開用HTMLにnoindexなし。ローカルdistの480 WebPは480×600、SHA-256 `6f19a2a11193581bc31026015a8c201fc18f66d0db6d2de573822074f85d920f`、1080 WebPは1080×1350、SHA-256 `4bffe5beb75e5274535d9d74bb2950484cffc0e3ccc1f588c18f7be544eff3cf`。
- 2026-10-17に`origin/main`を再取得。上流のImada review/gallery commitはcontent・media manifestのみで、works Markdownとtest runnerには差分がなかったため`test:works`は再実行対象外と判断。最新baseへのrebaseはconflictなし。新しいreview/galleryとmanifestを含めて`npm run verify:frontend`を再実行し115 passed / 7 skipped、`npm run check:works-dist`も成功。
- Claude preflightとarchはactual `glm-5.3`、thinking enabled。preflightは成功。archはhigh、exit 0、structured output有効、blocking 0、advisory 2。結びの問い/任意の一歩と公開後noindex確認を計画へ反映済み。最終Claude diffは2026-10-17にactual `glm-5.3` / high / thinking enabledで実行。77.67秒、exit 0、schema valid、successful dispatch 1、failed/schema error 0、`ok:true`、blocking/advisoryとも0。証跡: `/private/tmp/coco-site-choose-your-part-evidence/final-diff-high/`。

## Remaining

- 最終Claude diff reviewを `glm-5.3` で完了し、blocking 0を確認する。
- 対象差分のみcommit/push、PRを作成し親chatへ添付。ラベルが存在すれば設定する。
- PR exact HEAD CIを確認し、merge前Claude checkを通してsquash mergeする。
- merge SHAのPages deploy成功後、cache-busted公開URLの一覧・詳細・レビュー相互リンク・共有画像・HTML参照WebP/AVIFをHTTPとPC/mobile画面で確認する。

## Evidence

- Claude/PlanGate raw evidence: /private/tmp/coco-site-choose-your-part-evidence/
- headed preview screenshots and snapshots: /private/tmp/.playwright-cli/
- 作業対象の追加テスト範囲: `plan.md` / `test-cases.md` と `scripts/work-import.test.mjs`
