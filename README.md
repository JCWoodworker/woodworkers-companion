# 🪵 The Woodworker's Companion

**Essential Tools for Every Craftsperson**

A comprehensive iOS/Android app providing professional woodworking calculators and tools, from essential calculations to advanced material science.

---

## 📱 Features

### Phase 1 - Essential Calculators
- **Board Foot Calculator** - Calculate lumber volume, costs, and apply waste factors
- **Fraction Calculator** - Precision math for tape measure measurements  
- **Project Pricing** - Multiple pricing models for accurate project costing

### Phase 2 - Advanced Tools ✨ NEW
- **Cut List Optimizer** - Minimize waste with optimized cutting diagrams (2D bin packing)
- **Wood Movement Calculator** - Predict seasonal expansion/contraction (20 species database)
- **Finish Mixing Calculator** - Perfect shellac ratios with mixing instructions

### Phase 3 - Business Tools (Coming Soon)
- Project Management Suite
- Inventory Management System
- Professional Quoting & Invoicing

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (use `nvm use 20`)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android  
npm run android
```

---

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native + Expo Router
- **UI Library**: React Native Paper (Material Design 3)
- **State Management**: Zustand + TanStack Query
- **Animations**: React Native Reanimated
- **Graphics**: React Native SVG
- **Typography**: Inter font family
- **Language**: TypeScript (strict mode)

### Project Structure

```
woodworkers-companion/
├── app/                      # Expo Router (file-based routing)
│   ├── calculators/         # Calculator routes
│   ├── home.tsx             # Home dashboard
│   └── _layout.tsx          # Root layout with providers
├── src/                     # Source code
│   ├── components/          # Reusable components
│   │   ├── common/          # CalculatorLayout, etc.
│   │   └── calculators/     # CuttingDiagram, etc.
│   ├── screens/             # Screen components
│   │   ├── HomeScreen.tsx
│   │   └── calculators/     # 6 calculator screens
│   ├── theme/               # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── animations.ts
│   │   ├── accessibility.ts
│   │   └── commonStyles.ts
│   ├── utils/               # Calculation utilities
│   ├── data/                # Wood species database
│   ├── hooks/               # Custom hooks
│   ├── store/               # Zustand stores
│   ├── services/            # TanStack Query
│   └── constants/           # App constants
└── assets/                  # Images and fonts
```

---

## 🎨 Design System

### Color Palette
Inspired by woodworking materials and tools:
- **Primary**: Warm wood tones (#8B4513 - Saddle Brown)
- **Secondary**: Tool metal grays (#5D5D5D)
- **Tertiary**: Natural accents (#CD853F)
- **Semantic**: Success, error, warning states

### Typography
- **Headings**: Inter (400, 500, 600, 700)
- **Body**: System fonts (SF Pro on iOS, Roboto on Android)
- **Scale**: Material Design 3 type scale

### Spacing
- **Base unit**: 4px
- **Scale**: xs(4) → 6xl(96)
- **Touch targets**: 44px minimum (WCAG AA)

### Animations
- **Duration**: 150ms (fast) to 350ms (slow)
- **Physics**: Spring-based for natural feel
- **Haptics**: Light, medium, heavy feedback

---

## 🧮 Calculator Details

### 1. Board Foot Calculator
Calculate lumber volume using industry formulas:
- Formula: `(T" × W" × L') / 12`
- Features: Tally, waste factor (15-30%), cost calculation
- Use case: Buying lumber, project estimation

### 2. Fraction Calculator
Precision arithmetic with fractions:
- Add/subtract mixed numbers
- Multiple denominator presets (8, 16, 32, 64)
- Simultaneous conversions (decimal, feet-inches, metric)
- Use case: Layout, jig making, precise measurements

### 3. Project Pricing
Multiple pricing models:
- Simple: Materials + Labor
- Overhead: + Consumables %
- Markup: (Costs) × Profit %
- Use case: Quoting, profitability analysis

### 4. Cut List Optimizer
2D bin packing algorithm:
- Guillotine cutting strategy
- Kerf allowance (1/8" default)
- Grain direction constraints
- Visual SVG diagrams
- Use case: Sheet goods projects, minimize waste

### 5. Wood Movement Calculator  
Predict seasonal movement:
- Formula: `Movement = Width × ΔMC × Coefficient`
- 20 species database (Oak, Maple, Walnut, etc.)
- Flatsawn vs Quartersawn comparison
- Environment presets
- Use case: Prevent cracking, design proper joinery

### 6. Finish Mixing Calculator
Perfect shellac ratios:
- Pound cut system (1-5 lb)
- Imperial & metric conversions
- Mixing instructions
- Shelf life guidance
- Use case: Traditional finishes, custom blends

---

## ♿ Accessibility

### WCAG AA Compliant
- ✅ Color contrast ratios ≥ 4.5:1 (normal text)
- ✅ Touch targets ≥ 44×44px
- ✅ Screen reader optimized
- ✅ Semantic HTML roles
- ✅ Keyboard navigation support

---

## 📖 Documentation

- **PHASE_2_SUMMARY.md** - Phase 2 implementation details
- **REFACTORING_GUIDE.md** - How to use shared components
- **TECH_DEBT_REVIEW.md** - Code quality analysis
- **Woodworker App Feature Research.txt** - Product requirements & market research

---

## 🧪 Testing

### Calculation Tests
All formulas validated with known values:
- ✅ Board feet calculations
- ✅ Shellac mixing ratios
- ✅ Wood movement predictions
- ✅ Fraction arithmetic

### Manual Testing
```bash
# Start app
npm start

# Test on device
# - Tap through all 6 calculators
# - Verify haptic feedback
# - Test dark mode
# - Check accessibility
```

---

## 📦 Dependencies

### Core
- React Native 0.81.5
- Expo SDK 54
- Expo Router 6.0.14

### UI & Styling
- react-native-paper 5.14.5
- @expo-google-fonts/inter
- react-native-svg

### State Management
- zustand 5.0.8
- @tanstack/react-query 5.90.7

### Animation
- react-native-reanimated 4.1.1
- expo-haptics 15.0.7

---

## 🛠️ Development

### Code Quality
```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

### Best Practices
- Use `CalculatorLayout` for all calculator screens
- Use `calculatorStyles` for common styles
- Keep calculations in `src/utils/`
- Follow 4px spacing system
- Ensure 44px minimum touch targets
- Use haptic feedback for important actions

---

## 📈 Roadmap

### ✅ Completed
- [x] Phase 1 - Essential Calculators (3)
- [x] Phase 2 - Advanced Tools (3)
- [x] Design System & Theming
- [x] Accessibility (WCAG AA)
- [x] Code Quality Refactoring

### 🔄 In Progress
- [ ] Beta testing
- [ ] User feedback collection

### 📋 Planned
- [ ] Phase 3 - Business Tools
  - [ ] Project Management
  - [ ] Inventory System
  - [ ] Quoting & Invoicing
- [ ] Phase 4 - Ecosystem
  - [ ] Digital Sketchpad
  - [ ] Reference Libraries
  - [ ] Cloud sync
  - [ ] API integrations

---

## 📄 License

Private project - All rights reserved

---

## 👥 Contact

For questions or feedback about The Woodworker's Companion, please reach out to the development team.

---

**Built with ❤️ for woodworkers everywhere**
