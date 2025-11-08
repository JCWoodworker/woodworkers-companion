# 📦 Build & Distribution Guide

**The Woodworker's Companion - Build Instructions**

---

## Quick Answer to Your Question

Your current build (`eas build --platform android`) produces an **AAB (Android App Bundle)** file.

✅ **AAB is exactly what Google Play Console needs!**

However, if you want an APK for testing or direct distribution, use the commands below.

---

## Android Build Types

### AAB (Android App Bundle) - For Play Store

**What**: Optimized package that Google Play uses to generate device-specific APKs  
**Size**: Smaller download for users (Google optimizes per device)  
**Use For**: **Google Play Console submission** ✅

**Commands**:
```bash
# Production AAB (for Play Store)
npm run build:android:production

# Or directly:
eas build --platform android --profile production
```

**Output**: `.aab` file (e.g., `build-xxx.aab`)  
**Upload to**: Google Play Console → Production → Create Release

---

### APK (Android Package) - For Direct Install

**What**: Standalone installable file  
**Size**: Larger (contains all architectures)  
**Use For**: Testing, beta distribution, side-loading

**Commands**:
```bash
# Preview APK (for testing)
npm run build:android:apk

# Production APK (for direct distribution)
npm run build:android:production-apk

# Or directly:
eas build --platform android --profile preview  # APK
eas build --platform android --profile production-apk  # Production APK
```

**Output**: `.apk` file (e.g., `build-xxx.apk`)  
**Share via**: Email, Drive, TestFlight alternative services

---

## Local Builds (Build on Your Computer)

**Requires**: Android Studio + SDK installed

```bash
# Build APK locally (much faster, no queue)
npm run build:local:android

# Or directly:
eas build --platform android --profile preview --local
```

**Pros**: 
- No waiting in Expo queue
- Faster iterations
- Works offline

**Cons**:
- Requires local setup (Android Studio, SDK)
- Larger file (includes all build tools)

---

## iOS Builds

```bash
# Preview build (for TestFlight)
npm run build:ios:preview

# Production build (for App Store)
npm run build:ios:production

# Local iOS build (requires Mac + Xcode)
npm run build:local:ios
```

---

## Build Both Platforms

```bash
# Build for iOS + Android (production AAB for Android)
npm run build:all:production

# Or directly:
eas build --platform all --profile production
```

---

## Complete Build Commands Reference

### Preview/Testing Builds

| Command | Output | Use For |
|---------|--------|---------|
| `npm run build:android:apk` | APK | Testing, sharing with testers |
| `npm run build:android:aab` | AAB | Testing Play Store upload |
| `npm run build:ios:preview` | IPA | TestFlight |
| `npm run build:local:android` | APK | Local testing (fast) |

### Production Builds

| Command | Output | Use For |
|---------|--------|---------|
| `npm run build:android:production` | **AAB** | **Google Play Console** ✅ |
| `npm run build:android:production-apk` | APK | Direct distribution |
| `npm run build:ios:production` | IPA | App Store |
| `npm run build:all:production` | Both | Submit to both stores |

---

## What You Need for Each Store

### Google Play Console
**File Type**: AAB (Android App Bundle)  
**Command**: `npm run build:android:production`  
**Upload To**: Google Play Console → Release → Production  
**First Time**: Need to upload AAB (not APK)

### Apple App Store
**File Type**: IPA (iOS App)  
**Command**: `npm run build:ios:production`  
**Upload To**: App Store Connect → TestFlight or Production  
**Requires**: Apple Developer Account ($99/year)

---

## Build Profiles Explained

I've configured 5 build profiles in `eas.json`:

### 1. `development`
- **Purpose**: Development builds with dev tools
- **Output**: APK (Android), Development build (iOS)
- **Distribution**: Internal only

### 2. `preview`
- **Purpose**: Testing builds for QA/beta testers
- **Output**: **APK** (Android), IPA (iOS)
- **Distribution**: Internal (can share directly)

### 3. `preview-aab`
- **Purpose**: Test AAB upload to Play Console
- **Output**: **AAB** (Android)
- **Distribution**: Internal

### 4. `production`
- **Purpose**: **Official Play Store release**
- **Output**: **AAB** (Android), IPA (iOS)
- **Distribution**: Store submission
- **Auto-increment**: Version bumps automatically

### 5. `production-apk`
- **Purpose**: Production-quality APK for direct distribution
- **Output**: **APK** (Android)
- **Distribution**: Outside Play Store (e.g., your website)

---

## Recommended Workflow

### For Development/Testing
```bash
# Quick local build (if you have Android Studio)
npm run build:local:android

# Or cloud build APK (easier to share)
npm run build:android:apk
```

### For Google Play Console
```bash
# Production AAB (this is what you ran!)
npm run build:android:production

# Wait for build to complete on Expo servers
# Download the .aab file
# Upload to Play Console
```

### For Beta Testing (Outside Play Store)
```bash
# APK for direct sharing
npm run build:android:apk

# Share the APK file via email/Drive
# Testers install directly
```

### For App Store (iOS)
```bash
# TestFlight (beta)
npm run build:ios:preview

# App Store (production)
npm run build:ios:production
```

---

## Build Output Location

After `eas build` completes:

1. **Expo Dashboard**: https://expo.dev/accounts/[your-account]/projects/woodworkers-companion/builds
2. **Download**: Click build → Download button
3. **File**: 
   - Android AAB: `build-xxx.aab` (for Play Console)
   - Android APK: `build-xxx.apk` (for direct install)
   - iOS: `build-xxx.ipa` (for TestFlight/App Store)

---

## Quick Reference

**What you probably want:**

```bash
# For Google Play Store submission
npm run build:android:production
# → Gets you: AAB file for Play Console ✅

# For testing on devices (no Play Store)
npm run build:android:apk
# → Gets you: APK file to share with testers ✅

# For local testing (fastest)
npm run build:local:android
# → Builds on your computer (requires Android Studio) ✅
```

---

## Common Questions

### Q: Which file do I upload to Google Play Console?
**A**: AAB file from `npm run build:android:production` ✅

### Q: How do I test on my Android phone?
**A**: Use APK from `npm run build:android:apk` or local build

### Q: Can I distribute outside Play Store?
**A**: Yes! Use production APK: `npm run build:android:production-apk`

### Q: What's faster - APK or AAB?
**A**: Build time is the same. APK is easier to test (direct install).

### Q: Should I ever use AAB for testing?
**A**: Only if testing the Play Store upload process itself.

---

## Your Current Build

Since you ran: `eas build --platform android`

Without a profile, it defaults to `production` profile, which produces:
- **AAB file** ✅ Perfect for Play Console!

When it finishes:
1. Go to Expo dashboard
2. Download the `.aab` file
3. Upload to Google Play Console → Create Release
4. Done! ✅

---

## Next Steps

1. **Wait for current build to complete**
2. **Download the AAB file** from Expo dashboard
3. **Upload to Google Play Console**
4. **For testing**, build an APK: `npm run build:android:apk`

---

## Version Management

### Bumping Versions

Before building for production, you should bump the app version. The version bump script automatically updates:
- `package.json` version
- `app.json` expo version
- Android `versionCode` (increments by 1)
- iOS `buildNumber` (increments by 1)
- `android/app/build.gradle` version fields

**Commands**:
```bash
# Patch version (1.0.0 → 1.0.1) - Bug fixes
npm run version:patch

# Minor version (1.0.0 → 1.1.0) - New features
npm run version:minor

# Major version (1.0.0 → 2.0.0) - Breaking changes
npm run version:major
```

### Version Code vs Version Name

**Version Name** (e.g., "1.0.0"): Human-readable version  
**Version Code** (e.g., 2, 3, 4...): Internal integer that **must increase** with every Play Store upload

**Important**: Google Play requires `versionCode` to increment with **every** upload, regardless of patch/minor/major. The script handles this automatically by incrementing the version code by 1 every time.

### Typical Release Workflow

```bash
# 1. Bump version
npm run version:patch  # or minor/major

# 2. Review the changes
git diff

# 3. Commit the version bump
git add -A
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1

# 4. Build for production
npm run build:android:production

# 5. Push changes and tag
git push && git push --tags
```

### Auto-Increment in EAS (FYI)

Your `eas.json` has `"autoIncrement": true` for production builds, which means EAS will automatically bump the version code when building on their servers. However, using the version bump script keeps your source code in sync and gives you more control.

---

**Pro Tip**: Use `preview` profile (APK) for development/testing, `production` profile (AAB) only when submitting to Play Store!

