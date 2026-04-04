# Parallel Dev Core

この文書は、他 repo に最小横展開できる並列開発フローの共通コアを定義する。正本入口は各 repo の `AGENTS.md` とし、repo 固有差分は `docs/parallel-dev-config.md` に分離する。

## この文書で必須にするもの

- 変更着手前の review 分類
- 最小差分原則
- clean worktree 原則
- 既存成果物変更後の review-gate
- 追加 gate は repo 固有設定で有効化するという境界

## この文書で扱わないもの

- wave 計画、wave 実行、wave 統合
- repo 固有の verify コマンドやブランド規約
- ai-worklog への記録連携
- `claude-review-gate` など追加 gate の有効化判断

## 基本原則

1. 変更前に対象を分類する。
2. 変更は最小差分で行う。
3. Git管理対象の変更は原則 clean worktree で開始する。
4. 既存成果物を変更したら `review-gate` を通す。
5. 追加 gate は repo 固有設定で有効化されたものだけを必須とする。

## Review 分類

| 分類 | 典型例 | 基本対応 |
|------|--------|----------|
| `record-fast` | 軽量ログ、下書きメモ、後で整える前提の追記 | まず残す。必要なら後で直す |
| `record-safe` | 機微情報を含む記録、数値や日付の正確性が重要な記録 | 必要時のみ軽微確認 |
| `publish/dev-critical` | 公開前提の文書、共有前提の成果物、本番コード、設定、破壊的変更 | `review-gate` |

曖昧な場合は安全側で `publish/dev-critical` として扱う。

## Clean Worktree 原則

- Git管理対象の変更は原則 clean worktree で開始する
- `record-fast` の standalone 更新だけは例外にできる
- dirty worktree を見つけたら、その場で混ぜて進めず切り分け方針を先に決める

## `worktree-start` の位置づけ

次に当てはまる場合は `worktree-start` 相当の開始確認を使う。

- Git管理対象の変更を始める
- dirty worktree を巻き込まずに着手状態を作る必要がある
- branch / worktree の切り分けを明示したい

`record-fast` の standalone 更新は適用外にできる。

## `review-gate` の位置づけ

次に当てはまる場合は `review-gate` を使う。

- 既存ドキュメント、prompt、skill、コード、設定を変更した
- commit 前、PR 前、merge 前の品質ゲートが必要
- `publish/dev-critical` と判定した

`review-gate` では、利用可能な検証を `lint` → `typecheck` → `build` → `test` の順で扱う。存在しない検証は未実行理由を残す。
