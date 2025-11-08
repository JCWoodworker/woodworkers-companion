/**
 * Manage Categories Screen
 * Create and manage custom inventory categories
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Card, useTheme } from 'react-native-paper';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { EmptyState } from '@/src/components/common/EmptyState';
import { spacing } from '@/src/theme';

export default function ManageCategoriesScreen() {
  const theme = useTheme();
  const { customCategories } = useInventoryStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {customCategories.length === 0 ? (
          <EmptyState
            icon="shape-plus"
            title="No custom categories"
            description="Create custom categories to track unique items in your workshop"
            actionLabel="Create Category"
            onAction={() => {
              // TODO: Open create category dialog
            }}
          />
        ) : (
          <>
            <Text variant="titleMedium" style={styles.title}>
              Your Custom Categories
            </Text>
            {customCategories.map((category) => (
              <Card key={category.id} style={styles.card} mode="elevated">
                <Card.Content>
                  <Text variant="titleMedium">{category.name}</Text>
                  <Text variant="bodySmall">
                    {category.customFields.length} custom fields
                  </Text>
                </Card.Content>
              </Card>
            ))}
            <Button mode="contained" icon="plus" style={styles.addButton}>
              Create New Category
            </Button>
          </>
        )}
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
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  card: {
    marginBottom: spacing.md,
  },
  addButton: {
    marginTop: spacing.lg,
  },
});

