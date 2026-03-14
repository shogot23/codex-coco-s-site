# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

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

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
