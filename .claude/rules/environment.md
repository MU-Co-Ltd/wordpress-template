# 開発環境（Docker Compose）

## サービス構成（`compose.yml`）

| service | container | image | 役割 |
| --- | --- | --- | --- |
| `wordpress` | `wp-container` | `wordpress:php${APP_PHP_VERSION}-apache` | PHP 実行。`./project/public` を `/var/www/html` に bind mount |
| `database` | `${DATABASE_HOST}` | `mysql:${MYSQL_VERSION}` | DB。`./.docker/mysql/local/data` に永続化 |
| `node` | `node-container` | `node:24` | アセットビルド専用。`./project` を `/project` に bind mount |
| `mail` | `${MAIL_HOST}` | `axllent/mailpit` | ローカルの SMTP 受信 |

## 操作コマンド

```shell
sh shell/up.sh          # docker compose up -d
sh shell/down.sh        # docker compose down
sh shell/clean-up.sh    # down --volumes --rmi all（ボリューム・イメージまで削除）
sh shell/install-composer.sh  # wordpress コンテナへ Composer を導入
```

- WordPress: `http://localhost:${WEB_PORT:-8000}`
- Mailpit UI: `http://localhost:8025`（SMTP は `MAIL_PORT`）
- MySQL は host の `3306` を固定公開する。ローカルの MySQL が起動していると衝突するので注意。

## 重要な前提

- **npm / tsc / vite は必ず `node` コンテナ内で実行する。** ホスト側で実行しない。
  ```shell
  docker compose exec node npm install
  docker compose exec node npm run build
  ```
- **PHP / WP-CLI / Composer は `wordpress` コンテナ内で実行する。**
  ```shell
  docker compose exec wordpress bash
  ```

## 環境変数

| ファイル | 用途 | git |
| --- | --- | --- |
| `.env`（ルート） | Docker / DB / PHP / Mail の設定。`.env.sample` をコピーして作成 | 管理外 |
| `project/.env` | `VITE_WP_THEME_NAME`（開発対象テーマのフォルダ名） | 管理対象 |

- `.env.sample` に項目を追加したら、必ず `.env` 側の説明も揃える。
- `.docker/mysql/local/data` と `.docker/mail/local/data` は永続データ置き場。中身は git 管理外（各ディレクトリの `.gitignore` で除外）なので、手で触らない。
