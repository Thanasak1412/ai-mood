import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react-swc";

// https//vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/__test__/**/**.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setupTests',
    mockReset: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, '.') }],
  },
});
