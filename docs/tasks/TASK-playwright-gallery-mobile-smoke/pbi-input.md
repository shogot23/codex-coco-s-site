# PBI Input

## Task

- task-id: `TASK-playwright-gallery-mobile-smoke`
- title: Playwright E2E の gallery detail smoke と mobile usability を最小差分で拡張
- owner: Codex
- date: 2026-04-15

## Request Summary

- 依頼の要約: 監査結果に基づき、gallery 個別ページのスモークテスト追加と `mobile-chrome` 向けの意味ある mobile 固有検証を追加する
- 背景: 既存 E2E は一覧・review detail・主要導線の smoke はあるが、gallery detail 単独の確認と mobile viewport での実用性確認が不足している

## Goal

- 達成したいこと: 既存 Playwright 構成を崩さず、gallery detail と mobile usability の最低限の回帰検知を追加する
- 完了条件: `tests/e2e/site-smoke.spec.ts` に 3 つの追加カバレッジが入り、関連検証と Claude review gate が完了する

## Scope

- 含める:
  - `tests/e2e/site-smoke.spec.ts` への最小追加
  - PlanGate 用 task docs の作成と更新
  - 当日 daily への短い記録
- 含めない:
  - `playwright.config.ts` の大幅変更
  - screenshot / visual regression の導入
  - 既存テスト構成の大規模整理
  - gallery / review 本文や page 実装の変更

## Constraints

- 既存運用との整合: `publish/dev-critical` として Lightweight PlanGate と `claude-review-gate` を通す
- 納期 / 優先度: このターンで一気通貫で実装・検証する
- 触ってよいファイルや領域: `tests/e2e/site-smoke.spec.ts`、`docs/tasks/TASK-playwright-gallery-mobile-smoke/*`、`inbox/daily/2026-04-15.md`

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: `novel-seiten` を review 連動の安定 fixture、`business-0d597c` を purchaseLinks fallback fixture として使う
- 未確定事項: なし
