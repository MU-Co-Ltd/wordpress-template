# フロントエンド（Vite / TypeScript / Tailwind CSS）

## ソースと出力先

ソースは `project/src`、ビルド出力は `project/public/wp-content/themes/<theme>/assets`。
**`assets/` 配下は生成物。直接編集せず、必ず `src/` を修正してビルドし直す。**

| entry（`vite.config.ts`） | 出力 |
| --- | --- |
| `src/scripts/app.ts` | `assets/script/app.js` |
| `src/styles/style.css` | `assets/style/main.css` |
| 画像などのアセット | `assets/image/[name][extname]` |

出力ファイル名・配置先を変えるときは `build.rolldownOptions.input` の key、および
`output.assetFileNames` の戻り値を編集する。

## コマンド（`node` コンテナ内）

```shell
npm run dev     # tsc && vite build --mode development（watch 有効）
npm run build   # tsc && vite build --mode production
```

どちらも先に `tsc` の型チェックが走るので、型エラーがあるとビルドされない。

## 技術的な前提

- **Vite 8 / Rolldown ベース。** 設定キーは `rollupOptions` ではなく `build.rolldownOptions`。
- **Tailwind CSS v4** を `@tailwindcss/vite` プラグインで使用。設定は CSS 側（`src/styles/style.css` の `@import 'tailwindcss'`）で行う。`tailwind.config.js` は存在しない。
- **SCSS は廃止済み。** 素の CSS + Tailwind で書く。SCSS を再導入しない。
- TypeScript は `strict` + `noUnusedLocals` / `noUnusedParameters` / `noImplicitReturns`。`noEmit`（出力は Vite 側）。
- `appType: 'custom'` / `publicDir: false` / `emptyOutDir: false`。
  **古い出力は自動削除されないため、entry 名やファイル構成を変えたら `assets/` の不要ファイルを手動で削除する。**
- `import.meta.env` に環境変数を追加したら `src/vite-env.d.ts` の `ImportMetaEnv` に型を追加する。

## ビルド成果物のコミット

CI（GitHub Actions）はビルドを実行せず、リポジトリ内のテーマディレクトリをそのまま FTP アップロードする。
**そのため `assets/` 配下のビルド成果物もコミット対象。** テーマの変更をデプロイする際はビルド後の成果物を必ず含める。
