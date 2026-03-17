# 메타코스모스 · 호텔·모텔 통합 OTT 랜딩

(주)메타코스모스 숙박업 대상 통합 OTT 홍보용 프론트엔드 (Vite + React + Tailwind).

**저장소:** [github.com/rohuni/ott](https://github.com/rohuni/ott)

## 실행

```bash
npm install
npm run dev
```

- 빌드: `npm run build` → `dist/` (sitemap·robots 포함)
- 이미지: `자료/images/` 또는 `public/자료/images/` — `predev`/`prebuild` 시 복사

## 페이지

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 |
| `/qna` | FAQ |
| `/blog` | 블로그 목록 |
| `/blog/:id` | 글 상세 |
| `/admin` | 블로그 관리 (데모용 로그인) |

## 중요 사항

→ **[docs/IMPORTANT.md](./docs/IMPORTANT.md)** 를 반드시 확인하세요.

## 도메인·SEO

- 실제 도메인 확정 후 `vite.config.js`의 `hostname`, `index.html`의 canonical·OG URL을 일괄 변경하세요.
