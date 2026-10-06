# PBI Input

## Task

- task-id: TASK-works-voice-audit-20261006
- title: 公開ワークの本とのつながりを本人視点へそろえる
- owner: Luna（単一writer）
- date: 2026-10-06

## Request Summary

- 依頼の要約: 全19件の公開ワークページを読み、Codex側の資料確認や本人が書いたReviewを第三者として紹介する表現があれば、既存Reviewに記録された本人の読書経験に沿う一人称へ修正して公開する。
- 背景: 「原著全文は未読」「出版社資料を確認」「レビューから受け取った」などの監査過程が、ユーザー本人の読書状況・経験に見える箇所がある。

## Goal

- 達成したいこと: 公開向けの本とのつながりを、本人の読書で受け取った問いと日常向け翻案として自然に伝える。
- 完了条件: 全19件を監査し、要修正5件だけを最小編集。本人の既存Reviewとの整合、既存フィールド/導線/手順/研究/安全/画像の不変、既存works検証、Claude gate、PR CI、squash、Pages公開本文の確認を完了する。

## Scope

- 含める: `beyond-numbers-star-note-4min.md`、`feeling-one-word-note-3min.md`、`happiness-three-things.md`、`seiten-kind-voice.md`、`third-party-note.md` のbookConnection。feeling-one-wordは同文の「本とのつながり」本文も修正する。
- 含めない: 他14件、Review本文、description、手順、研究/evidenceNote、safetyNote、sources、relatedReview、slug/分類、画像、published状態、rendererやUI、inbox/studio原本、過去履歴。

## Constraints

- 既存運用との整合: publish/dev-critical。ユーザーの今回の直接依頼により公開まで承認済み。Claude review gate `glm-5.3`、既存npm scripts、PR経由squashを使用。
- 納期 / 優先度: 今回の依頼範囲で完了。
- 触ってよいファイルや領域: 上記5 Markdownと本taskのPlanGate/status/daily記録のみ。

## References

- 関連ドキュメント: `docs/works-publishing.md`、`docs/parallel-dev-config.md`、`docs/brand/reading-with-coco-content-guidelines.md`。
- 関連 issue / PR: なし。過去の本人視点修正は対象選定の文脈として参照し、再変更しない。

## Notes

- 領域固有メモ: 監査結果・19件一覧・before/after・本人書評の根拠はprivate evidenceに保存する。AI側の原著未読・資料確認は公開文へ出さず内部証跡に保つ。
- 未確定事項: なし。
