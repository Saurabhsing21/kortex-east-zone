# Quick Setup Guide - Kortex East Zone Video Portal

## ⚡ Quick Start (5 Minutes)

### Step 1: Get Your API Keys

#### Clerk (Authentication)
1. Visit https://clerk.com and sign up
2. Create a new application
3. Go to **API Keys** → Copy your keys:
   - Publishable Key (starts with `pk_`)
   - Secret Key (starts with `sk_`)

#### Cloudinary (Video Storage)
1. Visit https://cloudinary.com and sign up
2. From your dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret

### Step 2: Create Clerk Users

In your Clerk dashboard:

1. Go to **Users** → **Create User**

**Admin User:**
- Username: `Eastzone`
- Password: `Koel@123`
- Go to **Metadata** → **Public Metadata** → Add:
  ```json
  {
    "role": "admin"
  }
  ```

**Regular User:**
- Username: `Dealereastzone`
- Password: `Dealer@123`
- Go to **Metadata** → **Public Metadata** → Add:
  ```json
  {
    "role": "user"
  }
  ```

### Step 3: Configure Backend

```powershell
cd C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone\backend
npm install
copy .env.example .env
notepad .env
```

Edit `.env` with your credentials:
```env
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

### Step 4: Configure Frontend

```powershell
cd ..\frontend
npm install
copy .env.example .env
notepad .env
```

Edit `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Run the Application

**Terminal 1 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### Step 6: Access the App

Open browser: http://localhost:3000

## 🎯 Testing the Application

### As Admin
1. Click "Login as Admin"
2. Click "Upload Video" button
3. Select a video file and add a title
4. Upload and verify it appears in the grid
5. Click Play to watch
6. Click trash icon to delete

### As User
1. Logout (top right)
2. Click "Login as User"
3. Browse videos
4. Use search bar
5. Click Play to watch
6. Verify no upload/delete buttons shown

## 🐛 Common Issues

**Backend won't start:**
- Check that port 5000 is not in use
- Verify all environment variables are set correctly

**Can't login:**
- Ensure Clerk users are created with exact usernames/passwords
- Check that role metadata is set correctly

**Videos won't upload:**
- Verify Cloudinary credentials
- Check file size (max 100MB)
- Ensure file is a video format

**Frontend can't connect to backend:**
- Make sure backend is running on port 5000
- Check VITE_API_URL in frontend .env

## 📝 Credentials Reference

| Role  | Username         | Password    |
|-------|------------------|-------------|
| Admin | Eastzone         | Koel@123    |
| User  | Dealereastzone   | Dealer@123  |

## ✅ Checklist

Before running the app, ensure:

- [ ] Clerk account created
- [ ] Clerk application created
- [ ] Two users created in Clerk with correct roles
- [ ] Cloudinary account created
- [ ] Backend .env file configured
- [ ] Frontend .env file configured
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend server running (port 5000)
- [ ] Frontend dev server running (port 3000)

## 🚀 You're All Set!

Once you complete these steps, your Kortex East Zone Video Portal will be fully functional!

For detailed information, see [README.md](file:///C:/Users/praga/.gemini/antigravity/scratch/kortex-east-zone/README.md)
