import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, Chip } from 'react-native-paper';
import { fractionToDecimal, decimalToFraction, safeParseFloat } from '@/src/utils';
import { usePreferencesStore } from '@/src/store';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles, spacing } from '@/src/theme';

/**
 * Fraction Calculator Screen
 * Precision math for woodworking measurements with fractions
 */
export default function FractionCalculatorScreen() {
  const { fractionPrecision } = usePreferencesStore();
  
  // Input states for two fractions to add/subtract
  const [whole1, setWhole1] = useState('');
  const [numerator1, setNumerator1] = useState('');
  const [denominator1, setDenominator1] = useState('16');
  
  const [whole2, setWhole2] = useState('');
  const [numerator2, setNumerator2] = useState('');
  const [denominator2, setDenominator2] = useState('16');
  
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<{
    decimal: number;
    fraction: string;
    feet: number;
    inches: number;
    metric: number;
  } | null>(null);

  const handleCalculate = () => {
    const w1 = safeParseFloat(whole1);
    const n1 = safeParseFloat(numerator1);
    const d1 = safeParseFloat(denominator1, 1);
    
    const w2 = safeParseFloat(whole2);
    const n2 = safeParseFloat(numerator2);
    const d2 = safeParseFloat(denominator2, 1);

    const value1 = fractionToDecimal(w1, n1, d1);
    const value2 = fractionToDecimal(w2, n2, d2);
    
    const resultDecimal = operation === 'add' ? value1 + value2 : value1 - value2;
    
    if (resultDecimal >= 0) {
      const [w, n, d] = decimalToFraction(resultDecimal, fractionPrecision);
      const fractionStr = w > 0 
        ? (n > 0 ? `${w} ${n}/${d}"` : `${w}"`)
        : `${n}/${d}"`;
      
      const feet = Math.floor(resultDecimal / 12);
      const remainingInches = resultDecimal % 12;
      
      setResult({
        decimal: resultDecimal,
        fraction: fractionStr,
        feet,
        inches: remainingInches,
        metric: resultDecimal * 25.4, // Convert to mm
      });
    }
  };

  const handleReset = () => {
    setWhole1('');
    setNumerator1('');
    setDenominator1('16');
    setWhole2('');
    setNumerator2('');
    setDenominator2('16');
    setResult(null);
  };

  const quickDenominators = [8, 16, 32, 64];

  return (
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Calculate"
    >
      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            First Measurement
          </Text>

          <View style={styles.fractionRow}>
            <TextInput
              label="Whole"
              value={whole1}
              onChangeText={setWhole1}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.fractionInput}
            />
            <TextInput
              label="Numerator"
              value={numerator1}
              onChangeText={setNumerator1}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.fractionInput}
            />
            <TextInput
              label="Denominator"
              value={denominator1}
              onChangeText={setDenominator1}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.fractionInput}
            />
          </View>

          <View style={styles.chipContainer}>
            {quickDenominators.map((den) => (
              <Chip
                key={den}
                mode="outlined"
                selected={denominator1 === den.toString()}
                onPress={() => setDenominator1(den.toString())}
                style={styles.chip}
              >
                1/{den}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.operationContainer}>
        <Button
          mode={operation === 'add' ? 'contained' : 'outlined'}
          onPress={() => setOperation('add')}
          style={styles.operationButton}
          icon="plus"
        >
          Add
        </Button>
        <Button
          mode={operation === 'subtract' ? 'contained' : 'outlined'}
          onPress={() => setOperation('subtract')}
          style={styles.operationButton}
          icon="minus"
        >
          Subtract
        </Button>
      </View>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Second Measurement
          </Text>

          <View style={styles.fractionRow}>
            <TextInput
              label="Whole"
              value={whole2}
              onChangeText={setWhole2}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.fractionInput}
            />
            <TextInput
              label="Numerator"
              value={numerator2}
              onChangeText={setNumerator2}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.fractionInput}
            />
            <TextInput
              label="Denominator"
              value={denominator2}
              onChangeText={setDenominator2}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.fractionInput}
            />
          </View>

          <View style={styles.chipContainer}>
            {quickDenominators.map((den) => (
              <Chip
                key={den}
                mode="outlined"
                selected={denominator2 === den.toString()}
                onPress={() => setDenominator2(den.toString())}
                style={styles.chip}
              >
                1/{den}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>

      {result && (
        <Card style={[calculatorStyles.card, calculatorStyles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={calculatorStyles.resultTitle}>
              Result
            </Text>
            
            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Fraction:</Text>
              <Text variant="titleLarge" style={calculatorStyles.resultValue}>
                {result.fraction}
              </Text>
            </View>

            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Decimal:</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {result.decimal.toFixed(4)}"
              </Text>
            </View>

            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Feet & Inches:</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {result.feet}' {result.inches.toFixed(2)}"
              </Text>
            </View>

            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Metric:</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {result.metric.toFixed(2)} mm
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}
    </CalculatorLayout>
  );
}

// Keep only calculator-specific styles
const styles = StyleSheet.create({
  fractionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  fractionInput: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  chip: {
    marginBottom: spacing.xs,
  },
  operationContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.base,
  },
  operationButton: {
    flex: 1,
  },
});

