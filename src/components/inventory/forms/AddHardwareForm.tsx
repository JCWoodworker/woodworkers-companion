/**
 * Add Hardware Form Component
 */

import React from 'react';
import { TextInput } from 'react-native-paper';
import { useFieldVisibility } from '@/src/hooks/useFieldVisibility';
import { calculatorStyles } from '@/src/theme';

interface HardwareFormValues {
  name: string;
  category: string;
  size: string;
  material: string;
  quantity: string;
  unit: string;
  costPerUnit: string;
  reorderLevel: string;
  location: string;
  notes: string;
}

interface Props {
  values: HardwareFormValues;
  onValueChange: <K extends keyof HardwareFormValues>(key: K, value: HardwareFormValues[K]) => void;
}

export function AddHardwareForm({ values, onValueChange }: Props) {
  const fieldVisibility = useFieldVisibility();

  return (
    <>
      <TextInput
        label="Item Name *"
        value={values.name}
        onChangeText={(text) => onValueChange('name', text)}
        mode="outlined"
        style={calculatorStyles.input}
      />

      {fieldVisibility.hardware.size && (
        <TextInput
          label="Size"
          value={values.size}
          onChangeText={(text) => onValueChange('size', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., #8 x 1-1/4"
        />
      )}

      {fieldVisibility.hardware.material && (
        <TextInput
          label="Material"
          value={values.material}
          onChangeText={(text) => onValueChange('material', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., Brass, Steel, Stainless"
        />
      )}

      <TextInput
        label="Quantity *"
        value={values.quantity}
        onChangeText={(text) => onValueChange('quantity', text)}
        keyboardType="decimal-pad"
        mode="outlined"
        style={calculatorStyles.input}
      />

      <TextInput
        label="Unit *"
        value={values.unit}
        onChangeText={(text) => onValueChange('unit', text)}
        mode="outlined"
        style={calculatorStyles.input}
        placeholder="e.g., pieces, pairs, sets"
      />

      {fieldVisibility.hardware.location && (
        <TextInput
          label="Location"
          value={values.location}
          onChangeText={(text) => onValueChange('location', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      <TextInput
        label="Notes"
        value={values.notes}
        onChangeText={(text) => onValueChange('notes', text)}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={calculatorStyles.input}
      />
    </>
  );
}

