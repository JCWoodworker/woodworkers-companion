/**
 * Thickness Input Component
 * Bidirectional quarters ↔ inches input with toggle
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { quartersToInches, inchesToQuarters } from '@/src/utils/boardFootConversions';
import { spacing, calculatorStyles } from '@/src/theme';
import { safeParseFloat } from '@/src/utils';

interface Props {
  value: string; // Always stores inches as string
  onChangeText: (inches: string) => void;
  label?: string;
}

export function ThicknessInput({ value, onChangeText, label = 'Thickness' }: Props) {
  const theme = useTheme();
  const [mode, setMode] = useState<'quarters' | 'inches'>('quarters');
  const [quartersValue, setQuartersValue] = useState('4'); // Default 4/4
  const [inchesValue, setInchesValue] = useState(value || '1');

  // Sync with parent value when it changes externally
  useEffect(() => {
    if (value !== inchesValue) {
      setInchesValue(value);
      const inches = safeParseFloat(value);
      if (inches > 0) {
        setQuartersValue(String(inchesToQuarters(inches)));
      }
    }
  }, [value]);

  const handleQuartersChange = (text: string) => {
    setQuartersValue(text);
    const q = safeParseFloat(text);
    if (q > 0) {
      const inches = quartersToInches(q);
      const inchesStr = String(inches);
      setInchesValue(inchesStr);
      onChangeText(inchesStr);
    } else if (text === '') {
      setInchesValue('');
      onChangeText('');
    }
  };

  const handleInchesChange = (text: string) => {
    setInchesValue(text);
    const inches = safeParseFloat(text);
    if (inches > 0) {
      const quarters = inchesToQuarters(inches);
      setQuartersValue(String(quarters));
      onChangeText(text);
    } else if (text === '') {
      setQuartersValue('');
      onChangeText('');
    }
  };

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={mode}
        onValueChange={(value) => setMode(value as 'quarters' | 'inches')}
        buttons={[
          { value: 'quarters', label: 'Quarters (4/4)' },
          { value: 'inches', label: 'Decimal (")' },
        ]}
        style={styles.toggle}
      />

      {mode === 'quarters' ? (
        <View style={styles.inputContainer}>
          <TextInput
            label={`${label} (quarters)`}
            value={quartersValue}
            onChangeText={handleQuartersChange}
            keyboardType="number-pad"
            mode="outlined"
            style={[calculatorStyles.input, styles.quartersInput]}
            right={<TextInput.Affix text="/4" />}
          />
          <Text variant="bodySmall" style={[styles.helperText, { color: theme.colors.onSurfaceVariant }]}>
            = {safeParseFloat(inchesValue).toFixed(3)}" thick
          </Text>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            label={`${label} (inches)`}
            value={inchesValue}
            onChangeText={handleInchesChange}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
          />
          <Text variant="bodySmall" style={[styles.helperText, { color: theme.colors.onSurfaceVariant }]}>
            ≈ {inchesToQuarters(safeParseFloat(inchesValue))}/4
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  toggle: {
    marginBottom: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.xs,
  },
  quartersInput: {
    maxWidth: 150,
  },
  helperText: {
    marginTop: spacing.xs,
    marginLeft: spacing.sm,
  },
});

