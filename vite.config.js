// vite.config.js
import { defineConfig } from "vite";
import path from "path";
import Vue from "@vitejs/plugin-vue";
import ViteImages from "vite-plugin-vue-images";

const host = "localhost";
const port = "8090";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    ViteImages({
      dirs: ["src/assets/images"],
    }),
  ],
  define: {
    'process.env': process.env
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".css", ".svg"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api/': {
        target: `http://${host}:${port}`,
        changeOrigin: true,
      },
      '/ws/': {
        target: `ws://${host}:${port}`,
        changeOrigin: false,
        ws: true,
      },
    }
  }
});