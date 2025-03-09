import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],  // Deduplicate react and react-dom
  },
  build: {
    rollupOptions: {
      external: ["@huggingface/inference", "react-markdown"],  // Externalize these packages
    },
    commonjsOptions: {
      include: [/node_modules/],  // Include node_modules to handle mixed module types
      transformMixedEsModules: true,  // Allow transformation of mixed modules
    },
  },
});
