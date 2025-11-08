import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme, SegmentedButtons, Divider } from 'react-native-paper';
import { formatCurrency } from '@/src/utils/calculations';

/**
 * Project Pricing Calculator Screen
 * Helps woodworkers calculate project costs and pricing
 */
export default function PricingCalculatorScreen() {
  const theme = useTheme();
  
  // Input states
  const [materialCost, setMaterialCost] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursSpent, setHoursSpent] = useState('');
  const [overheadPercent, setOverheadPercent] = useState('20');
  const [markupPercent, setMarkupPercent] = useState('0');
  
  const [pricingModel, setPricingModel] = useState<'simple' | 'overhead' | 'markup'>('overhead');
  
  const [result, setResult] = useState<{
    materialCost: number;
    laborCost: number;
    overhead: number;
    subtotal: number;
    markup: number;
    finalPrice: number;
  } | null>(null);

  const handleCalculate = () => {
    const materials = parseFloat(materialCost) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursSpent) || 0;
    const overheadPct = parseFloat(overheadPercent) || 0;
    const markupPct = parseFloat(markupPercent) || 0;

    const labor = rate * hours;
    let overhead = 0;
    let subtotal = materials + labor;
    let markup = 0;
    let finalPrice = 0;

    switch (pricingModel) {
      case 'simple':
        // Simple: Materials + Labor
        finalPrice = subtotal;
        break;
      
      case 'overhead':
        // Overhead model: Materials + Labor + Overhead%
        overhead = (materials * overheadPct) / 100;
        finalPrice = subtotal + overhead;
        break;
      
      case 'markup':
        // Comprehensive: (Materials + Labor + Overhead) × Markup
        overhead = (materials * overheadPct) / 100;
        subtotal = materials + labor + overhead;
        markup = (subtotal * markupPct) / 100;
        finalPrice = subtotal + markup;
        break;
    }

    setResult({
      materialCost: materials,
      laborCost: labor,
      overhead,
      subtotal,
      markup,
      finalPrice,
    });
  };

  const handleReset = () => {
    setMaterialCost('');
    setHourlyRate('');
    setHoursSpent('');
    setOverheadPercent('20');
    setMarkupPercent('0');
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
            Pricing Model
          </Text>
          
          <SegmentedButtons
            value={pricingModel}
            onValueChange={(value) => setPricingModel(value as any)}
            buttons={[
              { value: 'simple', label: 'Simple' },
              { value: 'overhead', label: 'Overhead' },
              { value: 'markup', label: 'Markup' },
            ]}
            style={styles.segmentedButtons}
          />

          <Text variant="bodySmall" style={styles.helperText}>
            {pricingModel === 'simple' && 'Materials + Labor = Price'}
            {pricingModel === 'overhead' && 'Materials + Labor + Overhead% = Price'}
            {pricingModel === 'markup' && '(Materials + Labor + Overhead) × Markup% = Price'}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Direct Costs
          </Text>

          <TextInput
            label="Material Cost ($)"
            value={materialCost}
            onChangeText={setMaterialCost}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <TextInput
            label="Hourly Rate ($)"
            value={hourlyRate}
            onChangeText={setHourlyRate}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <TextInput
            label="Hours Spent"
            value={hoursSpent}
            onChangeText={setHoursSpent}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="clock-outline" />}
          />

          <Text variant="bodySmall" style={styles.helperText}>
            Typical hourly rates: $25-$85 depending on skill and market
          </Text>
        </Card.Content>
      </Card>

      {(pricingModel === 'overhead' || pricingModel === 'markup') && (
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Overhead & Consumables
            </Text>

            <TextInput
              label="Overhead Percentage (%)"
              value={overheadPercent}
              onChangeText={setOverheadPercent}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.input}
              right={<TextInput.Icon icon="percent" />}
            />

            <Text variant="bodySmall" style={styles.helperText}>
              Covers sandpaper, glue, finish, electricity, tool maintenance (typical: 10-30%)
            </Text>
          </Card.Content>
        </Card>
      )}

      {pricingModel === 'markup' && (
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Profit Margin
            </Text>

            <TextInput
              label="Markup Percentage (%)"
              value={markupPercent}
              onChangeText={setMarkupPercent}
              keyboardType="decimal-pad"
              mode="outlined"
              style={styles.input}
              right={<TextInput.Icon icon="percent" />}
            />

            <Text variant="bodySmall" style={styles.helperText}>
              Wholesale: 50-100% | Retail: 100-200%
            </Text>
          </Card.Content>
        </Card>
      )}

      {result && (
        <Card style={[styles.card, styles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={styles.resultTitle}>
              Price Breakdown
            </Text>
            
            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Materials:</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {formatCurrency(result.materialCost)}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text variant="bodyLarge">Labor:</Text>
              <Text variant="bodyLarge" style={styles.resultValue}>
                {formatCurrency(result.laborCost)}
              </Text>
            </View>

            {result.overhead > 0 && (
              <View style={styles.resultRow}>
                <Text variant="bodyLarge">Overhead:</Text>
                <Text variant="bodyLarge" style={styles.resultValue}>
                  {formatCurrency(result.overhead)}
                </Text>
              </View>
            )}

            {pricingModel === 'markup' && (
              <>
                <Divider style={styles.divider} />
                <View style={styles.resultRow}>
                  <Text variant="bodyLarge">Subtotal:</Text>
                  <Text variant="bodyLarge" style={styles.resultValue}>
                    {formatCurrency(result.subtotal)}
                  </Text>
                </View>

                {result.markup > 0 && (
                  <View style={styles.resultRow}>
                    <Text variant="bodyLarge">Markup:</Text>
                    <Text variant="bodyLarge" style={styles.resultValue}>
                      {formatCurrency(result.markup)}
                    </Text>
                  </View>
                )}
              </>
            )}

            <Divider style={styles.divider} />

            <View style={styles.resultRow}>
              <Text variant="titleLarge" style={styles.totalLabel}>Final Price:</Text>
              <Text variant="displaySmall" style={[styles.resultValue, styles.totalValue]}>
                {formatCurrency(result.finalPrice)}
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
          Calculate Price
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

