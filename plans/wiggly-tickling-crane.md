# Gallery CMS Fields Plan

## 1. Current State

### Astro Schema (src/content/config.ts)
```typescript
const gallery = defineCollection({
  schema: z.object({
    // CMS 既存
    title: z.string(),
    image: z.string(),
    genre: z.enum(GALLERY_GENRES).optional(),
    author: z.string().optional(),
    note: z.string().optional(),
    needs_review: z.boolean().optional(),
    generated_at: z.string().optional(),
    source_file: z.string().optional(),
    // CMS 未定義
    published: z.boolean().default(false),
    description: z.string().optional(),
    relatedReview: reference('reviews').optional(),
  }),
});
```

### CMS Config (public/admin/config.yml)
- gallery collection の fields に `published`, `description`, `relatedReview` が**未定義**
- reviews collection は `title`, `description`, `date`, `cover`, `body` を定義
- relation widget は現在使用されていない

### 既存コンテンツの状況
- gallery: 9件（一部は `published: true` / `description` を既に持つ）
- reviews: 1件（`first-review.md`）

---

## 2. Problems

| Problem | Impact |
|---------|--------|
| `published` が CMS 未定義 | CMS から公開/非公開制御ができない |
| `description` が CMS 未定義 | SEO 用説明文・一覧表示用テキストが CMS で入力できない |
| `relatedReview` が CMS 未定義 | 関連書評の紐付けが CMS でできない |

---

## 3. Proposed Changes

### 変更対象ファイル
**単一ファイル**: `public/admin/config.yml`

### 追加フィールド定義

#### P0: published (boolean)
```yaml
- { label: "公開状態", name: "published", widget: "boolean", required: false, default: false }
```

#### P0: description (text)
```yaml
- label: "説明文"
  name: "description"
  widget: "text"
  required: false
  hint: "詳細ページの説明文・SEO用。未入力の場合は「メモ」が代用されます。"
```

#### P1: relatedReview (relation)
```yaml
- label: "関連書評"
  name: "relatedReview"
  widget: "relation"
  collection: "reviews"
  value_field: "{{slug}}"
  search_fields: ["title"]
  display_fields: ["title"]
  required: false
```

### 挿入位置
`source_file` の直後、`body` の直前（L63-64 の間）

### relation widget の妥当性（Codex レビューで確認済み）
- Decap CMS 3.x では `value_field: "{{slug}}"` のテンプレート形式が正しい
- Astro の `reference('reviews')` は slug（ファイル名）で解決
- `{{slug}}` で保存された値は `relatedReview: first-review` の形式になり、Astro 側で正常に解決される

---

## 4. Codex レビュー結果

### Blocking Issues（修正済み）
| Issue | 対応 |
|-------|------|
| `value_field: "slug"` は Decap CMS 3.x で動作しない | `value_field: "{{slug}}"` に修正 |

### Advisory Issues（対応方針）
| Issue | 対応 |
|-------|------|
| 未選択時の空文字列問題 | 検証手順に追加。問題あれば schema 側で `z.preprocess` 対応 |
| note/description の使い分けが不明確 | hint を追加して用途を明確化 |

### 参照仕様
- https://decapcms.org/docs/widgets/relation/ （`{{slug}}` と relation widget の default）
- https://decapcms.org/docs/configuration-options/ （YAML の block/inline 混在可）

---

## 5. Priorities

| Priority | Field | Rationale |
|----------|-------|-----------|
| **P0** | `published` | 公開制御の核。現状 CMS から変更不可 |
| **P0** | `description` | `hasDetailContent()` の条件、SEO にも影響 |
| **P1** | `relatedReview` | UX 向上。relation widget で誤入力防止 |

---

## 6. Parallelization Decision

**並列実行しない（順次実行）**

理由:
1. 変更対象ファイルが `config.yml` のみ
2. フィールド追加は一括追加が最も安全
3. この小タスクでは並列化のメリットがない

---

## 7. File-Level Impact

| File | Change | Impact |
|------|--------|--------|
| `public/admin/config.yml` | gallery fields に 3 フィールド追加 | **直接変更** |
| `src/content/config.ts` | なし（空文字問題があれば後続で対応） | 参照のみ |
| `src/content/gallery/*.md` | 新規フィールド追加時は frontmatter 更新 | CMS 経由で自動 |
| `src/pages/gallery/[slug].astro` | なし | 動作確認のみ |

---

## Implementation

### 差分イメージ

```diff
 # public/admin/config.yml (gallery collection)
 fields:
   - { label: "タイトル", name: "title", widget: "string" }
   - { label: "画像", name: "image", widget: "image" }
   - { label: "ジャンル", name: "genre", widget: "select", options: ["小説", "ビジネス", "歴史"], required: false }
   - { label: "著者", name: "author", widget: "string", required: false }
-  - { label: "メモ", name: "note", widget: "string", required: false }
+  - label: "メモ"
+    name: "note"
+    widget: "string"
+    required: false
+    hint: "簡易メモ。説明文が未入力の場合に一覧表示で代用されます。"
   - { label: "要確認", name: "needs_review", widget: "boolean", required: false, default: false }
   - { label: "自動生成日時", name: "generated_at", widget: "string", required: false }
   - { label: "元画像ファイル", name: "source_file", widget: "string", required: false }
+  - { label: "公開状態", name: "published", widget: "boolean", required: false, default: false }
+  - label: "説明文"
+    name: "description"
+    widget: "text"
+    required: false
+    hint: "詳細ページの説明文・SEO用。未入力の場合は「メモ」が代用されます。"
+  - label: "関連書評"
+    name: "relatedReview"
+    widget: "relation"
+    collection: "reviews"
+    value_field: "{{slug}}"
+    search_fields: ["title"]
+    display_fields: ["title"]
+    required: false
   - { label: "本文", name: "body", widget: "markdown", required: false }
```

### Verification Steps

1. `npm run dev` で開発サーバー起動
2. `http://localhost:4321/admin` にアクセス
3. gallery エントリを編集し、3フィールドが表示されることを確認
4. `published` を true/false で切り替え、一覧表示に反映されるか確認
5. `description` を入力し、詳細ページのメタデータに反映されるか確認
6. **空文字列検証**: `relatedReview` を未選択のまま保存し、frontmatter に何が出力されるか確認
   - `relatedReview:` なし（理想）
   - `relatedReview: ""`（問題あり → schema 側で preprocess 対応）
7. `relatedReview` で reviews エントリを選択し、`relatedReview: first-review` 形式で保存されるか確認
8. 詳細ページで関連書評リンクが正しく表示されるか確認
