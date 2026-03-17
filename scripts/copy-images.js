import { cpSync, existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, '자료', 'images');
const dest = join(root, 'public', '자료', 'images');

/** 항상 두 폴더를 만들어 탐색기에서 보이게 함 */
mkdirSync(src, { recursive: true });
mkdirSync(dest, { recursive: true });

const guideSrc = join(src, 'PNG는_이_폴더에_넣으세요.txt');
if (!existsSync(guideSrc)) {
  writeFileSync(
    guideSrc,
    [
      '이 폴더에 PNG, JPG 등 이미지를 넣으세요.',
      '',
      'npm run dev 실행 시 자동으로 public/자료/images 로 복사되어 웹에 반영됩니다.',
      '',
      'Cursor에서 안 보이면: 왼쪽 파일 트리에서 dev_cur > 자료 > images 를 펼치세요.',
      '탐색기 경로 예: ...\\통합OTT\\dev_cur\\자료\\images',
    ].join('\r\n'),
    'utf8'
  );
}

const guideDest = join(dest, '복사된_이미지가_여기에_표시됩니다.txt');
if (!existsSync(guideDest)) {
  writeFileSync(
    guideDest,
    [
      '이 폴더는 웹 서버가 직접 읽는 위치입니다.',
      '자료/images 에 넣은 파일이 npm run dev 시 여기로 복사됩니다.',
      '직접 여기에 넣어도 됩니다.',
    ].join('\r\n'),
    'utf8'
  );
}

if (existsSync(src)) {
  try {
    const files = readdirSync(src).filter((f) => {
      const p = join(src, f);
      return statSync(p).isFile() && !f.endsWith('.txt');
    });
    for (const f of files) {
      cpSync(join(src, f), join(dest, f), { force: true });
    }
    if (files.length) console.log('[copy-images] 자료/images → public/자료/images (' + files.length + '개 파일)');
    else console.log('[copy-images] 자료/images 폴더 준비됨 (이미지 파일을 넣은 뒤 다시 npm run dev)');
  } catch (e) {
    console.warn('[copy-images]', e.message);
  }
}
