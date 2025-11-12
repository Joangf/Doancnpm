import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // optional: allows using 'describe', 'it', 'expect' without importing
    environment: "jsdom", // simulates browser
    setupFiles: "./src/test/setupTests.js", // optional setup file
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
