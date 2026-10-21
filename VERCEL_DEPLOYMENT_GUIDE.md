# ReviewSphere — Vercel Deployment Guide

This project is fully configured for **1-click deployment on Vercel** as a unified full-stack application (React Vite Frontend + Serverless Express API).

---

## 🚀 Quick Deployment Options

### Option 1: Deploy via GitHub & Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure project for Vercel deployment"
   git push origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository (`BDA Products review project` / `reviewsphere`).
   - In **Project Settings**:
     - **Root Directory**: `./` (leave default, do NOT change to `client`)
     - **Framework Preset**: **Vite** (or **Other**)
     - **Build Command**: `cd client && npm install && npm run build` *(Already pre-configured in `vercel.json`)*
     - **Output Directory**: `client/dist` *(Already pre-configured in `vercel.json`)*
   - Click **Deploy**!

3. **That's it!**
   - Vercel will build the frontend assets into `client/dist`.
   - Vercel will deploy `/api` as a serverless function via `api/index.js`.
   - Your frontend and backend will be live under a single unified URL (e.g. `https://your-project.vercel.app`).

---

### Option 2: Deploy via Vercel CLI

1. Open your terminal in the project root:
   ```bash
   npx vercel
   ```
2. Follow the on-screen prompts:
   - **Set up and deploy?** -> `y`
   - **Which scope?** -> (Select your account)
   - **Link to existing project?** -> `n`
   - **What's your project's name?** -> `reviewsphere`
   - **In which directory is your code located?** -> `./`
3. For production deployment:
   ```bash
   npx vercel --prod
   ```

---

## 📁 How the Vercel Setup Works

- [vercel.json](file:///c:/BDA%20Products%20review%20project/vercel.json):
  - Builds the client frontend via `cd client && npm install && npm run build`.
  - Routes any `/api/*` call to the serverless function `api/index.js`.
  - Routes all SPA paths (`/dashboard`, `/review/submit`, `/analytics`, etc.) to `/index.html` to prevent 404 on refresh.
- [api/index.js](file:///c:/BDA%20Products%20review%20project/api/index.js):
  - Exports the Express application instance from `server/src/app.js` as a Vercel Serverless Function.
- [server/src/db.js](file:///c:/BDA%20Products%20review%20project/server/src/db.js):
  - Automatically detects the Vercel serverless environment.
  - Safely reads the bundled `store.json` and writes runtime changes to `/tmp/store.json`, preventing read-only filesystem errors (`EROFS`).
- [client/public/widget.js](file:///c:/BDA%20Products%20review%20project/client/public/widget.js):
  - Static widget script hosted directly on Vercel's global CDN for embedding on external customer websites.

---

## 💻 Running Locally

Both services are currently running on your system:
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api](http://localhost:5000/api)

To restart them later manually:
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start individually:
npm run server    # Backend on port 5000
npm run client    # Frontend on port 3000
```
