/** @type {import("prettier").Config} */
export default {
  arrowParens: "avoid",
  semi: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "none",
  bracketSpacing: true,
  endOfLine: "lf",
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-toml"
  ],
  overrides: [
    {
      files: ["*.astro"],
      options: {
        parser: "astro"
      }
    }
  ]
}
