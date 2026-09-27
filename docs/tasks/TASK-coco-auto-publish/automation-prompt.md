# Coco毎日の修復ワーク：更新後の指示文

以下を既存スケジュールのpromptへそのまま設定する。

毎回、読書with Coco のX投稿用コンテンツを1件完成させてください。これは外部共有前提の publish/dev-critical 作業です。最初に /Users/shogo/Projects/codex-coco-s-site-main/AGENTS.md と同リポジトリが指定するブランド・制作・AI運用文書を読み、$coco-book-infographic と $claude-review-gate を必ず使用してください。

実行境界:
- サイト: /Users/shogo/Projects/codex-coco-s-site-main
- 制作スタジオ: /Users/shogo/Projects/coco-book-infographic-studio
- 最終保存先: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work
- キャラクターシートの唯一の正本: /Users/shogo/Pictures/Photos Library.photoslibrary/resources/derivatives/A/AAC922E5-F8F2-4043-84DA-D77D9FBD027A_1_105_c.jpeg
- 正本のSHA-256: 860dc222102edbbbb988e3ae781ceb5cb4ac9dd96cb4d5bfba5dcecb403bf721
開始時に git status と正本の存在・ハッシュを確認してください。既存の変更や未追跡ファイルには一切触れません。正本が無い、ハッシュが違う、保存先と既存作業が衝突する場合は生成を止め、失敗理由を報告してください。Xへの実投稿は行いません。制作段階ではGit commit、PR、merge、サイト公開を行わず、完全成功後のLunaサイト工程だけがこれらを担当します。

オーケストラ方針:
3つの独立した読み取り調査をサブエージェントへ並列委任してください。①gpt-5.6-solでサイト全体・書誌、②別のgpt-5.6-solでPubMed等の研究原典、③別のgpt-5.6-solで直近8回のテーマ・ワーク・ポーズ監査を担当します。制作の3調査サブエージェントにはgpt-5.6-solだけを使い、制作統合担当だけが仕様固定、原稿統合、画像生成、制作ファイル更新を行ってください。サイト工程は制作完了後に別の単一writerへ引き継ぎます。指定モデルのサブエージェントを利用できない場合は単独実行へ切り替えず、その回を失敗として終了します。

テーマ選定:
Reviews、Gallery、About、その他の関連コンテンツを確認し、候補を複数作ります。/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/history.json があれば読み、直近8回のテーマ、参照箇所、参考書籍、ワーク、ココちゃんのポーズと重ならない候補からランダムに1件を選んでください。選定元のページ、作品、考え方を明記します。サイト内の参照作品と参考書籍名は必ず一致させ、実在確認できる書籍を1冊以上特定してください。出版社公式、著者公式、国立国会図書館、ISBN等の信頼できる書誌情報で存在を確認し、確認できない書名は使いません。適格候補が無ければ無理に作らず終了します。

研究確認:
dlabは使用禁止です。PubMed、Cochrane、DOI、学術誌の原著ページ等で、メタ分析、系統的レビュー、RCTなどの原典を確認してください。存在と内容を確認できた研究だけを使い、PMIDまたはDOIとURL、研究デザイン、対象者、介入内容・期間、主要結果、限界を記録します。テーマに適合する根拠が見つからなければ別候補を再抽選し、それでも成立しない場合は失敗として終了してください。
研究で検証された介入と、日常向けに翻訳した1〜5分・2〜4ステップの短縮ワークを明確に分けます。短縮版そのものが未検証なら「この短縮ワーク自体は未検証」と明記し、期待できる変化を保証表現にしないでください。

画像生成前の固定:
テーマ、サイト内の参照箇所、参考書籍、ワーク名、2〜4ステップ、得られる変化、科学メモ、主見出し、今回のココちゃんのポーズを frozen-spec.md に固定します。固定後に内容を変える場合は先に仕様を更新し、変更理由を残してください。

画像:
添付由来の正本だけを参照してキャラクター同一性を保ち、直近8回と異なる自然なポーズにします。1080×1350の4:5構図で作成し、「読書with coco」「人生の修復工房」「参考：『書名』」を必ず正確に入れてください。参考表記は主メッセージと分けて小さく配置します。生成元から4:5の構図にし、余白追加や重要要素の切り落としで寸法だけを合わせません。
生成後は実画像を目視し、OCR、sipsによる寸法確認、SHA-256記録を行います。frozen-spec.md と画像内の見出し、書名、ステップ、メッセージを照合し、不一致、文字化け、欠落、キャラクター不一致があれば修正または再生成してください。

レビューと保存:
制作スタジオにjobとtask-recordを作り、調査・原稿・画像プロンプト・ドラフト・監査証跡を保存します。最終成果物はClaude review gateがOKになり、Codex自身の画像・OCR・寸法・ハッシュ・内容一致確認も完了した後だけ、/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/YYYY-MM-DD_HHMM_<slug>/ へ保存してください。レビュー未成立、blocking残存、原典未確認、画像不一致の状態では最終保存しません。成功時だけ history.json に今回の日時、テーマ、参照箇所、参考書籍、ワーク、ポーズ、成果物パスを追記します。

画像ファイル名:
- 最終納品画像は必ず「<サイト内の本名>_<ワーク名>.png」とする。汎用名の「image.png」は使わない。
- 本名はサイト内の参照作品名、ワーク名はfrozen-spec.mdで固定した名称を使う。
- ファイル名では「『』」「「」」を外し、スラッシュ、コロン、アスタリスク、疑問符、引用符、山括弧、縦棒はハイフンへ置換する。連続空白と連続ハイフンを整理する。
- report.md、verification.md、task-record、history.jsonのimage_filenameは実際の画像ファイル名と一致させる。
- 保存前に改名先の衝突を確認し、既存ファイルがある場合は生成を止める。

最終フォルダには少なくとも <サイト内の本名>_<ワーク名>.png、report.md、x-post.txt、sources.md、frozen-spec.md、verification.md を置きます。report.md と実行結果は次の順で記載してください。
①今回のテーマと参照箇所・参考書籍
②実践ワーク
③科学的根拠
④画像メッセージ
⑤X投稿画像
⑥参考書名を含む、そのまま使える3〜8行程度のX投稿文

X投稿文は自然な3〜8行とし、参考書名を本文中に明記します。終了時に成功または失敗を明示し、成功時は保存した絶対パス、使用した原典、Claudeレビュー状態、独立検証結果を報告してください。

サイト掲載用原稿の追加（ワークページ導入）:
従来の6ファイルに加え、同じ納品フォルダに site-work.json を作成してください。制作段階ではサイトへの取り込み・commit・PR・merge・公開を行わず、掲載準備までに留めます。完全成功後だけ後述のLunaサイト工程に進みます。既存の画像・原稿・出典・レビュー要件はそのまま維持してください。

site-work.json の仕様:
version=1、slug（半角英小文字・数字・ハイフンの恒久ID）、title（ワーク名）、description、readerWorry、durationMinutes（整数1〜30）、moods（src/data/work-taxonomy.json の既知の気分IDを1件以上）、concerns（同ファイルの既知の悩みIDを1件以上）、imageFilename（同じフォルダの納品PNG名）、imageAlt、relatedReview（公開済みレビューのファイル名から.mdを除く）、bookTitle（レビューtitleと完全一致）、bookConnection（本からの着想と翻案を区別）、completion（終了目安）、question（振り返る問い）、evidenceNote（研究介入と今回の短縮版の違い）、safetyNote（対象範囲・中止目安）、sources（labelとhttps URLの配列）、body（Markdown）、published=false を含めます。bodyは「## 用意するもの」「## 手順」と番号付き手順を含み、画像・frozen-specと一致させ、HTMLや画像埋め込みは入れません。変化は保証せず、短縮版自体が未検証であることを明示してください。

自動公開の候補は、サイト内の公開レビューと確実に紐付けられる本に限ります。参照先にはrelatedReviewを使い、relatedGalleryはこの自動公開の対象外です。site-work.jsonもClaudeレビュー、最終保存、byte一致確認の対象に含めます。
制作完了時点の状態は公開準備として報告し、サイト工程の結果と区別してください。納品先に既存site-work.jsonがある場合は上書きしません。サイト原稿を用意できない場合は理由を報告し、公開可能とは扱わないでください。
サイト用原稿と公開手順の正本は /Users/shogo/Projects/codex-coco-s-site-main/docs/works-publishing.md です。Lunaは最新のorigin/mainから作った隔離worktree内の同文書を参照します。この文書が存在しない、または現在の取り込み仕様と矛盾する場合はサイト掲載準備未完了として止めてください。

制作成功後のLunaサイト工程:
この工程は自動公開設定の更新後に、この実行で新規制作した成果物だけが対象です。既存のinbox/work成果物を遡って公開しません。制作の最終フォルダにPNG、report.md、x-post.txt、sources.md、frozen-spec.md、verification.md、site-work.jsonが揃い、原典確認、実画像の目視/OCR/sips/SHA、Claude review gateの全必須phase、最終コピーのbyte一致、history.json追記がすべて成功したことを先に確認してください。1項目でも未確認・失敗ならLunaを起動せず、制作失敗または掲載準備未完了として報告します。

完全成功時だけ、fork_turns=noneで完全な引き継ぎ情報を渡し、モデルを正確にgpt-6-lunaと指定したサブエージェントを1件起動します。渡す情報には絶対成果物パス、site-work.jsonのslug、画像SHA-256、制作・レビュー証跡、docs/works-publishing.md、今回の継続承認範囲、次の手順と停止条件を含めます。指定モデルを起動できない場合は他モデルや制作統合担当へ切り替えず、制作成功・サイト工程未実施として止めます。Lunaの完了を待ち、結果と証拠を統合して報告してください。

Lunaはサイト工程の単一writerです。最初にAGENTS.md、docs/parallel-dev-config.md、docs/works-publishing.md、関連ブランド文書、/Users/shogo/.agents/skills/claude-review-gate/SKILL.md、/Users/shogo/.agents/skills/pr-merge/SKILL.md を読み、publish/dev-criticalとして扱ってください。最新のorigin/mainからcodex/接頭辞の新規branchを持つ隔離worktreeを作り、元の作業ツリーと既存の変更・未追跡ファイルには触れません。
docs/tasks/TASK-works-autopublish-<実行日YYYYMMDD>-<slug>/ にPlanGateのpbi-input.md、plan.md、test-cases.mdを作成し、このユーザーの継続承認を承認根拠として明記します。完了時にstatus.mdとその日のdaily/worklogを更新してください。スコープや根拠が崩れたら止めます。

絶対パスのsite-work.jsonと納品PNG・検証記録・frozen-specを再照合し、既存slugや画像の衝突、書誌・出典・手順・分類IDの不一致を確認します。npm run works:import -- <絶対site-work.jsonパス> --dry-run が成功した場合だけ通常の works:import を実行します。取り込み直後はpublished:falseを確認し、npm run works:previewのローカル画面でPC・モバイルの一覧、詳細、画像、手順、出典、本との導線を確認してください。モバイル表示はブラウザのviewportを切り替えて検証します。問題が無ければ対象Markdownのpublishedだけをtrueにし、slugを変えません。

npm run test:works、npm run verify:frontend、npm run check:works-distを実行し、公開ビルド内の対象URLと画像を確認します。Claude review gateの必要phaseを通し、blockingが無いことを確定してください。予期しない差分が無いことと既存コンテンツを巻き込んでいないことを確認してからcommit、push、PR作成へ進みます。PRのCI成功、merge可能状態、差分、merge前のClaudeレビューを確認し、squash mergeしてください。隔離worktree側でmainを同期してbranchを安全に片付けます。GitHub Pagesのdeploy成功を確認した後、キャッシュを避けて実際の公開URLで一覧、詳細、本への相互リンク、共有画像、HTMLが参照する最適化画像を確認します。公開URLが検証できるまで公開完了とは報告しません。

衝突、テスト・プレビュー・レビュー・CI・デプロイの失敗時は次の段階へ進まず、制作成功/サイト工程失敗/公開確認完了を別々に記録します。PRやmerge後の失敗では、残ったPR・commit・URL・必要な再開点を報告します。X・Instagramへの実投稿は行いません。サイト公開が成功した場合は公開URL、PR、merge commit、Pages実行、検証結果を報告します。
