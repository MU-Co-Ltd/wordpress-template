# Template Repository
## Docker + WordPress + Vitejs

### 環境構築 **WordPress**編
1. `.env.sample`をコピーして`.env`を作成し、適当な環境変数を記述する

2. **Docker**起動
   ```shell
   $ sh up.sh
   ```

3. `./project/public`内に**WordPress** coreファイルが生成されたら、Webブラウザでアクセスして**WordPress インストール**画面が表示されることを確認する  
   ＊ hostマシン側の`port`は`.env`に記載した`WEB_PORT`
   ```
   http://localhost:"${WEB_PORT}"
   ```

4. **WordPress**で開発する**テーマ**を*作成* or *配置* する
   ```
   ./project/public/wp-content/themes
   ```

5. 必要に応じて、`SQLファイルのインポート`や`upload画像の反映`を行う

### 環境構築 **Vite**編
1. **環境構築 `WordPress`編 `4.`** で用意した**WordPressテーマ**の`テーマ名（フォルダ名）`を、`./app/.env.dev`の環境変数 **`VITE_WP_THEME_NAME`** の値に記述する
   ```
   [.env.dev]
   VITE_WP_THEME_NAME=xxxxx
   ```

2. **node**コンテナへ shellアクセス
   ```shell
   [コンソールからアクセスする例]
   $ docker-compose exec node bash
   ```
   > カレントディレクトリに `./project` のファイルがマウントされていることを確認

3. 依存パッケージのインストール
   ```shell
   [npm]
   $ npm install

   [yarn]
   $ yarn
   ```
   > 初期状態で **vite** + **typescript** + **sass**  
   > 必要に応じて `package.json`を編集 or モジュールの追加・削除をする

4. **build**を実行
   ```shell
   [npm]
   $ npm run build

   [yarn]
   $ yarn build
   ```
   > `./project/public/wp-content/themes/[theme名]`内に`assets/js`, `assets/css`, `assets/image`が作成されていれば成功

### 補足
- コンパイル後生成される**ファイル名**と、**配置先**の設定
   - `jsファイル`  
      `vite.config.js` の `build.rollupOptions.input` にObject型で記述する **entrypoint** の **key** で **ファイル名**及び**配置先**を調整できる
   - `cssファイル` & `imageファイル`  
      `vite.config.js` の `build.rollupOptions.output.assetFileNames` の返り値 `css/[name][extname]` と `image/[name][extname]` でそれぞれ **配置先**を調整可能。  
      **ファイル名** は **entry**するファイル名がそのまま使用される

### 参考
- Vite 公式URL（ https://ja.vitejs.dev/ ）
- Rollup.js 公式URL（ https://rollupjs.org/guide/en/#big-list-of-options ）