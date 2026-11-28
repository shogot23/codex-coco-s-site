# Status

## Task

- task-id: TASK-works-autopublish-20261127-back-to-the-cup-1min
- state: in-progress（preview・公開コピーreview・published切替・worksテスト完了。frontend検証・最終差分review・PR/Pagesは継続中）
- classification: publish/dev-critical
- updated: 2026-11-28

## Summary

- 実行モデル: 親ログで本turnが `gpt-6-luna / max` と照合済み。作業branchは `codex/coco-work-back-to-the-cup-1min-20261127`、worktreeは `/private/tmp/coco-site-back-to-the-cup-1min-20261127`。
- 最新main: 通常fetchはDNS失敗後、GitHub連携で `origin/main=2de193b72b957aa81d0ac22f863d5913d8363ea4` を確認し、旧base `92dbd668be5cc6b205efb4ab75d80e929d669d10` からff-only同期。対象slug/画像の衝突なし。別作業PR #230はこのmain commitにsquash merge済み。別作業worktreeのHEAD `fca69fcf98a1c17a0aa1e6af4cc954b26edc77f1` とstatus/dailyは読み取り確認し、未コミット変更には触れていない。
- 納品原本: site-work.json SHA-256 `83a92e8244feaaba4b8019a67c31f165d1cbf62af13c94b671a9c3dd0d0657c5`、PNG SHA-256 `0c304f5fdbf5d57c0d9a18925f24b550a12da34db0a4ab42b7ad9da919eb8f83`。1080×1350、import後PNGは原本とbyte一致。
- プレビュー: 4327はChrome接続中の他worktree PID 84474のため停止・操作せず。`npm run works:preview` は `WORKS_PREVIEW=1`、Astro dev、127.0.0.1のみで自worktreeから起動し、自動選択の4328を使用。PC 1440×1000 / mobile 390×844で一覧・詳細、画像decode、横overflowなし、noindex、一覧→詳細→関連レビュー→逆リンク、手順・出典・終了選択を確認。スクリーンショット・計測結果は `/private/tmp/coco-cup-preview-parent.yuq1HS/`。レビュー遷移時、未生成の既存派生AVIFはdevで404だったが、本番HTTPでは同URLが200/image/avifと親が確認。既存テンプレートと本文で「このワークにつながる本」が重複表示される点は記録のみ、共通UIは変更しない。自worktreeの4328 Node PID 91180は検証後停止済み。
- 公開コピー: 4点（本人視点、根拠、翻案と研究限界、選択可能性）を手動確認。Claude `glm-5.3` diff reviewは exit 0、`type=result/subtype=success/is_error=false`、actual_model一致、schema error 1回を修正後success 1回、再送なし、`ok:true` / blocking 0 / advisory 1。advisoryは上記のテンプレートと本文の重複。
- 公開切替: コピーreview後、`src/content/works/back-to-the-cup-1min.md` の `published` 1行だけを `false` から `true` に変更。slug・本文・画像は未変更。
- 固定件数テスト修正: 初回 `npm run test:works` の唯一の失敗（実数37 / 期待値36）はorigin/mainの36件に今回のMarkdown1件を追加した結果と確定。PlanGate amendment reviewを通した後、既存 `scripts/work-import.test.mjs` のテスト名とassert期待値だけを36→37へ変更し、差分review合格後に再実行。35/35 pass。

## Verification Result

- `npm ci`: 成功（前回、793 packages）。
- `npm run works:import -- <site-work.json> --dry-run`: 成功、対象2ファイル、published false。
- `npm run works:import -- <site-work.json>`: 成功、Markdown/PNGのみ追加、PNG SHA/byte一致。
- `npm run works:preview`: 4328 loopback only。parent evidenceでPC/mobile確認合格、画面noindex、target画像decode、関連導線確認。
- Public-copy Claude review: PASS、blocking 0、advisory 1（既存テンプレートとの見出し・本文重複、scope外のため記録のみ）。artifact: `/private/tmp/coco-site-back-to-the-cup-1min-20261127-review/publication-copy-20261128/`。
- `npm run test:works`: 初回は34/35 pass（固定件数のみ失敗）。既存2行の36→37修正後は35/35 pass、fail 0。
- `npm run verify:frontend`: sandbox内の初回はPlaywrightのloopback bindがEPERMで停止。loopbackだけ許可した再実行はlint / typecheck（0 error・warning・hint）/ build / E2Eまで成功。Playwright: 143 passed、7 skipped、うち `back-to-the-cup-1min` のdesktop/mobile round-trip成功。
- `published:true` へ切り替えた後に `npm run verify:frontend` と `npm run check:works-dist` を実行。works一覧で対象が表示され、E2Eのdesktop/mobile round-trip成功。check:works-dist成功で、`dist/works/back-to-the-cup-1min/index.html` と480/1080派生画像を含む公開配信物を確認。
- 最終実装差分Claude review: arch・diffともactual_model glm-5.3、exit 0、正常result/schema-valid、blocking 0。arch advisory 1件はpublished:true後の状態確認で、後続verify/build/E2E・works-distがすべて成功し解消。diff advisory 1件は本文と既存テンプレートのbookConnection表示重複で、scope外として記録のみ。PNGの直接画像認識はreview CLIでは未実施だが、親がPC/mobile preview画像を目視し、画像decodeも確認。artifact: `/private/tmp/coco-site-back-to-the-cup-1min-20261127-review/final-review-20261128/`。
- commit/PR/CI/merge/Pages/本番公開確認: 未実施。次はcommit・push・PR。

## Scope And Next Action

- 固定件数2行修正のPlanGate amendment review: glm-5.3 / low / diff、exit 0、正常result、schema-valid、blocking 0、advisory 3件。advisoryは実作業内容を変えないため追加文書修正は見送り、根拠と理由をこのstatusに記録。artifact: `/private/tmp/coco-site-back-to-the-cup-1min-20261127-review/task-plan-amendment-20261128/retry1/`。初回reviewはschema不一致後の再試行が180秒timeout、未成立として保存。
- 固定件数テスト差分review: glm-5.3 / high / diff、exit 0、正常result、schema-valid、blocking 0、advisory 1件（固定値保守性。二行限定scope維持のため見送り）。artifact: `/private/tmp/coco-site-back-to-the-cup-1min-20261127-review/test-count-fix-20261128/diff/`。
- 最終diff reviewのadvisoryは本文末尾の「このワークにつながる本」とテンプレートの同文重複。公開copy reviewと同一の既知事項で、既存原稿を原本どおり保持するため対応を見送る。
- 失敗時の確認HEADは `2de193b72b957aa81d0ac22f863d5913d8363ea4`。元repo `/Users/shogo/Projects/codex-coco-s-site-main` のdirty main、原本・history、他worktree、X/Instagram、ほかの納品物は変更していない。

## Daily Record

- 記録先: `inbox/daily/2026-11-27.md`。2026-11-28の再開・preview・copy review・公開切替・固定件数差分reviewと35/35 passを追記。
