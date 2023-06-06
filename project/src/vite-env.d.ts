/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 独自の環境変数...
  readonly VITE_WP_THEME_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
