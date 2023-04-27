// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        artefact: resolve(__dirname, "artefact.html"),
        ar: resolve(__dirname, "ar.html"),
        collection: resolve(__dirname, "collection.html"),
        quiz: resolve(__dirname, "quiz.html"),
      },
    },
  },
});