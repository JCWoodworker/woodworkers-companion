# Google Play Data Safety Form - Instructions

## How to Fill Out the Data Safety Section

When submitting to Google Play Console, here's exactly what to select:

---

## Step 1: Does your app collect or share user data?

**Select**: ✅ **Yes**

---

## Step 2: Data Types

### Personal Info
- ❌ Name
- ❌ Email address
- ❌ User IDs
- ❌ Address
- ❌ Phone number
- ❌ Race and ethnicity
- ❌ Political or religious beliefs
- ❌ Sexual orientation
- ❌ Other info

**Note**: While users *can* enter client names and contact info, this is optional user-generated content, not collected by us.

### Financial Info
- ❌ User payment info
- ❌ Purchase history
- ❌ Credit score
- ❌ Other financial info

**Note**: Users enter project costs and pricing, but this is for their own calculations and never transmitted.

### Location
- ❌ Approximate location
- ❌ Precise location

### Personal Messages
- ❌ Emails
- ❌ SMS or MMS
- ❌ Other in-app messages

### Photos and Videos
- ❌ Photos (currently not implemented)
- ❌ Videos

**Note**: Photo attachment infrastructure exists but feature is not yet active. If you enable it in the future, select ✅ Photos.

### Audio Files
- ❌ Voice or sound recordings
- ❌ Music files
- ❌ Other audio files

### Files and Docs
- ❌ Files and docs

### Calendar
- ❌ Calendar events

### Contacts
- ❌ Contacts

### App Activity
- ❌ App interactions
- ❌ In-app search history
- ❌ Installed apps
- ❌ Other user-generated content
- ❌ Other actions

**Actually, select**: ✅ **Other user-generated content**

**Explanation**: Users create projects, inventory items, client records, and quotes.

### Web Browsing
- ❌ Web browsing history

### App Info and Performance
- ❌ Crash logs
- ❌ Diagnostics
- ❌ Other app performance data

### Device or Other IDs
- ❌ Device or other IDs

---

## Step 3: Data Usage (for "Other user-generated content")

**Is this data collected, shared, or both?**
- ✅ **Collected**
- ❌ Shared

**Is this data processed ephemerally?**
- ❌ No (data is stored locally)

**Is this data required or optional?**
- ❌ Required for app functionality
- ✅ **Optional** (users choose what to enter)

**Why is this user data collected?**
- ✅ **App functionality** (to display and organize user's woodworking data)
- ❌ Analytics
- ❌ Developer communications
- ❌ Advertising or marketing
- ❌ Fraud prevention, security, and compliance
- ❌ Personalization
- ❌ Account management

---

## Step 4: Data Security

**Is all of the user data collected by your app encrypted in transit?**
- ✅ **No** (data is not transmitted - it stays on device)

**Do you provide a way for users to request that their data is deleted?**
- ✅ **Yes**

**Explanation**: Users can delete individual items within the app, clear all app data through device settings, or uninstall the app to completely remove all data.

---

## Step 5: Privacy Policy URL

**Privacy Policy URL**: 
- Host your `PRIVACY_POLICY.md` file on a public URL
- Options:
  - GitHub Pages: `https://yourusername.github.io/woodworkers-companion/privacy-policy.html`
  - Your website: `https://yoursite.com/privacy-policy`
  - Google Drive (public link)
  - Pastebin or similar service

**For now, you can**:
1. Create a GitHub repository for documentation
2. Enable GitHub Pages
3. Add the privacy policy there
4. Or host on any web server

---

## Sample Responses for Common Questions

### "Does your app collect user data?"
**Answer**: Yes, but all data is stored locally on the user's device and never transmitted to servers.

### "What happens to user data when they uninstall?"
**Answer**: All data is permanently deleted from their device. We have no server-side storage or backups.

### "How can users request data deletion?"
**Answer**: Users can delete individual items in the app or uninstall the app to delete all data. Since data is only on their device, they have full control.

### "Do you share data with third parties?"
**Answer**: No. All data stays on the user's device.

### "Is data encrypted?"
**Answer**: Data is stored locally using Android's secure storage mechanisms. No data is transmitted, so encryption in transit is not applicable.

---

## Important Notes

1. **Be Honest**: Only select data types you actually collect
2. **Local Storage**: Emphasize that all data is local-only
3. **User Control**: Highlight that users control all their data
4. **No Tracking**: Make it clear you don't track or profile users
5. **Update If Features Change**: If you add cloud sync or analytics later, update the Data Safety form

---

## Future Considerations

If you add these features later, you'll need to update the Data Safety form:

### Cloud Sync (if added)
- Would need to collect: User IDs, possibly email for account
- Would need to disclose: Data transmitted to servers
- Would need: Privacy policy update

### Analytics (if added)
- Would need to collect: App interactions, crash logs
- Would need to disclose: Data shared with analytics provider
- Would need: Privacy policy update

### Photo Attachments (when enabled)
- Would need to declare: Photos collected
- Would need permission: Camera, Photo Library
- Usage: App functionality only

---

## Checklist Before Submission

Before submitting to Google Play:

- ✅ Privacy policy created
- ✅ Privacy policy hosted on public URL
- ✅ Data Safety form filled out accurately
- ✅ All required permissions declared
- ✅ Target audience set appropriately
- ✅ Content rating questionnaire completed
- ✅ Contact email provided

---

**Remember**: Google Play reviews Data Safety forms carefully. Be accurate and honest. When in doubt, over-disclose rather than under-disclose.

