# Gallery自動生成機能の実装計画

## Context

ユーザーが手動で配置した「本＋ココちゃん」画像から、gallery用コンテンツを自動生成する機能を追加する。

**目的:**
- 画像配置 → OCR → gallery用md自動生成のワークフローを確立
- 誤認識リスクを軽減しつつ、安全な候補生成を優先
- Decap CMSとの共存可能な構成

**前提:**
- 対象画像は `public/uploads/gallery/books/` に配置（フォルダ分離方式）
- OCR認識結果は著者名をgalleryページに表示
- genreが認識できない場合は空欄とし、手動設定を強制

---

## 1. 現状理解

### 既存構成
| 項目 | 現状 |
|------|------|
| Gallery保存先 | `src/content/gallery/*.md` |
| 現在のschema | `title`, `image`, `genre`, `note`（noteはoptional） |
| ジャンル | 小説, ビジネス, 歴史 |
| CMS media_folder | `public/uploads` |
| CMS public_folder | `/uploads` |
| 既存mdファイル | 6件（すべてplaceholder画像） |

### uploads現状
- 5つのPNG画像が `public/uploads/` 直下に存在
- UUID形式のファイル名が多い
- OCRライブラリ未導入

---

## 2. 影響範囲

### 変更が必要なファイル
1. **src/content/config.ts** - schema拡張（author, needs_review等）
2. **public/admin/config.yml** - CMS設定に新フィールド追加
3. **src/pages/gallery.astro** - 著者名表示対応
4. **package.json** - tesseract.js、新規script追加

### 新規作成ファイル
1. **scripts/ocr-gallery-images.ts** - OCR実行スクリプト
2. **scripts/generate-gallery-md.ts** - md生成スクリプト
3. **scripts/lib/ocr.ts** - OCRロジック
4. **scripts/lib/slug.ts** - slug生成ユーティリティ
5. **data/gallery-manifest.json** - OCR結果キャッシュ

### ディレクトリ作成
- `public/uploads/gallery/books/` - 対象画像配置用

---

## 3. 推奨方針

### 3-1. 対象画像の限定: フォルダ分離
```
public/uploads/
├── gallery/
│   └── books/          # ← OCR対象（本＋ココちゃん画像のみ）
├── profile/            # ← 対象外
└── summary/            # ← 対象外
```

**理由:**
- 明確な分離で誤処理防止
- Decap CMSのmedia_folder設定と親和性が高い

### 3-2. 実装方針: manifest JSONを経由する2段階方式
```
[画像] → OCR → [manifest.json] → 生成スクリプト → [*.md]
```

**理由:**
- デバッグ容易（OCR結果を確認・修正可能）
- 冪等性確保（manifestがあれば再生成可能）
- 手動介入ポイントを提供

### 3-3. OCR手段: Tesseract.js
- Node.jsネイティブ、外部依存なし
- 日本語データパック（jpn）利用可能
- 無料

### 3-4. schema拡張
```typescript
// 追加フィールド
author: z.string().optional(),        // 著者名
needs_review: z.boolean().optional(), // 要確認フラグ
generated_at: z.string().optional(),  // 自動生成日時
source_file: z.string().optional(),   // 元画像ファイル名
```

---

## 4. 誤認識対策

### needs_review 付与基準
```typescript
function shouldMarkForReview(result: OcrResult): boolean {
  return (
    result.confidence < 0.80 ||  // 信頼度80%未満
    !result.title ||             // タイトル抽出失敗
    result.title.length < 2      // タイトルが短すぎる
  );
}
```

### genreの扱い
- OCRで認識できない場合 → 空欄（必須エラー）
- ユーザーが手動で設定する運用

### slug生成ルール
- `[ジャンル英名]-[短縮hash]` 形式
- 例: `novel-a1b2c3`, `business-x9y8z7`
- 日本語ローマ字変換の複雑さを回避

### 再実行時の更新ルール
- 既存ファイルがある場合 → スキップ（上書きしない）
- `--force` フラグ付きの場合 → 上書き
- manifestは常に更新

---

## 5. 小PR単位の実装ステップ

### PR-1: スキーマ拡張（影響最小）
**目的:** 下準備のみ、機能変更なし

**変更:**
- [src/content/config.ts](src/content/config.ts) に新フィールド追加
- [public/admin/config.yml](public/admin/config.yml) に新フィールド追加
- 既存6つのmdファイルに空の新フィールド追加

**検証:**
```bash
npm run build        # 型エラーなし
npm run dev          # 既存galleryページが表示される
```

---

### PR-2: gallery表示の更新
**目的:** 著者名を表示可能にする

**変更:**
- [src/pages/gallery.astro](src/pages/gallery.astro) にauthor表示追加

**検証:**
```bash
npm run dev
# galleryページでauthorが表示されることを確認
```

---

### PR-3: 対象フォルダ作成
**目的:** 画像配置場所の準備

**変更:**
- `public/uploads/gallery/books/` ディレクトリ作成（.gitkeep含む）
- 必要に応じてREADME配置

**検証:**
- ディレクトリ構造の確認

---

### PR-4: OCRスクリプト基盤
**目的:** OCR実行とmanifest生成

**変更:**
- `package.json` に tesseract.js 追加
- `scripts/lib/ocr.ts` 作成
- `scripts/ocr-gallery-images.ts` 作成
- `data/gallery-manifest.json` 出力

**検証:**
```bash
npm install
npm run gallery:ocr
# data/gallery-manifest.json が生成される
```

---

### PR-5: md生成スクリプト
**目的:** manifestからmd生成

**変更:**
- `scripts/lib/slug.ts` 作成
- `scripts/generate-gallery-md.ts` 作成
- `package.json` に `gallery:generate` script追加

**検証:**
```bash
npm run gallery:generate
# src/content/gallery/*.md が生成される
```

---

### PR-6: 統合と運用ドキュメント
**目的:** 全体の統合と文書化

**変更:**
- `package.json` に `gallery:sync`（OCR→md生成の統合）追加
- `docs/gallery-generation.md` 作成

**検証:**
```bash
npm run gallery:sync
# 一連の処理が実行される
```

---

## 6. 想定リスクと回避策

| リスク | 回避策 |
|--------|--------|
| OCR精度不足 | `needs_review: true` で必ず人間が確認 |
| 既存mdの上書き | デフォルトはスキップ、`--force`で明示的上書き |
| Decap CMSとの競合 | CMSで編集されたファイルは `generated_at` がないので判別可能 |
| 日本語slug問題 | hashベースのslugで回避 |
| 大量画像の処理時間 | 進捗表示、エラーハンドリング |

---

## 7. 実装タスクリスト（優先順）

1. **[config.ts]** author, needs_review, generated_at, source_file フィールドをschemaに追加
2. **[config.yml]** CMS設定に新フィールドのUI定義を追加
3. **[既存md]** 6つの既存mdファイルに空の新フィールドを追加
4. **[gallery.astro]** カード表示にauthorを追加
5. **[package.json]** tesseract.js をdependenciesに追加
6. **[scripts/lib/ocr.ts]** OCRコアロジック実装（Tesseract.jsラッパー）
7. **[scripts/lib/slug.ts]** slug生成ユーティリティ実装
8. **[scripts/ocr-gallery-images.ts]** OCR実行スクリプト実装
9. **[scripts/generate-gallery-md.ts]** md生成スクリプト実装
10. **[package.json]** npm scripts追加（gallery:ocr, gallery:generate, gallery:sync）
11. **[docs]** gallery-generation.md 作成（運用手順）

---

## 8. 生成されるファイル例

### manifest.json
```json
{
  "version": "1.0",
  "generatedAt": "2026-03-06T14:30:00Z",
  "images": [
    {
      "sourceFile": "386B93E0-C1A4-45D2-8DB8-DA24BA3F25F8.png",
      "ocrResult": {
        "title": "地図と拳",
        "author": "小川 芳樹",
        "confidence": 0.85
      },
      "generatedSlug": "novel-a1b2c3",
      "needsReview": true
    }
  ]
}
```

### 生成されるmdファイル
```markdown
---
title: "地図と拳"
image: "/uploads/gallery/books/386B93E0-C1A4-45D2-8DB8-DA24BA3F25F8.png"
genre: ""
author: "小川 芳樹"
needs_review: true
generated_at: "2026-03-06T14:30:00Z"
source_file: "386B93E0-C1A4-45D2-8DB8-DA24BA3F25F8.png"
note: ""
---

<!-- 自動生成されたファイルです。needs_review が true の場合は内容を確認してください。 -->
```

---

## 9. 検証計画

各PRで以下を確認:
```bash
# 型チェック
npm run build

# 開発サーバー
npm run dev

# galleryページ表示確認
# - タイトル表示
# - 著者名表示
# - カードレイアウト崩れなし

# OCR実行
npm run gallery:ocr
# manifest生成確認

# md生成
npm run gallery:generate
# mdファイル生成確認
# needs_review 判定確認
```

---

## 10. 将来的な拡張可能性

- Decap CMSでのgallery編集UI改善
- genre自動推定ロジックの追加
- 画像の自動リサイズ・最適化
- 外部API（Google Vision等）への切り替えオプション
