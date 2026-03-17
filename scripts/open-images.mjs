import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const folder = path.join(root, '자료', 'images');
mkdirSync(folder, { recursive: true });
exec(`explorer "${folder}"`);
console.log('탐색기에서 열림:', folder);
