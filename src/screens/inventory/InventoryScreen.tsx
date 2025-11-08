/**
 * Inventory Screen (MVP)
 * Simple lumber, tools, and consumables tracking
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, FAB, List, IconButton, Searchbar, SegmentedButtons, useTheme, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { EmptyState } from '@/src/components/common/EmptyState';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';
import { InventoryTab } from '@/src/types/inventory';

export default function InventoryScreen() {
  const theme = useTheme();
  const {
    lumber,
    tools,
    consumables,
    isLoading,
    loadInventory,
    removeLumber,
    removeTool,
    removeConsumable,
    getTotalBoardFeet,
    getTotalLumberValue,
    getLowStockConsumables,
  } = useInventoryStore();

  const [activeTab, setActiveTab] = useState<InventoryTab>('lumber');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{
    visible: boolean;
    type: 'lumber' | 'tool' | 'consumable';
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const filteredLumber = lumber.filter((l) =>
    l.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTools = tools.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConsumables = consumables.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStock = getLowStockConsumables();

  const handleDelete = () => {
    if (!deleteDialog) return;
    
    if (deleteDialog.type === 'lumber') removeLumber(deleteDialog.id);
    else if (deleteDialog.type === 'tool') removeTool(deleteDialog.id);
    else if (deleteDialog.type === 'consumable') removeConsumable(deleteDialog.id);
    
    setDeleteDialog(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Inventory
          </Text>
          
          {activeTab === 'lumber' && (
            <Text variant="bodyMedium" style={styles.subtitle}>
              {getTotalBoardFeet().toFixed(0)} BF • {formatCurrency(getTotalLumberValue())}
            </Text>
          )}

          {lowStock.length > 0 && (
            <View style={styles.alert}>
              <Text variant="bodySmall" style={styles.alertText}>
                ⚠️ {lowStock.length} item{lowStock.length > 1 ? 's' : ''} low on stock
              </Text>
            </View>
          )}
        </View>

        <Searchbar
          placeholder="Search inventory..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <SegmentedButtons
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as InventoryTab)}
          buttons={[
            { value: 'lumber', label: `Lumber (${lumber.length})` },
            { value: 'tools', label: `Tools (${tools.length})` },
            { value: 'consumables', label: `Items (${consumables.length})` },
          ]}
          style={styles.tabs}
        />

        {activeTab === 'lumber' && (
          filteredLumber.length === 0 ? (
            <EmptyState
              icon="tree"
              title={searchQuery ? 'No lumber found' : 'No lumber in inventory'}
              description={searchQuery ? undefined : 'Add lumber from your stock or recent purchases'}
              actionLabel={searchQuery ? undefined : 'Add Lumber'}
              onAction={searchQuery ? undefined : () => router.push('/inventory/add-lumber')}
            />
          ) : (
            filteredLumber.map((entry) => (
              <Card key={entry.id} style={styles.card} mode="elevated">
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <Text variant="titleMedium" style={styles.cardTitle}>
                      {entry.species}
                    </Text>
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => setDeleteDialog({
                        visible: true,
                        type: 'lumber',
                        id: entry.id,
                        name: entry.species,
                      })}
                    />
                  </View>
                  <Text variant="bodyMedium">
                    {entry.thickness}" thick • {entry.boardFeet.toFixed(1)} BF
                  </Text>
                  <Text variant="bodyMedium">
                    {formatCurrency(entry.costPerBF)}/BF • Total: {formatCurrency(entry.totalCost)}
                  </Text>
                  {entry.location && (
                    <Text variant="bodySmall" style={styles.location}>
                      📍 {entry.location}
                    </Text>
                  )}
                </Card.Content>
              </Card>
            ))
          )
        )}

        {activeTab === 'tools' && (
          filteredTools.length === 0 ? (
            <EmptyState
              icon="hammer-wrench"
              title="No tools in registry"
              description="Track your tools and maintenance schedules"
            />
          ) : (
            filteredTools.map((tool) => (
              <List.Item
                key={tool.id}
                title={tool.name}
                description={tool.lastMaintenance ? `Last maintained: ${new Date(tool.lastMaintenance).toLocaleDateString()}` : 'No maintenance logged'}
                left={() => <List.Icon icon="hammer-wrench" />}
                right={() => (
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => setDeleteDialog({
                      visible: true,
                      type: 'tool',
                      id: tool.id,
                      name: tool.name,
                    })}
                  />
                )}
              />
            ))
          )
        )}

        {activeTab === 'consumables' && (
          filteredConsumables.length === 0 ? (
            <EmptyState
              icon="package-variant"
              title="No consumables tracked"
              description="Track sandpaper, glue, finish, and other supplies"
            />
          ) : (
            filteredConsumables.map((item) => {
              const isLowStock = item.reorderLevel !== undefined && item.quantity <= item.reorderLevel;
              
              return (
                <List.Item
                  key={item.id}
                  title={item.name}
                  description={`${item.quantity} ${item.unit}${isLowStock ? ' • ⚠️ Low stock' : ''}`}
                  left={() => <List.Icon icon="package-variant" />}
                  right={() => (
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => setDeleteDialog({
                        visible: true,
                        type: 'consumable',
                        id: item.id,
                        name: item.name,
                      })}
                    />
                  )}
                  titleStyle={isLowStock ? styles.lowStock : undefined}
                />
              );
            })
          )
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          if (activeTab === 'lumber') router.push('/inventory/add-lumber');
        }}
        label={`Add ${activeTab === 'lumber' ? 'Lumber' : activeTab === 'tools' ? 'Tool' : 'Item'}`}
      />

      {deleteDialog && (
        <ConfirmDialog
          visible={deleteDialog.visible}
          title={`Delete ${deleteDialog.type}`}
          message={`Are you sure you want to delete "${deleteDialog.name}"?`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteDialog(null)}
          destructive
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.base,
    paddingBottom: 100,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: spacing.sm,
  },
  alert: {
    backgroundColor: '#FFF3CD',
    padding: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  alertText: {
    color: '#856404',
  },
  searchBar: {
    marginBottom: spacing.md,
  },
  tabs: {
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '600',
  },
  location: {
    opacity: 0.7,
    marginTop: spacing.xs,
  },
  lowStock: {
    color: '#B00020',
  },
  fab: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
  },
});

