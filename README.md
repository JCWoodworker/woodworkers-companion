# 🪵 The Woodworker's Companion

**Professional woodworking tools for iOS & Android**

A comprehensive mobile app providing essential calculators, advanced material science tools, and complete business management for woodworkers and craftspeople.

---

## 📱 Features

### Essential Calculators
- **Board Foot Calculator** - Calculate lumber volume, costs, and waste factors
- **Fraction Calculator** - Precision math for tape measure measurements  
- **Project Pricing** - Multiple pricing models for accurate quotes

### Advanced Tools
- **Cut List Optimizer** - 2D bin packing with visual cutting diagrams
- **Wood Movement Calculator** - Predict seasonal expansion/contraction (20 species)
- **Finish Mixing Calculator** - Perfect shellac ratios with mixing instructions

### Business Management
- **Project Management** - Tasks, time tracking, expenses, and progress
- **Inventory System** - Track lumber stock with filtering and search
- **Client Management** - Contact info, project history, notes
- **Quoting System** - Professional quotes with material/labor breakdowns

---

## 🚀 Quick Start

### Prerequisites
```bash
# Node.js 20+
nvm use 20

# Install dependencies
npm install

# Start development server
npm start
```

### Run on Device
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## 🏗️ Tech Stack

- **Framework**: React Native + Expo Router 6.0
- **UI**: React Native Paper (Material Design 3)
- **State**: Zustand + TanStack Query
- **Storage**: AsyncStorage with JSON persistence
- **Animations**: React Native Reanimated 4.1
- **Graphics**: React Native SVG
- **Language**: TypeScript (strict mode)

---

## 📁 Project Structure

```
woodworkers-companion/
├── app/                      # Expo Router (file-based routing)
│   ├── calculators/         # 6 calculator routes
│   ├── projects/            # Project management
│   ├── inventory/           # Lumber inventory
│   ├── clients/             # Client management
│   ├── documents/           # Quotes & invoicing
│   └── home.tsx             # Dashboard
├── src/
│   ├── components/          # Reusable components
│   ├── screens/             # Screen components
│   ├── theme/               # Design system
│   ├── utils/               # Calculations & utilities
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Zustand stores
│   ├── services/            # Storage & query client
│   ├── types/               # TypeScript definitions
│   ├── data/                # Wood species database
│   └── constants/           # App constants
├── scripts/
│   └── bump-version.js      # Version management script
└── assets/                  # Images, fonts, icons
```

---

## 🎨 Design System

### Colors
- **Primary**: Warm wood tones (#8B4513)
- **Secondary**: Tool metal grays (#5D5D5D)
- **Tertiary**: Natural accents (#CD853F)
- **Semantic**: Success, error, warning states
- **Dark Mode**: Fully supported with adaptive colors

### Typography
- **Headings**: Inter (400-700)
- **Scale**: Material Design 3 type scale
- **Accessibility**: WCAG AA contrast ratios

### Spacing
- **Base**: 4px system (xs → 6xl)
- **Touch Targets**: 44px minimum

---

## 🛠️ Development

### Code Quality
```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit
```

### Best Practices
- Use `CalculatorLayout` for calculator screens
- Keep calculations in `src/utils/`
- Follow 4px spacing system
- Ensure 44px minimum touch targets
- Add haptic feedback for important actions
- Use shared hooks: `useFormInput`, `usePersistedState`

---

## 📦 Building & Distribution

### Build Commands

```bash
# Web (for Netlify/web hosting)
npm run build:web

# Android APK (for testing/sharing)
npm run build:android:apk

# Android AAB (for Google Play Store)
npm run build:android:production

# iOS (for App Store)
npm run build:ios:production

# Both platforms
npm run build:all:production

# Local build (faster, requires Android Studio)
npm run build:local:android
```

### Build Profiles (eas.json)

| Profile          | Output | Use Case                   |
| ---------------- | ------ | -------------------------- |
| `preview`        | APK    | Testing, beta distribution |
| `preview-aab`    | AAB    | Test Play Store upload     |
| `production`     | AAB    | **Google Play Console** ✅  |
| `production-apk` | APK    | Direct distribution        |

### Google Play Console
1. Build: `npm run build:android:production`
2. Download `.aab` file from Expo dashboard
3. Upload to: Play Console → Production → Create Release
4. Submit for review

### Apple App Store
1. Build: `npm run build:ios:production`
2. Download `.ipa` file from Expo dashboard
3. Upload via Transporter or Xcode
4. Submit to App Store Connect

### Web Deployment (Netlify)
1. Build: `npm run build:web`
2. Deploy via Netlify CLI: `netlify deploy --prod`
3. Or push to GitHub and connect Netlify for auto-deployment
4. Get live URL: `https://your-site.netlify.app`

**See `NETLIFY_DEPLOYMENT.md` for complete web deployment guide**

---

## 🔢 Version Management

### Bump Version

The version bump script updates all version fields across the project:
- `package.json` → version
- `app.json` → expo.version, android.versionCode, ios.buildNumber
- `android/app/build.gradle` → versionCode, versionName

```bash
# Bug fixes (1.0.0 → 1.0.1)
npm run version:patch

# New features (1.0.0 → 1.1.0)
npm run version:minor

# Breaking changes (1.0.0 → 2.0.0)
npm run version:major
```

### Release Workflow

```bash
# 1. Bump version
npm run version:patch

# 2. Review changes
git diff

# 3. Commit and tag
git add -A
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1

# 4. Build for production
npm run build:android:production

# 5. Push to git
git push && git push --tags

# 6. Download build from Expo and upload to store
```

### Version Numbers Explained

**Semantic Versioning**: `MAJOR.MINOR.PATCH`
- **PATCH**: Bug fixes (1.0.0 → 1.0.1)
- **MINOR**: New features (1.0.0 → 1.1.0)
- **MAJOR**: Breaking changes (1.0.0 → 2.0.0)

**Version Code**: Internal integer that **must increase** with every Play Store upload. The script auto-increments this by 1.

---

## 🧮 Calculator Details

### 1. Board Foot Calculator
- Formula: `(Thickness × Width × Length) / 12`
- Features: Multi-item tally, waste factor (15-30%), cost calculation
- Use: Lumber purchasing, project estimation

### 2. Fraction Calculator
- Operations: Add, subtract, multiply, divide mixed numbers
- Presets: 8ths, 16ths, 32nds, 64ths
- Conversions: Decimal, feet-inches, metric
- Use: Layout, jig making, precise measurements

### 3. Project Pricing
- Models: Simple (Materials + Labor), Overhead, Markup
- Features: Waste percentage, profit calculations
- Use: Professional quoting, profitability analysis

### 4. Cut List Optimizer
- Algorithm: 2D guillotine bin packing
- Features: Kerf allowance, grain direction, visual SVG diagrams
- Common sheets: 4x8, 5x5, 4x4 plywood/MDF
- Use: Sheet goods optimization, waste minimization

### 5. Wood Movement Calculator  
- Formula: `Movement = Width × ΔMC × Coefficient`
- Database: 20 species (Oak, Maple, Walnut, Cherry, etc.)
- Options: Flatsawn vs Quartersawn, environment presets
- Use: Prevent cracking, design proper joinery

### 6. Finish Mixing Calculator
- System: Pound cut (1-5 lb)
- Conversions: Imperial & metric
- Instructions: Step-by-step mixing guide
- Use: Traditional finishes, custom shellac blends

---

## 💼 Business Features

### Project Management
- Create projects with clients, status, dates
- Track tasks with completion states
- Log time entries with hourly rates
- Record expenses (materials, tools, other)
- View profitability and progress

### Inventory System
- Track lumber: species, dimensions, board feet, cost
- Filter by species, thickness, or search
- Calculate total value and board feet
- Material usage tracking

### Client Management
- Store contact information
- Track project history per client
- Add notes and preferences
- Quick access from projects/quotes

### Document System
- Generate professional quotes
- Material and labor breakdowns
- Valid-until dates
- Send via email/share

---

## ♿ Accessibility

**WCAG AA Compliant**
- ✅ Color contrast ≥ 4.5:1
- ✅ Touch targets ≥ 44×44px
- ✅ Screen reader optimized
- ✅ Semantic roles
- ✅ Keyboard navigation
- ✅ Haptic feedback

---

## 🗄️ Data Storage

### Persistence
- **Storage**: AsyncStorage (JSON)
- **State**: Zustand stores with persistence middleware
- **Migrations**: Version-aware schema updates

### Data Stores
- `projectStore` - Projects, tasks, time, expenses
- `inventoryStore` - Lumber inventory
- `clientStore` - Client information
- `documentStore` - Quotes and invoices

### Data Safety
- Automatic persistence on changes
- Error handling with fallbacks
- Data validation on load
- Safe parsing utilities

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All 6 calculators work correctly
- [ ] Create/edit/delete projects
- [ ] Add/remove inventory items
- [ ] Client management CRUD
- [ ] Quote generation
- [ ] Dark mode toggle
- [ ] Haptic feedback on actions
- [ ] Navigation flow
- [ ] Data persistence after app restart

### Calculation Validation
All formulas tested with known values:
- ✅ Board feet calculations
- ✅ Fraction arithmetic
- ✅ Wood movement predictions
- ✅ Shellac mixing ratios
- ✅ Cut list optimization

---

## 📈 Roadmap

### ✅ Completed (v1.0)
- [x] 6 Professional calculators
- [x] Project management suite
- [x] Inventory system
- [x] Client management
- [x] Quote generation
- [x] Material Design 3 UI
- [x] Dark mode support
- [x] WCAG AA accessibility
- [x] Data persistence

### 🔄 Planned (v1.1+)
- [ ] Cloud sync (iCloud/Google Drive)
- [ ] PDF export for quotes
- [ ] Photo attachments for projects
- [ ] Invoice generation
- [ ] Expense tracking enhancements
- [ ] Calendar integration
- [ ] Backup/restore

### 🚀 Future (v2.0+)
- [ ] Digital sketchpad
- [ ] Reference libraries (joinery, finishes)
- [ ] Community features
- [ ] Supplier integrations
- [ ] Advanced analytics

---

## 🔧 Troubleshooting

### Build Issues

**Error**: `Cannot find module`
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Error**: Android build fails
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
npm run android
```

### Version Issues

**Error**: Version code rejected by Play Store
- Check current version code in Play Console
- Manually bump to higher number in `app.json` and `build.gradle`
- Run version script for next release

### Data Issues

**Error**: App crashes on startup
- Clear app data from device settings
- Reinstall the app
- Check AsyncStorage for corrupted data

---

## 📄 Files Reference

### Configuration
- `app.json` - Expo configuration
- `eas.json` - Build profiles
- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript settings

### Documentation
- `README.md` - This file
- `scripts/bump-version.js` - Version management script

---

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Install dependencies: `npm install`
3. Create feature branch: `git checkout -b feature/amazing-feature`
4. Make changes and test thoroughly
5. Commit: `git commit -m 'feat: add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open Pull Request

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

---

## 📄 License

Private project - All rights reserved

---

## 👤 Contact

For questions about The Woodworker's Companion, contact the development team.

---

**Built with ❤️ for woodworkers everywhere**
