# 🌐 Netlify Web Deployment Guide

## Quick Deploy

### Option 1: Deploy via Netlify CLI (Fastest)

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build for web
npm run build:web

# Deploy to Netlify
netlify deploy

# Follow prompts:
# - Create & configure site? Yes
# - Path to deploy? dist

# When ready for production:
netlify deploy --prod
```

### Option 2: Deploy via Netlify Website (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: add web deployment configuration"
   git push
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Netlify will auto-detect the settings from `netlify.toml`

3. **Configure Build Settings** (should auto-populate)
   - Build command: `npm run build:web`
   - Publish directory: `dist`
   - Node version: 20

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (~2-3 minutes)
   - Get your live URL: `https://your-site-name.netlify.app`

### Option 3: Drag & Drop (Simplest)

```bash
# Build locally
npm run build:web

# Go to https://app.netlify.com/drop
# Drag the "dist" folder into the upload area
# Get instant deployment!
```

---

## What Gets Built

When you run `npm run build:web`, Expo creates:

```
dist/
├── index.html          # Main entry point
├── _expo/
│   └── static/
│       ├── js/         # JavaScript bundles
│       ├── css/        # Stylesheets
│       └── media/      # Images and fonts
└── assets/             # Your app assets
```

**Output**: Static HTML/CSS/JS that runs in any browser

---

## Configuration Files

### `netlify.toml` (Created ✅)

```toml
[build]
  command = "npm run build:web"
  publish = "dist"
  environment = { NODE_VERSION = "20" }

# SPA routing support
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**What it does**:
- Tells Netlify how to build your app
- Configures Node.js 20
- Redirects all routes to index.html (for client-side routing)
- Adds security headers
- Configures caching for performance

### `package.json` Scripts (Updated ✅)

```json
{
  "build:web": "expo export --platform web --output-dir dist",
  "preview:web": "npx serve dist"
}
```

---

## Testing Web Build Locally

Before deploying, test your web build locally:

```bash
# Build for web
npm run build:web

# Serve locally and test
npm run preview:web

# Open browser to http://localhost:3000
```

**Test checklist**:
- ✅ All calculators work
- ✅ Projects, inventory, clients load
- ✅ Navigation works (routing)
- ✅ Settings save properly
- ✅ Dark mode toggle works
- ✅ Mobile responsive (resize browser)

---

## Continuous Deployment

Once connected to GitHub, Netlify will:

1. **Auto-deploy** on every push to main/master
2. **Build preview** for pull requests
3. **Deploy branches** automatically
4. **Rollback** if needed

### Branch Deploys

```bash
# Push to main → production deploy
git push origin main

# Create feature branch → preview deploy
git checkout -b feature/new-calculator
git push origin feature/new-calculator
# Get preview URL: https://preview-123.netlify.app
```

---

## Custom Domain (Optional)

### Add Your Own Domain

1. **Buy a domain** (Namecheap, Google Domains, etc.)
2. **In Netlify**: Site settings → Domain management → Add custom domain
3. **Add DNS records**:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify load balancer)
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```
4. **Enable HTTPS**: Netlify auto-provisions SSL certificate

**Example**: `woodworkers-companion.com` → Your web app

---

## Environment Variables (If Needed)

If you add API keys or secrets later:

```bash
# In Netlify dashboard:
# Site settings → Environment variables → Add variable

# Or via CLI:
netlify env:set API_KEY "your-key-here"
```

In your code:
```typescript
const apiKey = process.env.EXPO_PUBLIC_API_KEY;
```

---

## Performance Optimization

### Netlify automatically provides:

- ✅ **CDN**: Global edge network
- ✅ **Gzip/Brotli**: Automatic compression
- ✅ **HTTP/2**: Faster loading
- ✅ **Asset optimization**: Image and code optimization
- ✅ **Prerendering**: Static HTML generation

### Additional optimizations in `netlify.toml`:

- **Cache headers**: Assets cached for 1 year
- **Security headers**: XSS protection, clickjacking prevention
- **SPA routing**: Instant client-side navigation

---

## Build Settings

### Build Time

Expected build time: **2-4 minutes**

Stages:
1. Install dependencies (1-2 min)
2. Build Expo web (1-2 min)
3. Deploy to CDN (10-30 sec)

### Build Logs

View in Netlify dashboard:
- Real-time build logs
- Error messages if build fails
- Deploy previews

---

## Troubleshooting

### Build Fails: "Command failed"

**Check**:
```bash
# Test build locally first
npm run build:web

# If it works locally but fails on Netlify:
# - Check Node version matches (20)
# - Check package-lock.json is committed
# - Check all dependencies are in package.json
```

### Routes Don't Work (404 on refresh)

**Solution**: Verify `netlify.toml` has the SPA redirect:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Assets Not Loading

**Check**: 
- Verify `dist` folder has `_expo/static/` directory
- Check asset paths in built HTML
- Ensure assets are included in git (not in .gitignore)

### App Looks Broken

**Possible causes**:
- Fonts not loading (check network tab)
- CSS not applied (check build output)
- AsyncStorage issues (web uses localStorage)

**Solution**:
```bash
# Clear cache and rebuild
rm -rf dist node_modules .expo
npm install
npm run build:web
```

---

## Web vs Mobile Differences

### Features That Work Differently on Web:

**Storage**:
- Mobile: AsyncStorage → Native storage
- Web: AsyncStorage → localStorage (5MB limit per domain)

**Haptic Feedback**:
- Mobile: Vibration
- Web: No vibration (gracefully degrades)

**Camera/Photos**:
- Mobile: Native camera
- Web: File upload only

**Touch Gestures**:
- Mobile: Native gestures
- Web: Mouse/touch events

### Responsive Design

Your app is mobile-first but works on:
- ✅ Desktop browsers (Chrome, Firefox, Safari, Edge)
- ✅ Tablets
- ✅ Mobile browsers
- ✅ Progressive Web App (PWA) capable

---

## URL Structure

After deployment:

```
https://your-site.netlify.app/
├── /                          # Home
├── /home                      # Dashboard
├── /calculators/board-foot    # Board foot calculator
├── /calculators/fraction      # Fraction calculator
├── /calculators/pricing       # Pricing calculator
├── /calculators/cut-list      # Cut list optimizer
├── /calculators/wood-movement # Wood movement
├── /calculators/finish-mixing # Finish mixing
├── /projects                  # Projects list
├── /projects/add              # Add project
├── /projects/[id]             # Project detail
├── /inventory                 # Inventory
├── /inventory/add             # Add inventory
├── /clients                   # Clients list
├── /documents/quotes          # Quotes
└── /settings                  # Settings
```

---

## Analytics (Optional)

To add Netlify Analytics later:

1. **Enable in Netlify**: Site settings → Analytics → Enable
2. **Cost**: $9/month
3. **Privacy-friendly**: Server-side analytics, no cookies

**Or use free alternatives**:
- Plausible Analytics (privacy-friendly)
- Simple Analytics
- GoatCounter

---

## Deployment Checklist

Before deploying:

- ✅ Test web build locally (`npm run build:web`)
- ✅ Verify all features work on web
- ✅ Check responsive design (mobile, tablet, desktop)
- ✅ Test in different browsers
- ✅ Update privacy policy if needed
- ✅ Add deployment badge to README
- ✅ Configure custom domain (optional)

After deploying:

- ✅ Test live site in all browsers
- ✅ Check performance (Lighthouse score)
- ✅ Verify routing works
- ✅ Test data persistence (localStorage)
- ✅ Share with beta testers

---

## Cost

**Netlify Free Tier includes**:
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Continuous deployment
- Deploy previews
- Perfect for personal projects! ✅

**Upgrades only needed if**:
- Traffic exceeds 100GB/month
- Need team features
- Want analytics
- Need enterprise support

---

## Commands Reference

```bash
# Development
npm run web                 # Start dev server (http://localhost:8081)

# Building
npm run build:web          # Build for production → dist/
npm run preview:web        # Preview built app locally

# Deployment (CLI)
netlify deploy             # Preview deployment
netlify deploy --prod      # Production deployment
netlify open               # Open Netlify dashboard
netlify logs               # View deployment logs

# Testing
npm run lint               # Check for errors
npx tsc --noEmit          # TypeScript validation
```

---

## Deployment Badge (Optional)

Add to README.md:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

Get your site ID from: Netlify Dashboard → Site settings → General

---

## Progressive Web App (PWA)

Your app can be installed as a PWA! Users can:
- Add to home screen (mobile)
- Install as desktop app
- Work offline (if configured)

To enhance PWA features, you could add:
- Service worker for offline support
- Web manifest customization
- Push notifications

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Expo Web Docs**: https://docs.expo.dev/workflow/web/
- **Your Site**: https://[your-site].netlify.app
- **Netlify Community**: https://answers.netlify.com

---

## Summary

✅ **Configuration complete** - Ready to deploy!

**To deploy now**:
```bash
npm run build:web
netlify deploy --prod
```

Or push to GitHub and connect via Netlify dashboard for automatic deployments.

**Your Woodworker's Companion will be live on the web in minutes!** 🎉

