import markdoc from "@astrojs/markdoc"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig, sharpImageService } from "astro/config"
import remarkCollapse from "remark-collapse"
import remarkToc from "remark-toc"
import { SITE } from "./src/config"
import { remarkReadingTime } from "./src/utils/remarkReadingTime.mjs"

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [tailwind(), react(), sitemap(), markdoc(), prefetch()],
  experimental: {
    assets: true
  },
  image: {
    service: sharpImageService()
  },
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime,
      [
        remarkCollapse,
        {
          test: "Table of contents"
        }
      ]
    ],
    shikiConfig: {
      theme: "dracula-soft",
      wrap: true
    },
    extendDefaultPlugins: true
  },
  vite: {
    ssr: {
      external: ["svgo"]
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
})
