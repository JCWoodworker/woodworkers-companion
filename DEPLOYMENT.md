# 🚀 Deployment Guide

Quick reference for deploying The Woodworker's Companion to all platforms.

---

## 🔑 Important: Overwriting an Existing App

If you are updating an app that is already on the Google Play Store but was built from a different repository or project:

**You MUST sign the new version with the SAME keystore as the original app.**

### If you used EAS Build before:
1. Link this project to the **same Expo Project ID** in `app.json`.
2. Run `eas build` - EAS will automatically use the stored credentials.

### If you have the keystore file (.jks or .keystore):
1. Run `eas credentials`
2. Select "Android" > "Production" > "Keystore: Upload your own"
3. Follow the prompts to upload your original keystore file, alias, and passwords.

### If you LOST the keystore:
You must contact Google Play Support to reset your upload key. You cannot simply upload a new app with a different key; Google will reject it.

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
2. Production (or Testing) → Create Release
3. Upload the `.aab` file
4. Fill in release notes
5. Submit for review (1-7 days)

### Required for Submission
- ✅ Privacy Policy URL: `https://your-site.netlify.app/privacy-policy`
- ✅ Screenshots (5-8 images)
- ✅ Feature graphic (1024×500px)
- ✅ App icon (512×512px)
- ✅ Contact email

**See `GOOGLE_PLAY_GUIDE.md` for Data Safety form details**

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

**Option 3: Drag & Drop**
- Visit https://app.netlify.com/drop
- Drag `dist/` folder
- Instant deployment

**Result**: Live at `https://your-site.netlify.app`

---

## 🍎 iOS (App Store) - Future

```bash
# Build for App Store
npm run build:ios:production

# Submit via Xcode or Transporter
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

## 📦 Build Types

| Command | Output | Use For |
|---------|--------|---------|
| `build:android:apk` | APK | Testing, sharing |
| `build:android:production` | AAB | **Google Play** ✅ |
| `build:web` | Static HTML | **Netlify** ✅ |
| `build:ios:production` | IPA | App Store |

---

## 🔧 Typical Workflow

### For Google Play Release:

```bash
# 1. Run automated script
./scripts/deploy-play-store.sh

# OR Manual steps:
# 1. Bump version
npm run version:patch

# 2. Commit version bump
git add -A
git commit -m "chore: bump version to 1.0.2"
git tag v1.0.2

# 3. Build for Android
npm run build:android:production

# 4. Push to git
git push && git push --tags

# 5. Download AAB from Expo when ready

# 6. Upload to Play Console
```

### For Web Update:

```bash
# 1. Make changes
# 2. Test locally
npm run build:web
npm run preview:web

# 3. Deploy
git push  # If using GitHub auto-deploy
# OR
netlify deploy --prod  # If using CLI
```

---

## 🌐 URLs After Deployment

- **Web App**: `https://your-site.netlify.app`
- **Privacy Policy**: `https://your-site.netlify.app/privacy-policy`
- **Expo Dashboard**: `https://expo.dev`
- **Play Console**: `https://play.google.com/console`

---

## 📚 Additional Resources

- **Google Play Guide**: `GOOGLE_PLAY_GUIDE.md` - Data Safety form details
- **Privacy Policy**: `PRIVACY_POLICY.md` - Full legal document
- **README**: `README.md` - Project documentation

---

**Quick Deploy Commands:**
```bash
# Android Auto-Deploy
./scripts/deploy-play-store.sh

# Web
npm run build:web && netlify deploy --prod
```
