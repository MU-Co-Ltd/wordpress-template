# WordPress の取り扱い

## 編集していい範囲

**`project/public/wp-content/themes/<VITE_WP_THEME_NAME>/` 配下のみ。**

以下は WordPress 公式イメージが生成する成果物であり、git 管理外（`project/public/.gitignore`）。
編集・コミットしない。

- `wp-admin/`, `wp-includes/`, `wp-*.php`, `xmlrpc.php`, `index.php`, `readme.html`, `license.txt`
- `wp-content/plugins/`, `wp-content/uploads/`, `wp-content/languages/`
- `.htaccess`

プラグインの挙動を変えたい場合もコア/プラグインを直接編集せず、テーマ側のフック（`add_action` / `add_filter`）で対応する。

## テーマ名

テーマのフォルダ名は以下の 3 箇所で一致させる必要がある。

1. `project/public/wp-content/themes/<テーマ名>/`
2. `project/.env` の `VITE_WP_THEME_NAME`
3. `.github/workflows/deploy-*.yml` の `[xxx]`（`paths` と `local-dir`）

## DB 接続・設定

- 接続情報は `wp-config-docker.php` が環境変数から解決する。`wp-config.php` を直接書き換えない。
- テーマコードから環境変数を読む場合は `getenv_docker()`（`wp-config-docker.php` で定義）を使い、未定義環境でも動くよう `function_exists()` でガードする。
- DB を直接 SQL で書き換えるのではなく、WordPress の API（`get_option` / `WP_Query` / `wp_insert_post` など）を通す。

## メール送信

ローカルでは Mailpit に送る。テーマの `functions.php` で `phpmailer_init` を使う方式か、SMTP 設定プラグインのどちらか。
設定値は `.env` の `MAIL_HOST` / `MAIL_PORT` / `MAIL_USERNAME` / `MAIL_PASSWORD`、暗号化は「なし」。

```php
add_action('phpmailer_init', function ($phpmailer) {
  if (!function_exists('getenv_docker')) return;
  $phpmailer->isSMTP();
  $phpmailer->Host = getenv_docker('MAIL_HOST');
  $phpmailer->Port = (int) getenv_docker('MAIL_PORT');
  // ...
});
```

本番環境では反映先のメール設定に合わせて置き換える。
