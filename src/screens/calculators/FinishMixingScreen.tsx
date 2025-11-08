import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, SegmentedButtons, TextInput, List } from 'react-native-paper';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { SelectableList } from '@/src/components/common/SelectableList';
import { calculatorStyles, spacing } from '@/src/theme';
import { 
  calculateShellacImperial, 
  calculateShellacMetric,
  poundCutToGramsPerLiter,
  getMixingInstructions,
  getShelfLife,
  safeParseFloat 
} from '@/src/utils';
import { SHELLAC_CUTS } from '@/src/constants';

/**
 * Finish Mixing Calculator Screen
 * Calculate precise shellac mixing ratios for perfect finishes
 */
export default function FinishMixingScreen() {
  const [poundCut, setPoundCut] = useState<number>(2);
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [volumeImperial, setVolumeImperial] = useState('');
  const [volumeMetric, setVolumeMetric] = useState('');
  
  const [result, setResult] = useState<{
    flakesWeight: number;
    unit: string;
    poundCut: number;
    instructions: string[];
  } | null>(null);

  const handleCalculate = () => {
    if (unitSystem === 'imperial') {
      const vol = safeParseFloat(volumeImperial);
      if (vol > 0) {
        const weight = calculateShellacImperial(poundCut, vol);
        setResult({
          flakesWeight: weight,
          unit: 'oz',
          poundCut,
          instructions: getMixingInstructions(poundCut),
        });
      }
    } else {
      const vol = safeParseFloat(volumeMetric);
      if (vol > 0) {
        const gramsPerLiter = poundCutToGramsPerLiter(poundCut);
        const weight = calculateShellacMetric(gramsPerLiter, vol);
        setResult({
          flakesWeight: weight,
          unit: 'g',
          poundCut,
          instructions: getMixingInstructions(poundCut),
        });
      }
    }
  };

  const handleReset = () => {
    setPoundCut(2);
    setVolumeImperial('');
    setVolumeMetric('');
    setResult(null);
  };

  const selectedCut = SHELLAC_CUTS.find(c => c.value === poundCut);

  return (
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Calculate Mix"
    >
      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Unit System
          </Text>

          <SegmentedButtons
            value={unitSystem}
            onValueChange={(value) => setUnitSystem(value as 'imperial' | 'metric')}
            buttons={[
              { value: 'imperial', label: 'Imperial (oz)' },
              { value: 'metric', label: 'Metric (ml)' },
            ]}
            style={calculatorStyles.segmentedButtons}
          />
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Shellac Cut
          </Text>

          <View style={styles.cutSelector}>
            {SHELLAC_CUTS.map((cut) => (
              <List.Item
                key={cut.value}
                title={cut.label}
                description={cut.description}
                onPress={() => setPoundCut(cut.value)}
                left={() => (
                  <List.Icon 
                    icon={poundCut === cut.value ? 'radiobox-marked' : 'radiobox-blank'} 
                  />
                )}
                style={poundCut === cut.value ? styles.selectedCut : undefined}
              />
            ))}
          </View>

          {selectedCut && (
            <Text variant="bodySmall" style={calculatorStyles.helperText}>
              {selectedCut.description}
            </Text>
          )}
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Solvent Volume
          </Text>

          {unitSystem === 'imperial' ? (
            <TextInput
              label="Alcohol Volume (fluid ounces)"
              value={volumeImperial}
              onChangeText={setVolumeImperial}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              left={<TextInput.Icon icon="water" />}
            />
          ) : (
            <TextInput
              label="Alcohol Volume (milliliters)"
              value={volumeMetric}
              onChangeText={setVolumeMetric}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              left={<TextInput.Icon icon="water" />}
            />
          )}

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Use denatured alcohol or 190 proof grain alcohol
          </Text>
        </Card.Content>
      </Card>

      {result && (
        <>
          <Card style={[calculatorStyles.card, calculatorStyles.resultCard]} mode="elevated">
            <Card.Content>
              <Text variant="titleLarge" style={calculatorStyles.resultTitle}>
                Mix Recipe
              </Text>
              
              <View style={calculatorStyles.resultRow}>
                <Text variant="bodyLarge">Shellac Cut:</Text>
                <Text variant="titleLarge" style={calculatorStyles.resultValue}>
                  {result.poundCut}-lb Cut
                </Text>
              </View>

              <View style={calculatorStyles.resultRow}>
                <Text variant="bodyLarge">Shellac Flakes Needed:</Text>
                <Text variant="titleLarge" style={[calculatorStyles.resultValue, calculatorStyles.totalValue]}>
                  {result.flakesWeight.toFixed(2)} {result.unit}
                </Text>
              </View>

              <View style={calculatorStyles.divider} />

              <Text variant="titleMedium" style={styles.instructionsTitle}>
                Mixing Instructions
              </Text>

              {result.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionRow}>
                  <Text variant="bodyMedium">• {instruction}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>

          <Card style={calculatorStyles.card} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
                Storage & Shelf Life
              </Text>

              {getShelfLife().map((tip, index) => (
                <View key={index} style={styles.instructionRow}>
                  <Text variant="bodyMedium">• {tip}</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        </>
      )}
    </CalculatorLayout>
  );
}

const styles = StyleSheet.create({
  cutSelector: {
    marginBottom: spacing.md,
  },
  selectedCut: {
    backgroundColor: 'rgba(139, 69, 19, 0.1)', // Primary color with opacity
  },
  instructionsTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  instructionRow: {
    marginBottom: spacing.xs,
  },
});

