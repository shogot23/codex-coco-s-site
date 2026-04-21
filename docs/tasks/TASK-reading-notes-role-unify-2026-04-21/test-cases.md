# Test Cases

## Task

- task-id: TASK-reading-notes-role-unify-2026-04-21
- related plan: `docs/tasks/TASK-reading-notes-role-unify-2026-04-21/plan.md`

## Must Check

- [ ] READING NOTES パネルに「いちばん新しい一冊」が表示されない
- [ ] 「棚にある言葉」「このページでめぐれるテーマ」「こんな気分の日に」はそのまま残る
- [ ] hero copy、CTA、featured review セクションが変わっていない
- [ ] scope 外の変更が入っていない

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] desktop / mobile の reviews page で右カラムの余白と並びが自然
- [ ] hero の CTA「最新レビューを読む」が featured review に遷移する
- [ ] review 件数 0 の empty state が既存どおり表示される

## Optional Checks

- [ ] `git diff --stat` で想定範囲内の差分になっている
- [ ] Claude review gate が `ok: true` になる

## Out Of Scope

- 最新レビュー訴求の新規配置
- 文言改稿
- CSS の追加修正
