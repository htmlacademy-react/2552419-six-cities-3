/// <reference types='vitest' />
/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, existsSync } from 'fs';
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
            const fourOhFourPath = resolve(__dirname, 'dist/404.html');

            if (!existsSync(indexPath)) {
              return;
            }

            let indexHtml = readFileSync(indexPath, 'utf-8');
            const basePath = base.replace(/\/$/, '');

            indexHtml = indexHtml.replace(
              /href="([^"]*\/)?css\/main.css"/g,
              `href="${basePath}/css/main.css"`
            );

            indexHtml = indexHtml.replace(
              /src="([^"]*\/)?assets\/([^"]+)"/g,
              (_match, _prefix: string | undefined, asset: string) => `src="${basePath}/assets/${asset}"`
            );

            indexHtml = indexHtml.replace(
              /href="([^"]*\/)?assets\/([^"]+)"/g,
              (_match, _prefix: string | undefined, asset: string) => `href="${basePath}/assets/${asset}"`
            );

            writeFileSync(indexPath, indexHtml);
            writeFileSync(fourOhFourPath, indexHtml);

            const nojekyllPath = resolve(__dirname, 'dist/.nojekyll');
            writeFileSync(nojekyllPath, '');
          } catch {
            // Ignore errors during build
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
