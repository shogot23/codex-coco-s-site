# 読書 with Coco

Astro で構築した「読書 with Coco」のサイトです。読書レビュー、ギャラリー、動画を通じて、本から生まれた世界をココちゃんと一緒にたどります。

## Frontend Workflow

- frontend 実装前に `visual thesis` / `content plan` / `interaction thesis` を必ず短く決める
- first viewport は 1 composition として扱い、brand と主要CTA を同時に読める状態にする
- generic SaaS 風のUIや、目的の薄い cards の乱立を避ける
- 実装後は `npm run verify:frontend` で desktop / mobile を含む確認を通す

詳細は [docs/frontend-playbook.md](docs/frontend-playbook.md) と [AGENTS.md](AGENTS.md) を参照。

## Project Structure

```text
/
├── public/                 # 固定アセット
├── src/
│   ├── components/         # 共通コンポーネント
│   ├── content/            # Astro content collections
│   ├── layouts/            # 共通レイアウト
│   ├── pages/              # 各ページ
│   ├── styles/             # 共通トークンとベーススタイル
│   └── utils/              # 整形ロジック
├── tests/e2e/              # Playwright smoke tests
├── docs/                   # 運用メモ
└── package.json
```

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバー起動 |
| `npm run lint` | ESLint |
| `npm run typecheck` | Astro type check |
| `npm run build` | 本番ビルド |
| `npm run test` | Playwright smoke test |
| `npm run test:e2e:headed` | Playwright を headed で実行 |
| `npm run verify:frontend` | lint + typecheck + build + e2e を一括実行 |

## Gallery Import

Place new gallery images in `inbox/gallery/` and run:

```sh
npm run gallery:import
```

The importer scans `jpg` / `jpeg` / `png` / `webp`, creates draft entries under `src/content/gallery/` when confidence is high enough, and writes the execution report to `reports/gallery-import-report.md`.

When OCR is weak, the importer keeps the image in `inbox/gallery/`, marks the result as `manual-review`, and writes recovery hints to the report:

- OCR candidate strings
- top title / author candidates
- similar gallery / review entries
- a reusable frontmatter template
- a suggested single-file override command

Override mode lets you create a safe draft even if OCR fails:

```sh
npm run gallery:import -- --file inbox/gallery/sample.png --title "青天" --author "若林正恭" --genre "小説"
```

- `--file` processes only that file
- `--file` accepts only real files under `inbox/gallery/`; paths outside that tree fail before processing starts
- `--title` and `--author` can force draft creation when OCR is insufficient
- `--genre` is optional
- override mode still performs duplicate checks, writes the report, and runs `npm run typecheck` / `npm run build`
- override-generated drafts stay on the safe side with `published: false` and `needs_review: true`
