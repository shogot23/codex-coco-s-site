# Gallery Improvement Plan

## Context
ギャラリーページを「画像置き場」から「作品として回遊したくなる展示ページ」へ改善する。
現状は「仮データ」感が強く、カードをクリックしても遷移せず、reviews/videosとの導線もない。
Codexによる実装を前提とした計画。

**Codexレビュー反映版（2026-03-07）**

---

## 0. Design Principles

この計画は以下の原則に従う：

1. **BASE_URL 対応**: 内部リンクは `baseWithSlash` を使用、画像パスは `withBase()` を使用（既存パターン準拠）
2. **明示的公開フラグ**: サンプル除外は `published: boolean` で制御
3. **段階的詳細ページ**: 詳細ページはP1へ後退、まず一覧改善を優先
4. **型安全な関連付け**: reviews は `reference()` を使用
5. **モバイル優先**: 列数固定ではなく auto-fit を維持
6. **スコープ明確化**: videos導線は将来スコープ（今回は reviews 導線のみ実装）

---

## 1. Current State

### Files
| File | Description |
|------|-------------|
| [gallery.astro](src/pages/gallery.astro) | メインページ（ジャンル別セクション） |
| [config.ts](src/content/config.ts) | Content Collection スキーマ |
| [gallery/*.md](src/content/gallery/) | コンテンツファイル（9件：サンプル6件+本番3件） |
| [gallery-manifest.json](data/gallery-manifest.json) | OCR生成メタデータ |
| [gallery/books/*.png](public/uploads/gallery/books/) | 実画像（3枚） |

### Current Implementation
- ジャンル別（小説/ビジネス/歴史）にセクション分割
- カード：サムネイル(4:3) + タイトル + 著者 + note
- グリッド：`repeat(auto-fit, minmax(220px, 1fr))`
- **詳細ページなし** - カードは静的
- **クロスページ導線なし** - reviews/videosへのリンクがない
- **「仮データ」文言** がリード文に表示
- **モバイル最適化なし**

### Reusable Patterns
| Pattern | Source | Application |
|---------|--------|-------------|
| 詳細ページ（slug） | [reviews/[slug].astro](src/pages/reviews/[slug].astro) | ギャラリー詳細ページ |
| カードホバー | [index.astro](src/pages/index.astro) `.media-card` | 拡張カード効果 |
| パンくず | [reviews/[slug].astro](src/pages/reviews/[slug].astro) | 詳細ページナビ |
| JSON-LD | [SeoHead.astro](src/components/SeoHead.astro) | Gallery SEO |

---

## 2. Problems

1. **「仮データ」感** - リード文とサンプルコンテンツが未完成
2. **インタラクション不足** - カードクリックで何も起きない
3. **回遊導線欠如** - reviews/videosへの接続がない
4. **モバイル体験** - レスポンシブスタイル未最適化
5. **作品魅力不足** - 単なる画像リストでストーリーが伝わらない

---

## 3. Proposed Improvements

### P0 - Critical（一覧ページ品質向上）

#### 3.1 スキーマ拡張：明示的公開フラグ + 詳細ページ用フィールド
**File**: [config.ts](src/content/config.ts)

```typescript
import { reference, defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    genre: z.enum(GALLERY_GENRES).optional(),
    author: z.string().optional(),
    note: z.string().optional(),
    needs_review: z.boolean().optional(),
    generated_at: z.string().optional(),
    source_file: z.string().optional(),
    // NEW: 明示的公開フラグ
    published: z.boolean().default(false),
    // NEW: 詳細ページ用フィールド（Phase 1 で追加）
    description: z.string().optional(),
    // NEW: 型安全な関連付け（Phase 1 で追加）
    relatedReview: reference('reviews').optional(),
  }),
});
```

**※ `relatedVideoUrl` は将来スコープとし、今回はスキーマに含めない**

#### 3.2 共有セレクター・判定関数
**New File**: [src/utils/gallery.ts](src/utils/gallery.ts)

```typescript
import { getCollection, type CollectionEntry } from 'astro:content';

// 公開済みギャラリーアイテムのみ取得
export async function getPublishedGallery(): Promise<CollectionEntry<'gallery'>[]> {
  const all = await getCollection('gallery');
  return all.filter(entry => entry.data.published === true);
}

// 詳細ページ表示可能か判定（note/description いずれかがあれば true）
// ※ body のみのエントリは本文描画対応まで詳細ページ対象外とする
export function hasDetailContent(entry: CollectionEntry<'gallery'>): boolean {
  const { note, description } = entry.data;
  return !!(note || description);
}
```

#### 3.3 リード文更新
**File**: [gallery.astro](src/pages/gallery.astro)

```astro
<p class="lead">読書から生まれた情景を、ココちゃんと一緒に眺めるビジュアルギャラリー。</p>
```

#### 3.4 カードホバー効果
**File**: [gallery.astro](src/pages/gallery.astro) (styles)

```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0,0,0,.12);
}
.card:focus-within {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

#### 3.5 モバイル最適化（auto-fit維持）
**File**: [gallery.astro](src/pages/gallery.astro) (styles)

```css
/* auto-fit を維持し、最小幅のみ調整 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

@media (max-width: 600px) {
  .grid {
    gap: 12px;
  }
  .body {
    padding: 10px 12px;
  }
  .title {
    font-size: 0.95rem;
  }
}
```

#### 3.6 ホームページのギャラリーにも適用
**File**: [index.astro](src/pages/index.astro)

```typescript
// 変更前
const galleryEntries = await getCollection('gallery');

// 変更後
import { getPublishedGallery } from '../utils/gallery';
const galleryEntries = await getPublishedGallery();
```

---

### P1 - High Priority（詳細ページ・導線）

#### 3.7 詳細ページ作成
**New File**: [gallery/[slug].astro](src/pages/gallery/[slug].astro)

**前提条件**: `published: true` かつ `hasDetailContent()` が true のアイテムのみ詳細ページ生成

`reviews/[slug].astro` パターンを踏襲：
- **BASE_URL 対応**: `baseWithSlash` を使用
- 拡大画像表示
- タイトル、著者、ジャンルバッジ
- note/description（あれば）
- パンくずナビ（Gallery > タイトル）
- 「ギャラリーに戻る」リンク
- 関連コンテンツセクション（relatedReview がある場合のみ表示）

```astro
---
import { getPublishedGallery, hasDetailContent } from '../../utils/gallery';
import { getEntry } from 'astro:content';

export async function getStaticPaths() {
  const entries = await getPublishedGallery();
  // hasDetailContent() が true のものだけ詳細ページ生成
  return entries
    .filter(entry => hasDetailContent(entry))
    .map((entry) => ({
      params: { slug: entry.slug },
      props: { entry },
    }));
}

const { entry } = Astro.props;
const base = import.meta.env.BASE_URL;
const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
const galleryListUrl = `${baseWithSlash}gallery/`;

// 関連レビューを解決
let relatedReview = null;
if (entry.data.relatedReview) {
  relatedReview = await getEntry(entry.data.relatedReview);
}
---
```

#### 3.8 関連レビュー表示（解決済み）
**File**: [gallery/[slug].astro](src/pages/gallery/[slug].astro)

```astro
{relatedReview && (
  <div class="related-section">
    <h3>関連レビュー</h3>
    <a href={`${baseWithSlash}reviews/${relatedReview.slug}/`}>
      {relatedReview.data.title}
    </a>
  </div>
)}
```

#### 3.9 カードクリック対応（条件付き）
**File**: [gallery.astro](src/pages/gallery.astro)

詳細ページがあるアイテムのみリンク化：
```astro
---
import { getPublishedGallery, hasDetailContent } from '../utils/gallery';
const galleryEntries = await getPublishedGallery();
---

{galleryEntries.map((entry) => {
  const hasDetail = hasDetailContent(entry);
  const CardContent = (
    <article class="card">
      <div class="thumb">
        <img src={withBase(entry.data.image)} alt={entry.data.title} loading="lazy" decoding="async" width="400" height="300" />
      </div>
      <div class="body">
        <div class="title">{entry.data.title}</div>
        {entry.data.author && <div class="meta">著者: {entry.data.author}</div>}
        {entry.data.note && <div class="meta">{entry.data.note}</div>}
      </div>
    </article>
  );

  return hasDetail ? (
    <a href={`${baseWithSlash}gallery/${entry.slug}/`} class="card-link">{CardContent}</a>
  ) : (
    CardContent
  );
})}
```

#### 3.10 ジャンルフィルターUI
**File**: [gallery.astro](src/pages/gallery.astro)

クライアントサイドフィルター追加：
- フィルターボタン：`[すべて] [小説] [ビジネス] [歴史]`
- `data-genre` 属性でフィルタリング
- URLハッシュ対応（`#genre=小説`）

---

### P1.5 - コンテンツ充実（詳細ページ前提条件）

#### 3.12 既存本番データへの詳細コンテンツ追加
**Files**: [src/content/gallery/*.md](src/content/gallery/)

現行の本番3件に `description` を追加し、詳細ページ生成条件を満たす：

```markdown
---
title: "自分の弱さを知る"
image: "/uploads/gallery/books/25B729D0-663F-4C9D-A426-4B295EEB8B4E.png"
genre: "ビジネス"
author: "野口聡一 / 大江麻理子"
published: true
description: "元JAXA宇宙飛行士・野口聡一氏と、ジャーナリスト・大江麻理子氏による対談形式のビジネス書。失敗から学ぶ組織作りとリーダーシップについて語る。"
---
```

※ `relatedReview` は対応するレビューが存在する場合のみ追加

---

### P2 - Nice to Have

#### 3.11 画像ライトボックス
詳細ページでのクリック拡大表示

#### 3.12 ソート機能
日付・タイトル順

#### 3.13 Masonryレイアウト
Pinterest風レイアウト（現状4:3固定なので優先度低）

---

## 4. Priorities

| Priority | Items |
|----------|-------|
| **P0** | スキーマ拡張（published）、共有セレクター、リード文更新、ホバー効果、モバイル最適化（auto-fit維持）、index.astro適用 |
| **P1** | 詳細ページ（条件付き）、カードリンク化（条件付き）、型安全な関連付け、クロスページ導線、ジャンルフィルター |
| **P2** | ライトボックス、ソート、Masonry |

---

## 5. File-Level Impact

### Modified Files
| File | Changes |
|------|---------|
| [src/content/config.ts](src/content/config.ts) | `published`, `description`, `relatedReview` (reference), `relatedVideoUrl` 追加 |
| [src/pages/gallery.astro](src/pages/gallery.astro) | getPublishedGallery使用、リード文、ホバー効果、条件付きカードリンク、モバイルCSS |
| [src/pages/index.astro](src/pages/index.astro) | getPublishedGallery使用 |

### New Files
| File | Purpose |
|------|---------|
| [src/utils/gallery.ts](src/utils/gallery.ts) | 公開済みギャラリー取得の共有セレクター |
| [src/pages/gallery/[slug].astro](src/pages/gallery/[slug].astro) | ギャラリー詳細ページ（P1） |

### Content Files to Update
| File | Changes |
|------|---------|
| [src/content/gallery/business-143c24.md](src/content/gallery/business-143c24.md) | `published: true`, `description` 追加 |
| [src/content/gallery/novel-9868be.md](src/content/gallery/novel-9868be.md) | `published: true`, `description` 追加 |
| [src/content/gallery/business-b995fd.md](src/content/gallery/business-b995fd.md) | `published: true`, `description` 追加 |

---

## 6. Recommended Implementation Order

### Phase 1: Foundation (P0) - 一覧品質向上
**※ 同一コミット/変更セットで実施して一時的な空一覧を回避**

1. **config.ts**: `published`, `description`, `relatedReview` (reference), `relatedVideoUrl` フィールド追加
2. **utils/gallery.ts**: `getPublishedGallery()`, `hasDetailContent()` 作成
3. **content/gallery/*.md**: 本番データ3件に `published: true` 追加
4. **gallery.astro**: getPublishedGallery 使用、リード文更新
5. **gallery.astro**: ホバー効果追加
6. **gallery.astro**: モバイル最適化（auto-fit維持）
7. **index.astro**: getPublishedGallery 使用

### Phase 2: Enhancement (P1) - 詳細ページ・導線
8. **content/gallery/*.md**: 本番データ3件に `description` 追加
9. **gallery/[slug].astro**: 詳細ページ作成（条件付き生成、`getEntry()` で関連解決）
10. **gallery.astro**: 条件付きカードリンク化（`hasDetailContent()` 使用）
11. **gallery.astro**: ジャンルフィルターUI追加

---

## 7. Verification

### Test Cases
- [ ] ギャラリー一覧で `published: false` のサンプルが非表示
- [ ] ホームの Latest Gallery でも同様にサンプルが非表示
- [ ] ホバー効果が動作（translateY, box-shadow）
- [ ] モバイルでカード幅が可読範囲（180px以上）
- [ ] 詳細ページが `hasDetailContent()` が true のアイテムのみ生成される
- [ ] 詳細ページのリンクが BASE_URL 対応（baseWithSlash 使用）
- [ ] パンくずナビで一覧へ戻る
- [ ] 関連レビューリンクが表示される（relatedReview がある場合、`getEntry()` で解決済み）
- [ ] 本番データ3件に `description` が追加され、詳細ページが生成される

### Commands
```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド確認
npm run preview  # 本番プレビュー
```

---

## 8. Codex Review Notes

### 2026-03-07 Review Round 1

| # | Severity | Problem | Resolution |
|---|----------|---------|------------|
| 1 | blocking | `href={/gallery/${slug}/}` が BASE_URL 非対応 | `baseWithSlash` 使用に修正 |
| 2 | blocking | `image.includes('placeholder')` は壊れやすい | 明示的 `published: boolean` フラグを追加 |
| 3 | blocking | 詳細ページP0は内容が薄い | P1へ後退、条件付き生成に変更 |
| 4 | blocking | `relatedReviewSlug: z.string()` は型安全でない | `reference('reviews')` 使用に変更 |
| 5 | major | 600px以下で強制2カラムは退行 | auto-fit/minmax 維持に変更 |

### 2026-03-07 Review Round 2

| # | Severity | Problem | Resolution |
|---|----------|---------|------------|
| 1 | blocking | 詳細判定が `note` のみで `description` が考慮されていない | `hasDetailContent()` 共通関数化 |
| 2 | blocking | 本番データ3件に `description` 追加タスクがない | Phase P1.5 として追加 |
| 3 | blocking | `relatedReview` の解決に `getEntry()` が使われていない | `getEntry()` で解決し `slug` 使用に修正 |

### 2026-03-07 Review Round 3

| # | Severity | Problem | Resolution |
|---|----------|---------|------------|
| 1 | blocking | `hasDetailContent()` が `description` を参照するが、schema追加は Phase 2 | すべての新規フィールドを Phase 1 に前倒し |

### Non-blocking Notes (Round 3 & 4)
- `card-link` に `display: block` とキーボードフォーカス表示が必要（`a.card-link:focus` で対応）
- 新規詳細ページの画像URLも BASE_URL 配下で解決されることを確認
- body-only エントリは本文描画対応まで詳細ページ対象外とする

### 2026-03-07 Review Round 4

| # | Severity | Problem | Resolution |
|---|----------|---------|------------|
| 1 | blocking | `hasDetailContent()` が `body` を条件に含めるが、詳細ページ仕様に本文描画がない | 生成条件から `body` を除外（`note || description` のみ） |

### 次回レビュー確認事項
- [ ] `getPublishedGallery()` が gallery.astro, index.astro で共通利用
- [ ] `hasDetailContent()` が `note || description` を判定（body は除外）
- [ ] すべての内部リンクが BASE_URL 対応
- [ ] `getEntry(entry.data.relatedReview)` で関連解決
- [ ] 本番データ3件に `description` が追加される
