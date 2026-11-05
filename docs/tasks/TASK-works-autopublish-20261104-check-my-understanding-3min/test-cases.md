# Test Cases

## Task

- task-id: TASK-works-autopublish-20261104-check-my-understanding-3min
- related plan: plan.md

## Must Check

- [x] 制作納品7ファイルのSHA256が `jobs/20261104-coco-repair-work-20261104/audit/delivery-audit.json` の `files_sha256` と一致し、`site-work.json` が `published:false` のまま。
- [x] slug・画像ファイルが衝突せず、関連レビューが公開済みで書名が完全一致する。
- [x] works:import dry-run が成功し、通常importで対象Markdown/PNGだけが追加される。
- [x] draftの状態でWorks一覧・詳細・画像・4手順・研究の限界・関連レビュー導線をPCとモバイルで目視確認する。
- [x] 本人視点、AI監査/第三者視点の排除、本と経験の根拠、引用/翻案と研究限界の4点を人が確認する。
- [x] 公開操作は対象Markdownの `published` だけを変更し、slug・本文・画像を変えない。
- [x] reader-copy guardのテスト名が `all 29 current work Markdown files pass the narrow reader-copy guard`、期待件数が29で、新規追加後の全29件を検査する。更新はテスト名と期待値の2箇所だけ。
- [x] `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` が成功する。
- [ ] 想定差分だけでPRを作り、必須Claude gateとCIが成功し、squash merge後merge commit SHAに対応するPages workflowとdeploy jobがcompleted/successになる。
- [ ] cache-bypassの公開一覧・詳細・関連レビュー、OG画像、HTML参照画像がHTTP成功し、HTML参照480/1080 WebPの各byte/SHAが対応するdist variantと一致する。inbox PNGと `src/assets` PNGは完全一致する。
- [ ] branch/worktree cleanup後も元mainのHEADとdirty/untracked一覧が開始時と一致する。

## Command Checks

- [x] `npm run works:import -- <absolute site-work.json> --dry-run`
- [x] `npm run works:import -- <absolute site-work.json>`
- [x] `npm run works:preview`
- [x] `npm run test:works`
- [x] `npm run verify:frontend`
- [x] `npm run check:works-dist`

## Manual Checks

- [x] Desktop previewで一覧・詳細・画像・本文・関連レビューを確認する。
- [x] Browser viewportをmobileへ切り替え、同じ項目の折返し・画像・読み進めやすさを確認する。
- [x] 手順と画像内テキストの一致、送信を強制しない選択肢、短縮版未検証の明示を確認する。

## Out Of Scope

- 画像の生成・編集、制作7ファイルやhistoryの変更、既存ページ/レビュー修正、CI/config・依存変更、SNS実投稿。
