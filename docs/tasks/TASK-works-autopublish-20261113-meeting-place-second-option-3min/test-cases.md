# Test Cases

## Task

- task-id: TASK-works-autopublish-20261113-meeting-place-second-option-3min
- related plan: `plan.md`
- resumed: 2026-11-14 by explicit user instruction.

## Resumption Gate

- Previous run: `npm run test:works` passed 34/35 tests. `scripts/work-import.test.mjs` test `all 31 current work Markdown files pass the narrow reader-copy guard` failed because it expected 31 while the repository contained 32 work Markdown files.
- Approved minimal correction: change that test title from `all 31` to `all 32` and its `names.length` expectation from 31 to 32. Keep the guard invocation, loop, fixtures, every other assertion/test, and workflow unchanged.
- Required order: finish PlanGate Claude arch/diff and parent independent review; implement only the two literal count/name updates; obtain Claude diff and parent independent approval of the exact test diff; set only this work's `published` to true; run the complete `npm run test:works` suite. If it fails, revert only this work's `published` to false and stop before later checks.

## Must Check

- [ ] 7納品物がstudio jobの`delivery-manifest.json`記載SHAと同job直下原本の両方にcmp一致。採用画像SHAは`7deb0554f6ced6edb5b8096b121e0ade05b48a9cfc6b63df9b3e0250ee87b31a`。ISBN/著者/書名、taxonomy、公開済み関連レビュー`chizu-to-ken`、既存slug/画像衝突なし。
- [ ] 前回取り込み済みのPNGはdelivery-manifest記載SHAとstudio job直下原本を確認して`cmp`一致。Markdownはsite-work.jsonの項目・本文と変換後frontmatter/body内容が一致し、`published:false`。成功済みのdry-run/通常importは再実行しない。
- [ ] 本文4点: 本人の目線、AI事情/第三者表現なし、読了と本の根拠、研究と日常向け翻案/限界/短縮版未検証の区別。
- [ ] 一覧・詳細・画像・3手順・出典・本/レビュー導線がPCと390×844で読める。
- [ ] PlanGateのClaude必須phaseと親の独立レビューが合格する前に、テストファイルや公開フラグを変更しない。
- [ ] 固定件数修正が対象テスト名・期待値の31→32だけであることを確認。検査本体・他テスト・workflowに差分がない。
- [ ] 対象テスト差分のClaude diffレビューと親の独立確認が合格した後、対象Markdownの `published` だけをtrueにし、`npm run test:works` を実行。失敗時は公開フラグをfalseに戻して後続へ進まない。
- [ ] 公開HTMLの一覧・詳細・相互リンク・OGをHTTP確認。HTML参照の480/1080 WebPとOGの1080 WebPをcache bypassで取得し、対応する`dist/works/media/meeting-place-second-option-3min/{480,1080}.webp`との`cmp`とSHA-256一致を確認。

## Command Checks

- [ ] `npm run test:works`（固定件数テストの期待32、全件成功）
- [ ] `npm run verify:frontend`
- [ ] `npm run check:works-dist`
- [ ] Claude review必須phaseが全成立し、blocking 0。

## Manual Checks

- [ ] 下書きpreviewでデスクトップ/モバイル表示、画像、コピー、CTA/関連リンクを目視。work→review `chizu-to-ken` と review→work の両方向を確認。
- [ ] Claudeと独立確認で読者向け本文を読み、研究結果をワークの効果として断定していない。

## Out Of Scope

- [ ] X/Instagram実投稿、他作品、既存テストやworkflowの件数/範囲変更。
