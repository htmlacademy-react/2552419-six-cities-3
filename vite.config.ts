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
              console.warn('index.html not found in dist, skipping 404.html creation');
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
              (_match, _prefix: string | undefined, asset: string) => {
                if (_prefix && _prefix.includes(basePath)) {
                  return `src="${basePath}/assets/${asset}"`;
                }
                return `src="${basePath}/assets/${asset}"`;
              }
            );

            indexHtml = indexHtml.replace(
              /href="([^"]*\/)?assets\/([^"]+)"/g,
              (_match, _prefix: string | undefined, asset: string) => {
                if (_prefix && _prefix.includes(basePath)) {
                  return `href="${basePath}/assets/${asset}"`;
                }
                return `href="${basePath}/assets/${asset}"`;
              }
            );

            writeFileSync(indexPath, indexHtml);
            writeFileSync(fourOhFourPath, indexHtml);
            
            // Create .nojekyll file to disable Jekyll processing on GitHub Pages
            const nojekyllPath = resolve(__dirname, 'dist/.nojekyll');
            writeFileSync(nojekyllPath, '');
            
            console.log(`✓ Created 404.html for GitHub Pages (base: ${basePath})`);
            console.log(`✓ Created .nojekyll to disable Jekyll processing`);
          } catch (error) {
            console.error('Error creating 404.html:', error);
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
