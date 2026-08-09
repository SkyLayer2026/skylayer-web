import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    react(),
    electron([
      {
        // Main process
        entry: "electron/main.ts",
        vite: {
          build: {
            outDir: "dist-electron",
            rollupOptions: {
              external: ["better-sqlite3", "node-thermal-printer"], // 🔹 Exclui módulos nativos do bundle
              output: {
                format: "cjs", // 🔹 CommonJS para compatibilidade com require()
                entryFileNames: "[name].js",
              },
            },
          },
        },
      },
      {
        // Preload script
        entry: "electron/preload.ts",
        onstart: ({ startup }) => startup(),
      },
    ]),
  ],
  resolve: { alias: { "@": "/src" } },
  build: { outDir: "dist" },
  // 🔹 Ignora require dinâmico para módulos nativos
  optimizeDeps: {
    exclude: ["better-sqlite3", "node-thermal-printer"],
  },
});