# Plan

## Task

- task-id: TASK-gallery-genre-taxonomy-drift-2026-04-20
- related pbi: `docs/tasks/TASK-gallery-genre-taxonomy-drift-2026-04-20/pbi-input.md`

## Intent

- 何を変えるか: gallery genre の列挙値と pure mapping を Astro 非依存の taxonomy module に寄せ、UI と scripts の drift を最小差分で解消する。
- なぜ今やるか: `社会科学` が scripts 側で未対応のまま残っており、運用フローと UI 表示の整合が崩れているため。

## Scope Declaration

- 変更対象ファイル:
  - `src/lib/gallery-taxonomy.ts`
  - `src/content/config.ts`
  - `public/admin/config.yml`
  - `src/pages/gallery.astro`
  - `src/pages/gallery/[slug].astro`
  - `scripts/gallery-import.ts`
  - `scripts/apply-gallery-corrections.ts`
  - `scripts/lib/ocr.ts`
  - `scripts/lib/slug.ts`
  - `docs/tasks/TASK-gallery-genre-taxonomy-drift-2026-04-20/*`
- 変更しないもの:
  - narrative copy
  - CTA copy
  - `note/description`
  - `purchaseLinks`
  - `relatedReview`
  - `REVIEW_TAGS`
  - legacy sample data

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため単独で進める。

## Implementation Steps

1. 実装ブランチ `codex/fix-gallery-genre-taxonomy-drift` を切る。
2. `src/lib/gallery-taxonomy.ts` を追加し、`GALLERY_GENRES`、bucket 定数、bucket helper、slug prefix helper を定義する。
3. app 側で schema / gallery 一覧 / gallery 詳細の参照を taxonomy module へ寄せる。文言自体は変えない。
4. scripts 側で列挙値、許可値、OCR 検出、slug prefix を taxonomy module 参照へ置き換え、`社会科学` を受理可能にする。
5. CMS YAML を taxonomy と手同期し、scripts import 成否 / `社会科学` 受理 / slug 互換性を確認する。
6. `npm run verify:frontend`、review gate、commit / push / draft PR、`status.md` 更新を行う。

## Risks And Guards

- 想定リスク:
  - scripts から taxonomy module を import した際の境界不整合
  - slug helper 変更による既存 URL 破壊
  - bucket 判定整理時の narrative copy 変更混入
- 回避策:
  - taxonomy module は Astro 非依存の plain TS に限定する
  - 既存ファイル rename を行わず、新規生成時のみ `社会科学 -> business` を適用する
  - bucket helper だけ共通化し、文言は既存コードに残す
- scope 外に見つけた事項の扱い:
  - task 文書または最終報告の残課題に記録し、今回の差分には含めない

## Verification

- 実行するコマンド:
  - `npm run verify:frontend`
- 追加確認:
  - `node scripts/gallery-import.ts --help`
  - `node scripts/gallery-import.ts --help | rg "社会科学"`
  - `node scripts/gallery-import.ts --dry-run --file <existing-fixture> --genre 社会科学`
  - `git diff --stat`
  - `git diff --name-status --find-renames`

## Approval

- approver: self
- status: approved
- note: ユーザー指示と事前調査結果に基づき、最小差分スコープで自己承認して進める
