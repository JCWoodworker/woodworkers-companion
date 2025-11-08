# 📱 Google Play Store Submission Guide

## Quick Reference for Data Safety Form

### Data Types to Select

✅ **YES** - Select these:
1. **Other user-generated content** (projects, inventory, clients, quotes)
2. **Photos** (optional camera permission)

❌ **NO** - Don't select:
- Personal info (name, email, etc.)
- Financial info
- Location
- Messages
- Videos
- Audio
- Files/docs
- Calendar
- Contacts
- App activity
- Web browsing
- Device IDs

---

## Detailed Answers

### For "Other User-Generated Content"

**Collected or Shared?** → Collected only

**Ephemeral?** → No

**Required or Optional?** → Optional

**Purpose?** → App functionality

**Details to provide**:
> Users can optionally create woodworking projects, track inventory, manage clients, and generate quotes. All data is stored locally on the user's device and is never transmitted to servers or shared with third parties.

---

### For "Photos"

**Collected or Shared?** → Collected only

**Ephemeral?** → No

**Required or Optional?** → Optional

**Purpose?** → App functionality

**Details to provide**:
> Users can optionally attach photos to inventory items for visual reference. Camera permission is only requested when the user explicitly tries to add a photo. This feature is disabled by default and only available in Professional settings mode. All photos are stored locally on the device and are never uploaded or transmitted.

---

## Security Questions

**Is data encrypted in transit?**
→ **No** (not applicable - data is not transmitted)

**Explanation**:
> All user data is stored exclusively on the user's device using local storage. No data is transmitted to servers, so encryption in transit is not applicable. Data is protected by the device's built-in security features.

**Can users request data deletion?**
→ **Yes**

**Explanation**:
> Users can delete individual items within the app, clear all app data through Android device settings, or uninstall the app to completely remove all data. Since all data is stored locally, users have complete control over their data.

---

## Privacy Policy URL

After deploying to Netlify, use:

```
https://your-site-name.netlify.app/privacy-policy
```

**This URL is REQUIRED** for Google Play submission.

---

## Camera Permission - Key Points

Google Play flagged CAMERA permission. Here's what to explain:

### Why is CAMERA permission in your app?

> The app includes optional photo attachment functionality for inventory items. This feature allows users to add visual references to their lumber, tools, and supplies. Camera permission is only requested when a user explicitly tries to add a photo, and the feature is disabled by default (only available in Professional mode settings). Users can use all core functionality without ever granting camera permission.

### Is camera data transmitted?

> No. All photos are stored locally on the user's device using local storage. Photos are never uploaded, transmitted, or shared with servers or third parties.

### Can users use the app without camera?

> Yes. Camera permission is completely optional. The core functionality - calculators, project management, and inventory tracking - works fully without camera access.

---

## Complete Declaration Example

Copy this for the Data Safety "Additional Details" section:

```
The Woodworker's Companion is a privacy-focused woodworking app that stores all data locally on the user's device. We collect only the data that users explicitly choose to enter:

USER-GENERATED CONTENT:
Users can create woodworking projects, track inventory, manage client information, and generate quotes. All data is stored locally using Android's AsyncStorage and never leaves the device.

PHOTOS (OPTIONAL):
Users can optionally attach photos to inventory items. Camera permission is only requested when users explicitly try to add a photo. This feature is disabled by default and only available when users enable Professional mode in settings. All photos are stored locally and never transmitted.

DATA SHARING:
We do not share any user data with third parties. All data remains on the user's device.

DATA SECURITY:
Data is protected by Android's secure storage mechanisms and the user's device security features (lock screen, encryption).

DATA DELETION:
Users can delete individual items in the app, clear all app data in Android settings, or uninstall the app. We have no server-side storage, so users have complete control.

PERMISSIONS:
- CAMERA: Optional, only for photo attachments
- READ/WRITE_EXTERNAL_STORAGE: To save user data locally
- VIBRATE: For haptic feedback (can be disabled)
- INTERNET: Required by Expo framework (no data transmitted)

All permissions are used solely for app functionality and user convenience. No data is collected for analytics, advertising, or any purpose other than providing the app's core features to the user.
```

---

## Common Mistakes to Avoid

❌ **Don't say**: "We don't collect any data"
✅ **Do say**: "We collect user-entered data stored locally only"

❌ **Don't hide**: Camera permission
✅ **Do explain**: Camera is optional, disabled by default, photos stay local

❌ **Don't forget**: To update privacy policy when adding features
✅ **Do update**: Data Safety form if you add cloud sync, analytics, etc.

---

## Approval Timeline

**Expected timeline**:
1. Submit app → 1-7 days review
2. Possible questions about camera permission → respond within 24 hours
3. Approval → App goes live

**If Google asks about camera**:
> "Camera permission is requested by expo-image-picker library for optional photo attachment feature. Feature is disabled by default. Users can use all core app functionality without camera. Photos are stored locally only, never uploaded. See privacy policy at [your URL]."

---

## Post-Approval

After approval:

- ✅ Monitor reviews
- ✅ Respond to user feedback
- ✅ Keep privacy policy updated
- ✅ Update Data Safety if features change

---

## Need Help?

**Google Play Policy Support**:
- https://support.google.com/googleplay/android-developer

**Common issues**:
- Camera permission: Explained in this guide
- Privacy policy: Now hosted at /privacy-policy
- Data safety: Forms filled per this guide

**You're ready to submit!** 🚀

