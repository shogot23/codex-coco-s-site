# Test Cases

## Task

- task-id: `TASK-remove-videos-2026-08-12`
- related plan: `docs/tasks/TASK-remove-videos-2026-08-12/plan.md`

## Must Check

- [x] Videos route、content collection、legacy data、public assets、専用tooling、CMS entry、package依存が削除される
- [x] `src/content/config.ts`にvideos collection定義・exportが残らない
- [x] グローバルナビに動画導線がなく、レビューが先、ギャラリーが次のままになる
- [x] Profileに`Fragments`、`動画`、`動く断片`のリンクが残らない
- [x] Homeがレビュー・ギャラリーの二つの窓として自然に表示される
- [x] AboutがReview→Galleryの二段階として自然に表示される
- [x] 旧`/videos/`がReview/Home CTAを持つブランド404になり、mobileでもviewport内に収まり、sitemapから消える
- [x] scope 外の過去task/daily、一般語としての「動画」、review/gallery contentが変更されない

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] desktopのHome/About/Profile/グローバルナビを目視確認する
- [x] mobileのHome/About/Profile/メニューを目視確認する
- [x] Review/Gallery CTAと主要遷移を確認する
- [x] 旧`/videos/`の404見出し、Review/Home CTA、desktop/mobileでのクリップ不在を確認する
- [x] source/buildで`/videos/`、`Moving Fragments`、`動く断片`、`ffmpeg-static`、`videos` collectionの残存を`rg`で確認する
- [x] `dist/videos/`、sitemapの`/videos/`、`ffmpeg-static`不在を確認する

## Review Gate Checks

- [x] Claude review gateが`ok: true`で完了する（`publish/dev-critical`の必須項目）
- [x] Claude完了後、Sol自身の独立最終チェックが完了する

## Out Of Scope

- 今回やらない確認: Git履歴からの動画binary除去、外部アクセスログや検索流入の実測、deploy/merge、CMSログイン、動画代替機能の追加。
