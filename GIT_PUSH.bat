@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === GitHub: https://github.com/rohuni/ott ===
if not exist .git (
  git init
  git branch -M main
)
git add .
git status
set /p m="커밋 메시지 (Enter=기본): "
if "%m%"=="" set m=update: Metacosmos OTT landing
git commit -m "%m%" 2>nul || git commit -m "Initial: Metacosmos OTT landing"
git remote remove origin 2>nul
git remote add origin https://github.com/rohuni/ott.git
echo.
echo 다음 명령으로 푸시합니다: git push -u origin main
git push -u origin main
if errorlevel 1 (
  echo.
  echo [실패 시] GitHub 로그인: https://github.com/login
  echo Personal Access Token 사용 또는 GitHub Desktop으로 이 폴더를 열어 푸시하세요.
)
pause
