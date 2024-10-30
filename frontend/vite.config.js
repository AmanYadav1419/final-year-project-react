import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // to add the backend url as proxy as a server
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
