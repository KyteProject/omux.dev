export default {
  "*.{astro,tsx,ts,js,jsx,svelte,json,mjs}": ["prettier --write"],
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.{md,mdx}": ["markdownlint", "prettier --write"]
}
