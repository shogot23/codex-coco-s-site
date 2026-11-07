# Test Cases

## Task

- task-id: TASK-works-autopublish-20261106-learning-reason-note-3min
- related plan: plan.md

## Resume Authorization — 2026-11-07

- ユーザーの「作業完了させてください」により、前回提示した `scripts/work-import.test.mjs` の固定件数テスト名と期待値の2箇所だけを29→30に更新し、残りの公開作業を行う。
- 変更前に最新 `origin/main` と対象slugを確認する。baseが29件、slug未存在、テストの固定値29である場合に限り、2箇所を30にする。それ以外の差が見つかったら停止する。
- 今回の再開前実測: `origin/main` = `c94156eff307984a9f3becd54374f513d31f467a`、base内work Markdown 29件、slug未存在、テスト名/期待数29。

## Must Check

- [ ] 受領7ファイルの現在SHAが指定値・制作元と一致し、inbox原本は変更されない。
- [ ] history_before:31 / history_after:32、byte_match:true、制作時 published:false を確認し、historyを再編集しない。
- [ ] canonical JPEGが指定SHAで存在し、最終PNGが1080×1350・指定SHAで、仕様との視覚一致がある。
- [ ] slug learning-reason-note-3min / image pathに衝突がなく、relatedReview: risukiringu-cho-nyumon は公開済みで bookTitle が完全一致する。
- [ ] taxonomy ID、必須field、手順・画像・frozen-specの一致を確認する。
- [ ] dry-run成功後だけ通常importし、記事は published:false で作られる。
- [ ] draft previewで一覧・詳細・画像・手順・出典・本への導線をPCとモバイルで確認する。
- [ ] 公開文が本人の目線で、AI調査状況や第三者review視点を含まず、本・読書体験の根拠があり、研究と翻案・短縮版未検証の境界を保つ。
- [ ] 困りごと→見方の変化の余地→選べる一歩がつながり、休む・相談・終了を選べる。
- [ ] 公開操作で対象Markdownの published だけが変わる。
- [ ] `scripts/work-import.test.mjs` は承認済みのテスト名とassert期待数の2箇所だけを29→30にする。他のテスト変更はしない。
- [ ] `npm run test:works` が成功する。最新base件数不一致、または更新後の失敗時は対象Markdownの `published:false` を保ち、未commit・未公開で停止して再開点を記録する。後続工程へ進まない。
- [ ] 成功した場合は npm run verify:frontend と npm run check:works-dist が通る。
- [ ] 必須Claude phases、PR checks、squash merge、Pages、cache-bypass公開ページ・共有画像の検証が完了する。
- [ ] 元dirty mainのHEAD、変更、未追跡を保全し、最後にworktree/branch状態を確認する。

## Command Checks

- [x] `npm run works:import -- <absolute site-work.json> --dry-run`（前回完了・今回再実行しない）
- [x] `npm run works:import -- <absolute site-work.json>`（前回完了・今回再実行しない）
- [x] `npm run works:preview`（前回完了・今回再実行しない）
- [ ] latest base件数・slug有無の再確認
- [ ] `npm run test:works`
- [ ] npm run verify:frontend
- [ ] npm run check:works-dist

## Manual Checks

- [ ] desktopとmobile viewportで一覧、詳細、本文、画像、出典、相互review導線を確認する。
- [ ] 手順と画像が一致し、任意で中断・休息・相談・終了できる。
- [ ] 公開ページからワーク一覧と関連reviewの両方へ移動できる。

## Out Of Scope

- 許可された固定件数テスト2箇所以外の既存test修正、既存contentの改訂、画像生成/編集、制作7ファイルとhistoryの更新、UI/CI/config/依存変更、X/Instagram投稿、別inbox成果物の公開。
