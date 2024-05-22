import mdx from "@astrojs/mdx"
import prefetch from "@astrojs/prefetch"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import AutoImport from "astro-auto-import"
import compress from "astro-compress"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import remarkCollapse from "remark-collapse"
import remarkToc from "remark-toc"
import { site } from "./src/config/config"
import { remarkReadingTime } from "./src/utils/remarkReadingTime.mjs"

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  site: site.base_url ? site.base_url : "https://omux.dev",
  base: site.base_path ? site.base_path : "/",
  trailingSlash: site.trailing_slash ? "always" : "never",
  integrations: [
    react(),
    sitemap(),
    prefetch(),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab"
      ]
    }),
    tailwind({
      applyBaseStyles: false
    }),
    mdx(),
    icon(),
    compress()
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
  }
})
