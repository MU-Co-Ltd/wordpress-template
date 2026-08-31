# 開発フロー

## ブランチ

| branch | 役割 |
| --- | --- |
| `main` | 本番。ここへの PR がマージされると本番へ FTP デプロイ |
| `staging` | ステージング。ここへの PR で staging へ FTP デプロイ |
| `develop` | 通常の作業ベース |

`main` / `staging` へ直接コミットしない。PR 経由で反映する。

## コミットメッセージ

`<type>: <日本語の要約>` 形式。

```
feat: ~~~をするための機能追加
update: ~~~機能にxxxxを追加
fix: MySQLイメージの起動コマンドでエラーが発生するのを修正
chore: 依存パッケージの最新化&見直し(SCSSを廃止, TypeScript v7へ移行)
docs: README更新 - 不要な記述を削除
refactor: コードのリファクタリング
```

使う type は `feat` / `fix` / `update` / `chore` / `docs` / `refactor`。

## デプロイ（GitHub Actions）

`SamKirkland/FTP-Deploy-Action` によるアップロードのみ。**ビルドは CI で行わない。**

| workflow | trigger |
| --- | --- |
| `.github/workflows/deploy-production.yml` | `main` への PR が close（マージ）されたとき |
| `.github/workflows/deploy-staging.yml` | `staging` への PR が open / synchronize されたとき |

いずれも `paths` にテーマディレクトリが指定されており、テーマ配下に変更があったときだけ実行される。

### プロジェクト開始時にやること

1. 両 workflow の `[xxx]` を実際のテーマ名に置換（`paths` と `local-dir`）。
2. `server-dir` を反映先のパスに合わせる。
3. リポジトリの Secrets を設定する。
   - 共通: `FTP_SERVER_HOST`
   - 本番: `PRD_FTP_USERNAME` / `PRD_FTP_PASSWORD`
   - staging: `STG_FTP_USERNAME` / `STG_FTP_PASSWORD`
4. FTP デプロイを使わない場合は `.github/workflows/` 内のファイルを削除する。

## 機密情報

`.env`（ルート）は git 管理外。認証情報・接続情報をコミットしたりコード中にハードコードしない。
新しい設定項目を追加するときは `.env.sample` にダミー値で項目だけ追記する。
