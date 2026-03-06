# コード改善スキャン計画

## Context

ユーザーは code-improvement-scanner エージェントを使用して、この Astro プロジェクト全体のコード品質改善提案を受け取りたいと考えています。

このプロジェクトは「読書 with Coco」というポートフォリオ/ブログサイトで、Astro 5.17.1 を使用しています。主な特徴：
- 6 つのページ（index, about, gallery, profile, reviews, videos）
- Content Collections によるコンテンツ管理
- ダークテーマのインライン CSS スタイリング
- GitHub Pages へのデプロイ

## スキャン戦略

### 段階的スキャン（3回に分ける）

#### スキャン 1: index.astro（最優先）
- **対象**: `src/pages/index.astro` (710行)
- **焦点**:
  - CSS 分離（450行以上のインラインCSS）
  - ユーティリティ関数の抽出（`isAbsoluteUrl`, `withBase`, `resolvePublicAsset`, `clampText`, `formatReviewDate`）
  - 空のエラーハンドリング（行 78-81）
  - 画像最適化（Astro `<Image />` コンポーネントの使用）

#### スキャン 2: Layout.astro + データ層
- **対象**:
  - `src/layouts/Layout.astro` (63行)
  - `src/data/gallery.ts` (36行)
  - `src/data/videos.ts` (13行)
  - `src/data/reviews.ts` (19行)
- **焦点**:
  - SEO 改善（OGP, Twitter Card, description）
  - CSS 変数によるテーマ管理
  - 型安全性と拡張性
  - 共通パターンの特定

#### スキャン 3: その他のページ
- **対象**: gallery.astro, videos.astro, reviews.astro, profile.astro, about.astro
- **焦点**:
  - コードの一貫性
  - アクセシビリティ改善
  - 共通化されたパターンの適用

## 改善カテゴリ

| カテゴリ | 主な項目 |
|---------|---------|
| **読みやすさ** | マジックナンバーの定数化、変数名の改善、CSS分離 |
| **パフォーマンス** | 画像最適化、日付フォーマットの共通化、ソート処理の統一 |
| **ベストプラクティス** | エラーハンドリング改善、型安全性、アクセシビリティ、SEO |

## 実行フロー

```
1. code-improvement-scanner を index.astro に対して起動
2. 結果をユーザーに提示
3. ユーザーの承認/修正指示
4. スキャン 2: レイアウト + データ層
5. 結果をユーザーに提示
6. ユーザーの承認/修正指示
7. スキャン 3: その他のページ
8. 最終サマリーを提示
```

## Critical Files

- [src/pages/index.astro](src/pages/index.astro) - 最も複雑で改善ポイント最多
- [src/layouts/Layout.astro](src/layouts/Layout.astro) - 全ページの基盤
- [src/data/gallery.ts](src/data/gallery.ts) - データ層の型定義パターン
- [src/content/config.ts](src/content/config.ts) - Content Collections スキーマ

## Verification

各スキャン完了後：
1. 提示された改善案を確認
2. 必要に応じて `npm run dev` で開発サーバーを起動し動作確認
3. `npm run build` でビルドが成功することを確認
4. `npm run typecheck` で型エラーがないことを確認
