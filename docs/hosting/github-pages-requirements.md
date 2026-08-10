# GitHub Pages 配信要件と移行判断

## 現在の事実

このサイトはGitHub ActionsでAstroの`dist/`をGitHub Pagesへ配信している。2026-08-10に公開URLのHTTP responseを確認したところ、HTMLと画像は`Cache-Control: max-age=600`であった。これはPages側の配信挙動であり、repo内の静的ファイルだけでHTML・画像ごとに任意のCache-Controlを設定することはできない。

同様に、GitHub Pagesでは次のレスポンスヘッダをこのrepoから保証できない。

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- fingerprint済みassetへの長期`Cache-Control: public, max-age=31536000, immutable`

Astroが生成する内容ハッシュ付きderivativeは、移行後のimmutable cacheに備えるために維持する。ただし、GitHub Pagesに残る間は「immutable cacheを設定済み」と表現しない。

## GitHub Pagesで実施すること

- build前に`public/uploads/`の原本からWebP/AVIF/OGP derivativeを生成する。
- build後にHTML/CSS/JSON/RSS/sitemapで原本参照がないことを確認し、検証済みの原本だけを`dist/`から除外する。
- `dist/admin/`をartifactへ含めない。現行Decap設定はNetlify Identity + Git Gatewayを前提としており、GitHub Pagesで安全な認証済みCMSとして動作しない。
- `cms/decap/`は将来の再導入用sourceとして保管し、CMS YAML構文・content pathだけをCIで確認する。
- favicon、RSS、canonical、OGP、JSON-LD、sitemapは静的artifactとして検証する。

## `/admin/` の扱い

現行の`public/admin/config.yml`は`git-gateway`を指定し、`public/admin/index.html`はNetlify Identityを読み込む。この組合せはGitHub Pagesでは認証・publish経路を提供しない。

そのため、移行時の手順は次に固定する。

1. `public/admin/`を`cms/decap/`へ移す。
2. deploy前integrity checkで`dist/admin/`不在を必須にする。
3. GitHub Pagesを継続する間の更新はPR/commit経由にする。
4. CMSを再公開する場合だけ、Netlifyへのホスト移行、またはGitHub OAuth proxyを含む認証済みbackendを設計・レビューする。

CMSログインや外部publishはこのrepo内の自動テスト対象にしない。認証情報なしに成功を主張してはならない。

## 動画derivativeの前提

`scripts/check-video-toolchain.mjs`でsystem `ffmpeg`の有無とversionを記録する。2026-08-10の実行環境ではsystem `ffmpeg`は見つからなかった。この状態で動画からposterを自動切り出したり、音声を推測して字幕・transcriptを生成したりしない。

poster、WebVTT、transcriptを追加する前に、利用する固定versionのffmpegを決め、動画の音声と字幕本文を人手で照合する。音声がない映像は、音声がある前提のcaptionを作らず、視覚的な内容を説明する補助テキストとして扱う。

## ヘッダと長期cacheが必須になったときの候補

### Cloudflare Pages

Cloudflare Pagesへ移行し、`_headers`でHTMLとhash assetを分ける。CSPには実際に使うhostだけを許可する。YouTube/Instagram embedや将来のCMSを使う場合は、必要な`frame-src`、`script-src`、`connect-src`を実機検証で追加する。

### Cloudflare proxy / Workers

GitHub Pagesをoriginに保ちつつ、Cloudflare側でheaderとcache policyを付与する。origin更新時にHTMLとassetのpurge戦略を設計し、CSP違反をReport-Onlyから段階的に確認する。

### Netlify

DecapのGit Gateway + Identityを使う場合は、Netlifyをホストにする。`_headers`でcache/security policyを設定し、Netlify Identityの招待・role・recoveryを運用対象にする。

いずれの場合も、移行後に実HTTP responseでheader、cache、base path、RSS、sitemap、OGP、CMS認可を確認するまで「反映済み」としない。
