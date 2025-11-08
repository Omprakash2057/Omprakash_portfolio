# Portfolio Network Access Guide

## ✅ Your Portfolio is Now Running Successfully!

### 🌐 Access Links:

#### **Local Access (This Computer):**
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

#### **Network Access (Other Devices on Same WiFi):**
- **Frontend:** http://10.2.9.57:3000
- **Backend:** http://10.2.9.57:5000

### 📱 How to Access from Other Devices:

1. **Make sure both devices are on the same WiFi network**
2. **On any device (phone, tablet, another computer), open a web browser**
3. **Go to:** `http://10.2.9.57:3000`

### 🔧 Current Setup:
- ✅ React Frontend running on port 3000
- ✅ Node.js Backend running on port 5000
- ✅ Network access enabled
- ✅ All errors fixed
- ✅ Socket.io connection working

### �️ IMPORTANT - Firewall Setup:

**To allow access from other devices, run PowerShell as Administrator and execute:**

```powershell
# Navigate to your portfolio folder
cd "c:\Users\HP\OneDrive\Desktop\omprakash_portfolio"

# Run the firewall setup script
.\setup-firewall.ps1
```

**Or manually add firewall rules:**
```powershell
New-NetFirewallRule -DisplayName "Portfolio React App" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
New-NetFirewallRule -DisplayName "Portfolio Backend Server" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow
```

### 🚨 If Still Not Working:
1. **Run PowerShell as Administrator** (Right-click PowerShell → "Run as Administrator")
2. **Temporarily disable Windows Firewall** for testing:
   ```powershell
   Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False
   ```
3. **Re-enable firewall after testing:**
   ```powershell
   Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
   ```

## 🎉 Your Portfolio URL: http://10.2.9.57:3000