# 🌐 Web Deployment Checklist

## Pre-Deployment

- [ ] Test web build locally
  ```bash
  npm run build:web
  npm run preview:web
  ```

- [ ] Update privacy policy contact info
  - Replace `[Your email address]` in PRIVACY_POLICY.md
  - Replace `[Your name or company name]` in PRIVACY_POLICY.md
  - Update app/privacy-policy.tsx with same info

- [ ] Test in multiple browsers
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] Test responsive design
  - [ ] Mobile (375px width)
  - [ ] Tablet (768px width)
  - [ ] Desktop (1200px+ width)

- [ ] Verify all features work
  - [ ] All 6 calculators
  - [ ] Project CRUD
  - [ ] Inventory add/edit/delete
  - [ ] Client management
  - [ ] Quote generation
  - [ ] Settings (Hobbyist/Professional/Custom modes)
  - [ ] Dark mode toggle

- [ ] Check data persistence
  - [ ] Add data, refresh page, verify data persists
  - [ ] localStorage working correctly

## Deployment Steps

### Method 1: Netlify CLI
```bash
# Install CLI (one time)
npm install -g netlify-cli

# Login (one time)
netlify login

# Build
npm run build:web

# Deploy
netlify deploy --prod

# Or use helper script
./scripts/deploy-web.sh
```

### Method 2: GitHub Auto-Deploy
```bash
# Push to GitHub
git add .
git commit -m "feat: web deployment ready"
git push

# On Netlify.com
# 1. New site from Git
# 2. Select repo
# 3. Auto-deploys on every push
```

### Method 3: Drag & Drop
```bash
# Build locally
npm run build:web

# Visit https://app.netlify.com/drop
# Drag "dist" folder
# Get instant URL
```

## Post-Deployment

- [ ] Visit deployed URL
- [ ] Test all routes
  - [ ] `/` - Home/landing
  - [ ] `/home` - Dashboard
  - [ ] `/calculators/*` - All calculators
  - [ ] `/projects` - Projects
  - [ ] `/inventory` - Inventory
  - [ ] `/clients` - Clients
  - [ ] `/settings` - Settings
  - [ ] `/privacy-policy` - Privacy policy

- [ ] Test privacy policy page
  - [ ] Accessible at `/privacy-policy`
  - [ ] Content displays correctly
  - [ ] Formatting looks good
  - [ ] Contact info is correct

- [ ] Check performance
  - [ ] Run Lighthouse audit
  - [ ] Target: 90+ performance score
  - [ ] Ensure fast load times

- [ ] Configure custom domain (optional)
  - [ ] Buy domain
  - [ ] Add to Netlify
  - [ ] Configure DNS
  - [ ] Enable HTTPS

- [ ] Set up monitoring
  - [ ] Netlify email alerts for failed builds
  - [ ] Uptime monitoring (optional)

## Privacy Policy Hosting

Your privacy policy is now available at:
- **Web App**: `https://your-site.netlify.app/privacy-policy`
- **Direct Link**: Use this URL in Google Play Console

✅ No need for separate hosting - it's part of your web app!

## Google Play Store Update

When submitting to Google Play:

1. **Privacy Policy URL**: 
   - Use: `https://your-site.netlify.app/privacy-policy`
   - This is required for Play Store submission

2. **Data Safety Form**:
   - Follow instructions in `GOOGLE_PLAY_DATA_SAFETY.md`
   - Reference privacy policy URL

## Netlify Settings (Recommended)

After deployment:

1. **Site Name**:
   - Change from random name to: `woodworkers-companion`
   - URL becomes: `https://woodworkers-companion.netlify.app`

2. **Build Settings**:
   - Should auto-detect from `netlify.toml`
   - Verify: Build command = `npm run build:web`
   - Verify: Publish directory = `dist`

3. **Environment**:
   - Node version = 20 (set in netlify.toml)

4. **Domain**:
   - Add custom domain if you have one
   - Enable HTTPS (automatic)

## Maintenance

### Updating the Web App

```bash
# Make changes to code
# Test locally
npm run build:web
npm run preview:web

# If using GitHub auto-deploy
git add .
git commit -m "feat: update feature X"
git push
# Auto-deploys in 2-3 minutes

# If using CLI
npm run build:web
netlify deploy --prod
```

### Rolling Back

If something breaks:

```bash
# Via CLI
netlify rollback

# Or in Netlify Dashboard
# Deploys → Pick previous deploy → Publish
```

## Success Criteria

Your deployment is successful when:

- ✅ Web app loads at your Netlify URL
- ✅ All routes work correctly
- ✅ Privacy policy accessible at `/privacy-policy`
- ✅ Data persists across page refreshes
- ✅ Responsive on mobile, tablet, desktop
- ✅ Dark mode works
- ✅ No console errors
- ✅ Fast load time (<3 seconds)

## URLs for Reference

After deployment, you'll have:

- **Web App**: `https://your-site.netlify.app`
- **Privacy Policy**: `https://your-site.netlify.app/privacy-policy`
- **Netlify Dashboard**: `https://app.netlify.com/sites/your-site`
- **Build Logs**: `https://app.netlify.com/sites/your-site/deploys`

## Next Steps

1. ✅ Web deployment configured
2. ✅ Privacy policy page created
3. ✅ Build scripts added
4. ✅ Documentation complete

**Ready to deploy!**

```bash
npm run build:web
netlify deploy --prod
```

Or use the interactive script:
```bash
./scripts/deploy-web.sh
```

🎉 Your app will be live on the web!

