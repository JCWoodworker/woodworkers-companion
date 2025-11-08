import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme, Chip } from 'react-native-paper';
import { fractionToDecimal, decimalToFraction } from '@/src/utils/calculations';
import { usePreferencesStore } from '@/src/store';

/**
 * Fraction Calculator Screen
 * Precision math for woodworking measurements with fractions
 */
export default function FractionCalculatorScreen() {
  const theme = useTheme();
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
    const w1 = parseFloat(whole1) || 0;
    const n1 = parseFloat(numerator1) || 0;
    const d1 = parseFloat(denominator1) || 1;
    
    const w2 = parseFloat(whole2) || 0;
    const n2 = parseFloat(numerator2) || 0;
    const d2 = parseFloat(denominator2) || 1;

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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
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

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
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
        <Card style={[styles.card, styles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={styles.resultTitle}>
              Result
            </Text>
            
            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Fraction:</Text>
              <Text variant="titleLarge" style={styles.resultValue}>
                {result.fraction}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Decimal:</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {result.decimal.toFixed(4)}"
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Feet & Inches:</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {result.feet}' {result.inches.toFixed(2)}"
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Metric:</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {result.metric.toFixed(2)} mm
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCalculate}
          style={styles.button}
          icon="calculator"
        >
          Calculate
        </Button>

        <Button
          mode="outlined"
          onPress={handleReset}
          style={styles.button}
          icon="refresh"
        >
          Reset
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#F5F5F0',
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  fractionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  fractionInput: {
    flex: 1,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    marginBottom: 4,
  },
  operationContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  operationButton: {
    flex: 1,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultValue: {
    fontWeight: '600',
    color: '#8B4513',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
});

