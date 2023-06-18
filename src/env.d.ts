/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// Replace `astro/client` with `@astrojs/image/client`
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly PROD: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
