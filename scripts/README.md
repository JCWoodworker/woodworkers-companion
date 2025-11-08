# Scripts

This directory contains utility scripts for the Woodworker's Companion project.

## Available Scripts

### `bump-version.js`

Bumps the app version across all relevant files in the project.

**Updates:**
- `package.json` - npm package version
- `app.json` - Expo version, Android versionCode, iOS buildNumber
- `android/app/build.gradle` - Android versionCode and versionName

**Usage:**

```bash
# Via npm scripts (recommended)
npm run version:patch   # 1.0.0 → 1.0.1
npm run version:minor   # 1.0.0 → 1.1.0
npm run version:major   # 1.0.0 → 2.0.0

# Or directly
node scripts/bump-version.js patch
node scripts/bump-version.js minor
node scripts/bump-version.js major
```

**Version Types:**
- **patch**: Bug fixes and minor changes (1.0.0 → 1.0.1)
- **minor**: New features, backwards compatible (1.0.0 → 1.1.0)
- **major**: Breaking changes (1.0.0 → 2.0.0)

**What it does:**
1. Updates semantic version (major.minor.patch) in package.json and app.json
2. Increments Android versionCode by 1 (required by Google Play)
3. Increments iOS buildNumber by 1 (required by App Store)
4. Updates build.gradle with new versions
5. Provides git commands for committing and tagging the release

**Example Output:**
```
🚀 Woodworker's Companion Version Bump
══════════════════════════════════════════════════

Bumping version (patch): 1.0.0 → 1.0.1

✅ Updated package.json: 1.0.0 → 1.0.1
✅ Updated app.json:
ℹ️    version: 1.0.0 → 1.0.1
ℹ️    android.versionCode: 1 → 2
ℹ️    ios.buildNumber: 1 → 2
✅ Updated android/app/build.gradle:
ℹ️    versionCode: 1 → 2
ℹ️    versionName: 1.0.0 → 1.0.1

══════════════════════════════════════════════════
✅ All files updated successfully!
══════════════════════════════════════════════════
```

See [BUILD_GUIDE.md](../BUILD_GUIDE.md) for complete release workflow.

