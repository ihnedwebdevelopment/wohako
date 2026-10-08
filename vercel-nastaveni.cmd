@echo off
rem WOHAKO - vytvori .env.local, nainstaluje balicky a nasadi web na Vercel
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\vercel-nastaveni.ps1"
pause
