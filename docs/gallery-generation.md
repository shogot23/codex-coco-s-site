# Gallery Auto Generation

`gallery:import` は `inbox/gallery/` を入力起点にし、成功した画像だけを `public/uploads/gallery/books/` と `src/content/gallery/` に生成します。

## 推奨フロー

`inbox/gallery/` に画像を置いて `npm run gallery:import` を実行します。

- 対応拡張子: `jpg` / `jpeg` / `png` / `webp`
- 新規画像が高信頼で判定できた場合だけ `public/uploads/gallery/books/` と `src/content/gallery/` に反映します
- 判定が弱い画像や重複候補は `reports/gallery-import-report.md` に残し、元画像は `inbox/gallery/` に維持します
- 生成 entry は `published: false` と `needs_review: true` で作成されます
- 実行の最後に `npm run typecheck` と `npm run build` を走らせ、結果もレポートに追記します
- `manual-review` の復旧は report を起点に行います

## override mode

OCR が崩れても、単体ファイルに対して title / author / genre を与えて draft を生成できます。

```sh
npm run gallery:import -- --file inbox/gallery/sample.png --title "青天" --author "若林正恭" --genre "小説"
npm run gallery:import -- --file inbox/gallery/sample.png --title "成瀬は都を駆け抜ける" --author "宮島未奈"
```

- `--file` 指定時はそのファイルだけを処理します
- `--file` で指定できるのは `inbox/gallery/` 配下の実ファイルのみです。配下外パスや symlink 解決後に配下外となるパスは処理開始前に失敗します
- `--title` と `--author` が入っていれば OCR が弱くても draft 生成可能です
- `--genre` は任意です。未指定時は既存推定を使い、確定できなければ review 前提で残します
- override mode でも duplicate 判定、report 出力、`typecheck`、`build` は必ず行います
- override mode で生成された entry も `published: false` / `needs_review: true` のままです

## 入力対象

- `inbox/gallery/**/*.{png,jpg,jpeg,webp}`

## 生成先

- `public/uploads/gallery/books/**/*.{png,jpg,jpeg,webp}`
- `src/content/gallery/*.md`

## 対象外

- `public/uploads/**` 全体は importer の入力対象ではありません
- `public/uploads/profile/**`
- `public/uploads/summary/**`
- `inbox/gallery/` 外の任意パスを使った `--file`

## 実行手順

1. `inbox/gallery/` に新規画像を置く
2. `npm run gallery:import`
3. `reports/gallery-import-report.md` を確認する
4. `manual-review` や `duplicate` があれば report の候補・類似 entry・frontmatter template を確認する
5. OCR で復旧しづらい場合は `--file` と override を付けて単体再実行する
6. 自動作成された `src/content/gallery/*.md` をレビューして公開可否を判断する

### 既存の段階実行フロー

旧フローの `gallery:ocr` / `gallery:apply-corrections` / `gallery:generate` も残しています。

## manual-review の見方

`reports/gallery-import-report.md` には少なくとも次が出ます。

- 対象画像の相対パス
- 判定結果 (`created` / `duplicate` / `manual-review` / `error`)
- OCR candidate strings
- title / author 候補の上位
- confidence
- 既存 gallery / review との類似候補
- そのまま流用できる frontmatter template
- 単体再実行用の override command

復旧時は以下の順で見ると速いです。

1. `Next action`
2. `Ranked Candidates`
3. `Similar Existing Entries`
4. `Frontmatter Template`
5. `OCR Text Excerpt`

## 推奨運用フロー

1. `inbox/gallery/` に画像を入れる
2. `npm run gallery:import`
3. `reports/gallery-import-report.md` を確認する
4. 必要なら `--file` 付き override で単体復旧する
5. 生成された markdown を review する
6. review 後に `published: true` へ進める

### 生成後の命名と参照同期

5 で `src/content/gallery/*.md` を review して `title` / `author` を確定したら、公開前に画像 rename と参照同期をまとめて行います。`gallery:import` の初期出力名や外部生成画像の元ファイル名を、そのまま公開運用の正本にしません。

**基本方針**

- 画像ファイル名は原則 `Title_English_Author_English.ext` にそろえる
- 正本は OCR 結果ではなく `src/content/gallery/**/*.md` の frontmatter とする
- `title` / `author` は意訳ではなく英字表記ベースでそろえる
- 同名衝突時は末尾に `_2`, `_3` を付けて解決する
- `/placeholder-*.jpg` などの placeholder 画像は無理に rename しない

**命名ルール**

- ASCII のみを使う
- 使用文字は `A-Z` `a-z` `0-9` `_` `-` に限定する
- スペースは `_` に置き換える
- 拡張子は元ファイルのものを維持する

**実施手順**

1. `src/content/gallery/**/*.md` から `title` `author` `image` `source_file` を確認する
2. `public/uploads/gallery/books/` の対象画像を frontmatter の `title` / `author` ベースで rename する
3. 同じ markdown の `image` / `source_file` を新ファイル名へ更新する
4. 必要に応じて `src/content/reviews/**/*.md` の `cover`、`data/gallery-manifest.json` の `image` / `source_file`、`data/gallery-corrections.json` の key と参照値も同期する
5. 旧ファイル名参照が残っていないか確認する
6. `npm run typecheck` と `npm run build` で検証する

**注意点**

- 画像 OCR は候補生成の補助として扱い、rename の正本にはしない
- rename では画像の中身を変えず、ファイル名と参照だけを更新する
- rename と参照更新は必ずセットで行う

**チェックリスト**

- [ ] frontmatter の `title` / `author` が確定している
- [ ] 画像ファイル名が `Title_English_Author_English.ext` 形式になっている
- [ ] `src/content/gallery/**/*.md` の `image` / `source_file` が一致している
- [ ] 必要な `review` / `manifest` / `corrections` の参照を更新した
- [ ] 旧ファイル名参照が残っていない
- [ ] `npm run typecheck` と `npm run build` が通る

## スキップ方針

- 対象外画像は走査しない
- 対象ディレクトリ内の未対応拡張子はログ出力してスキップする
- 既存の gallery md は上書きせずスキップする
- 上書きしたい場合だけ `npm run gallery:generate -- --force` を使う

## needs_review

- OCR 全体の confidence が 0.80 未満
- タイトル抽出に失敗した
- タイトル confidence が 0.80 未満
- 抽出できた著者 confidence が 0.80 未満

## 運用上の注意

- OCR は公開用データの確定ではなく、候補生成までと考える
- 表紙以外の写り込み、帯、背景、斜め撮影がある画像では OCR が崩れやすいため、人手補正を前提にする
- OCR 精度に自信がない場合は `needs_review: true` を維持する
- `genre` は自動抽出に依存しない
- `genre` 未設定の entry は `/gallery` に出ないため、manifest 確認時または CMS で必ず手動補正する

## Cleanup

- 現在の OCR キャッシュは `.cache/tesseract/` を使う
- リポジトリ直下の `eng.traineddata` / `jpn.traineddata` は旧実行や失敗実行で残る残骸なので、未追跡なら削除してコミットしない
