/**
 * Add Tool Form Component
 */

import React from 'react';
import { TextInput } from 'react-native-paper';
import { useFieldVisibility } from '@/src/hooks/useFieldVisibility';
import { calculatorStyles } from '@/src/theme';

interface ToolFormValues {
  name: string;
  category: string;
  brand: string;
  model: string;
  location: string;
  notes: string;
}

interface Props {
  values: ToolFormValues;
  onValueChange: <K extends keyof ToolFormValues>(key: K, value: ToolFormValues[K]) => void;
}

export function AddToolForm({ values, onValueChange }: Props) {
  const fieldVisibility = useFieldVisibility();

  return (
    <>
      <TextInput
        label="Tool Name *"
        value={values.name}
        onChangeText={(text) => onValueChange('name', text)}
        mode="outlined"
        style={calculatorStyles.input}
      />

      {fieldVisibility.tool.category && (
        <TextInput
          label="Category"
          value={values.category}
          onChangeText={(text) => onValueChange('category', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., Hand Tool, Power Tool"
        />
      )}

      {fieldVisibility.tool.brand && (
        <TextInput
          label="Brand"
          value={values.brand}
          onChangeText={(text) => onValueChange('brand', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.tool.model && (
        <TextInput
          label="Model"
          value={values.model}
          onChangeText={(text) => onValueChange('model', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.tool.location && (
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

