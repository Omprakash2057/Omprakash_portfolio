# PowerShell script to add custom domain to hosts file
# Run this as Administrator

$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$domain = "127.0.0.1    omprakashportfolio"

# Check if the entry already exists
$hostsContent = Get-Content $hostsPath
if ($hostsContent -notcontains $domain) {
    # Add the new entry
    Add-Content -Path $hostsPath -Value $domain
    Write-Host "✅ Successfully added omprakashportfolio to hosts file" -ForegroundColor Green
    Write-Host "🌐 You can now access your portfolio at: http://omprakashportfolio:3001" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Domain already exists in hosts file" -ForegroundColor Yellow
}

# Display current hosts content for verification
Write-Host "`n📄 Current hosts file content:" -ForegroundColor Magenta
Get-Content $hostsPath | Select-Object -Last 10
