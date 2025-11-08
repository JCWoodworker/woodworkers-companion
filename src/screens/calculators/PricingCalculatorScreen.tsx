import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Card, Text, SegmentedButtons, Divider } from 'react-native-paper';
import { formatCurrency, safeParseFloat } from '@/src/utils';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles } from '@/src/theme';

/**
 * Project Pricing Calculator Screen
 * Helps woodworkers calculate project costs and pricing
 */
export default function PricingCalculatorScreen() {
  
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
    const materials = safeParseFloat(materialCost);
    const rate = safeParseFloat(hourlyRate);
    const hours = safeParseFloat(hoursSpent);
    const overheadPct = safeParseFloat(overheadPercent);
    const markupPct = safeParseFloat(markupPercent);

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
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Calculate Price"
    >
      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
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
            style={calculatorStyles.segmentedButtons}
          />

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            {pricingModel === 'simple' && 'Materials + Labor = Price'}
            {pricingModel === 'overhead' && 'Materials + Labor + Overhead% = Price'}
            {pricingModel === 'markup' && '(Materials + Labor + Overhead) × Markup% = Price'}
          </Text>
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Direct Costs
          </Text>

          <TextInput
            label="Material Cost ($)"
            value={materialCost}
            onChangeText={setMaterialCost}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <TextInput
            label="Hourly Rate ($)"
            value={hourlyRate}
            onChangeText={setHourlyRate}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <TextInput
            label="Hours Spent"
            value={hoursSpent}
            onChangeText={setHoursSpent}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="clock-outline" />}
          />

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Typical hourly rates: $25-$85 depending on skill and market
          </Text>
        </Card.Content>
      </Card>

      {(pricingModel === 'overhead' || pricingModel === 'markup') && (
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Overhead & Consumables
            </Text>

            <TextInput
              label="Overhead Percentage (%)"
              value={overheadPercent}
              onChangeText={setOverheadPercent}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              right={<TextInput.Icon icon="percent" />}
            />

            <Text variant="bodySmall" style={calculatorStyles.helperText}>
              Covers sandpaper, glue, finish, electricity, tool maintenance (typical: 10-30%)
            </Text>
          </Card.Content>
        </Card>
      )}

      {pricingModel === 'markup' && (
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Profit Margin
            </Text>

            <TextInput
              label="Markup Percentage (%)"
              value={markupPercent}
              onChangeText={setMarkupPercent}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              right={<TextInput.Icon icon="percent" />}
            />

            <Text variant="bodySmall" style={calculatorStyles.helperText}>
              Wholesale: 50-100% | Retail: 100-200%
            </Text>
          </Card.Content>
        </Card>
      )}

      {result && (
        <Card style={[calculatorStyles.card, calculatorStyles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={calculatorStyles.resultTitle}>
              Price Breakdown
            </Text>
            
            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Materials:</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {formatCurrency(result.materialCost)}
              </Text>
            </View>

            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Labor:</Text>
              <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                {formatCurrency(result.laborCost)}
              </Text>
            </View>

            {result.overhead > 0 && (
              <View style={calculatorStyles.resultRow}>
                <Text variant="bodyLarge">Overhead:</Text>
                <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                  {formatCurrency(result.overhead)}
                </Text>
              </View>
            )}

            {pricingModel === 'markup' && (
              <>
                <Divider style={calculatorStyles.divider} />
                <View style={calculatorStyles.resultRow}>
                  <Text variant="bodyLarge">Subtotal:</Text>
                  <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                    {formatCurrency(result.subtotal)}
                  </Text>
                </View>

                {result.markup > 0 && (
                  <View style={calculatorStyles.resultRow}>
                    <Text variant="bodyLarge">Markup:</Text>
                    <Text variant="bodyLarge" style={calculatorStyles.resultValue}>
                      {formatCurrency(result.markup)}
                    </Text>
                  </View>
                )}
              </>
            )}

            <Divider style={calculatorStyles.divider} />

            <View style={calculatorStyles.resultRow}>
              <Text variant="titleLarge" style={calculatorStyles.totalLabel}>Final Price:</Text>
              <Text variant="displaySmall" style={[calculatorStyles.resultValue, calculatorStyles.totalValue]}>
                {formatCurrency(result.finalPrice)}
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}
    </CalculatorLayout>
  );
}

