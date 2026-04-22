# PBI Input

## Task

- task-id: TASK-3books-lp-copy-refresh
- title: 3books LP 冒頭文言を X プロフィール方針に合わせて調整
- owner: Codex
- date: 2026-04-22

## Request Summary

- 依頼の要約: 3books LP の冒頭文言を、忙しい日々 / 役割や環境変化 / 視界を整える / 次の一歩 という流れに寄せて最小差分で調整する
- 背景: Xプロフィールの方向性更新に合わせて、SNS から来た訪問者が迷わず 3books LP に入れるようにしたい

## Goal

- 達成したいこと: 既存のやわらかく静かな世界観を保ちつつ、プロフィールとの接続が自然に伝わる文言へ更新する
- 完了条件: 冒頭見出し、リード文、Coco's Note、「今日は、どの入口からひらく？」周辺の導入文が意図に沿って更新され、不要な変更が入っていない

## Scope

- 含める: `src/pages/3books.astro` の該当テキスト更新、差分確認、必要な verify
- 含めない: レイアウト変更、スタイル変更、コンポーネント構造変更、書籍カード本文の大幅改稿

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、PlanGate と Claude review gate を通す
- 納期 / 優先度: 即対応
- 触ってよいファイルや領域: まずは `src/pages/3books.astro` のみ。必要最小限で task docs を更新

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: SNS からの初訪問者向け案内性は少し強めるが、ビジネスライクに寄せすぎない
- 未確定事項: 既存文言との接続で微修正が必要になった場合も、対象は冒頭周辺に限定する
