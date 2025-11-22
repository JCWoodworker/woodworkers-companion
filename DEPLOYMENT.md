# 🚀 Deployment Guide

Quick reference for deploying The Woodworker's Companion to all platforms.

---

## 🆕 New App Listing Strategy

We are deploying this as a **brand new app** on both stores to avoid legacy key issues.

- **Package Name**: `com.jfc3303.woodworkerscompanionapp`
- **Version Code**: Starts at 1
- **Signing**: Managed automatically by EAS (new keys generated)

**No keystore migration is required.** EAS will handle everything.

---

## 📱 Android (Google Play Store)

### One-Step Build & Submit (Recommended)

```bash
./scripts/deploy-play-store.sh
```

This script handles version bumping, building, and submitting to the 'internal' track automatically.

### Manual Build

```bash
# Bump version first
npm run version:patch  # or minor/major

# Build AAB for Play Store
npm run build:android:production
```

### Submit to Google Play

1. Go to [Google Play Console](https://play.google.com/console)
2. **Create App** (New App)
3. Production (or Testing) → Create Release
4. Upload the `.aab` file
5. Fill in release notes
6. Submit for review

### Required for Submission

- ✅ Privacy Policy URL: `https://your-site.netlify.app/privacy-policy`
- ✅ Screenshots (5-8 images)
- ✅ Feature graphic (1024×500px)
- ✅ App icon (512×512px)
- ✅ Contact email

**See `GOOGLE_PLAY_GUIDE.md` for Data Safety form details**

---

## 🍎 iOS (App Store)

### One-Step Build & Submit

```bash
./scripts/deploy-app-store.sh
```

### Manual Build

```bash
# Build for App Store
npm run build:ios:production
```

### Submit to App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. **Create New App**
   - Bundle ID: `com.jfc3303.woodworkerscompanionapp`
3. Upload build via Transporter or EAS auto-submit
4. Submit for TestFlight or App Store review

---

## 🌐 Web (Netlify)

### Build for Web

```bash
# Build static site
npm run build:web

# Test locally
npm run preview:web
```

### Deploy to Netlify

**Option 1: CLI**

```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Option 2: GitHub Auto-Deploy**

```bash
git push
# Auto-deploys via Netlify integration
```

**Result**: Live at `https://your-site.netlify.app`

---

## 🚢 Master Deployment (All Platforms)

Deploy to Android, iOS, and Web simultaneously:

```bash
./scripts/ship-it.sh
```

---

## 🔢 Version Management

Always bump version before building for production:

```bash
# Bug fixes (1.0.0 → 1.0.1)
npm run version:patch

# New features (1.0.0 → 1.1.0)
npm run version:minor

# Breaking changes (1.0.0 → 2.0.0)
npm run version:major
```

This updates:

- `package.json`
- `app.json`
- `android/app/build.gradle`
- Android versionCode (auto-increments)

---

## 📚 Additional Resources

- **Google Play Guide**: `GOOGLE_PLAY_GUIDE.md` - Data Safety form details
- **Privacy Policy**: `PRIVACY_POLICY.md` - Full legal document
- **README**: `README.md` - Project documentation
