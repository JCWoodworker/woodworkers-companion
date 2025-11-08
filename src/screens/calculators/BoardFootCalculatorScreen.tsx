import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Card, Text, SegmentedButtons, Button, Badge, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { calculateBoardFeet, applyWasteFactor, formatCurrency, safeParseFloat } from '@/src/utils';
import { inchesToQuarters } from '@/src/utils/boardFootConversions';
import { WASTE_FACTORS } from '@/src/constants';
import { useBoardFootStore } from '@/src/store/boardFootStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { ThicknessInput } from '@/src/components/calculators/ThicknessInput';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles, spacing } from '@/src/theme';

/**
 * Board Foot Calculator Screen - ENHANCED
 * Calculates lumber volume with board list management
 */
export default function BoardFootCalculatorScreen() {
  const { complexityMode } = useSettingsStore();
  const { currentList, addBoardToCurrentList, loadBoardLists } = useBoardFootStore();
  
  // Input states
  const [thickness, setThickness] = useState('1');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState<'feet' | 'inches'>('feet');
  const [quantity, setQuantity] = useState('1');
  const [pricePerBF, setPricePerBF] = useState('');
  const [wasteFactor, setWasteFactor] = useState('15');
  
  // Advanced fields (Professional/Lumber Yard)
  const [species, setSpecies] = useState('');
  const [grade, setGrade] = useState('');
  const [moistureContent, setMoistureContent] = useState('');
  
  // Results
  const [result, setResult] = useState<{
    boardFeet: number;
    withWaste: number;
    totalCost: number;
    costWithWaste: number;
  } | null>(null);

  const isAdvancedMode = complexityMode === 'professional' || complexityMode === 'lumberyard';

  useEffect(() => {
    loadBoardLists();
  }, []);

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

  const handleAddToList = () => {
    if (!result) return;

    const t = safeParseFloat(thickness);
    const w = safeParseFloat(width);
    const l = safeParseFloat(length);
    const q = safeParseFloat(quantity, 1);
    const price = safeParseFloat(pricePerBF);

    addBoardToCurrentList({
      thickness: t,
      thicknessQuarters: inchesToQuarters(t),
      width: w,
      length: l,
      lengthUnit,
      quantity: q,
      boardFeet: result.boardFeet,
      species: species || undefined,
      grade: isAdvancedMode && grade ? grade : undefined,
      moistureContent: isAdvancedMode && moistureContent ? safeParseFloat(moistureContent) : undefined,
      pricePerBF: price || undefined,
      totalCost: result.totalCost || undefined,
    });

    // Show success and reset for next board
    handleReset();
  };

  const handleReset = () => {
    setThickness('1');
    setWidth('');
    setLength('');
    setQuantity('1');
    setPricePerBF('');
    setSpecies('');
    setGrade('');
    setMoistureContent('');
    setResult(null);
  };

  return (
    <>
      <View style={styles.headerActions}>
        <IconButton
          icon="history"
          size={24}
          onPress={() => router.push('/calculators/board-foot-history' as any)}
        />
        {currentList.length > 0 && (
          <View>
            <IconButton
              icon="format-list-numbered"
              size={24}
              onPress={() => router.push('/calculators/board-foot-list' as any)}
            />
            <Badge style={styles.badge} size={18}>
              {currentList.length}
            </Badge>
          </View>
        )}
      </View>

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

          <ThicknessInput
            value={thickness}
            onChangeText={setThickness}
            label="Thickness"
          />

          {isAdvancedMode && (
            <TextInput
              label="Species (optional)"
              value={species}
              onChangeText={setSpecies}
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="e.g., Red Oak, Walnut"
            />
          )}

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

          {isAdvancedMode && (
            <>
              <TextInput
                label="Grade (optional)"
                value={grade}
                onChangeText={setGrade}
                mode="outlined"
                style={calculatorStyles.input}
                placeholder="e.g., FAS, Select, #1 Common"
              />

              <TextInput
                label="Moisture Content % (optional)"
                value={moistureContent}
                onChangeText={setMoistureContent}
                keyboardType="decimal-pad"
                mode="outlined"
                style={calculatorStyles.input}
              />
            </>
          )}
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

            <View style={calculatorStyles.divider} />

            <Button
              mode="contained"
              onPress={handleAddToList}
              icon="plus"
              style={styles.addButton}
            >
              Add to List
            </Button>
          </Card.Content>
        </Card>
      )}
      </CalculatorLayout>
    </>
  );
}

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  addButton: {
    marginTop: spacing.sm,
  },
});
