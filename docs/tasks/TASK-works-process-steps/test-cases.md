# Test Cases

## Task

- task-id: TASK-works-process-steps
- related plan: `plan.md`

## Must Check

- [x] `/works/` に4段階の進め方が表示される。
- [x] 困りごと、本の問い、見方の変化、今選べる一歩の順になる。
- [x] 休む・相談する・ここで終える選択が残る。
- [x] E2Eで4段階の表示文言を確認できる。
- [x] 既存の検索、一覧、個別ワークへのリンクが崩れない。
- [x] 4段階が `ol` / `li` の意味構造で示され、見出し階層が壊れない。

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktop / mobile で番号、改行、余白を確認する。
- [x] 360px幅で番号と文面が重ならず、キーボードでfinderへ進める。
- [x] 文面が個別ページの振り返りへ自然につながることを確認する。

## Out Of Scope

- 読者が実際に思想の流れを理解したかのユーザーテスト。
