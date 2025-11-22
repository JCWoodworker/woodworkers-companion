# 📱 Google Play Store Submission Guide

## Required: Privacy Policy URL

After deploying to Netlify, use this URL in Google Play Console:
```
https://your-site-name.netlify.app/privacy-policy
```

---

## Data Safety Form - Quick Answers

### Data Types to Select

✅ **Select These:**
1. **Other user-generated content** (projects, inventory, clients, quotes)
2. **Photos** (optional camera permission)

❌ **Don't Select:**
- Personal info, Financial info, Location, Messages, Videos, Audio, Files, Calendar, Contacts, Web browsing, Device IDs

---

## Detailed Form Responses

### For "Other User-Generated Content"

**Collected or Shared?** → Collected only  
**Ephemeral?** → No  
**Required or Optional?** → Optional  
**Purpose?** → App functionality

**Explanation to provide:**
> Users can optionally create woodworking projects, track inventory, manage clients, and generate quotes. All data is stored locally on the user's device and is never transmitted to servers or shared with third parties.

### For "Photos"

**Collected or Shared?** → Collected only  
**Ephemeral?** → No  
**Required or Optional?** → Optional  
**Purpose?** → App functionality

**Explanation to provide:**
> Users can optionally attach photos to inventory items for visual reference. Camera permission is only requested when the user explicitly tries to add a photo. This feature is disabled by default and only available in Professional settings mode. All photos are stored locally on the device and are never uploaded or transmitted.

---

## Security Questions

**Is data encrypted in transit?**  
→ **No** (not applicable - data is not transmitted)

**Explanation:**
> All user data is stored exclusively on the user's device using local storage. No data is transmitted to servers, so encryption in transit is not applicable. Data is protected by the device's built-in security features.

**Can users request data deletion?**  
→ **Yes**

**Explanation:**
> Users can delete individual items within the app, clear all app data through Android device settings, or uninstall the app to completely remove all data. Since all data is stored locally, users have complete control over their data.

---

## CAMERA Permission Explanation

Google flagged CAMERA permission. Use this response:

> Camera permission is requested by expo-image-picker library for optional photo attachment functionality. This feature allows users to add visual references to inventory items. Camera permission is only requested when a user explicitly tries to add a photo, and the feature is disabled by default (only available in Professional mode settings). Users can use all core functionality without ever granting camera permission. All photos are stored locally on the device and are never uploaded or transmitted.

---

## Complete Data Safety Declaration

Copy this for the "Additional Details" section:

```
The Woodworker's Companion is a privacy-focused woodworking app that stores all data locally on the user's device.

USER-GENERATED CONTENT:
Users create woodworking projects, track inventory, manage client information, and generate quotes. All data is stored locally using Android's AsyncStorage and never leaves the device.

PHOTOS (OPTIONAL):
Users can optionally attach photos to inventory items. Camera permission is only requested when users explicitly try to add a photo. This feature is disabled by default. All photos are stored locally and never transmitted.

DATA SHARING:
We do not share any user data with third parties. All data remains on the user's device.

DATA SECURITY:
Data is protected by Android's secure storage mechanisms and the user's device security features.

DATA DELETION:
Users can delete individual items in the app, clear all app data in Android settings, or uninstall the app. We have no server-side storage.

PERMISSIONS:
- CAMERA: Optional, only for photo attachments, disabled by default
- READ/WRITE_EXTERNAL_STORAGE: To save user data locally
- VIBRATE: For haptic feedback (can be disabled in settings)
- INTERNET: Required by Expo framework (no data transmitted)

All permissions are used solely for app functionality. No data is collected for analytics, advertising, or any purpose other than providing the app's core features.
```

---

## Pre-Submission Checklist

### Required Information
- ✅ Privacy Policy URL (after Netlify deploy)
- ✅ App description
- ✅ Screenshots (5-8 recommended)
- ✅ Feature graphic (1024×500px)
- ✅ App icon (512×512px)
- ✅ Contact email

### Build Files
- ✅ AAB file from: `npm run build:android:production`
- ✅ Version code incremented (auto with version script)

### Content Rating
Complete the questionnaire honestly:
- Violence: None
- Sexual content: None
- Language: None
- Controlled substances: None
- **Result**: Likely rated "Everyone"

### Store Listing
- **Title**: The Woodworker's Companion
- **Short description** (80 chars): Professional woodworking calculators and business management
- **Full description** (4000 chars max): See suggestion below

---

## Suggested Store Description

```
THE WOODWORKER'S COMPANION
Professional Tools for Every Craftsperson

Transform your woodworking workflow with comprehensive calculators, inventory management, and business tools - all in one beautiful, privacy-focused app.

🧮 ESSENTIAL CALCULATORS
• Board Foot Calculator - Calculate lumber volume with waste factors
  → NEW: Thickness in quarters (4/4, 5/4, etc.) or decimal inches
  → NEW: Build board lists and save customer orders
• Fraction Calculator - Precision math for tape measurements
• Project Pricing - Multiple pricing models for accurate quotes
• Cut List Optimizer - 2D bin packing with visual cutting diagrams
• Wood Movement Calculator - Predict seasonal expansion (20 species database)
• Finish Mixing - Perfect shellac ratios and mixing instructions

💼 BUSINESS MANAGEMENT
• Project Tracking - Tasks, time entries, expenses, progress
• Inventory System - Track lumber, tools, supplies, hardware
• Client Management - Contact info, project history, notes
• Professional Quoting - Generate quotes with material breakdowns

🎯 FEATURES
• Material Design 3 UI with dark mode
• Offline-first - all data stored locally
• No ads, no tracking, no subscriptions
• Privacy-focused - your data never leaves your device
• Customizable complexity (Hobbyist/Professional/Lumber Yard)

🏭 FOR LUMBER YARDS
Lumber Yard mode optimized for commercial operations:
• Customer order tracking
• Delivery status management
• Grade and moisture content tracking
• Sales workflow emphasis

♿ ACCESSIBILITY
WCAG AA compliant with proper contrast, touch targets, and screen reader support.

🔒 PRIVACY
All data stored locally on your device. No cloud sync, no analytics, no tracking. You own your data completely.

Built by woodworkers, for woodworkers.
```

---

## Timeline

**Typical Review Process:**
1. Submit → 1-7 days review
2. Possible questions → Respond within 24 hours
3. Approval → App goes live

**If Google asks about permissions:**
- Use camera explanation above
- Reference privacy policy URL
- Emphasize local-only storage

---

## Post-Approval

- Monitor reviews and ratings
- Respond to user feedback
- Update app regularly
- Keep privacy policy current

---

**You're ready to submit!** 🚀

**Next Steps:**
1. Deploy to Netlify (get privacy policy URL)
2. Build production AAB: `npm run build:android:production`
3. Fill out Data Safety form (use this guide)
4. Submit!

