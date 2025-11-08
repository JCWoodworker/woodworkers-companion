/**
 * Add Lumber Form Component
 * Extracted from AddInventoryItemScreen for better code organization
 */

import React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { useFieldVisibility } from '@/src/hooks/useFieldVisibility';
import { calculatorStyles } from '@/src/theme';
import { safeParseFloat, formatCurrency } from '@/src/utils';

interface LumberFormValues {
  species: string;
  thickness: string;
  width: string;
  length: string;
  boardFeet: string;
  costPerBF: string;
  location: string;
  notes: string;
  moistureContent: string;
  supplier: string;
}

interface Props {
  values: LumberFormValues;
  onValueChange: <K extends keyof LumberFormValues>(key: K, value: LumberFormValues[K]) => void;
}

export function AddLumberForm({ values, onValueChange }: Props) {
  const fieldVisibility = useFieldVisibility();

  return (
    <>
      <TextInput
        label="Wood Species *"
        value={values.species}
        onChangeText={(text) => onValueChange('species', text)}
        mode="outlined"
        style={calculatorStyles.input}
        placeholder="e.g., Red Oak, Walnut, Maple"
      />

      {fieldVisibility.lumber.thickness && (
        <TextInput
          label="Thickness (inches) *"
          value={values.thickness}
          onChangeText={(text) => onValueChange('thickness', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.width && (
        <TextInput
          label="Width (inches)"
          value={values.width}
          onChangeText={(text) => onValueChange('width', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.length && (
        <TextInput
          label="Length (feet)"
          value={values.length}
          onChangeText={(text) => onValueChange('length', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.boardFeet && (
        <TextInput
          label="Board Feet *"
          value={values.boardFeet}
          onChangeText={(text) => onValueChange('boardFeet', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.costPerBF && (
        <>
          <TextInput
            label="Cost per Board Foot ($) *"
            value={values.costPerBF}
            onChangeText={(text) => onValueChange('costPerBF', text)}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />
          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Total cost: {formatCurrency(safeParseFloat(values.boardFeet) * safeParseFloat(values.costPerBF))}
          </Text>
        </>
      )}

      {fieldVisibility.lumber.moistureContent && (
        <TextInput
          label="Moisture Content (%)"
          value={values.moistureContent}
          onChangeText={(text) => onValueChange('moistureContent', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.supplier && (
        <TextInput
          label="Supplier"
          value={values.supplier}
          onChangeText={(text) => onValueChange('supplier', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.location && (
        <TextInput
          label="Location"
          value={values.location}
          onChangeText={(text) => onValueChange('location', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., Main rack, Garage, Shed"
        />
      )}

      {fieldVisibility.lumber.notes && (
        <TextInput
          label="Notes"
          value={values.notes}
          onChangeText={(text) => onValueChange('notes', text)}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={calculatorStyles.input}
          placeholder="Defects, special characteristics..."
        />
      )}
    </>
  );
}

