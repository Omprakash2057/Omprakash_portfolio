@echo off
echo Setting up custom domain for Omprakash Portfolio...
echo.
echo This will add 'omprakashportfolio' as a local domain
echo You will need to grant Administrator permissions
echo.
pause

PowerShell -Command "Start-Process PowerShell -ArgumentList '-ExecutionPolicy Bypass -File \"%~dp0setup-domain.ps1\"' -Verb RunAs"

echo.
echo Setup complete! You can now access your portfolio at:
echo http://omprakashportfolio:3001
echo.
pause
