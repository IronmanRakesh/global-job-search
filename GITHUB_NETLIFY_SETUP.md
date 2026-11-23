# Global Job Search — GitHub + Netlify Auto-Deploy Setup

This guide walks you through setting up automatic deployments: push to GitHub → Netlify builds and deploys automatically.

---

## Prerequisites (One-Time Setup)

### 1. Install Git
- Download: https://git-scm.com/download/win
- Run installer, accept defaults
- **Restart your terminal/PowerShell after install**

### 2. Install GitHub CLI (Optional but Recommended)
- Download: https://cli.github.com/
- Or via winget: `winget install --id GitHub.cli`
- After install: `gh auth login` (follow prompts to authenticate)

### 3. Create GitHub Account (if needed)
- Go to: https://github.com/signup

---

## Step 1: Initialize Local Git Repo

Open PowerShell in the project folder:
```powershell
cd "C:\Users\ASUS\Downloads\Global Job Search"
git init
git add .
git commit -m "Initial commit: Global Job Search website"
```

---

## Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (Easiest)
```powershell
gh repo create global-job-search --public --source=. --remote=origin --push
```
This creates the repo, adds remote, and pushes in one command.

### Option B: Manual on GitHub.com
1. Go to https://github.com/new
2. Repository name: `global-job-search`
3. Public/Private: Your choice
4. **Don't** initialize with README, .gitignore, or license (we already have them)
5. Click "Create repository"
6. Run these commands:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/global-job-search.git
git branch -M main
git push -u origin main
```

---

## Step 3: Connect to Netlify

### Option A: Netlify Dashboard (Recommended)
1. Go to https://app.netlify.com/start
2. Click **"Import an existing project"** → **"GitHub"**
3. Authorize Netlify to access your GitHub account
4. Select `global-job-search` repository
4. Build settings (auto-detected, but verify):
   - **Build command**: Leave empty (static site)
   - **Publish directory**: `.` (root)
   - **Functions directory**: Leave empty
5. Click **"Deploy site"**

### Option B: Netlify CLI
```powershell
npm install -g netlify-cli
netlify login
netlify init
# Select "Use existing GitHub repo"
# Select your repo
# Build command: (empty)
# Publish directory: .
```

---

## Step 4: Configure Custom Domain (Optional)

In Netlify Dashboard → **Domain settings** → **Add custom domain**
- Example: `jobs.yourdomain.com`
- Add DNS records as instructed (CNAME for subdomain, A + CNAME for apex)

---

## Step 5: Verify Auto-Deploy Works

1. Make a small change (e.g., edit `index.html`, change a color)
2. Commit and push:
```powershell
git add .
git commit -m "Test auto-deploy"
git push
```
3. Check Netlify dashboard — it should show "Building..." then "Published"
4. Visit your live URL to confirm

---

## Your Live URLs

After first deploy:
- **Netlify URL**: `https://<random-name>.netlify.app` (customizable in Site settings)
- **Custom domain**: `https://jobs.yourdomain.com` (if configured)

---

## Future Updates Workflow

```powershell
# 1. Make changes to files
# 2. Commit and push
git add .
git commit -m "Description of changes"
git push

# 3. Netlify automatically:
#    - Detects push
#    - Builds (instant for static sites)
#    - Deploys to live URL
#    - Shows preview deploy for pull requests
```

---

## Netlify Features Enabled

Your `netlify.toml` includes:
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Asset caching (CSS/JS/immutable assets cached 1 year)
- ✅ SPA fallback (`/* /index.html 200`) for client-side routing
- ✅ No build step required

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `git` not found | Restart terminal after Git install |
| `gh auth login` fails | Use browser auth flow |
| Netlify build fails | Check Build log in Netlify dashboard |
| Custom domain not working | Verify DNS records propagated (`dig jobs.yourdomain.com`) |
| Changes not deploying | Check Netlify "Deploys" tab for build status |

---

## Files in This Repo

```
global-job-search/
├── index.html           # Main entry point
├── css/styles.css       # All styles (43KB)
├── js/app.js            # Application logic
├── js/data.js           # Job data & matching (500 jobs, 195 countries)
├── netlify.toml         # Netlify config (headers, redirects, caching)
├── _redirects           # SPA fallback
├── .gitignore           # Git ignore rules
└── GITHUB_NETLIFY_SETUP.md  # This file
```

---

## Support

- Netlify Docs: https://docs.netlify.com/
- GitHub CLI Manual: https://cli.github.com/manual/
- Git Handbook: https://guides.github.com/introduction/git-handbook/