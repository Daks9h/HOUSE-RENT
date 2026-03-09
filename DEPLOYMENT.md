# Deployment Guide

## Frontend (Vercel)

### Setup
1. Go to [vercel.com](https://vercel.com) and sign up
2. Import your GitHub repository
3. Configure environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app`)

### Deploy
- Vercel auto-deploys on every push to main branch

---

## Backend (Railway/Render)

### Using Railway
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Add environment variables:
   - `PORT`: 5000
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Your JWT secret key

### Using Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables (same as Railway)
5. Build command: `npm install`
6. Start command: `node server.js`

---

## MongoDB Setup

1. Create free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Get connection string (MongoDB URI)
3. Add IP address to whitelist OR use 0.0.0.0/0 (less secure)
4. Use URI in backend environment variables

---

## Update Client API URL

After deploying backend, update `VITE_API_URL` in Vercel with your backend URL.

Example: `https://house-rent-backend.railway.app`
