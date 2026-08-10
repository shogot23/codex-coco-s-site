# Decap CMS source

このdirectoryは、将来CMSを再導入するときの設定sourceです。GitHub Pages環境ではNetlify Identity / Git Gatewayを利用できないため、`cms/decap/`はdeploy artifactへ含めません。

- 現在の公開サイトに`/admin/`はありません。
- `config.yml`はYAML構文、content path、brand fieldの整合だけをbuild時に検証します。
- CMSが扱う`public/uploads/`は原本です。`npm run media:generate`が`public/media/`へ配信用derivativeを生成し、派生物はmanifest以外をGit管理しません。
- 認証、編集、publishが動作するとは主張しません。
- 再導入時は対応する認証backendを決め、公開前に別taskでsecurity reviewを行います。
