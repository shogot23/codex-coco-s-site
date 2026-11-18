# Test Cases

## Task

- task-id: TASK-works-autopublish-20261118-notice-the-conditions-2min
- related plan: `plan.md`

## Must Check

- [x] 最新 `origin/main` と隔離worktree baseが `bf14198dcffc65d0ef3211109795b742002c88ce` で一致し、元dirty worktreeは変更されていない
- [x] main既存33件と、今回の原稿を含むworktree実数34件を確認し、固定件数テストの名称と期待値だけ34へ更新する
- [x] job/finalと指定inboxの7点すべてが指定SHAおよびbyte比較で一致する
- [x] `site-work.json` は納品時 `published:false` で、slug/title/relatedReview/bookTitle/画像名/手順が指定どおり。サイト原稿は全項目/本文一致後、この1件だけ公開状態に変更
- [x] 書籍レビュー `haiboku-no-sports-gaku` は公開中で、本名 `敗北のスポーツ学` が一致する
- [x] `moods` と `concerns` は既知IDで、slugとassetの衝突がない
- [x] 前回のimport dry-run/通常importは成功済み。今回worktreeで生成記事の全項目/本文と画像SHAを再照合し、既存slugへ再importしない
- [x] 作品はプレビュー中false、最終worktreeでは今回の1件だけtrue
- [x] 本文が本人視点で、AI調査状況/第三者レビュー語り/経験の推測がなく、研究根拠と日常向け翻案を区別し、研究限界と短縮ワーク未検証を保つ
- [x] 小さな困りごと→見方を変える余地→選べる小さな一歩（相談・休息・終了を含む）が一覧文、詳細本文、振り返りにある
- [x] Desktop/mobile previewで一覧、詳細、画像、3手順、出典、公開レビューへの導線を確認する
- [x] scope外ファイル差分がない。package/lock、依存、runner/CI設定、既存作品、納品、historyは変更していない

## Command Checks

- [x] `npm run test:works`（35/35成功、35/35最終公開状態でも成功）
- [x] `npm run test:works-preview`（desktop/mobile Chromium 80/80成功）
- [x] `npm run verify:frontend`（lint/typecheck/build/E2E、E2E 137 passed / 7 skipped）
- [x] `npm run check:works-dist`（draft exclusion verified）
- [x] Claude review gate: 継続計画のarchレビューと最終diffレビュー、blocking 0、モデル・structured result・dispatch証跡
- [ ] Merge前Claude cross-check: PR差分とCI成功状態を確認し、blocking 0
- [ ] CIがすべて成功しPRがmergeable
- [ ] Pages完了後、一覧・詳細・レビュー相互リンクと参照480/1080 WebPをcache-bypassで確認

## Manual Checks

- [x] プレビューがlocalhost:4327のみ/noindexである
- [x] PCとモバイルでレイアウト、画像全体、本文の読みやすさを確認
- [x] 本文・手順・画像見出し・出典/限界がfrozen-specと一致
- [ ] 公開HTMLとHTML参照の画像が対象作品を示し、optimized image bytesを確認

## Optional Checks

- [ ] なし

## Out Of Scope

- [ ] X/Instagram投稿
- [ ] 画像生成/編集
- [ ] 既存成果物の公開・変更
- [ ] 元worktreeの変更、history更新、runner/CI設定修理

## Execution outcome (2026-11-18)

- Source parity, published book/review, taxonomy, collision, import, desktop/mobile preview, noindex, and bidirectional book links were verified.
- `npm run test:works` was executed and failed one fixed-count assertion: expected 32, actual 33.
- The target work was restored to `published:false`; later commands were not run.

## Continuation scope (2026-11-19)

- The user explicitly requested completion after the previous stop.
- Latest `origin/main` is `bf14198dcffc65d0ef3211109795b742002c88ce`; its assertion already expects 33 works.
- The latest worktree contains 34 Markdown files including this one new work. The guard counts all `*.md` names, independent of publication state. After the updated plan receives its review, adjust only the assertion and test name to 34, then rerun `npm run test:works`.
- Do not change other tests, CI/runner/dependencies, existing works, delivery files, `history.json`, or the original dirty worktree.

## Continuation arch review

- `glm-5.3` / high / StructuredOutput: `ok:true`, zero blocking, two advisory items; one successful structured result after two schema-repair dispatches, no fallback, no rate limit.
- The wording variation among action options is an advisory. Preserve the frozen production copy and record it for a future content revision rather than changing the delivered text here.
- The count-sequencing advisory is covered: the assertion enumerates all Markdown files, and both the expected count and this work's publication flag will be included in one PR/commit.
