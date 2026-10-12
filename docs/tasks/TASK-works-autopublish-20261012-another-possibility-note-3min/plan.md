# Plan

## Task

- task-id: TASK-works-autopublish-20261012-another-possibility-note-3min
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 受領済みsite-work.jsonを既存importerで取り込み、private preview合格後に対象のpublishedだけをtrueにする。
- なぜ今やるか: 新作の制作ゲート・納品・byte一致が成功し、ユーザーの継続承認の範囲内で、2026-10-13に直接の再開指示を受けたため。

## Thesis

- Visual thesis: 既存work詳細に、本から広がる景色とココちゃんが写る4:5画像を載せ、本・ココちゃん・学びがPCとmobileで自然に読めることを確認する。
- Content plan: 軽い行き違いの具体例から、見た事実・見立て・推測としての反対可能性・未確認点と今選べる一歩へ進む。本との接点、原典研究の範囲、短縮版未検証、安全上の中止・休息・相談・終了選択肢を続ける。
- Interaction thesis: 一覧から詳細へ進み、関連Reviewとの相互導線を確認する。読み手には尋ねる、保留、休む、相談、終える選択肢を残し、相手への連絡や考えの変更を求めない。

## Scope Declaration

- 変更対象ファイル: src/content/works/another-possibility-note-3min.md、src/assets/works/another-possibility-note-3min.png、scripts/work-import.test.mjs（今回追加1件に追随するtest名 all20→all21 と件数期待値 20→21 の2箇所のみ。全件reader-copy guard loopと判定は維持）、docs/tasks/TASK-works-autopublish-20261012-another-possibility-note-3min/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-13.md}。
- 変更しないもの: 元checkout、inbox内の7納品ファイル、制作job/history、既存レビュー・ギャラリー・ワーク、taxonomy/UI、他inbox成果物、SNS投稿、画像生成/再生成。
- 元の未追跡変更や他のworktree状態を混ぜない。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

指定どおり単一writerで順番に実行する。

## Implementation Steps

1. branch/base/status、最新AGENTS/publishing rules、7納品hash/byte、制作image-qa.jsonの4:5比率・final pixel数1080×1350、slugとasset衝突、relatedReview公開状態/title「私が間違っているかもしれない」完全一致、taxonomy、本分野の声・研究限界を確認する。寸法がimage-qaと一致しない場合はdry-runへ進まない。
2. 承認済み絶対パスのsite-work.jsonでdry-runし、成功後に対象をpublished:falseのままimportする。元画像とのbyte一致、対象2パスのみ追加、false状態を確認する。
3. localhost:4327のprivate previewでdesktop 1440×960とmobile 390×844の一覧/詳細/画像/4手順/本の導線/出典/研究限界/安全注記/noindexを確認する。著者目線と「心配→本の問い→見方の余地→選べる一歩」の4点も目視する。
4. preview合格後だけ対象Markdownのpublishedをtrueに変更する。site-work.jsonと制作納品原本はfalseを保つ。
5. 初回npm run test:worksは追加後の21件に対して固定期待値20件となり34/35 passだった。PlanGate改訂のClaude arch→diff両phaseが成立するまでtestファイルに触れない。合格後、scripts/work-import.test.mjs:188のtest名all20をall21へ、190行目のassert.equal期待値20を21へ変更する2箇所だけを直す。全件reader-copy guard loopと判定ロジックを維持し、npm run test:worksを再実行する。PASSした場合のみnpm run verify:frontend、npm run check:works-distを順に実行し、公開ビルドと対象URLを確認する。
6. 対象workと限定test更新を含む最終差分を、ユーザーの直接指示により独立レビュー担当gpt-6.1-solがarch/diff/crossで確認する。親がblocking 0と対象HEADを返すまでcommit/PRへ進まない。Claudeへの再依頼はしない。
7. 親からレビューOKを受けてから差分とscopeを確認してcommit/push/PR（base main、non-draft）。state、mergeability、changed files、CI、labels、添付を確認する。merge直前に最新exact HEADとchecksを再確認し、同じ独立Sol reviewerのmerge前確認後にsquash mergeする。
8. Pages deploy成功後、cache bypassで公開一覧・詳細・Review相互リンク・共有画像、HTML参照のAVIF/WebPとdesktop/mobile表示を確認する。statusとdailyを更新し、親が独立検証できる証跡pathを返す。

## Risks And Guards

- 想定リスク: inputと本の不一致、既存slug/asset衝突、preview漏れ、著者の声の逸脱、研究範囲や安全選択肢の欠落、独立Solレビュー/CI/Pages失敗。
- 回避策: 一つでも不一致や未確認があれば次工程へ進まず停止する。dry-run/importerとdistributable-checkを用い、受領値を保つ。published変更はプレビュー合格後だけにする。
- scope外に見つけた事項の扱い: 編集せず、証拠と再開点を親へ報告する。

## Verification

- 実行するコマンド:
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-12_2219_another-possibility-note-3min/site-work.json --dry-run
  - npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-12_2219_another-possibility-note-3min/site-work.json
  - npm run test:works（初回の21件対20件 failureを記録。PlanGate改訂レビュー合格後、test名と件数の2箇所だけを21へ更新して再実行）
  - npm run verify:frontend
  - npm run check:works-dist
  - git diff --check
- 追加確認: 7ファイルSHA/byte、image-qaとPNG寸法1080×1350一致、import後published:false、preview desktop/mobile、声4点、思考経路4点、最適化画像参照、独立Solの全arch/diff/crossとblocking 0、PR CI、merge直前のexact HEADレビュー、Pages cache-bypass URL/画像とHTML参照、元checkoutと制作原本の不変。

## Approval

- approver: 現行のユーザー自動実行依頼に従う gpt-6-luna/max 単一writer
- status: approved for the two-line test update — 2026-10-13 Claude glm-5.3/low arch and diff both ok:true, blocking 0; evidence: /private/tmp/coco-site-another-possibility-evidence/2026-10-13/plan-arch-scope-adjustment-r2 and plan-diff-scope-adjustment. Arch advisories: dynamic-count alternative is deferred under the parent’s exact two-edit scope; authorization provenance remains accurately recorded. Run npm run test:works after the two edits and stop on any further failure.
- note: 承認根拠はユーザーの直接継続承認と2026-10-13の「作業再開してください」。この新作1件のサイト公開と必須test:worksを成立させるため、親の指示でscripts/work-import.test.mjsのテスト名・件数の2箇所だけをscopeに加える。新しいユーザー発言・承認は捏造しない。全件reader-copy guardのloopと判定ロジックは維持。改訂PlanGateのarch/diff成功でscopeが承認された扱いとし、失敗した場合は停止する。

## 2026-10-13 ユーザー直接指示によるレビュー担当・公開手順の変更

- ユーザーの直接指示: 「PRからマージ処理をスキルを使って実施してください。レビューはSolが独立エージェントとして代わりに実施してください」。これにより、前段で未成立だった最終Claude reviewの担当を独立Solへ切り替え、PRからsquash mergeまでの継続が承認された。
- parent指定の独立gpt-6.1-sol reviewerが全差分をarch/diff/crossで確認し、blocking 0を確認する。merge直前も同じ reviewerが最新exact HEADを確認する。writerはgpt-6-luna/maxの単一writerを維持する。
- これはユーザーが明示したreview担当の変更であり、画像・本文・test sourceの修正や新たな範囲追加ではない。writerはClaudeを再実行せず、Solのgate結果を受け取るまでcommit/PR/mergeを保留する。
