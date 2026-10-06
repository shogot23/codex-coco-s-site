# PBI Input

## Task

- task-id: TASK-works-voice-20261006-just-being-together
- title: 「3分のただ一緒にいる時間」の本とのつながりを本人の目線へ修正
- owner: gpt-6-luna/max（単一writer）
- date: 2026-10-06（JST）

## Request Summary

- 依頼の要約: 既存の公開ワークにある「原著全文は未読で…」はCodex側の確認状況なので削り、ユーザー自身が公開レビューに書いた読書後の思いを本人の目線で表す。
- 背景: ユーザーが直接、書き手の視点が混ざった本とのつながり文の修正と公開を依頼した。公開レビューには、読後に日々を成果だけで測っていた自分を見つめ直したこと、ココちゃんや息子と過ごす時間を急がず大切にしたい思いがすでに記されている。

## Goal

- 達成したいこと: 本とのつながりを既存レビューに根拠のある一人称で読み手へ伝え、監査者であるCodexの未読・参照確認をユーザーの経験として誤読させない。
- 完了条件: 指定のbookConnection文をfrontmatterと「本とのつながり」本文へ反映し、導入文の「公開レビューから受け取った」を「読んで受け取った」に直す。研究・安全・手順・画像・slug・公開状態を維持し、レビュー、CI、Pages上の公開内容まで確認する。

## Scope

- 含める: src/content/works/just-being-together-3min.md の bookConnection、本文導入、同じ意味を繰り返す「本とのつながり」段落。計画・検証を記録する本taskのPlanGateと完了記録。
- 含めない: 他の作品・レビュー・画像・手順・出典・研究説明・安全説明・slug・taxonomy・分類・制作原本・studio history・SNS投稿。

## Constraints

- 既存運用との整合: publish/dev-critical。ユーザーの今回の直接依頼が本修正と公開を承認している。継続自動公開承認を今回の根拠には使わない。planのClaude archレビュー後に原稿を変更する。
- 納期 / 優先度: 今回の明示依頼を優先。
- 触ってよいファイルや領域: 最新remote mainから作った新しい隔離worktreeの対象Markdownとこのtaskの記録だけ。元dirty checkout、納品7原本、制作job/history、他workは読み取り専用。

## References

- 関連ドキュメント: docs/parallel-dev-config.md, docs/works-publishing.md, brand guidelines, docs/reading-with-coco-design-doctrine.md, docs/frontend-playbook.md
- 根拠にする既存本文: src/content/reviews/tobari-no-mukou-kokubun-wakabayashi.md のexcerpt/readingCompassと本文「この本を読んで…」「ココちゃんや息子と過ごす今日の短い時間…」。
- 関連PR: #197（対象ワークの初回公開）
- ユーザー指定bookConnection: 「『帳の向こう』を読んで、日々を『何のためになるか』だけで測っていた自分に目を向けました。ココちゃんとただ一緒にいる時間を、急がずに過ごしたい。その思いから、目の前の様子を受け取り、今の一歩を選ぶ3分のワークを作りました。手順は、読書で受け取った問いを日常向けに組み立てたものです。」

## Notes

- 領域固有メモ: 同じbookConnectionをfrontmatterと本文の両方に使う。本文冒頭の「公開レビューから受け取った問い」は「読んで受け取った問い」へ直す。手順が本の引用や著者の実践法でないことは「読書で受け取った問いを日常向けに組み立てた」と自然に示す。
- 未確定事項: なし。研究・効果・動物安全の表現は本修正の対象外。
