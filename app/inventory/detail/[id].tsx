/**
 * Inventory Item Detail Screen
 * View and edit inventory item details
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, Button, useTheme, Divider } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { spacing, calculatorStyles } from '@/src/theme';
import { formatCurrency } from '@/src/utils';

export default function InventoryItemDetailScreen() {
  const theme = useTheme();
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
  const { lumber, tools, consumables, hardware, removeLumber, removeTool, removeConsumable, removeHardware } = useInventoryStore();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    let foundItem;
    switch (type) {
      case 'lumber':
        foundItem = lumber.find(l => l.id === id);
        break;
      case 'tool':
        foundItem = tools.find(t => t.id === id);
        break;
      case 'consumable':
        foundItem = consumables.find(c => c.id === id);
        break;
      case 'hardware':
        foundItem = hardware.find(h => h.id === id);
        break;
    }
    setItem(foundItem);
  }, [id, type, lumber, tools, consumables, hardware]);

  if (!item) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Item not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    switch (type) {
      case 'lumber':
        removeLumber(id);
        break;
      case 'tool':
        removeTool(id);
        break;
      case 'consumable':
        removeConsumable(id);
        break;
      case 'hardware':
        removeHardware(id);
        break;
    }
    router.back();
  };

  const renderLumberDetail = () => (
    <>
      <Text variant="displaySmall" style={styles.title}>{item.species}</Text>
      <Divider style={styles.divider} />
      <DetailRow label="Thickness" value={`${item.thickness}"`} />
      {item.width && <DetailRow label="Width" value={`${item.width}"`} />}
      {item.length && <DetailRow label="Length" value={`${item.length}'`} />}
      <DetailRow label="Board Feet" value={item.boardFeet.toFixed(2)} />
      <DetailRow label="Cost per BF" value={formatCurrency(item.costPerBF)} />
      <DetailRow label="Total Cost" value={formatCurrency(item.totalCost)} />
      {item.moistureContent && <DetailRow label="Moisture Content" value={`${item.moistureContent}%`} />}
      {item.supplier && <DetailRow label="Supplier" value={item.supplier} />}
      {item.location && <DetailRow label="Location" value={item.location} />}
      {item.notes && <DetailRow label="Notes" value={item.notes} />}
    </>
  );

  const renderToolDetail = () => (
    <>
      <Text variant="displaySmall" style={styles.title}>{item.name}</Text>
      <Divider style={styles.divider} />
      {item.category && <DetailRow label="Category" value={item.category} />}
      {item.brand && <DetailRow label="Brand" value={item.brand} />}
      {item.model && <DetailRow label="Model" value={item.model} />}
      {item.location && <DetailRow label="Location" value={item.location} />}
      {item.notes && <DetailRow label="Notes" value={item.notes} />}
    </>
  );

  const renderConsumableDetail = () => (
    <>
      <Text variant="displaySmall" style={styles.title}>{item.name}</Text>
      <Divider style={styles.divider} />
      <DetailRow label="Quantity" value={`${item.quantity} ${item.unit}`} />
      {item.costPerUnit && <DetailRow label="Cost per Unit" value={formatCurrency(item.costPerUnit)} />}
      {item.totalCost && <DetailRow label="Total Cost" value={formatCurrency(item.totalCost)} />}
      {item.reorderLevel && <DetailRow label="Reorder Level" value={`${item.reorderLevel} ${item.unit}`} />}
      {item.location && <DetailRow label="Location" value={item.location} />}
      {item.notes && <DetailRow label="Notes" value={item.notes} />}
    </>
  );

  const renderHardwareDetail = () => (
    <>
      <Text variant="displaySmall" style={styles.title}>{item.name}</Text>
      <Divider style={styles.divider} />
      {item.size && <DetailRow label="Size" value={item.size} />}
      {item.material && <DetailRow label="Material" value={item.material} />}
      <DetailRow label="Quantity" value={`${item.quantity} ${item.unit}`} />
      {item.costPerUnit && <DetailRow label="Cost per Unit" value={formatCurrency(item.costPerUnit)} />}
      {item.location && <DetailRow label="Location" value={item.location} />}
      {item.notes && <DetailRow label="Notes" value={item.notes} />}
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            {type === 'lumber' && renderLumberDetail()}
            {type === 'tool' && renderToolDetail()}
            {type === 'consumable' && renderConsumableDetail()}
            {type === 'hardware' && renderHardwareDetail()}
          </Card.Content>
        </Card>

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleDelete}
            style={styles.button}
            textColor={theme.colors.error}
          >
            Delete
          </Button>
          <Button
            mode="contained"
            onPress={() => router.back()}
            style={styles.button}
          >
            Done
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
        {label}
      </Text>
      <Text variant="bodyLarge">{value}</Text>
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
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  divider: {
    marginBottom: spacing.md,
  },
  row: {
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
});

