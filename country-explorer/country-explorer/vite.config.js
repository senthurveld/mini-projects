import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  base : "https://senthurveld.github.io/mini-projects/country-explorer/country-explorer",
  plugins: [tailwindcss()],
  server: {
    port: 3001,
  },
});
