@REM filepath: d:\advocate\advocate-website\setup.bat
@echo off
echo Setting up Advocate Website...

echo Installing client dependencies...
cd client
call npm install
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p

echo Installing server dependencies...
cd ..\server
call npm install

echo Setup complete!
echo.
echo To run the application:
echo 1. Double-click start-dev.bat
echo OR manually:
echo 2. Start server: cd server && npm start
echo 3. Start client: cd client && npm start
pause