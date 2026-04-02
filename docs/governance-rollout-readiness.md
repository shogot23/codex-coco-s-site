# Governance Rollout Readiness Assessment

**Version**: v1.0
**Date**: 2026-04-02
**Status**: Active
**Source**: ai-worklog `docs/claude-code-foundation.md` 6.5-6.6（M1-M3 の現況と Phase 1 判定）と整合

---

## 1. 目的

本文書は、ai-worklog 側で構築した governance framework を本 repo (codex-coco-s-site-main) へ横展開する際の前提条件（M1-M3）の現況を明文化したものである。

- **実装計画ではない**: 本文書は判定条件の整理と現況の記録のみを目的とする
- **ai-worklog 側正本との整合**: ai-worklog 側 `docs/claude-code-foundation.md` 6.5-6.6 の M1-M3 現況および Phase 1 判定と整合する。正本は ai-worklog 側を優先する
- **横展開の起動ではない**: 現況が「未充足」であることを参照可能な形で残すことが目的である

---

## 2. 対象repoの現況要約

### 2.1 既存の入口・品質基盤

本 repo は以下の自己完結したガバナンス構造を持つ:

| 要素 | 内容 |
|------|------|
| [AGENTS.md](../AGENTS.md) | review gate 分類（record-fast / record-safe / publish/dev-critical）、repo layout、hard rules、definition of done |
| docs/ 配下文書 | 本書を除く既存運用文書4件（design-doctrine, frontend-playbook, gallery-generation, revenue-pathway-design） |
| [.codex/config.toml](../.codex/config.toml) | verification workflow（lint → typecheck → build → test:e2e） |
| CI/CD | GitHub Actions: lint, typecheck, build, Playwright |

> **注**: `claude-review-gate` は AGENTS.md で要求されているが、repo 内実体は未導入である。本書では既存の入口・品質基盤には含めない。

### 2.2 ai-worklog 側 framework との差分

ai-worklog 側で構築済みの governance framework 構成要素のうち、本 repo に存在しないもの:

| 構成要素 | 本 repo の状況 |
|----------|---------------|
| `.claude/skills/` | なし |
| `.codex/skills/` | なし |
| `.agent/agents/` | なし |
| `prompts/` | なし |
| shortcut（handoff / gate / wave）| なし |
| `claude-review-gate` 実体 | 参照のみ（実体なし） |

---

## 3. M1: 導入意思決定

### 現状: 未表明（前回から変化なし）

### 背景

- ai-worklog 側正本では「対象 repo 側が governance framework 導入を意思決定すること」を M1 と定義している
- 本 repo は単一開発者の逐次開発パターンで運用されている
- 既存ガバナンス（AGENTS.md + design-doctrine + CI/CD）が自己完結している
- ai-worklog 側 framework は並列マルチエージェント開発向けに設計されており、本 repo への導入の必要性は未評価である

### 観測されている論点（参考）

- 並列マルチエージェント開発が必要になるか
- Wave-based 計画が必要になるか
- クロスチェック要件が既存 CI/CD 能力を超えるか

### 再評価トリガー

上記論点のいずれかが「必要」と評価された時点で、導入意思決定を再検討する。

---

## 4. M2: 正本入口の方針

### 現状: 未決定（前回から変化なし）

### 背景

- ai-worklog 側正本では「入口文書の方針を決定すること」を M2 と定義している
- 選択肢は以下の2つ:
  - **Option A**: AGENTS.md 単独維持（現状維持、入口の二重化リスクなし）
  - **Option B**: CLAUDE.md 導入 + AGENTS.md 縮小（Claude Code / Codex 向け指示の明確化）
- 現在 AGENTS.md が単一正本入口として機能している
- いずれにせよ「正本入口は1つ」の原則を維持する

### 観測されている論点（参考）

- Option A（AGENTS.md 単独維持）: 現状維持、入口の二重化リスクなし
- Option B（CLAUDE.md 導入・AGENTS.md 縮小）: Claude Code / Codex の指示が分岐・衝突し始めた場合の解決策

### 再評価トリガー

- AGENTS.md が肥大化して管理困難になった時
- Claude Code / Codex の指示が分岐・衝突し始めた時

---

## 5. M3: gate と既存 review gate の統合方針

### 現状: 未決定（前回から変化なし）

### 背景

- ai-worklog 側正本では「gate 概念を対象 repo の既存 review gate と統合する方針を決定すること」を M3 と定義している
- AGENTS.md の3段階分類（record-fast / record-safe / publish/dev-critical）が既に運用されている
- `claude-review-gate` は AGENTS.md で要求されているが、repo 内実体および統合方針は未決定である
- 既存 gate（分類ベース）と ai-worklog 側 gate（品質判定・自動反復）は目的が異なる

### 観測されている論点（参考）

- 既存 gate（分類ベース）と ai-worklog 側 gate（品質判定・自動反復）は目的が異なる
- 統合方針は導入意思決定（M1）に依存する

### 再評価トリガー

- `claude-review-gate` の実体実装が必要になった時
- 品質インシデントで現行 review プロセスにギャップが判明した時

---

## 6. 総合判定

| 条件 | 現状 | 備考 |
|------|------|------|
| M1: 導入意思決定 | 未表明 | 導入の必要性自体が未評価 |
| M2: 入口方針 | 未決定 | Option A/B ともに未確定 |
| M3: gate 統合 | 未決定 | M1 に依存 |

**Phase 1 判定**: 不十分（条件変化待ち）
— ai-worklog 側正本（`docs/claude-code-foundation.md` 6.5-6.6）と同一判定

**Phase 2 以降**: M1-M3 未充足のため評価対象外（M4-M5 は評価しない）

---

## 7. 次回トリガー

M1-M3 の再評価トリガーのいずれかが発生した時点で再検討する:

1. 並列マルチエージェント開発、Wave-based 計画、またはクロスチェック要件の必要性が評価された（M1）
2. AGENTS.md の肥大化または Claude Code / Codex 指示の分岐・衝突が発生した（M2）
3. `claude-review-gate` 実体実装の必要性または現行 review プロセスのギャップが判明した（M3）

---

## 変更履歴

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-04-02 | 初回判定条件整理（ai-worklog foundation.md 6.5-6.6 M1-M3/Phase1 と整合） |
