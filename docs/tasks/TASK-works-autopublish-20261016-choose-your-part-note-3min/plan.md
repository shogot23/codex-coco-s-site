# Plan

## Task

- task-id: TASK-works-autopublish-20261016-choose-your-part-note-3min
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 完成済みワーク1件を既存機能へ取り込み、検証後に対象だけ公開する。
- なぜ今やるか: 制作完了と納品SHAが確認され、ユーザーの継続承認がこの新規1件に適用されるため。

## Scope Declaration

- 変更対象:
  - `src/content/works/choose-your-part-note-3min.md`（新規、公開確認までは`published: false`）
  - `src/assets/works/choose-your-part-note-3min.png`（納品画像を無変更で配置）
  - `docs/tasks/TASK-works-autopublish-20261016-choose-your-part-note-3min/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-16.md}`
  - `scripts/work-import.test.mjs`（新規1件追加に伴う既存Markdown件数の固定期待値だけを22から23へ同期。reader-copy guardは変更しない）
- 変更しないもの: inboxの納品7ファイルと制作job/history、既存レビューやワーク、テンプレート/UI、他のdirty tree。画像・原稿の改変、X/Instagram投稿、無関係な整形。

## Visual Thesis

- 既存のワーク詳細テンプレートに沿い、4:5画像をページの中心に置く。画像では本・ココちゃん・3手順を一つの場面として見せ、静かなブランド表現を保つ。

## Content Plan

- 結果や評価まで背負う読者の気がかりから入り、自分で選べる範囲を考える。結びに問いを残し、小さく試す・相談する・休む・ここで終える中から任意の一歩を選べるようにする。公開レビューへの本の導線を置き、研究の限界・短縮版未検証・中止の目安を保つ。

## Interaction Thesis

- 一覧から詳細へ進み、詳細から`stoic-mindset`の公開レビューへ移れる既存導線を確認する。手順の実行を迫らず、休息・相談・終了も同じ選択肢として読める状態にする。

## Parallel Work Check

- [ ] P1: 同時に進める独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象が完全に分離されている
- [ ] P3: 順序に依存がない
- 判定: 検証・import・preview・公開は連続工程のため単一writerで行う。

## Implementation Steps

1. 制作jobの完了・納品証跡、7ファイルのSHA、`published:false`、書誌、原稿、画像、分類ID、既存slug衝突を確認する。
2. `npm run works:import -- <絶対site-work.json> --dry-run`成功後だけ通常importする。本文・画像・分類・レビュー接続を照合し、`published:false`でlocalhost:4327のPC/mobileプレビューを確認する。
3. 本人目線、第三者レビュー/AI調査事情の不在、経験と本の根拠、引用と翻案および研究限界を確認する。問題がなければ対象Markdownだけ`published:true`にする。
4. `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist`を実行し、生成HTML・画像・公開本文を確認する。
5. 必須Claudeレビューphaseを完了し、差分を絞ってcommit・push・PR・CI・squash mergeを行う。PRは親chatへ添付する。
6. Pagesのmerge SHA向けdeploy後、cache-busted公開URLで一覧・詳細・レビュー相互リンク・共有画像・HTML参照WebP/AVIFをPC/mobileで確認し、公開HTMLでnoindexが外れていることを確認する。

## Risks And Guards

- リスク: 参照レビューやtaxonomyと納品内容の不一致、preview表示崩れ、検証・レビュー・deploy未完了。
- 対応: 最新origin/mainの隔離worktreeだけで作業し、dry-runを先行する。停止条件に触れたら状態と再開点を親へ返す。
- scope外に見つけた事項: 変更せず、事実だけを親へ報告する。
- Arch advisoryへの対応: 結びの問い・任意の一歩と公開後のnoindex解除確認を追加する。承認範囲、公開順序、納品の凍結境界に変更はない。

## Verification

- 初回の`npm run test:works`は34/35成功。`scripts/work-import.test.mjs`の`all 22 current work Markdown files pass the narrow reader-copy guard`だけが、今回の1件追加後の実数23に対して固定期待値22で失敗した。対象追加に必要な同期として、テスト名を`all 23 current work Markdown files pass the narrow reader-copy guard`へ、件数期待値を22から23へ更新する。guard本体と各Markdownの検査は変更しない。
- コマンド: `npm run works:import -- <絶対site-work.json> --dry-run`、通常import、`npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist`。
- 追加確認: published:falseのPC/mobile preview、読者向け4点、手順・番号・出典・本リンク、公開後HTMLと最適化画像。

## Approval

- approver: 人間ユーザー（今回のAutomation:cocoメッセージ）
- status: approved
- note: 対象は今回制作されたslug `choose-your-part-note-3min` のサイト公開。制作元の編集、既存work公開、SNS投稿は含まれない。
