# Portfolio Firewall Setup Script
# Run this as Administrator to allow network access

Write-Host "Setting up Windows Firewall rules for Portfolio..." -ForegroundColor Green

# Allow React Development Server (port 3000)
try {
    New-NetFirewallRule -DisplayName "Portfolio React App" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow -ErrorAction Stop
    Write-Host "✅ React App (port 3000) - Firewall rule added" -ForegroundColor Green
} catch {
    Write-Host "⚠️  React App rule may already exist or needs admin privileges" -ForegroundColor Yellow
}

# Allow Node.js Backend Server (port 5000)
try {
    New-NetFirewallRule -DisplayName "Portfolio Backend Server" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow -ErrorAction Stop
    Write-Host "✅ Backend Server (port 5000) - Firewall rule added" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Backend Server rule may already exist or needs admin privileges" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Firewall setup complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your portfolio should now be accessible from other devices at:" -ForegroundColor White
Write-Host "http://10.2.9.57:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "If you still can't access from other devices:" -ForegroundColor Red
Write-Host "1. Make sure this script was run as Administrator" -ForegroundColor White
Write-Host "2. Check that both devices are on the same WiFi network" -ForegroundColor White
Write-Host "3. Try temporarily disabling Windows Firewall for testing" -ForegroundColor White