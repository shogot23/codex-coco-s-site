# Plan

## Task

- task-id: TASK-works-autopublish-20261104-check-my-understanding-3min
- related pbi: pbi-input.md

## Approval

- 承認根拠: 2026-11-04のユーザー指示が、新規制作成功分に対する掲載・検証・PR・CI・squash merge・Pages・公開確認・branch cleanupを明示している。`docs/works-publishing.md` も同じ継続承認を定める。
- 2026-11-05再開承認: ユーザーの『作業再開してください』を受けた今回の指示は、前回 `npm run test:works` 停止の原因である `scripts/work-import.test.mjs:188-190` のテスト名と期待件数を28→29へ変える最小修正、そのためのPlanGate更新・Claudeレビュー・再検証を明示している。今回のコード変更は当該2箇所に限る。
- 分類: `publish/dev-critical`。公開サイトへ新規コンテンツを追加する。
- gate条件: 必須phaseがすべて `ok:true`・blocking 0件となり、結果を `status.md` に記録するまでコード/コンテンツ変更を始めない。
- 対象レビュー: `claude-review-gate` skillを適用。前回の初回計画レビュー（arch → diff、glm-5.3、high）は既存証跡を保持する。今回の小さな計画追記はPlanGate 3ファイルを対象にglm-5.3 / effort lowで再レビューし、合格後に限りテスト2箇所を変更する。最終実装レビューも必須。

## Intent

- 何を変えるか: 新規ワーク1件と検証記録を、隔離 worktree から既存の Works 一覧・詳細・関連レビュー導線へ追加する。
- なぜ今やるか: 2026-11-04に新しく完成し、ユーザーが許可したサイト自動公開工程の条件を満たした制作物がある。

## Design Thesis

- Visual thesis: 制作時に監査済みの1080×1350画像と現行Worksのレイアウトを使い、画面設計は変更しない。PC・モバイル双方で画像と本文の収まりを確認する。
- Content plan: 「返事を急いで相手の言葉を決めつけそう」という困りごとから始め、本で心に残った敬意の視点を日常向けの翻案へつなぎ、4手順と研究の限界・短縮版未検証を保つ。
- Interaction thesis: 読者が1つの理解確認文を下書きしたあと、「使う・しまう・休む・相談・終了」から選べる。相手への送信や返答を求めず、既存レビューへ移動できる。

## Scope Declaration

- 変更対象ファイル:
  1. `src/content/works/check-my-understanding-3min.md`（works:importが作成。preview後にこのファイルの `published` だけ true にする）
  2. `src/assets/works/check-my-understanding-3min.png`（制作物の指定PNGをそのまま取り込む）
  3. `scripts/work-import.test.mjs` の reader-copy guardテスト名と期待件数の2箇所（28→29のみ）
  4. 本 task folder の `pbi-input.md`、`plan.md`、`test-cases.md`、`status.md`、`daily-2026-11-04.md`、再開記録
- 変更しないもの: 元mainのdirty/untrackedファイル、inboxの制作7ファイルとhistory、既存レビュー・他ワーク・taxonomy・既存画像・UI・CI/config・依存、SNS投稿、追加2箇所以外のテスト。画像の生成・再生成・加工もしない。
- 期待差分: 対象記事とPNG、reader-copy guardのテスト名/期待値2箇所、本 task folderの記録のみ。

## Parallel Work Check

並列化する独立タスクはない。制作物の改変を防ぐ単一 writer として直列に進める。

## Implementation Steps

1. `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261104-coco-repair-work-20261104/audit/delivery-audit.json` の `files_sha256` を基準にinbox内7ファイルのSHAと `published:false` を再確認する。既存slug/画像の衝突、関連レビューのタイトル・公開状態も確認する。
2. 絶対パスで `npm run works:import -- <site-work.json> --dry-run` を実行し、成功した場合だけ通常importする。取り込んだ記事は `published:false` のままにする。
3. `npm run works:preview` を localhost:4327 で起動し、一覧・詳細・画像・4手順・研究限界・関連本の往復導線を desktop と mobile viewport で目視確認する。`src/utils/works.ts` は開発previewで未公開記事を含め、詳細に下書きラベルを表示することを事前確認済み。読者向けコピー4点も人が読む。
4. 問題がなければ対象Markdownの `published` のみ true にする。本文、画像、slugは編集しない。
5. Claudeレビュー済みPlanGateに沿って `scripts/work-import.test.mjs:188-190` のテスト名と期待件数を28→29に変更する。差分がその2箇所のみで、全Markdownを走査するloopが維持されたことを確認する。
6. `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` を通す。inbox PNG SHAと `src/assets/works/check-my-understanding-3min.png` SHAを照合する。build後は一覧・詳細・関連レビュー・OGのdist HTMLを確認し、HTML参照の480/1080 WebPについてdist bytes/SHAを保存する。
7. `claude-review-gate` の指定どおり、glm-5.3 のpreflight / 必須レビューphaseを証跡付きで実行する。commit/PR/merge前のgateがすべて有効でblocking 0件になるまで進まない。
8. 想定差分を確認してcommit・push・PR・CIを行い、merge可能状態を確認後squash mergeする。mainへのmerge後に `deploy.yml` がpush起動する。merge commit SHAに対応するPages workflow runのstatus=completed、conclusion=success、deploy job成功を確認してから、公開HTMLと画像をcache-bypassでHTTP・寸法・SHA・dist bytesとの一致まで検証する。workflowの完了待ちは15分で打ち切り、未完了なら公開確認を完了扱いしない。
9. `git fetch origin main` でremote-tracking refを更新する。隔離worktree内だけで `origin/main` へdetachしてSHA一致を確認し、作業branchとworktreeを安全にcleanupする。元作業ツリーでcheckout中のlocal `main` を移動・checkoutせず、そのHEADとdirty/untracked一覧を初期値と照合する。completion.jsonに状態を記録する。

## Risks And Guards

- 想定リスク: 表示内容や導線の不一致、関連レビュー/画像パスの誤り、短縮版の根拠を研究介入の効果と誤認させる表現、既存データとの衝突。
- 回避策: import dry-run、draft preview、ブランド4点チェック、専用テスト、dist検査、Claude review、PR差分と公開HTML/媒体の独立確認を順番に行う。
- scope 外に見つけた事項の扱い: 公開停止し、必要な再開条件を報告する。CI/config変更や画像修正が必要なら停止する。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-04_2217_check-my-understanding-3min/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-04_2217_check-my-understanding-3min/site-work.json`
  - `npm run works:preview`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: desktop/mobileの実画面、読者向けコピー4点、制作記録上のSHAとinbox→`src/assets`の完全一致、distとPagesのcache-bypass HTML/OG/画像、variant別SHA/byte一致・寸法、既存レビューとの相互リンク、Pages deploy jobの完了、PR checks。
