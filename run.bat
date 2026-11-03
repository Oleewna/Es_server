@echo off
setlocal EnableExtensions

cd /d "%~dp0"

rem Kill stale listeners from previous runs before starting fresh.
for %%p in (3000 3001 3002 4000) do (
  for /f "tokens=5" %%a in ('netstat -ano -p tcp ^| findstr /R /C:":%%p " 2^>nul') do (
    if not "%%a"=="" taskkill /F /PID %%a >nul 2>&1
  )
)

start "Auth Service" /D "%~dp0backend\auth-service" cmd /k "npm install && node src\authserver.js"
start "Service" /D "%~dp0backend\service" cmd /k "npm install && node src\server.js"

set "PYTHON_EXE="
for %%v in (Python312 Python313 Python311 Python310 Python39 Python38) do (
  if exist "%LOCALAPPDATA%\Programs\Python\%%v\python.exe" set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\%%v\python.exe"
)
if not defined PYTHON_EXE set "PYTHON_EXE=python"
start "FBI Wanted Service" /D "%~dp0backend\fbi-service" cmd /k "\"%PYTHON_EXE%\" server.py"

start "Gateway" /D "%~dp0backend\gateway" cmd /k "npm install && node src\gateway.js"

pause