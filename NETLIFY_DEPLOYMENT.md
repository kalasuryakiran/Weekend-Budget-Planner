# 🚀 Deploy Weekend Budget Planner to Netlify

This guide will help you deploy your Weekend Budget Planner application to Netlify for free hosting with a custom domain.

## 📋 Prerequisites

1. **GitHub Account** - Create one at [github.com](https://github.com)
2. **Netlify Account** - Sign up at [netlify.com](https://netlify.com) using your GitHub account
3. **Google Gemini API Key** - Get from [Google AI Studio](https://aistudio.google.com/app/apikey)

## 🛠️ Step 1: Prepare Your Project

Your project already includes the necessary Netlify configuration files:
- `netlify.toml` - Netlify build and redirect configuration
- `netlify/functions/generate-plan.js` - Serverless function for API

## 🔧 Step 2: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Name it `weekend-budget-planner`
   - Make it **Public** (required for free Netlify hosting)
   - Click "Create repository"

2. **Upload your project files:**
   - Download your project as a ZIP file
   - Extract it locally
   - Upload all files to your GitHub repository

   **Or using Git commands:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/weekend-budget-planner.git
   git push -u origin main
   ```

## 🌐 Step 3: Deploy to Netlify

1. **Connect GitHub to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify

2. **Select your repository:**
   - Choose `weekend-budget-planner` from your repositories
   - Click on it

3. **Configure build settings:**
   - **Branch to deploy:** `main`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Deploy site"

## 🔑 Step 4: Add Environment Variables

1. **In Netlify Dashboard:**
   - Go to your site dashboard
   - Click "Site settings"
   - Click "Environment variables"
   - Click "Add a variable"

2. **Add your API key:**
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Google Gemini API key
   - **Scope:** All scopes
   - Click "Create variable"

## 🔄 Step 5: Redeploy

1. **Trigger a new deployment:**
   - Go to "Deploys" tab
   - Click "Trigger deploy"
   - Select "Deploy site"

## ✅ Step 6: Test Your Live Site

1. **Access your live website:**
   - Your site URL will be like: `https://random-name-123456.netlify.app`
   - You can change this to a custom name in site settings

2. **Test the budget planner:**
   - Enter budget and group details
   - Click "Generate Budget Plan"
   - Verify AI recommendations work

## 🎨 Optional: Custom Domain

1. **Buy a domain** (optional):
   - Purchase from any domain registrar
   - In Netlify, go to "Domain settings"
   - Click "Add custom domain"
   - Follow DNS configuration instructions

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Not Working
- Verify `GEMINI_API_KEY` is set correctly
- Check function logs in Netlify dashboard
- Ensure API key has proper permissions

### Site Not Loading
- Check redirect rules in `netlify.toml`
- Verify build output in `dist` folder
- Check browser console for errors

## 📱 Features After Deployment

- ✅ **Fast Global CDN** - Lightning-fast loading worldwide
- ✅ **HTTPS SSL** - Secure connection automatically
- ✅ **Serverless Functions** - AI API calls work seamlessly
- ✅ **Automatic Deployments** - Updates when you push to GitHub
- ✅ **Form Handling** - Contact forms work out of the box

## 🎉 Success!

Your Weekend Budget Planner is now live on the internet! Share your custom URL with friends and family to help them plan their weekend activities within budget.

**Live Features:**
- AI-powered budget recommendations
- Group-aware suggestions
- Real-time cost calculations
- Mobile-responsive design
- Fast loading times