/**
 * Inventory Card Component
 * Generic card for any inventory type
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, Chip, useTheme } from 'react-native-paper';
import { LumberEntry, Tool, Consumable, Hardware } from '@/src/types/inventory';
import { CustomCategoryItem } from '@/src/types/customCategory';
import { CategoryIcon } from './CategoryIcon';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';

interface Props {
  item: LumberEntry | Tool | Consumable | Hardware | CustomCategoryItem;
  type: 'lumber' | 'tool' | 'consumable' | 'hardware' | 'custom';
  onPress?: () => void;
  onDelete?: () => void;
  showLowStockBadge?: boolean;
}

export function InventoryCard({ item, type, onPress, onDelete, showLowStockBadge }: Props) {
  const theme = useTheme();

  const renderLumberContent = (lumber: LumberEntry) => (
    <>
      <Text variant="titleMedium" style={styles.title}>
        {lumber.species}
      </Text>
      <Text variant="bodyMedium">
        {lumber.thickness}" thick • {lumber.boardFeet.toFixed(1)} BF
      </Text>
      <Text variant="bodyMedium">
        {formatCurrency(lumber.costPerBF)}/BF • Total: {formatCurrency(lumber.totalCost)}
      </Text>
      {lumber.location && (
        <Text variant="bodySmall" style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
          📍 {lumber.location}
        </Text>
      )}
    </>
  );

  const renderToolContent = (tool: Tool) => (
    <>
      <Text variant="titleMedium" style={styles.title}>
        {tool.name}
      </Text>
      {tool.brand && (
        <Text variant="bodyMedium">{tool.brand} {tool.model && `• ${tool.model}`}</Text>
      )}
      {tool.category && (
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {tool.category}
        </Text>
      )}
      {tool.location && (
        <Text variant="bodySmall" style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
          📍 {tool.location}
        </Text>
      )}
    </>
  );

  const renderConsumableContent = (consumable: Consumable) => {
    const isLowStock = consumable.reorderLevel !== undefined && consumable.quantity <= consumable.reorderLevel;
    
    return (
      <>
        <Text variant="titleMedium" style={styles.title}>
          {consumable.name}
        </Text>
        <Text variant="bodyMedium">
          {consumable.quantity} {consumable.unit}
          {isLowStock && ' • ⚠️ Low stock'}
        </Text>
        {consumable.costPerUnit && (
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {formatCurrency(consumable.costPerUnit)} per {consumable.unit}
          </Text>
        )}
        {consumable.location && (
          <Text variant="bodySmall" style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
            📍 {consumable.location}
          </Text>
        )}
      </>
    );
  };

  const renderHardwareContent = (hardware: Hardware) => {
    const isLowStock = hardware.reorderLevel !== undefined && hardware.quantity <= hardware.reorderLevel;
    
    return (
      <>
        <Text variant="titleMedium" style={styles.title}>
          {hardware.name}
        </Text>
        {hardware.size && (
          <Text variant="bodyMedium">{hardware.size}</Text>
        )}
        <Text variant="bodyMedium">
          {hardware.quantity} {hardware.unit}
          {isLowStock && ' • ⚠️ Low stock'}
        </Text>
        {hardware.location && (
          <Text variant="bodySmall" style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
            📍 {hardware.location}
          </Text>
        )}
      </>
    );
  };

  const renderCustomContent = (customItem: CustomCategoryItem) => (
    <>
      <Text variant="titleMedium" style={styles.title}>
        {customItem.name}
      </Text>
      {customItem.quantity && (
        <Text variant="bodyMedium">Quantity: {customItem.quantity}</Text>
      )}
      {customItem.location && (
        <Text variant="bodySmall" style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
          📍 {customItem.location}
        </Text>
      )}
    </>
  );

  const renderContent = () => {
    switch (type) {
      case 'lumber':
        return renderLumberContent(item as LumberEntry);
      case 'tool':
        return renderToolContent(item as Tool);
      case 'consumable':
        return renderConsumableContent(item as Consumable);
      case 'hardware':
        return renderHardwareContent(item as Hardware);
      case 'custom':
        return renderCustomContent(item as CustomCategoryItem);
      default:
        return null;
    }
  };

  return (
    <Card style={styles.card} mode="elevated" onPress={onPress}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <CategoryIcon category={type} size={20} color={theme.colors.primary} />
          </View>
          <View style={styles.content}>
            {renderContent()}
          </View>
          {onDelete && (
            <IconButton
              icon="delete"
              size={20}
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  location: {
    marginTop: spacing.xs,
  },
});

