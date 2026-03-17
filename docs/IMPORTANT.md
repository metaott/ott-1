# 운영 시 반드시 확인할 사항

## 보안 (프로덕션 전 필수)

1. **`/admin` 로그인**  
   현재 데모용 `admin` / `admin` 입니다. **실서비스 전 반드시 제거하거나** 서버 인증·환경변수로 교체하세요.

2. **블로그 데이터**  
   `localStorage`만 사용합니다. 백엔드 연동 시 API·DB로 이전해야 합니다.

3. **상담 폼**  
   제출 데이터가 서버로 전송되지 않습니다. 백엔드 API 연결 전에는 실제 상담 접수가 되지 않습니다.

## SEO·배포

- `npm run build` 후 `dist/`를 호스팅합니다.
- **도메인 변경 시:** `vite.config.js` (`hostname`), `index.html` (canonical, Organization URL) 수정.
- GitHub Pages 등 SPA 호스팅 시 **history fallback** 설정 필요할 수 있습니다.

## 이미지

- 개발: `자료/images/`에 두면 Vite 미들웨어로 `/자료/images/` 서빙.
- 배포: 빌드 시 `dist/자료/images/`로 복사됨. `public/자료/images/`에 직접 넣어도 됩니다.

## Git 푸시 (로컬)

Cursor 터미널에서 한글 경로가 깨질 수 있으므로, **프로젝트 폴더를 탐색기에서 연 뒤** 주소창에 `cmd` 입력 후:

```bat
git init
git add .
git commit -m "Initial: Metacosmos OTT landing"
git branch -M main
git remote add origin https://github.com/rohuni/ott.git
git push -u origin main
```

또는 **GitHub Desktop**으로 해당 폴더를 열어 푸시하세요.
