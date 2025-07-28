# 🚀 Quick Netlify Deployment Guide

## 5-Minute Setup Steps

### 1. Upload to GitHub
1. Go to [github.com/new](https://github.com/new)
2. Create repository: `weekend-budget-planner`
3. Make it **Public**
4. Upload your project files

### 2. Deploy on Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub → Select your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click "Deploy site"

### 3. Add API Key
1. In Netlify dashboard → Site settings → Environment variables
2. Add variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Google Gemini API key
3. Redeploy: Deploys tab → Trigger deploy

### 4. Done! 🎉
Your site is live at: `https://your-site-name.netlify.app`

## Files Already Configured ✅
- `netlify.toml` - Build configuration
- `netlify/functions/generate-plan.js` - API function
- `vite.config.netlify.ts` - Netlify-optimized build config

## What You Get
- ⚡ Fast global CDN
- 🔒 Free HTTPS SSL
- 🤖 Working AI budget planner
- 📱 Mobile responsive
- 🔄 Auto-updates from GitHub