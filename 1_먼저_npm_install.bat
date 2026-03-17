@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo [1/2] npm install 실행 중... (react-router-dom 등 패키지 설치)
echo.
call npm install
if errorlevel 1 (
  echo.
  echo 설치 실패. Node.js가 설치되어 있는지 확인하세요.
  pause
  exit /b 1
)
echo.
echo [2/2] 개발 서버 실행...
echo 브라우저에서 http://localhost:5173 열립니다.
echo.
call npm run dev
pause
