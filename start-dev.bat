
@REM filepath: d:\advocate\advocate-website\start-dev.bat
@echo off
echo Starting Advocate Website...

start "Server" cmd /k "cd /d %~dp0server && npm start"
timeout /t 3 /nobreak > nul
start "Client" cmd /k "cd /d %~dp0client && npm start"

echo Both servers are starting...
echo Server: http://localhost:5000
echo Client: http://localhost:3000
pause