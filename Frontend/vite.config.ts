import { defineConfig } from "vite"
import postcss from "./postcss.config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      // @ts-ignore: Type from imported library
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "")
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
