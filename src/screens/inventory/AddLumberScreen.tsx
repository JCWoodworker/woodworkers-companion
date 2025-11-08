/**
 * Add Lumber Screen
 * Add lumber to inventory
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { useFormState } from '@/src/hooks';
import { spacing, calculatorStyles } from '@/src/theme';
import { safeParseFloat } from '@/src/utils';

export default function AddLumberScreen() {
  const theme = useTheme();
  const { addLumber } = useInventoryStore();

  const { values, setValue, reset } = useFormState({
    species: '',
    thickness: '1',
    width: '',
    length: '',
    boardFeet: '',
    costPerBF: '',
    location: '',
    notes: '',
  });

  const handleSave = () => {
    const bf = safeParseFloat(values.boardFeet);
    const cost = safeParseFloat(values.costPerBF);

    if (values.species.trim() && bf > 0 && cost > 0) {
      addLumber({
        species: values.species,
        thickness: safeParseFloat(values.thickness, 1),
        width: safeParseFloat(values.width) || undefined,
        length: safeParseFloat(values.length) || undefined,
        boardFeet: bf,
        costPerBF: cost,
        location: values.location || undefined,
        notes: values.notes || undefined,
      });

      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Lumber Details
            </Text>

            <TextInput
              label="Wood Species *"
              value={values.species}
              onChangeText={(text) => setValue('species', text)}
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="e.g., Red Oak, Walnut, Maple"
            />

            <TextInput
              label="Thickness (inches) *"
              value={values.thickness}
              onChangeText={(text) => setValue('thickness', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
            />

            <TextInput
              label="Width (inches)"
              value={values.width}
              onChangeText={(text) => setValue('width', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="Optional"
            />

            <TextInput
              label="Length (feet)"
              value={values.length}
              onChangeText={(text) => setValue('length', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="Optional"
            />

            <TextInput
              label="Board Feet *"
              value={values.boardFeet}
              onChangeText={(text) => setValue('boardFeet', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
            />

            <TextInput
              label="Cost per Board Foot ($) *"
              value={values.costPerBF}
              onChangeText={(text) => setValue('costPerBF', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              left={<TextInput.Icon icon="currency-usd" />}
            />

            <Text variant="bodySmall" style={calculatorStyles.helperText}>
              Total cost: {formatCurrency(safeParseFloat(values.boardFeet) * safeParseFloat(values.costPerBF))}
            </Text>
          </Card.Content>
        </Card>

        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Storage
            </Text>

            <TextInput
              label="Location"
              value={values.location}
              onChangeText={(text) => setValue('location', text)}
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="e.g., Main rack, Garage, Shed"
            />

            <TextInput
              label="Notes"
              value={values.notes}
              onChangeText={(text) => setValue('notes', text)}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={calculatorStyles.input}
              placeholder="Defects, special characteristics..."
            />
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.button}
          >
            Cancel
          </Button>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            disabled={!values.species.trim() || !values.boardFeet || !values.costPerBF}
          >
            Add to Inventory
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.base,
    paddingBottom: spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

