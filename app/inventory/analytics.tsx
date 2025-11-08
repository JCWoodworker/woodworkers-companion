/**
 * Inventory Analytics Screen
 * View charts and reports for inventory
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';

export default function InventoryAnalyticsScreen() {
  const theme = useTheme();
  const {
    lumber,
    tools,
    consumables,
    hardware,
    getTotalBoardFeet,
    getTotalLumberValue,
    getTotalInventoryValue,
  } = useInventoryStore();

  const stats = [
    {
      title: 'Total Inventory Value',
      value: formatCurrency(getTotalInventoryValue()),
      icon: 'currency-usd',
    },
    {
      title: 'Lumber Stock',
      value: `${getTotalBoardFeet().toFixed(0)} BF`,
      subtitle: formatCurrency(getTotalLumberValue()),
      icon: 'tree',
    },
    {
      title: 'Tools',
      value: `${tools.length} items`,
      icon: 'hammer-wrench',
    },
    {
      title: 'Consumables',
      value: `${consumables.length} items`,
      icon: 'package-variant',
    },
    {
      title: 'Hardware',
      value: `${hardware.length} items`,
      icon: 'screw-machine-flat-top',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Inventory Summary
        </Text>

        {stats.map((stat, index) => (
          <Card key={index} style={styles.card} mode="elevated">
            <Card.Content>
              <View style={styles.statRow}>
                <View style={styles.statContent}>
                  <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                    {stat.title}
                  </Text>
                  <Text variant="headlineMedium" style={styles.statValue}>
                    {stat.value}
                  </Text>
                  {stat.subtitle && (
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      {stat.subtitle}
                    </Text>
                  )}
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}

        <Text variant="bodyMedium" style={[styles.note, { color: theme.colors.onSurfaceVariant }]}>
          Advanced analytics with charts and detailed reports coming soon!
        </Text>
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
  title: {
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  card: {
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  note: {
    marginTop: spacing.xl,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

