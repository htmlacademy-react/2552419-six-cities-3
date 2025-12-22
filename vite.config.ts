/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default defineConfig(() => {
  const base = process.env.BASE_PATH || '/2552419-six-cities-3/';

  return {
    base,
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace(
            /href="css\/main.css"/g,
            `href="${base}css/main.css"`
          );
        },
      },
      {
        name: 'fix-assets-paths',
        closeBundle() {
          try {
            const indexPath = resolve(__dirname, 'dist/index.html');
            let indexHtml = readFileSync(indexPath, 'utf-8');

            indexHtml = indexHtml.replace(
              /href="css\/main.css"/g,
              `href="${base}css/main.css"`
            );

            indexHtml = indexHtml.replace(
              /src="([^"]*\/)?assets\/([^"]+)"/g,
              (_match, _prefix: string | undefined, asset: string) => `src="${base}assets/${asset}"`
            );

            indexHtml = indexHtml.replace(
              /href="([^"]*\/)?assets\/([^"]+)"/g,
              (_match, _prefix: string | undefined, asset: string) => `href="${base}assets/${asset}"`
            );

            writeFileSync(indexPath, indexHtml);
            writeFileSync(resolve(__dirname, 'dist/404.html'), indexHtml);
          } catch {
            // Ignore errors if dist doesn't exist yet
          }
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
