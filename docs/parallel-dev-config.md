# Parallel Dev Config

この文書は `Parallel Dev Core` に対する `codex-coco-s-site-main` の repo 固有設定を定義する。正本入口は `AGENTS.md` とし、この rollout では AGENTS 単独入口を維持する。

## 現在の導入スコープ

この repo で有効化するのは次。

- review 分類: `record-fast` / `record-safe` / `publish/dev-critical`
- clean worktree 原則
- frontend verify: `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e`
- `docs/reading-with-coco-design-doctrine.md` と `docs/frontend-playbook.md` を参照する frontend 判断

## この repo の `publish/dev-critical`

次は `publish/dev-critical` として扱う。

- frontend 基盤整備、公開 UI 変更、レイアウト・導線・CTA の変更
- `src/` / `public/` / `tests/` / `astro.config.*` / `package.json` / CI 設定 / build 設定の変更
- デザイン doctrine、frontend playbook、外部共有前提の運用文書の変更
- 本番表示や検証フローを壊しうる config、依存関係、テスト基盤の変更

## この repo の `record-fast` / `record-safe`

| 分類 | この repo での例 |
|------|-------------------|
| `record-fast` | 軽量な作業メモ、後で整理する前提の下書き追記 |
| `record-safe` | 数値・日付・固有名詞の正確性が重要な非公開メモ、機微情報を含む記録 |

## verify と review の扱い

- frontend 変更後は `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` を順に実行する
- 完了時は `npm run verify:frontend` で最終確認する
- `publish/dev-critical` の変更後、および commit / PR / merge 前には、現在の環境で利用している Claude ベースの review gate を完了させる
- この rollout では repo 内に新しい gate 実装や skill 実体は追加しない

## この rollout で持ち込まないもの

- wave 運用の全面導入
- ai-worklog-record 連携
- prompts の大量移植
- 未実装 gate の repo 内必須化
