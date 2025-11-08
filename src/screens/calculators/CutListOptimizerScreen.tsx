import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, List, IconButton, SegmentedButtons, Menu } from 'react-native-paper';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles, spacing } from '@/src/theme';
import { optimizeCutList, formatDimension, calculateWasteArea } from '@/src/utils/cutListOptimizer';
import { CuttingDiagram } from '@/src/components/calculators/CuttingDiagram';
import { Part, StockPanel, CutLayout } from '@/src/types/cutList';
import { SHEET_SIZES } from '@/src/constants';

/**
 * Cut List Optimizer Screen
 * Minimize waste with optimized cutting diagrams
 */
export default function CutListOptimizerScreen() {
  // Stock panel
  const [stockWidth, setStockWidth] = useState('48');
  const [stockHeight, setStockHeight] = useState('96');
  const [kerf, setKerf] = useState('0.125');
  
  // Parts list
  const [parts, setParts] = useState<Part[]>([]);
  
  // New part inputs
  const [partName, setPartName] = useState('');
  const [partWidth, setPartWidth] = useState('');
  const [partHeight, setPartHeight] = useState('');
  const [partQuantity, setPartQuantity] = useState('1');
  const [partGrain, setPartGrain] = useState<'horizontal' | 'vertical' | 'none'>('none');
  
  // Sheet size menu
  const [sheetMenuVisible, setSheetMenuVisible] = useState(false);
  
  // Results
  const [layout, setLayout] = useState<CutLayout | null>(null);

  const handleAddPart = () => {
    const width = parseFloat(partWidth);
    const height = parseFloat(partHeight);
    const quantity = parseInt(partQuantity, 10);

    if (partName && width > 0 && height > 0 && quantity > 0) {
      const newPart: Part = {
        id: Math.random().toString(36).substr(2, 9),
        name: partName,
        width,
        height,
        quantity,
        grainDirection: partGrain,
      };

      setParts([...parts, newPart]);
      
      // Reset inputs
      setPartName('');
      setPartWidth('');
      setPartHeight('');
      setPartQuantity('1');
      setPartGrain('none');
    }
  };

  const handleRemovePart = (id: string) => {
    setParts(parts.filter(p => p.id !== id));
  };

  const handleCalculate = () => {
    const stock: StockPanel = {
      width: parseFloat(stockWidth) || 48,
      height: parseFloat(stockHeight) || 96,
    };

    const kerfValue = parseFloat(kerf) || 0.125;

    if (parts.length > 0) {
      const optimizedLayout = optimizeCutList(stock, parts, kerfValue);
      setLayout(optimizedLayout);
    }
  };

  const handleReset = () => {
    setParts([]);
    setLayout(null);
    setStockWidth('48');
    setStockHeight('96');
    setKerf('0.125');
  };

  const handleSheetSizeSelect = (width: number, height: number) => {
    setStockWidth(width.toString());
    setStockHeight(height.toString());
    setSheetMenuVisible(false);
  };

  const totalParts = parts.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Optimize Layout"
      isCalculateDisabled={parts.length === 0}
    >
      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Stock Panel Size
          </Text>

          <Menu
            visible={sheetMenuVisible}
            onDismiss={() => setSheetMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setSheetMenuVisible(true)}
                icon="arrow-down-drop-circle-outline"
                style={styles.sheetButton}
              >
                {stockWidth}" × {stockHeight}" 
                ({formatDimension(parseFloat(stockWidth))} × {formatDimension(parseFloat(stockHeight))})
              </Button>
            }
          >
            {SHEET_SIZES.map((size) => (
              <Menu.Item
                key={size.label}
                onPress={() => size.width > 0 && handleSheetSizeSelect(size.width, size.height)}
                title={size.label}
              />
            ))}
          </Menu>

          <View style={styles.dimensionsRow}>
            <TextInput
              label="Width (inches)"
              value={stockWidth}
              onChangeText={setStockWidth}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.dimensionInput}
            />
            <Text variant="headlineMedium" style={styles.times}>×</Text>
            <TextInput
              label="Height (inches)"
              value={stockHeight}
              onChangeText={setStockHeight}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.dimensionInput}
            />
          </View>

          <TextInput
            label="Saw Blade Kerf (inches)"
            value={kerf}
            onChangeText={setKerf}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="saw-blade" />}
          />

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Typical kerf: 1/8" (0.125") for table saw, 3/32" for thin kerf blades
          </Text>
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Add Parts
          </Text>

          <TextInput
            label="Part Name"
            value={partName}
            onChangeText={setPartName}
            mode="outlined"
            style={calculatorStyles.input}
            placeholder="e.g., Shelf, Side Panel"
          />

          <View style={styles.dimensionsRow}>
            <TextInput
              label="Width"
              value={partWidth}
              onChangeText={setPartWidth}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.dimensionInput}
            />
            <Text variant="headlineMedium" style={styles.times}>×</Text>
            <TextInput
              label="Height"
              value={partHeight}
              onChangeText={setPartHeight}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.dimensionInput}
            />
            <TextInput
              label="Qty"
              value={partQuantity}
              onChangeText={setPartQuantity}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.qtyInput}
            />
          </View>

          <Text variant="labelMedium" style={calculatorStyles.label}>
            Grain Direction
          </Text>
          <SegmentedButtons
            value={partGrain}
            onValueChange={(value) => setPartGrain(value as any)}
            buttons={[
              { value: 'none', label: 'Any' },
              { value: 'horizontal', label: 'Horizontal →' },
              { value: 'vertical', label: 'Vertical ↑' },
            ]}
            style={calculatorStyles.segmentedButtons}
          />

          <Button
            mode="contained"
            onPress={handleAddPart}
            icon="plus"
            style={styles.addButton}
            disabled={!partName || !partWidth || !partHeight}
          >
            Add Part to List
          </Button>
        </Card.Content>
      </Card>

      {parts.length > 0 && (
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Parts List ({totalParts} total)
            </Text>

            {parts.map((part) => (
              <List.Item
                key={part.id}
                title={part.name}
                description={`${part.width}" × ${part.height}" | Qty: ${part.quantity}${part.grainDirection !== 'none' ? ` | Grain: ${part.grainDirection}` : ''}`}
                left={() => <List.Icon icon="square-outline" />}
                right={() => (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => handleRemovePart(part.id)}
                  />
                )}
                style={styles.partItem}
              />
            ))}
          </Card.Content>
        </Card>
      )}

      {layout && (
        <>
          <Card style={[calculatorStyles.card, calculatorStyles.resultCard]} mode="elevated">
            <Card.Content>
              <Text variant="titleLarge" style={calculatorStyles.resultTitle}>
                Optimized Layout
              </Text>

              <CuttingDiagram layout={layout} />

              <View style={calculatorStyles.divider} />

              <View style={calculatorStyles.resultRow}>
                <Text variant="bodyLarge">Parts Placed:</Text>
                <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                  {layout.placedParts.length} / {totalParts}
                </Text>
              </View>

              <View style={calculatorStyles.resultRow}>
                <Text variant="bodyLarge">Area Used:</Text>
                <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                  {layout.totalAreaUsed.toFixed(0)} sq in
                </Text>
              </View>

              <View style={calculatorStyles.resultRow}>
                <Text variant="bodyLarge">Waste:</Text>
                <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                  {layout.wastePercentage.toFixed(1)}%
                </Text>
              </View>

              {layout.placedParts.length < totalParts && (
                <View style={styles.warningBox}>
                  <Text variant="bodyMedium" style={styles.warningText}>
                    ⚠️ Not all parts fit on this sheet. You'll need multiple sheets or a larger panel.
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>

          {calculateWasteArea(layout) > 144 && (
            <Card style={calculatorStyles.card} mode="elevated">
              <Card.Content>
                <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
                  Usable Offcuts
                </Text>

                <Text variant="bodyMedium">
                  Remaining waste area: {calculateWasteArea(layout).toFixed(0)} sq in
                </Text>

                <Text variant="bodySmall" style={styles.offcutNote}>
                  Save large offcuts for future small projects
                </Text>
              </Card.Content>
            </Card>
          )}
        </>
      )}
    </CalculatorLayout>
  );
}

const styles = StyleSheet.create({
  sheetButton: {
    marginBottom: spacing.md,
  },
  dimensionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  dimensionInput: {
    flex: 1,
  },
  times: {
    marginTop: spacing.sm,
    opacity: 0.5,
  },
  qtyInput: {
    width: 70,
  },
  addButton: {
    marginTop: spacing.sm,
  },
  partItem: {
    paddingVertical: spacing.xs,
  },
  warningBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
  },
  warningText: {
    color: '#856404',
  },
  offcutNote: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});

