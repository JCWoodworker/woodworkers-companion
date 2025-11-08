import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Card, Text, SegmentedButtons } from 'react-native-paper';
import { calculateBoardFeet, applyWasteFactor, formatCurrency, safeParseFloat } from '@/src/utils';
import { NOMINAL_THICKNESSES, WASTE_FACTORS } from '@/src/constants';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles } from '@/src/theme';

/**
 * Board Foot Calculator Screen
 * Calculates lumber volume in board feet with cost and waste factor
 */
export default function BoardFootCalculatorScreen() {
  
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
    const t = safeParseFloat(thickness);
    const w = safeParseFloat(width);
    const l = safeParseFloat(length);
    const q = safeParseFloat(quantity, 1);
    const price = safeParseFloat(pricePerBF);
    const waste = safeParseFloat(wasteFactor);

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
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Calculate"
    >
      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Board Dimensions
          </Text>

          <TextInput
            label="Thickness (inches)"
            value={thickness}
            onChangeText={setThickness}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
          />

          <TextInput
            label="Width (inches)"
            value={width}
            onChangeText={setWidth}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
          />

          <TextInput
            label={`Length (${lengthUnit})`}
            value={length}
            onChangeText={setLength}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
          />

          <Text variant="labelMedium" style={calculatorStyles.label}>
            Length Unit
          </Text>
          <SegmentedButtons
            value={lengthUnit}
            onValueChange={(value) => setLengthUnit(value as 'feet' | 'inches')}
            buttons={[
              { value: 'feet', label: 'Feet' },
              { value: 'inches', label: 'Inches' },
            ]}
            style={calculatorStyles.segmentedButtons}
          />

          <TextInput
            label="Quantity (number of boards)"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
          />
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Pricing & Waste Factor
          </Text>

          <TextInput
            label="Price per Board Foot ($)"
            value={pricePerBF}
            onChangeText={setPricePerBF}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <TextInput
            label="Waste Factor (%)"
            value={wasteFactor}
            onChangeText={setWasteFactor}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            right={<TextInput.Icon icon="percent" />}
          />

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Typical: 15% for high-grade, 20% standard, 30% for low-grade lumber
          </Text>
        </Card.Content>
      </Card>

      {result && (
        <Card style={[calculatorStyles.card, calculatorStyles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={calculatorStyles.resultTitle}>
              Results
            </Text>
            
            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Net Board Feet:</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {result.boardFeet.toFixed(2)} BF
              </Text>
            </View>

            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">With Waste ({wasteFactor}%):</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {result.withWaste.toFixed(2)} BF
              </Text>
            </View>

            {pricePerBF && (
              <>
                <View style={calculatorStyles.divider} />
                <View style={calculatorStyles.resultRow}>
                  <Text variant="bodyLarge">Net Cost:</Text>
                  <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                    {formatCurrency(result.totalCost)}
                  </Text>
                </View>

                <View style={calculatorStyles.resultRow}>
                  <Text variant="titleMedium" style={calculatorStyles.totalLabel}>Total Cost:</Text>
                  <Text variant="titleLarge" style={[calculatorStyles.resultValue, calculatorStyles.totalValue]}>
                    {formatCurrency(result.costWithWaste)}
                  </Text>
                </View>
              </>
            )}
          </Card.Content>
        </Card>
      )}
    </CalculatorLayout>
  );
}

