import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      host: "localhost",
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 3000,
      host: true, // 👈 ensures it binds to 0.0.0.0
      allowedHosts: ["qatalyst.tech", "staging-stage012.qatalyst.tech"],
    },
    // Load environment variables from .env file
    envDir: ".",
    envPrefix: ["VITE_", "STORAGE_", "CONTAINER_", "AZURE_", "SAS_"],
    build: {
      chunkSizeWarningLimit: 4000,
    },
    optimizeDeps: {
      force: true,
      include: [
        "@mantine/tiptap",
        "@tiptap/react",
        "@tiptap/starter-kit",
        "@tiptap/extension-highlight",
        "@tiptap/extension-text-style",
        "@tiptap/extension-image",
        "@tiptap/extension-subscript",
        "@tiptap/extension-superscript",
        "@tiptap/extension-task-list",
        "@tiptap/extension-task-item",
        "@tiptap/extension-youtube",
        "@tiptap/extension-table",
        "@tiptap/extension-table-row",
        "@tiptap/extension-table-cell",
        "@tiptap/extension-table-header",
      ],
    },
  };
});
