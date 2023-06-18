import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import remarkToc from "remark-toc"
import remarkCollapse from "remark-collapse"
import sitemap from "@astrojs/sitemap"
import { SITE } from "./src/config"
import { remarkReadingTime } from "./src/utils/remarkReadingTime.mjs"
import mdx from "@astrojs/mdx"
import prefetch from "@astrojs/prefetch"
import image from "@astrojs/image"
import alpine from "@astrojs/alpinejs"

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind(),
    react(),
    sitemap(),
    mdx(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp"
    }),
    prefetch()
  ],
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
