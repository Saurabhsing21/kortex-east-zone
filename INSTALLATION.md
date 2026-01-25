# Node.js Installation & Setup Guide

## ⚠️ Node.js Not Found

Node.js and npm are required to run this application but are not currently installed on your system.

## 📥 Install Node.js

### Option 1: Using Official Installer (Recommended)

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version
   - Choose the Windows Installer (.msi) - 64-bit

2. **Run the Installer:**
   - Double-click the downloaded file
   - Follow the installation wizard
   - **Important:** Keep "Automatically install necessary tools" checked
   - Click "Install" (may require administrator privileges)

3. **Verify Installation:**
   - Open a **new** PowerShell window
   - Run:
     ```powershell
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v18.x.x and 9.x.x)

### Option 2: Using Winget (Windows Package Manager)

If you have winget installed:

```powershell
winget install OpenJS.NodeJS.LTS
```

Then restart your terminal and verify:
```powershell
node --version
npm --version
```

## ✅ After Node.js Installation

Once Node.js is installed, return here and run these commands:

### 1. Install Backend Dependencies

```powershell
cd C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\backend
npm install
```

### 2. Install Frontend Dependencies

```powershell
cd C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\frontend
npm install
```

### 3. Configure Environment Variables

The `.env` files have been created for you. You need to fill them with your API keys:

#### Backend Configuration

Edit: `C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\backend\.env`

```env
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### Frontend Configuration

Edit: `C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\frontend\.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

### 4. Get API Keys

You need accounts with these services (both have free tiers):

#### Clerk (Authentication) - https://clerk.com
1. Sign up and create a new application
2. Go to "API Keys" and copy:
   - Publishable Key (starts with `pk_test_`)
   - Secret Key (starts with `sk_test_`)
3. Go to "Users" and create two users:
   - **Admin:** Username: `Eastzone`, Password: `Koel@123`
     - Add to Public Metadata: `{"role": "admin"}`
   - **User:** Username: `Dealereastzone`, Password: `Dealer@123`
     - Add to Public Metadata: `{"role": "user"}`

#### Cloudinary (Video Storage) - https://cloudinary.com
1. Sign up for a free account
2. From your dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

### 5. Run the Application

**Terminal 1 - Start Backend:**
```powershell
cd C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\backend
npm start
```

**Terminal 2 - Start Frontend:**
```powershell
cd C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\frontend
npm run dev
```

### 6. Access the Application

Open your browser and navigate to: **http://localhost:3000**

## 🎯 Quick Reference

| What | Where |
|------|-------|
| Project Location | `C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone` |
| Backend .env | `backend\.env` |
| Frontend .env | `frontend\.env` |
| Backend runs on | http://localhost:5000 |
| Frontend runs on | http://localhost:3000 |
| Admin Login | Username: `Eastzone`, Password: `Koel@123` |
| User Login | Username: `Dealereastzone`, Password: `Dealer@123` |

## 📝 Current Setup Status

✅ Backend .env file created (needs API keys)
✅ Frontend .env file created (needs API keys)
❌ Node.js not installed yet
❌ Dependencies not installed yet

## 🔄 Next Steps

1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Run `npm install` in both backend and frontend folders
4. Get Clerk and Cloudinary API keys
5. Fill in the .env files
6. Run the application!

## 💡 Need Help?

See the detailed guides:
- [README.md](file:///C:/Users/praga/.gemini/antigravity/scratch/kortex-east-zone/README.md) - Full documentation
- [SETUP_GUIDE.md](file:///C:/Users/praga/.gemini/antigravity/scratch/kortex-east-zone/SETUP_GUIDE.md) - Quick setup checklist
