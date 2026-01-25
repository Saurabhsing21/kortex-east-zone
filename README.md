# Kortex East Zone - Video Portal

A full-stack video management portal with role-based access control, built with React, Node.js, Clerk authentication, and Cloudinary storage.

## 🚀 Features

- **Role-Based Authentication** (Admin & User roles)
- **Video Upload** (Admin only) - Upload videos to Cloudinary
- **Video Playback** - Stream videos with built-in player
- **Search Functionality** - Filter videos by title
- **Video Management** (Admin only) - Delete videos
- **Modern UI** - Built with React, Tailwind CSS, and Lucide icons
- **Secure** - JWT-based authentication via Clerk

## 📋 Prerequisites

Before you begin, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Clerk account (https://clerk.com)
- A Cloudinary account (https://cloudinary.com)

## 🔑 Login Credentials

### Admin
- **Username:** Eastzone
- **Password:** Koel@123
- **Permissions:** Upload, view, delete, and search videos

### User
- **Username:** Dealereastzone
- **Password:** Dealer@123
- **Permissions:** View and search videos only

## 🛠️ Setup Instructions

### 1. Clone or Download the Project

Navigate to the project directory:
```bash
cd C:\Users\praga\.gemini\antigravity\scratch\kortex-east-zone
```

### 2. Set Up Clerk Authentication

1. Go to https://clerk.com and create a free account
2. Create a new application
3. In your Clerk dashboard:
   - Go to "API Keys" and copy your **Publishable Key** and **Secret Key**
   - Go to "Users" and create two users:
     - **Admin user:**
       - Username: `Eastzone`
       - Password: `Koel@123`
       - In "Metadata" → "Public Metadata", add: `{"role": "admin"}`
     - **Regular user:**
       - Username: `Dealereastzone`
       - Password: `Dealer@123`
       - In "Metadata" → "Public Metadata", add: `{"role": "user"}`

### 3. Set Up Cloudinary

1. Go to https://cloudinary.com and create a free account
2. From your dashboard, note down:
   - Cloud Name
   - API Key
   - API Secret

### 4. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

Edit `backend\.env` and add your credentials:
```env
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 5. Frontend Setup

```bash
cd ..\frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

Edit `frontend\.env` and add your Clerk publishable key:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend will run on http://localhost:5000

### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on http://localhost:3000

### Access the Application

Open your browser and navigate to: http://localhost:3000

## 📁 Project Structure

```
kortex-east-zone/
├── backend/
│   ├── config/
│   │   └── cloudinary.js        # Cloudinary configuration
│   ├── data/
│   │   └── videos.json          # Video metadata storage
│   ├── middleware/
│   │   └── auth.js              # Clerk authentication middleware
│   ├── routes/
│   │   └── videos.js            # Video API endpoints
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # App header with branding
│   │   │   ├── VideoCard.jsx    # Video thumbnail card
│   │   │   ├── VideoPlayer.jsx  # Video playback modal
│   │   │   └── VideoUpload.jsx  # Video upload form
│   │   ├── pages/
│   │   │   ├── Landing.jsx      # Landing page with login options
│   │   │   └── Dashboard.jsx    # Main dashboard
│   │   ├── App.jsx              # Router and route configuration
│   │   ├── main.jsx             # App entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── README.md
```

## 🎯 API Endpoints

### Videos

- `GET /api/videos` - Get all videos (Requires authentication)
- `POST /api/videos/upload` - Upload a video (Admin only)
- `DELETE /api/videos/:publicId` - Delete a video (Admin only)

### Health Check

- `GET /api/health` - Server health check

## 🔒 Role-Based Access Control

The application implements role-based access control using Clerk's metadata feature:

- **Admin Role** (`role: "admin"` in publicMetadata):
  - Can upload videos
  - Can delete videos
  - Can view and search all videos

- **User Role** (`role: "user"` in publicMetadata):
  - Can view all videos
  - Can search videos
  - Cannot upload or delete videos

## 🎨 Technologies Used

### Backend
- Node.js
- Express.js
- Clerk SDK (Authentication)
- Cloudinary SDK (Video storage)
- Multer (File uploads)

### Frontend
- React 18
- Vite
- Tailwind CSS
- Clerk React (Authentication)
- React Router DOM
- Axios (HTTP client)
- Lucide React (Icons)

## 📝 Usage Guide

### Admin Workflow

1. Click "Login as Admin" on the landing page
2. You'll be redirected to the dashboard
3. Click "Upload Video" button
4. Enter video title and select a video file
5. Click "Upload Video" and wait for the upload to complete
6. The video will appear in the video grid
7. Click "Play" to watch the video
8. Click the trash icon to delete a video

### User Workflow

1. Click "Login as User" on the landing page
2. You'll be redirected to the dashboard
3. Browse available videos
4. Use the search bar to filter videos by title
5. Click "Play" to watch any video
6. Upload and delete buttons will not be visible

## 🐛 Troubleshooting

### Backend Issues

- **Port already in use:** Change the PORT in `backend\.env`
- **Cloudinary upload fails:** Verify your Cloudinary credentials
- **Authentication fails:** Check your Clerk secret key

### Frontend Issues

- **Videos don't load:** Make sure backend is running on port 5000
- **Can't login:** Verify Clerk users are created with correct roles
- **Build errors:** Delete `node_modules` and run `npm install` again

## 📄 License

This project is created for demonstration purposes.

## 🤝 Support

For issues or questions:
1. Check that all environment variables are correctly set
2. Verify both backend and frontend servers are running
3. Check browser console for error messages
4. Ensure Clerk users have the correct role metadata

## 🎉 Next Steps

- Add video categories/tags
- Implement user comments
- Add video thumbnails customization
- Implement video analytics
- Add user profile management
- Deploy to production (Vercel for frontend, Railway/Heroku for backend)
