import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme, SegmentedButtons } from 'react-native-paper';
import { calculateBoardFeet, applyWasteFactor, formatCurrency } from '@/src/utils/calculations';
import { NOMINAL_THICKNESSES, WASTE_FACTORS } from '@/src/constants';

/**
 * Board Foot Calculator Screen
 * Calculates lumber volume in board feet with cost and waste factor
 */
export default function BoardFootCalculatorScreen() {
  const theme = useTheme();
  
  // Input states
  const [thickness, setThickness] = useState('1');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState<'feet' | 'inches'>('feet');
  const [quantity, setQuantity] = useState('1');
  const [pricePerBF, setPricePerBF] = useState('');
  const [wasteFactor, setWasteFactor] = useState('15');
  
  // Results
  const [result, setResult] = useState<{
    boardFeet: number;
    withWaste: number;
    totalCost: number;
    costWithWaste: number;
  } | null>(null);

  const handleCalculate = () => {
    const t = parseFloat(thickness) || 0;
    const w = parseFloat(width) || 0;
    const l = parseFloat(length) || 0;
    const q = parseFloat(quantity) || 1;
    const price = parseFloat(pricePerBF) || 0;
    const waste = parseFloat(wasteFactor) || 0;

    if (t > 0 && w > 0 && l > 0) {
      const bf = calculateBoardFeet(t, w, l, lengthUnit) * q;
      const bfWithWaste = applyWasteFactor(bf, waste);
      
      setResult({
        boardFeet: bf,
        withWaste: bfWithWaste,
        totalCost: bf * price,
        costWithWaste: bfWithWaste * price,
      });
    }
  };

  const handleReset = () => {
    setThickness('1');
    setWidth('');
    setLength('');
    setQuantity('1');
    setPricePerBF('');
    setResult(null);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Board Dimensions
          </Text>

          <TextInput
            label="Thickness (inches)"
            value={thickness}
            onChangeText={setThickness}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Width (inches)"
            value={width}
            onChangeText={setWidth}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label={`Length (${lengthUnit})`}
            value={length}
            onChangeText={setLength}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
          />

          <Text variant="labelMedium" style={styles.label}>
            Length Unit
          </Text>
          <SegmentedButtons
            value={lengthUnit}
            onValueChange={(value) => setLengthUnit(value as 'feet' | 'inches')}
            buttons={[
              { value: 'feet', label: 'Feet' },
              { value: 'inches', label: 'Inches' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Quantity (number of boards)"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Pricing & Waste Factor
          </Text>

          <TextInput
            label="Price per Board Foot ($)"
            value={pricePerBF}
            onChangeText={setPricePerBF}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <TextInput
            label="Waste Factor (%)"
            value={wasteFactor}
            onChangeText={setWasteFactor}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="percent" />}
          />

          <Text variant="bodySmall" style={styles.helperText}>
            Typical: 15% for high-grade, 20% standard, 30% for low-grade lumber
          </Text>
        </Card.Content>
      </Card>

      {result && (
        <Card style={[styles.card, styles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={styles.resultTitle}>
              Results
            </Text>
            
            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Net Board Feet:</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {result.boardFeet.toFixed(2)} BF
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text variant="bodyLarge">With Waste ({wasteFactor}%):</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {result.withWaste.toFixed(2)} BF
              </Text>
            </View>

            {pricePerBF && (
              <>
                <View style={styles.divider} />
                <View style={styles.resultRow}>
                  <Text variant="bodyLarge">Net Cost:</Text>
                  <Text variant="bodyLarge" style={styles.resultValue}>
                    {formatCurrency(result.totalCost)}
                  </Text>
                </View>

                <View style={styles.resultRow}>
                  <Text variant="titleMedium" style={styles.totalLabel}>Total Cost:</Text>
                  <Text variant="titleLarge" style={[styles.resultValue, styles.totalValue]}>
                    {formatCurrency(result.costWithWaste)}
                  </Text>
                </View>
              </>
            )}
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
  input: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    marginTop: 4,
  },
  segmentedButtons: {
    marginBottom: 12,
  },
  helperText: {
    opacity: 0.6,
    fontStyle: 'italic',
    marginTop: 4,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultValue: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#8B4513',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
});

