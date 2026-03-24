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

## Import 完了条件

`npm run gallery:import` 実行後、以下を確認すること：

**注意**: 以下の表は file-level の import 成否を示します。command-level の validation（typecheck/build）および公開前 review は別段階です。

### ステータス別の完了条件

| ステータス | inbox/gallery の状態 | 次のアクション |
|-----------|---------------------|---------------|
| `created` | 元ファイルは move されている | その画像の import 判定は成功。ただし draft markdown の review と validation 確認は別途必要 |
| `duplicate` | 元ファイルは `retained` で残る | **report を確認**。同一書籍なら inbox 画像は不要（削除可）。別書籍なら `--file` + title/author 指定で再実行 |
| `manual-review` | 元ファイルは残る | report の候補と template を確認し、必要なら `--file` + override で再実行 |
| `error` | 元ファイルは残る | エラー原因を修正して再実行 |

### 必須確認事項

- [ ] `reports/gallery-import-report.md` で全ファイルの処理ステータスを確認
- [ ] report の `## Validation` で `npm run typecheck` / `npm run build` が成功していることを確認
- [ ] `duplicate` の場合は report で既存エントリとの対応を確認し、同一書籍か別書籍かを判断
- [ ] ステータスに応じた適切なアクションを実行
- [ ] single-file モード（`--file`）の場合、指定ファイル以外は処理されないため別途処理が必要

### 注意事項

- 「inbox/gallery が空であること」は正常終了の十分条件ではない（`created` 以外は残るため）
- `duplicate` は常に削除で閉じてよい状態ではない。report 確認後に判断すること
- `duplicate` で別書籍と判断した場合は、`--file` + title/author 指定で再実行して正しいエントリを作成する

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

## 自動実行モード

`gallery:pipeline` は `inbox/gallery/` の import から rename dry-run / apply、参照同期、`typecheck` / `build`、必要なら commit / push / PR までを一連で進める半自動モードです。

```sh
npm run gallery:pipeline -- --dry-run
npm run gallery:pipeline -- --apply
npm run gallery:pipeline -- --apply --pr
```

- `--dry-run` は import 判定、対象 markdown 特定、frontmatter 検査、rename 計画、review 件数、同期対象、停止条件を確認して要約だけ出します
- `--apply` は安全条件を満たした場合だけ rename 本番、`image` / `source_file` 更新、`reviews` / `gallery-manifest.json` / `gallery-corrections.json` 同期、旧参照チェック、`npm run typecheck`、`npm run build` まで進めます
- `--pr` は `--apply` 成功後に git add / commit / push / PR 作成まで試みます。ただし既存の staged 変更や、今回触るファイルに事前の未コミット変更がある場合は自動で停止して commit / PR をスキップします
- `--docs` はコマンドと停止条件の要約を表示します
- デフォルトの target は今回の import 結果に含まれる gallery markdown のみです。既存の dirty draft まで含めたい場合だけ `--include-dirty-drafts` を明示指定します

**自動停止する条件**

- import 段階で `manual-review` または `error` が出た
- `title` / `author` / `image` / `source_file` の必須項目が未確定
- `title` / `author` が rename 用の英字表記になっていない
- placeholder が混入している
- rename-review 件数が閾値を超えた
- rename 後も old path 参照が残った
- `npm run typecheck` または `npm run build` が失敗した

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

## 説明文（description）のルール

- 説明文には本の題名を含めない（『タイトル』形式も不可）
- 書籍の魅力や特徴を簡潔に表現する
- 30〜50文字程度を目安とする

## Cleanup

- 現在の OCR キャッシュは `.cache/tesseract/` を使う
- リポジトリ直下の `eng.traineddata` / `jpn.traineddata` は旧実行や失敗実行で残る残骸なので、未追跡なら削除してコミットしない
