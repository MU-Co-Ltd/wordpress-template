import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  /** .env.[mode] を読み込み */
  const env = loadEnv(mode, process.cwd())
  /**　対象の Wordpress Themeフォルダ名 */
  const themeName =
    typeof env?.VITE_WP_THEME_NAME !== 'undefined' && env.VITE_WP_THEME_NAME
      ? env.VITE_WP_THEME_NAME
      : 'twentytwentytwo'
  /** is mode production */
  const isProduction = mode === 'production'

  /** 設定ここから */
  return {
    appType: 'custom',
    publicDir: false,
    build: {
      /** buildしたファイルの配置先 基準dir */
      outDir: `public/wp-content/themes/${themeName}/assets`,
      assetsDir: './',
      rollupOptions: {
        /** compileの entrypoint */
        input: {
          'js/app': 'src/app.ts',
          'css/main': 'src/styles/scss/main.scss',
          'css/sub': 'src/styles/style.css',
        },
        output: {
          /** js,ts,vue,... */
          entryFileNames: '[name].js',
          /** css,image,font */
          assetFileNames: ({ names }) => {
            /** cssと imageの配置先dirを分ける */
            const name = names.shift()
            if (!name || name.match(/\.s?[ca]ss$/)) {
              return '[name][extname]'
            }
            return 'image/[name][extname]'
          },
        },
      },
      /** buildコマンドを watchモードで起動 */
      watch: isProduction ? false : {},
      /** [注] build実行時, build.outDirの中を空にする処理を入れる */
      emptyOutDir: false,
      manifest: false,
    },
  }
})
