export default {
  "*.{astro,tsx,ts,js,jsx,svelte,json,mjs,css}": ["prettier --write"],
  "*.{md,mdx}": ["cspell --no-must-find-files", "prettier --write"]
}
