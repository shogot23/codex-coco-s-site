# PBI Input

## Task

- task-id: TASK-video-card-viewport-fit-2026-04-29
- title: Videos ページの動画カードを1画面内に収める
- owner: Codex
- date: 2026-04-29

## Request Summary

- 依頼の要約: `/videos/` の動画カードがPCとスマホの両方で1画面内に収まるよう修正する
- 背景: 自己ホストMP4追加後、動画カードが縦に大きくなり、読後の余韻を静かに眺める補助室としての見やすさが落ちている

## Goal

- 達成したいこと: 各動画カード全体が、スクロールしてそのカードに来たとき desktop / mobile の1 viewport 高さ以内に収まる
- 完了条件: `/videos/` のMP4カードがPC/スマホで1画面内に収まり、既存の世界観・コピー・導線を変えず、frontend verify と Claude review gate が通る

## Scope

- 含める: Videosページのカード/動画表示CSS調整、viewport回帰E2E、PlanGate文書更新
- 含めない: 動画内容の差し替え、圧縮、サムネイル生成、コピー変更、ページ構成の大改修

## Constraints

- 既存運用との整合: `publish/dev-critical` として扱い、`docs/parallel-dev-config.md` の verify / review ルールに従う
- 納期 / 優先度: 即時
- 触ってよいファイルや領域: `src/pages/videos.astro`, `tests/e2e/site-smoke.spec.ts`, `docs/tasks/TASK-video-card-viewport-fit-2026-04-29/`

## References

- 関連ドキュメント: `docs/parallel-dev-config.md`, `docs/reading-with-coco-design-doctrine.md`, `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`
- 関連 issue / PR: なし

## Notes

- visual thesis: 動画は主役ではなく、読後の呼吸を小さく整える静かな余白として扱う
- content plan: 既存の hero / 補助室説明 / fragment shelf / Reviews・Gallery導線をそのまま保つ
- interaction thesis: 動画の再生操作は自然に残しつつ、カード単位で視線が迷わず1画面に収まる状態を優先する
