import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["vue", "vue-router", "vuelidate, express"],
  },
  base: "./",
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.ts",
    },
  },
});
