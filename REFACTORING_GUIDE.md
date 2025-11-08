# Code Quality Improvements - Refactoring Guide

## Summary of Changes

This guide shows how to eliminate code duplication across calculator screens using the new shared components and hooks.

### New Utilities Created

1. **`src/hooks/useCalculatorScreen.ts`** - Custom hook for calculator screens
2. **`src/components/common/CalculatorLayout.tsx`** - Reusable layout component
3. **`src/theme/commonStyles.ts`** - Shared calculator styles

## Benefits

- **Reduces code by ~40%** per calculator screen
- **Ensures consistency** across all calculators
- **Automatic haptic feedback** for all calculators
- **Single source of truth** for styles
- **Easier maintenance** - update once, affects all calculators

## Before & After Example

### BEFORE (Duplicated Pattern - 290 lines)

```typescript
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme } from 'react-native-paper';

export default function PricingCalculatorScreen() {
  const theme = useTheme();
  
  // State
  const [materialCost, setMaterialCost] = useState('');
  // ... more state
  
  const handleCalculate = () => {
    // calculation logic
  };
  
  const handleReset = () => {
    setMaterialCost('');
    // reset all fields
  };
  
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card} mode="elevated">
        {/* Card content */}
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleCalculate} ...>
          Calculate Price
        </Button>
        <Button mode="outlined" onPress={handleReset} ...>
          Reset
        </Button>
      </View>
    </ScrollView>
  );
}

// 50+ lines of duplicated styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 32 },
  card: { marginBottom: 16 },
  // ... 15+ more repeated styles
});
```

### AFTER (Using Shared Components - 175 lines, 40% reduction!)

```typescript
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Card, Text } from 'react-native-paper';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles } from '@/src/theme';

export default function PricingCalculatorScreen() {
  // State
  const [materialCost, setMaterialCost] = useState('');
  // ... more state
  
  const handleCalculate = () => {
    // calculation logic - haptics handled automatically!
  };
  
  const handleReset = () => {
    setMaterialCost('');
    // reset all fields
  };
  
  return (
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Calculate Price"
    >
      <Card style={calculatorStyles.card} mode="elevated">
        {/* Card content - same as before */}
      </Card>
    </CalculatorLayout>
  );
}

// No duplicate styles needed! ✅
```

## Migration Checklist

For each calculator screen:

1. ✅ Import `CalculatorLayout` instead of `ScrollView`
2. ✅ Import `calculatorStyles` instead of creating local styles
3. ✅ Remove `useTheme()` hook (handled by `useCalculatorScreen`)
4. ✅ Remove `ScrollView` wrapper
5. ✅ Remove button container and buttons
6. ✅ Replace local styles with `calculatorStyles`
7. ✅ Remove duplicated `StyleSheet.create()`
8. ✅ Remove manual haptic feedback calls (handled automatically)

## Calculator-Specific Styles

Keep only calculator-specific styles (e.g., `FractionCalculatorScreen`'s `fractionRow`):

```typescript
// Keep these unique styles
const styles = StyleSheet.create({
  fractionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  fractionInput: {
    flex: 1,
  },
  // Any other unique-to-this-calculator styles
});
```

## Testing After Refactoring

- ✅ Buttons work correctly
- ✅ Haptic feedback fires on Calculate (medium), Success, and Reset (light)
- ✅ Layout matches original
- ✅ Styling is consistent
- ✅ No linter errors

## Files to Refactor

1. `src/screens/calculators/BoardFootCalculatorScreen.tsx` (can remove manual haptics)
2. `src/screens/calculators/FractionCalculatorScreen.tsx`
3. `src/screens/calculators/PricingCalculatorScreen.tsx`

---

**Estimated time savings**: 5-10 minutes per new calculator screen
**Maintenance improvement**: Update shared styles/behavior once instead of N times
**Code quality**: Significantly improved DRY (Don't Repeat Yourself) principle

