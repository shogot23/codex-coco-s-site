# 読書サイト「読書 with Coco」改修プラン

> 対象サイト: https://shogot23.github.io/codex-coco-s-site/
> 技術スタック: Astro 5.17.1 + TypeScript + GitHub Pages + Decap CMS

---

## A. エグゼクティブサマリー

本プランは、Astro製読書サイト「読書 with Coco」を見た目・導線・速度・SEO・運用性の観点でグレードアップする改修計画である。主な課題は、(1) データ管理の二重構造、(2) SEO基盤の完全欠如、(3) Reviews詳細ページの不在、(4) 画像最適化未実装。6本の段階的PRにより、最小差分・壊さない・Codex Review Gate通過を原則とし、最終的にCMS運用・SEO対応・UX向上を一体的に実現する。各PRにはcodex-reviewスキルによる品質ゲートを組み込み、High指摘は必ず解消してからマージする。

---

## B. 現状の課題リスト

### High（最優先）

| ID | 課題 | 影響範囲 | 現状 |
|---|---|---|---|
| H1 | **Reviews詳細ページ未実装** | 導線・CMS価値 | Content Collectionにreviews存在するが一覧のみ。`[slug].astro`なし |
| H2 | **OGP/meta tags 未設定** | SEO・SNS拡散 | Layout.astroにtitleのみ。description/OGP/Twitter Cardなし |
| H3 | **sitemap.xml / robots.txt 未生成** | SEO | astro.config.mjsにsitemap integrationなし |
| H4 | **データソースの二重管理** | 運用性・保守性 | `data/reviews.ts`と`content/reviews/*.md`が混在 |

### Medium

| ID | 課題 | 影響範囲 | 現状 |
|---|---|---|---|
| M1 | Gallery/VideosのContent Collection未対応 | CMS運用 | `data/*.ts`にハードコード（サンプルのみ） |
| M2 | 画像最適化未導入 | パフォーマンス | `@astrojs/image`未使用。lazy loading部分的 |
| M3 | 構造化データ（JSON-LD）なし | SEO・リッチスニペット | 実装なし |
| M4 | ページネーション・前後リンクなし | 回遊性 | Reviews一覧にのみ「もっと見る」リンク |

### Low

| ID | 課題 | 影響範囲 | 現状 |
|---|---|---|---|
| L1 | About/Profileページが最小構成 | UX | 箇条書き程度 |
| L2 | ナビゲーションにAbout/Profileリンクなし | 導線 | Home/Gallery/Videos/Reviewsの4項目のみ |
| L3 | CI/DeployのNodeバージョン不整合リスク | 将来 | ワークフロー確認必要 |

---

## C. 改修ロードマップ

```
フェーズ0: 基盤整備（PR#1）
    └── sitemap/robots + CI統一 + 基本meta強化
         ↓
フェーズ1: Reviews統合（PR#2）
    └── 詳細ページ実装 + Content Collection一本化
         ↓
フェーズ2: SEO強化（PR#3）
    └── OGP + JSON-LD + canonical
         ↓
フェーズ3: Gallery/Videos CMS化（PR#4）
    └── Content Collection拡張 + CMS設定更新
         ↓
フェーズ4: パフォーマンス最適化（PR#5）
    └── 画像最適化 + WebP + 遅延読み込み
         ↓
フェーズ5: UX・導線改善（PR#6）
    └── ナビゲーション拡張 + About/Profile強化
```

| フェーズ | 期待効果 |
|---------|---------|
| 0 | SEO基盤確立、CI一貫性、検索エンジンインデックス対応 |
| 1 | CMS運用価値発揮、書評への深い導線、回遊性向上 |
| 2 | SNSシェア最適化、リッチスニペット、検索表示改善 |
| 3 | 全コンテンツのCMS一元管理、運用フロー統一 |
| 4 | LCP/CLS改善、Core Web Vitals向上、モバイル体験向上 |
| 5 | サイト回遊性最大化、ブランド体験統一 |

---

## D. PR分割計画（全6本）

### 依存関係DAG

```
PR#1 (基盤整備)
  │
  ├──→ PR#2 (Reviews詳細) ──→ PR#3 (SEO強化)
  │                              │
  │                              └──→ PR#5 (画像最適化)
  │
  └──→ PR#4 (Gallery/Videos CMS化)
              │
              └──→ PR#5 (画像最適化)
                        │
                        └──→ PR#6 (UX改善)
```

**並列可能**: PR#2 と PR#4 は独立して並行作業可能
**順序必須**: PR#1 → PR#2/PR#4 → PR#3/PR#5 → PR#6

---

### PR#1: 基盤整備（sitemap/robots/meta/CI統一）

**目的**: SEO基盤とCI一貫性を確立する

**触る範囲**:
```
astro.config.mjs          # @astrojs/sitemap追加
src/layouts/Layout.astro  # 基本meta tags追加（description）
public/robots.txt         # 新規作成
.github/workflows/*.yml   # Node 20統一（必要に応じて）
```

**受け入れ条件**:
- [ ] `npm run build` 後に `dist/sitemap-index.xml` が生成される
- [ ] `/robots.txt` がアクセス可能
- [ ] 全ページに `<meta name="description">` が設定される
- [ ] `npm run typecheck` 成功
- [ ] `npm run build` 成功

**想定リスク**: Low - sitemap生成時のbase path設定ミス → astro.config.mjsの`site`/`base`確認必須

**テスト手順**:
1. `npm run build && ls dist/ | grep sitemap`
2. ローカルサーバーで `/robots.txt` を確認
3. 各ページHTMLソースでmeta description確認

**Codex Review Gate**:
```
タイミング: PR作成後、merge前
実行方法: codex-reviewスキルを使用
レビュー観点:
  - astro.config設定の正確性
  - meta tags妥当性
  - CI/CD設定の整合性

手順:
1. 実装完了後、ローカルテスト実施
2. Skillツールで codex-review を起動
3. レビュー指摘を重大度（High/Med/Low）で分類
4. High指摘は必ず修正
5. 修正後に再レビューでHigh解消確認
6. PR本文にレビュー結果と対応内容を記録
```

---

### PR#2: Reviews詳細ページ実装 + Content Collection一本化

**目的**: reviewsをContent Collectionに統一し、詳細ページでCMSの価値を発揮

**依存**: PR#1

**触る範囲**:
```
src/pages/reviews/[slug].astro    # 新規作成（動的ルーティング）
src/pages/reviews.astro           # Content Collection参照に変更
src/data/reviews.ts               # 削除またはdeprecation comment
src/content/config.ts             # schema拡張（tags等）
public/admin/config.yml           # reviewsコレクション調整
```

**受け入れ条件**:
- [ ] `/reviews/first-review/` で詳細ページが表示される
- [ ] reviews.astroがContent Collectionからデータ取得
- [ ] 詳細ページに本文・日付・カバー画像が表示
- [ ] 一覧→詳細の導線が機能
- [ ] `npm run typecheck` 成功

**想定リスク**: Medium - slug生成ロジック、既存data.ts削除時のインポートエラー

**テスト手順**:
1. `npm run dev` で `/reviews/` 一覧確認
2. 各レビューカードから詳細ページへ遷移
3. CMS（Decap）で新規レビュー作成→詳細ページ生成確認

**Codex Review Gate**:
```
タイミング: 実装完了後、PR作成前
実行方法: codex-reviewスキルを使用
レビュー観点:
  - getStaticPaths実装の正確性
  - slug安全性（特殊文字対応）
  - 型整合性（Content Collection schema）
  - CMS configとの整合性

手順:
1. 実装完了後、ローカルで動作確認
2. codex-reviewスキル起動
3. High指摘を修正
4. 再レビューでクリア確認
5. PR作成、本文にレビュー結果記載
```

---

### PR#3: SEO強化（OGP/JSON-LD/canonical）

**目的**: SNSシェア・検索エンジン最適化

**依存**: PR#2

**触る範囲**:
```
src/layouts/Layout.astro          # OGP tags + canonical + JSON-LD
src/components/SeoHead.astro      # 新規作成（SEOコンポーネント化）
src/pages/index.astro             # 個別OGP画像設定
src/pages/reviews/[slug].astro    # 動的OGP（本のタイトル等）
```

**受け入れ条件**:
- [ ] 全ページに `og:title`, `og:description`, `og:image`, `og:url` が設定
- [ ] **ページ個別OGP画像**: Reviews詳細等で各ページ固有のOGP画像を設定可能
- [ ] Twitter Card（summary_large_image）対応
- [ ] Reviews詳細ページにArticle構造化データ（JSON-LD）
- [ ] canonical URL設定
- [ ] Lighthouse SEO スコア 90+

**想定リスク**: Medium - OGP画像のパス解決（base path考慮）

**テスト手順**:
1. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) で確認
2. [Twitter Card Validator](https://cards-dev.twitter.com/validator) で確認
3. [Google Rich Results Test](https://search.google.com/test/rich-results) で構造化データ確認
4. Lighthouse SEO監査

**Codex Review Gate**:
```
タイミング: 実装完了後
実行方法: codex-reviewスキルを使用
レビュー観点:
  - OGP画像パスの正確性（base path考慮）
  - JSON-LD schema.org準拠
  - meta重複排除
  - canonical URL一意性

手順:
1. 実装完了後、codex-reviewスキル起動
2. 各種バリデータでの手動テスト実施
3. High指摘修正→再レビュー
4. テスト結果をPRコメントに記載
```

---

### PR#4: Gallery/Videos CMS化

**目的**: Gallery/VideosもContent Collection対応で運用フロー統一

**依存**: PR#1（PR#2と並行可能）

**触る範囲**:
```
src/content/gallery/.gitkeep      # 新規ディレクトリ
src/content/gallery/*.md          # サンプルデータ作成
src/content/videos/.gitkeep       # 新規ディレクトリ
src/content/videos/*.md           # サンプルデータ作成
src/content/config.ts             # gallery/videos collection追加
src/pages/gallery.astro           # Content Collection参照に変更
src/pages/videos.astro            # Content Collection参照に変更（YouTube埋め込み対応）
src/data/gallery.ts               # 削除またはdeprecation
src/data/videos.ts                # 削除またはdeprecation
public/admin/config.yml           # gallery/videos collection追加
```

**受け入れ条件**:
- [ ] GalleryがContent Collectionからデータ取得
- [ ] **Gallery固定ジャンル**: 歴史/ビジネス/小説等の固定ジャンルリストでフィルタリング
- [ ] VideosがContent Collectionからデータ取得
- [ ] **Videos外部埋め込み**: YouTube/Instagram URL指定で埋め込み表示対応
- [ ] CMSでGallery/Videosの新規作成・編集が可能
- [ ] 既存表示と同等のUI
- [ ] `npm run typecheck` 成功

**想定リスク**: Medium - Galleryのジャンル分類ロジック（schema設計必要）

**テスト手順**:
1. `npm run dev` でGallery/Videosページ表示確認
2. CMSでGallery新規追加→ページ反映確認
3. CMSでVideo新規追加→ページ反映確認

**Codex Review Gate**:
```
タイミング: 実装完了後
実行方法: codex-reviewスキルを使用
レビュー観点:
  - Content Collection schema設計
  - CMS config整合性
  - Galleryのジャンルフィルタリング実装
  - 既存UIとの互換性

手順:
1. 実装完了後、codex-reviewスキル起動
2. High指摘修正
3. CMS操作テスト実施
4. 再レビューでクリア確認
```

---

### PR#5: パフォーマンス最適化（画像）

**目的**: 画像読み込み高速化・Core Web Vitals改善

**依存**: PR#2 または PR#4

**触る範囲**:
```
astro.config.mjs                  # 画像サービス設定
src/pages/index.astro             # <Image />コンポーネント使用
src/pages/gallery.astro           # 画像最適化
src/pages/videos.astro            # 画像最適化
src/pages/reviews/[slug].astro    # カバー画像最適化
```

**受け入れ条件**:
- [ ] 全画像に `loading="lazy"` または `loading="eager"` 明示
- [ ] 画像に `width`/`height` 属性設定（CLS防止）
- [ ] WebP自動変換（Astro 5の画像サービス活用）
- [ ] Lighthouse Performance スコア改善（目標90+）

**想定リスク**: High - 多数のファイル変更、画像パスの相対/絶対パス混在

**テスト手順**:
1. `npm run build` で画像最適化確認
2. Chrome DevTools LighthouseでPerformance計測
3. Network パネルでWebP配信確認
4. モバイル表示確認

**Codex Review Gate**:
```
タイミング: 実装完了後
実行方法: codex-reviewスキルを使用
レビュー観点:
  - 画像パス解決の正確性
  - width/height設定（CLS防止）
  - loading属性の適切な使い分け
  - パフォーマンス指標

手順:
1. 実装完了後、codex-reviewスキル起動
2. LighthouseスコアをPRコメントに記載
3. High指摘修正→再レビュー
4. ビルド成果物の画像確認
```

---

### PR#6: UX・導線改善

**目的**: ナビゲーション・About/Profile強化

**依存**: PR#5

**触る範囲**:
```
src/layouts/Layout.astro          # navItemsにAbout/Profile追加
src/pages/about.astro             # コンテンツ充実
src/content/about/about.md        # 新規（CMS対応）
src/content/config.ts             # about collection追加
public/admin/config.yml           # about collection追加
```

**受け入れ条件**:
- [ ] ヘッダーナビゲーションにAbout/Profileリンク追加
- [ ] AboutページがCMS編集可能
- [ ] モバイルでもナビゲーションが適切に表示
- [ ] `npm run typecheck` 成功

**想定リスク**: Low - ナビゲーション項目増加時のモバイルレイアウト

**テスト手順**:
1. ヘッダーからAbout/Profileへ遷移確認
2. CMSでAbout編集→反映確認
3. モバイル幅（375px）でナビゲーション確認

**Codex Review Gate**:
```
タイミング: 実装完了後
実行方法: codex-reviewスキルを使用
レビュー観点:
  - ナビゲーションアクセシビリティ
  - モバイル対応
  - CMS編集フロー

手順:
1. 実装完了後、codex-reviewスキル起動
2. High指摘修正
3. 再レビューでクリア確認
4. マージ準備完了
```

---

## E. 計測・検証手順

### ビルド検証
```bash
npm run typecheck  # 型チェック
npm run build      # 本番ビルド
npm run preview    # ローカルプレビュー
```

### SEO検証ツール
| ツール | 用途 | URL |
|-------|-----|-----|
| Google Search Console | インデックス登録確認 | https://search.google.com/search-console |
| Facebook Sharing Debugger | OGP確認 | https://developers.facebook.com/tools/debug/ |
| Twitter Card Validator | Twitter Card確認 | https://cards-dev.twitter.com/validator |
| Google Rich Results Test | 構造化データ確認 | https://search.google.com/test/rich-results |

### パフォーマンス検証
- Chrome DevTools Lighthouse（Performance, Accessibility, Best Practices, SEO）
- PageSpeed Insights（Mobile/Desktop）
- Core Web Vitals（LCP, CLS, FID）

### CMS検証
1. `/admin/` にアクセス
2. 各collectionの新規作成・編集・公開フロー確認
3. Git Gateway経由でのコミット確認

---

## F. 確認事項と仮定

### 確認済み（ユーザー回答）

1. **OGP画像**: ページ個別設定（各Reviews詳細等で個別OGP画像を設定）
2. **Galleryのジャンル設計**: 固定リスト（歴史/ビジネス/小説等）
3. **Videosの外部埋め込み**: あり（YouTube/Instagram等の埋め込み対応必要）

### 残る仮定

1. **データ移行**: 既存の`data.ts`サンプルデータは削除してContent Collectionに移行
2. **CMS運用**: Decap CMS（旧Netlify CMS）を継続利用
3. **デプロイ**: GitHub Pagesを継続利用
4. **多言語**: 日本語のみ（i18n対応なし）
5. **Webフォント**: システムフォント継続（Google Fonts導入は別途検討）

---

## 衝突警告箇所

| ファイル | PR間 | 衝突内容 | 対策 |
|---------|-----|---------|-----|
| `astro.config.mjs` | PR#1, PR#5 | integration追加順序 | PR#1で基礎作成、PR#5で追記 |
| `src/layouts/Layout.astro` | PR#1, PR#3, PR#6 | meta tags/navItems | PR#3でSEOコンポーネント化、PR#6でnavItems更新 |
| `src/content/config.ts` | PR#2, PR#4, PR#6 | collection追加 | 各PRで段階追加、コンフリクト時は手動マージ |
| `public/admin/config.yml` | PR#2, PR#4, PR#6 | collections追加 | 各PRで追記、YAMLインデント注意 |

---

## PRテンプレート（Codex Review記載用）

```markdown
## 概要
<!-- 変更の目的と背景 -->

## 変更内容
<!-- 具体的な変更点 -->

## テスト手順
1.
2.

## チェックリスト
- [ ] `npm run typecheck` 成功
- [ ] `npm run build` 成功
- [ ] ローカル動作確認済み
- [ ] Codex Review 実施済み

## Codex Review 結果

### 1回目レビュー
- 実施日: YYYY-MM-DD
- 指摘件数: High X件 / Med Y件 / Low Z件

### 指摘対応
| 重大度 | 内容 | 対応 |
|-------|-----|-----|
| High | xxx | 修正済み（commit hash） |

### 2回目レビュー（確認）
- 実施日: YYYY-MM-DD
- 結果: High指摘なし / クリア確認
```

---

## タイムライン目安

| 週 | 作業内容 |
|----|---------|
| Week 1 | PR#1: 基盤整備 |
| Week 2 | PR#2: Reviews詳細 + PR#3: SEO/OGP基盤（並行） |
| Week 3 | PR#4: Gallery/Videos CMS化 + PR#5: 構造化データ（並行） |
| Week 4 | PR#6: 画像最適化 + 総合テスト |

---

## Critical Files（実装時参照）

| ファイル | 用途 |
|---------|-----|
| [astro.config.mjs](astro.config.mjs) | sitemap integration、base path設定、画像サービス設定 |
| [src/layouts/Layout.astro](src/layouts/Layout.astro) | 全ページ共通のmeta tags、ナビゲーション、SEO基盤 |
| [src/content/config.ts](src/content/config.ts) | Content Collection schema定義、型安全性の中核 |
| [src/pages/reviews.astro](src/pages/reviews.astro) | Reviews一覧ページ、Content Collection移行のパターン |
| [public/admin/config.yml](public/admin/config.yml) | Decap CMS設定、運用フローの要 |
