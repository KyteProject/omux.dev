import { defineMarkdocConfig } from '@astrojs/markdoc/config'
import Youtube from '@components/Youtube.astro'
import Aside from '@components/Aside.astro'
import Gallery from '@components/blog/Gallery.astro'

export default defineMarkdocConfig({
  tags: {
    aside: {
        render: Aside,
        attributes: {
            type: { type: String },
            title: { type: String },
        },
    },
    youtube: {
      render: Youtube,
      attributes: {
        url: { type: String },
        label: { type: String } 
      }
    },
    gallery: {
      render: Gallery,
      attributes: {
        id: { type: String },
      }
    }
  },
})