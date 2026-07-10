import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shaily-portfolio",
  server: {
    fs: {
      allow: [
        ".", // allow serving from current workspace
      ],
    },
  },
});
