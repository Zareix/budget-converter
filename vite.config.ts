import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

const config = defineConfig({
  plugins: [
    devtools(),
    // Workaround for rolldown#9993: the __commonJSMin runtime helper gets
    // hoisted into a chunk that is part of an import cycle, breaking SSR at
    // runtime ("__commonJSMin is not a function").
    // Inlining dynamic imports disables code splitting entirely, which makes
    // the cycle impossible. See https://github.com/rolldown/rolldown/issues/9993
    nitro({ preset: "bun", inlineDynamicImports: true }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
})

export default config
