@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"

REM public 폴더가 없으면 새로 만듭니다
if not exist "public" (
  mkdir "public"
  mkdir "public\자료\images" 2>nul
)

REM 탐색기에서 잘 보이도록 안내 파일 생성
echo 이 폴더가 웹사이트용 public 폴더입니다. > "public\★_PUBLIC_폴더_맞음.txt"
echo 이미지는 public\자료\images 에 넣거나, 자료\images 에 넣은 뒤 npm run dev 하세요. >> "public\★_PUBLIC_폴더_맞음.txt"

echo.
echo public 폴더를 탐색기로 엽니다:
echo %cd%\public
echo.

start "" explorer "%cd%\public"
timeout /t 2 >nul
