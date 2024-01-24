import { component, defineMarkdocConfig } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: "dracula-soft",
      wrap: true
    }),
  ],
  tags: {
    aside: {
        render: component('@components/Aside.astro'),
        attributes: {
            type: { type: String },
            title: { type: String },
        },
    },
    youtube: {
      render: component('@components/Youtube.astro'),
      attributes: {
        url: { type: String },
        label: { type: String } 
      }
    },
    gallery: {
      render: component('@components/blog/Gallery.astro'),
      attributes: {
        id: { type: String },
      }
    },
    katex: {
      render: component('@components/Katex.astro'),
      attributes: {
        expression: { type: String },
      }
    },
  },
})