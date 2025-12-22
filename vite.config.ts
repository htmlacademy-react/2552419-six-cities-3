/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/2552419-six-cities-3/' : '/';
  
  return {
    base,
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          if (mode === 'production') {
            return html.replace(
              /href="css\/main.css"/g,
              `href="${base}css/main.css"`
            );
          }
          return html;
        },
      },
    ],
    server: {
      open: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
  };
});
