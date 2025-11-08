/**
 * Add Inventory Item Screen
 * Universal add screen for all inventory types
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme, SegmentedButtons } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { useFormState } from '@/src/hooks';
import { useFieldVisibility } from '@/src/hooks/useFieldVisibility';
import { spacing, calculatorStyles } from '@/src/theme';
import { safeParseFloat, formatCurrency } from '@/src/utils';

export default function AddInventoryItemScreen() {
  const theme = useTheme();
  const { type: paramType } = useLocalSearchParams<{ type?: string }>();
  const [itemType, setItemType] = useState<'lumber' | 'tool' | 'consumable' | 'hardware'>(
    (paramType as any) || 'lumber'
  );
  
  const { addLumber, addTool, addConsumable, addHardware } = useInventoryStore();
  const fieldVisibility = useFieldVisibility();

  const lumberForm = useFormState({
    species: '',
    thickness: '1',
    width: '',
    length: '',
    boardFeet: '',
    costPerBF: '',
    location: '',
    notes: '',
    moistureContent: '',
    supplier: '',
  });

  const toolForm = useFormState({
    name: '',
    category: '',
    brand: '',
    model: '',
    location: '',
    notes: '',
  });

  const consumableForm = useFormState({
    name: '',
    category: '',
    quantity: '',
    unit: 'pieces',
    costPerUnit: '',
    reorderLevel: '',
    location: '',
    notes: '',
  });

  const hardwareForm = useFormState({
    name: '',
    category: '',
    size: '',
    material: '',
    quantity: '',
    unit: 'pieces',
    costPerUnit: '',
    reorderLevel: '',
    location: '',
    notes: '',
  });

  const handleSave = () => {
    if (itemType === 'lumber') {
      const bf = safeParseFloat(lumberForm.values.boardFeet);
      const cost = safeParseFloat(lumberForm.values.costPerBF);
      
      if (lumberForm.values.species.trim() && bf > 0 && cost > 0) {
        addLumber({
          species: lumberForm.values.species,
          thickness: safeParseFloat(lumberForm.values.thickness, 1),
          width: safeParseFloat(lumberForm.values.width) || undefined,
          length: safeParseFloat(lumberForm.values.length) || undefined,
          boardFeet: bf,
          costPerBF: cost,
          location: lumberForm.values.location || undefined,
          notes: lumberForm.values.notes || undefined,
          moistureContent: safeParseFloat(lumberForm.values.moistureContent) || undefined,
          supplier: lumberForm.values.supplier || undefined,
        });
        router.back();
      }
    } else if (itemType === 'tool') {
      if (toolForm.values.name.trim()) {
        addTool({
          name: toolForm.values.name,
          category: toolForm.values.category || undefined,
          brand: toolForm.values.brand || undefined,
          model: toolForm.values.model || undefined,
          location: toolForm.values.location || undefined,
          notes: toolForm.values.notes || undefined,
        });
        router.back();
      }
    } else if (itemType === 'consumable') {
      const qty = safeParseFloat(consumableForm.values.quantity);
      
      if (consumableForm.values.name.trim() && qty > 0) {
        addConsumable({
          name: consumableForm.values.name,
          category: consumableForm.values.category || undefined,
          quantity: qty,
          unit: consumableForm.values.unit,
          costPerUnit: safeParseFloat(consumableForm.values.costPerUnit) || undefined,
          reorderLevel: safeParseFloat(consumableForm.values.reorderLevel) || undefined,
          location: consumableForm.values.location || undefined,
          notes: consumableForm.values.notes || undefined,
        });
        router.back();
      }
    } else if (itemType === 'hardware') {
      const qty = safeParseFloat(hardwareForm.values.quantity);
      
      if (hardwareForm.values.name.trim() && qty > 0) {
        addHardware({
          name: hardwareForm.values.name,
          category: hardwareForm.values.category || undefined,
          size: hardwareForm.values.size || undefined,
          material: hardwareForm.values.material || undefined,
          quantity: qty,
          unit: hardwareForm.values.unit,
          costPerUnit: safeParseFloat(hardwareForm.values.costPerUnit) || undefined,
          reorderLevel: safeParseFloat(hardwareForm.values.reorderLevel) || undefined,
          location: hardwareForm.values.location || undefined,
          notes: hardwareForm.values.notes || undefined,
        });
        router.back();
      }
    }
  };

  const renderLumberFields = () => (
    <>
      <TextInput
        label="Wood Species *"
        value={lumberForm.values.species}
        onChangeText={(text) => lumberForm.setValue('species', text)}
        mode="outlined"
        style={calculatorStyles.input}
        placeholder="e.g., Red Oak, Walnut, Maple"
      />

      {fieldVisibility.lumber.thickness && (
        <TextInput
          label="Thickness (inches) *"
          value={lumberForm.values.thickness}
          onChangeText={(text) => lumberForm.setValue('thickness', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.width && (
        <TextInput
          label="Width (inches)"
          value={lumberForm.values.width}
          onChangeText={(text) => lumberForm.setValue('width', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.length && (
        <TextInput
          label="Length (feet)"
          value={lumberForm.values.length}
          onChangeText={(text) => lumberForm.setValue('length', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.boardFeet && (
        <TextInput
          label="Board Feet *"
          value={lumberForm.values.boardFeet}
          onChangeText={(text) => lumberForm.setValue('boardFeet', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.costPerBF && (
        <>
          <TextInput
            label="Cost per Board Foot ($) *"
            value={lumberForm.values.costPerBF}
            onChangeText={(text) => lumberForm.setValue('costPerBF', text)}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />
          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Total cost: {formatCurrency(safeParseFloat(lumberForm.values.boardFeet) * safeParseFloat(lumberForm.values.costPerBF))}
          </Text>
        </>
      )}

      {fieldVisibility.lumber.moistureContent && (
        <TextInput
          label="Moisture Content (%)"
          value={lumberForm.values.moistureContent}
          onChangeText={(text) => lumberForm.setValue('moistureContent', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.supplier && (
        <TextInput
          label="Supplier"
          value={lumberForm.values.supplier}
          onChangeText={(text) => lumberForm.setValue('supplier', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.lumber.location && (
        <TextInput
          label="Location"
          value={lumberForm.values.location}
          onChangeText={(text) => lumberForm.setValue('location', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., Main rack, Garage, Shed"
        />
      )}

      {fieldVisibility.lumber.notes && (
        <TextInput
          label="Notes"
          value={lumberForm.values.notes}
          onChangeText={(text) => lumberForm.setValue('notes', text)}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={calculatorStyles.input}
          placeholder="Defects, special characteristics..."
        />
      )}
    </>
  );

  const renderToolFields = () => (
    <>
      <TextInput
        label="Tool Name *"
        value={toolForm.values.name}
        onChangeText={(text) => toolForm.setValue('name', text)}
        mode="outlined"
        style={calculatorStyles.input}
      />

      {fieldVisibility.tool.category && (
        <TextInput
          label="Category"
          value={toolForm.values.category}
          onChangeText={(text) => toolForm.setValue('category', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., Hand Tool, Power Tool"
        />
      )}

      {fieldVisibility.tool.brand && (
        <TextInput
          label="Brand"
          value={toolForm.values.brand}
          onChangeText={(text) => toolForm.setValue('brand', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.tool.model && (
        <TextInput
          label="Model"
          value={toolForm.values.model}
          onChangeText={(text) => toolForm.setValue('model', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      {fieldVisibility.tool.location && (
        <TextInput
          label="Location"
          value={toolForm.values.location}
          onChangeText={(text) => toolForm.setValue('location', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      <TextInput
        label="Notes"
        value={toolForm.values.notes}
        onChangeText={(text) => toolForm.setValue('notes', text)}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={calculatorStyles.input}
      />
    </>
  );

  const renderConsumableFields = () => (
    <>
      <TextInput
        label="Item Name *"
        value={consumableForm.values.name}
        onChangeText={(text) => consumableForm.setValue('name', text)}
        mode="outlined"
        style={calculatorStyles.input}
      />

      <TextInput
        label="Quantity *"
        value={consumableForm.values.quantity}
        onChangeText={(text) => consumableForm.setValue('quantity', text)}
        keyboardType="decimal-pad"
        mode="outlined"
        style={calculatorStyles.input}
      />

      <TextInput
        label="Unit *"
        value={consumableForm.values.unit}
        onChangeText={(text) => consumableForm.setValue('unit', text)}
        mode="outlined"
        style={calculatorStyles.input}
        placeholder="e.g., sheets, oz, gal"
      />

      {fieldVisibility.consumable.costPerUnit && (
        <TextInput
          label="Cost per Unit"
          value={consumableForm.values.costPerUnit}
          onChangeText={(text) => consumableForm.setValue('costPerUnit', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
          left={<TextInput.Icon icon="currency-usd" />}
        />
      )}

      {fieldVisibility.consumable.reorderLevel && (
        <TextInput
          label="Reorder Level"
          value={consumableForm.values.reorderLevel}
          onChangeText={(text) => consumableForm.setValue('reorderLevel', text)}
          keyboardType="decimal-pad"
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="Alert when quantity reaches this level"
        />
      )}

      {fieldVisibility.consumable.location && (
        <TextInput
          label="Location"
          value={consumableForm.values.location}
          onChangeText={(text) => consumableForm.setValue('location', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      <TextInput
        label="Notes"
        value={consumableForm.values.notes}
        onChangeText={(text) => consumableForm.setValue('notes', text)}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={calculatorStyles.input}
      />
    </>
  );

  const renderHardwareFields = () => (
    <>
      <TextInput
        label="Item Name *"
        value={hardwareForm.values.name}
        onChangeText={(text) => hardwareForm.setValue('name', text)}
        mode="outlined"
        style={calculatorStyles.input}
      />

      {fieldVisibility.hardware.size && (
        <TextInput
          label="Size"
          value={hardwareForm.values.size}
          onChangeText={(text) => hardwareForm.setValue('size', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., #8 x 1-1/4"
        />
      )}

      {fieldVisibility.hardware.material && (
        <TextInput
          label="Material"
          value={hardwareForm.values.material}
          onChangeText={(text) => hardwareForm.setValue('material', text)}
          mode="outlined"
          style={calculatorStyles.input}
          placeholder="e.g., Brass, Steel, Stainless"
        />
      )}

      <TextInput
        label="Quantity *"
        value={hardwareForm.values.quantity}
        onChangeText={(text) => hardwareForm.setValue('quantity', text)}
        keyboardType="decimal-pad"
        mode="outlined"
        style={calculatorStyles.input}
      />

      <TextInput
        label="Unit *"
        value={hardwareForm.values.unit}
        onChangeText={(text) => hardwareForm.setValue('unit', text)}
        mode="outlined"
        style={calculatorStyles.input}
        placeholder="e.g., pieces, pairs, sets"
      />

      {fieldVisibility.hardware.location && (
        <TextInput
          label="Location"
          value={hardwareForm.values.location}
          onChangeText={(text) => hardwareForm.setValue('location', text)}
          mode="outlined"
          style={calculatorStyles.input}
        />
      )}

      <TextInput
        label="Notes"
        value={hardwareForm.values.notes}
        onChangeText={(text) => hardwareForm.setValue('notes', text)}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={calculatorStyles.input}
      />
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <SegmentedButtons
          value={itemType}
          onValueChange={(value) => setItemType(value as any)}
          buttons={[
            { value: 'lumber', label: 'Lumber', icon: 'tree' },
            { value: 'tool', label: 'Tool', icon: 'hammer-wrench' },
            { value: 'consumable', label: 'Consumable', icon: 'package-variant' },
            { value: 'hardware', label: 'Hardware', icon: 'screw-machine-flat-top' },
          ]}
          style={styles.typeSwitcher}
        />

        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            {itemType === 'lumber' && renderLumberFields()}
            {itemType === 'tool' && renderToolFields()}
            {itemType === 'consumable' && renderConsumableFields()}
            {itemType === 'hardware' && renderHardwareFields()}
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
  typeSwitcher: {
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

