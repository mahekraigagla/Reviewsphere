import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'dist', 'index.html');
const notFoundPath = path.join(__dirname, 'dist', '404.html');

try {
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('[SPA Routing] Successfully copied dist/index.html -> dist/404.html to prevent Vercel 404 errors');
  } else {
    console.warn('[SPA Routing Warning] dist/index.html not found to copy');
  }
} catch (err) {
  console.error('[SPA Routing Error]', err);
}
