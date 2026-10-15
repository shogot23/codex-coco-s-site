# 公開コピーの根拠

確認日: 2026-10-15。

- 書き手の背景: src/pages/3books.astroの既存公開文「役割や環境が変わる日々の中で、自分自身も支えられてきた3冊」。氏名・職業・年齢などは追加しない。
- 書き手の視点: src/content/reviews/guzen-ha-donoyouni-anata-wo-tsukurunoka.mdの本人の感想と、docs/brand/の選書・読者方針。
- ココちゃんの基本情報と好き・苦手: src/content/profile/profile.mdの既存公開値。性別を♀から女の子へ日本語化し意味を維持。
- ココちゃんの作品紹介: publishedかつ詳細ページ対象のGalleryから取得。AIの出自が明示された生成AIの本の画像を優先。写真の出自や実際の犬と画像の一致は新しく断定しない。
- Aboutの具体例: published Review『私が間違っているかもしれない』の編集フィールドを使用。同書の公開Gallery・公開Workにだけ接続する。
- ワーク: getVisibleWorks()に加えてpublishedを明示的に確認し、ローカルpreviewでもAboutにdraft作品リンクを出さない。
- AI説明: 実際に行っている画像制作・文章の整理と表現検討の補助。原著の確認状況や内部工程は読者向け本文に書かない。

元mainのdirtyファイルは作業対象に含めない。専用worktreeはorigin/mainの42748c3を起点とする。
