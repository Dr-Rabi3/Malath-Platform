import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/notificationhub": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      port: 3000,
    },
  };
});