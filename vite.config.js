import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jaryoDir = path.join(__dirname, '자료', 'images');

const mime = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

/** 자료/images 를 /자료/images/ 로 직접 서빙 (public 복사 없이도 PNG 사용 가능) */
function serveJaryoImages() {
  return {
    name: 'serve-jaryo-images',
    configureServer(server) {
      server.middlewares.stack.unshift({
        route: '',
        handle(req, res, next) {
          const raw = req.url.split('?')[0];
          if (!raw.startsWith('/자료/images/')) return next();
          const name = decodeURIComponent(raw.slice('/자료/images/'.length));
          if (!name || name.includes('..') || name.includes('/') || name.includes('\\')) return next();
          const fp = path.join(jaryoDir, name);
          if (!fs.existsSync(fp) || !fs.statSync(fp).isFile()) return next();
          const ext = path.extname(fp).toLowerCase();
          res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
          fs.createReadStream(fp).pipe(res);
        },
      });
    },
    closeBundle() {
      const outDir = path.join(__dirname, 'dist', '자료', 'images');
      if (!fs.existsSync(jaryoDir)) return;
      fs.mkdirSync(outDir, { recursive: true });
      for (const f of fs.readdirSync(jaryoDir)) {
        const p = path.join(jaryoDir, f);
        if (fs.statSync(p).isFile() && !f.endsWith('.txt')) {
          fs.copyFileSync(p, path.join(outDir, f));
        }
      }
    },
  };
}

export default defineConfig({
  // GitHub Pages(https://rohuni.github.io/ott/)에서는 서브경로(/ott/)로 호스팅됨
  // Actions에서 GITHUB_PAGES=true 로 빌드할 때만 base를 /ott/로 설정
  base: process.env.GITHUB_PAGES === 'true' ? '/ott/' : '/',
  plugins: [
    serveJaryoImages(),
    react(),
    Sitemap({
      hostname: 'https://metacosmos.co.kr',
      dynamicRoutes: ['/qna', '/blog'],
      exclude: ['/admin'],
      readable: true,
      robots: [
        { userAgent: '*', allow: '/', disallow: ['/admin'] },
      ],
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
});
