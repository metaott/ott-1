import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync, existsSync } from 'fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pub = path.join(root, 'public');
const images = path.join(pub, '자료', 'images');

mkdirSync(images, { recursive: true });
const marker = path.join(pub, '★_PUBLIC_폴더_맞음.txt');
if (!existsSync(marker)) {
  writeFileSync(
    marker,
    '이 폴더가 Vite public 폴더입니다.\r\n이미지: public\\자료\\images 또는 자료\\images\r\n',
    'utf8'
  );
}
exec(`explorer "${pub}"`);
console.log('열린 경로:', pub);
