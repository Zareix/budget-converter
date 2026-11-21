import { defineConfig } from "@inlang/paraglide-js"

export default defineConfig({
  outdir: "./src/paraglide",
  strategy: ["cookie", "preferredLanguage", "baseLocale"],
  outputStructure: "locale-modules",
  emitGitIgnore: false,
  emitReadme: false,
})
