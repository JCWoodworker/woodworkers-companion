/**
 * Inventory Screen
 * Comprehensive inventory management with dynamic categories
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { Text, Searchbar, SegmentedButtons, useTheme, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useCategorySettings } from '@/src/hooks/useCategorySettings';
import { useInventoryFilter } from '@/src/hooks/useInventoryFilter';
import { useInventorySort } from '@/src/hooks/useInventorySort';
import { InventoryCard } from '@/src/components/inventory/InventoryCard';
import { QuickAddFAB } from '@/src/components/inventory/QuickAddFAB';
import { SortButton } from '@/src/components/inventory/SortButton';
import { LowStockBanner } from '@/src/components/inventory/LowStockBanner';
import { EmptyState } from '@/src/components/common/EmptyState';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';
import { InventoryTab, InventoryFilter, SortOptions } from '@/src/types/inventory';

export default function InventoryScreen() {
  const theme = useTheme();
  const {
    lumber,
    tools,
    consumables,
    hardware,
    customItems,
    isLoading,
    loadInventory,
    removeLumber,
    removeTool,
    removeConsumable,
    removeHardware,
    removeCustomItem,
    getTotalBoardFeet,
    getTotalLumberValue,
    getTotalInventoryValue,
    getLowStockConsumables,
    getLowStockHardware,
  } = useInventoryStore();

  const { inventory } = useSettingsStore();
  const { activeCategories, isCategoryEnabled } = useCategorySettings();

  const [activeTab, setActiveTab] = useState<InventoryTab>(activeCategories[0] || 'lumber');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: inventory.defaultSortBy,
    order: inventory.defaultSortOrder,
  });
  const [showLowStockBanner, setShowLowStockBanner] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    visible: boolean;
    type: InventoryTab;
    id: string;
    name: string;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const filter: InventoryFilter = {
    searchQuery,
  };

  // Apply filtering and sorting
  const filteredLumber = useInventorySort(
    useInventoryFilter(lumber, filter),
    sortOptions
  );
  const filteredTools = useInventorySort(
    useInventoryFilter(tools, filter),
    sortOptions
  );
  const filteredConsumables = useInventorySort(
    useInventoryFilter(consumables, filter),
    sortOptions
  );
  const filteredHardware = useInventorySort(
    useInventoryFilter(hardware, filter),
    sortOptions
  );
  const filteredCustomItems = useInventorySort(
    useInventoryFilter(customItems, filter),
    sortOptions
  );

  const lowStockCount = getLowStockConsumables().length + getLowStockHardware().length;

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadInventory();
    setRefreshing(false);
  };

  const handleDelete = () => {
    if (!deleteDialog) return;
    
    switch (deleteDialog.type) {
      case 'lumber':
        removeLumber(deleteDialog.id);
        break;
      case 'tools':
        removeTool(deleteDialog.id);
        break;
      case 'consumables':
        removeConsumable(deleteDialog.id);
        break;
      case 'hardware':
        removeHardware(deleteDialog.id);
        break;
      case 'custom':
        removeCustomItem(deleteDialog.id);
        break;
    }
    
    setDeleteDialog(null);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text variant="displaySmall" style={styles.title}>
          Inventory
        </Text>
        <View style={styles.headerActions}>
          {inventory.features.analytics && (
            <IconButton
              icon="chart-bar"
              size={24}
              onPress={() => router.push('/inventory/analytics')}
            />
          )}
          <IconButton
            icon="cog"
            size={24}
            onPress={() => router.push('/settings/inventory')}
          />
        </View>
      </View>
      
      {activeTab === 'lumber' && (
        <Text variant="bodyMedium" style={styles.subtitle}>
          {getTotalBoardFeet().toFixed(0)} BF • {formatCurrency(getTotalLumberValue())}
        </Text>
      )}

      {activeTab === 'lumber' && inventory.features.analytics && (
        <Text variant="bodySmall" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Total inventory value: {formatCurrency(getTotalInventoryValue())}
        </Text>
      )}
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'lumber':
        if (filteredLumber.length === 0) {
          return (
            <EmptyState
              icon="tree"
              title={searchQuery ? 'No lumber found' : 'No lumber in inventory'}
              description={searchQuery ? 'Try adjusting your search' : 'Add lumber from your stock or recent purchases'}
              actionLabel={searchQuery ? undefined : 'Add Lumber'}
              onAction={searchQuery ? undefined : () => router.push('/inventory/add?type=lumber')}
            />
          );
        }
        return filteredLumber.map((entry) => (
          <InventoryCard
            key={entry.id}
            item={entry}
            type="lumber"
            onPress={() => router.push(`/inventory/detail/${entry.id}?type=lumber`)}
            onDelete={() => setDeleteDialog({
              visible: true,
              type: 'lumber',
              id: entry.id,
              name: entry.species,
            })}
          />
        ));

      case 'tools':
        if (filteredTools.length === 0) {
          return (
            <EmptyState
              icon="hammer-wrench"
              title="No tools in registry"
              description="Track your tools and maintenance schedules"
              actionLabel="Add Tool"
              onAction={() => router.push('/inventory/add?type=tool')}
            />
          );
        }
        return filteredTools.map((tool) => (
          <InventoryCard
            key={tool.id}
            item={tool}
            type="tool"
            onPress={() => router.push(`/inventory/detail/${tool.id}?type=tool`)}
            onDelete={() => setDeleteDialog({
              visible: true,
              type: 'tools',
              id: tool.id,
              name: tool.name,
            })}
          />
        ));

      case 'consumables':
        if (filteredConsumables.length === 0) {
          return (
            <EmptyState
              icon="package-variant"
              title="No consumables tracked"
              description="Track sandpaper, glue, finish, and other supplies"
              actionLabel="Add Consumable"
              onAction={() => router.push('/inventory/add?type=consumable')}
            />
          );
        }
        return filteredConsumables.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            type="consumable"
            onPress={() => router.push(`/inventory/detail/${item.id}?type=consumable`)}
            onDelete={() => setDeleteDialog({
              visible: true,
              type: 'consumables',
              id: item.id,
              name: item.name,
            })}
            showLowStockBadge
          />
        ));

      case 'hardware':
        if (filteredHardware.length === 0) {
          return (
            <EmptyState
              icon="screw-machine-flat-top"
              title="No hardware tracked"
              description="Track screws, hinges, slides, and other hardware"
              actionLabel="Add Hardware"
              onAction={() => router.push('/inventory/add?type=hardware')}
            />
          );
        }
        return filteredHardware.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            type="hardware"
            onPress={() => router.push(`/inventory/detail/${item.id}?type=hardware`)}
            onDelete={() => setDeleteDialog({
              visible: true,
              type: 'hardware',
              id: item.id,
              name: item.name,
            })}
            showLowStockBadge
          />
        ));

      case 'custom':
        if (filteredCustomItems.length === 0) {
          return (
            <EmptyState
              icon="shape-plus"
              title="No custom items"
              description="Create custom categories for your unique needs"
              actionLabel="Manage Categories"
              onAction={() => router.push('/inventory/categories')}
            />
          );
        }
        return filteredCustomItems.map((item) => (
          <InventoryCard
            key={item.id}
            item={item}
            type="custom"
            onPress={() => router.push(`/inventory/detail/${item.id}?type=custom`)}
            onDelete={() => setDeleteDialog({
              visible: true,
              type: 'custom',
              id: item.id,
              name: item.name,
            })}
          />
        ));

      default:
        return null;
    }
  };

  // Build tab buttons from active categories
  const tabButtons = activeCategories.map((category) => {
    const counts = {
      lumber: lumber.length,
      tools: tools.length,
      consumables: consumables.length,
      hardware: hardware.length,
      custom: customItems.length,
    };

    const labels = {
      lumber: 'Lumber',
      tools: 'Tools',
      consumables: 'Items',
      hardware: 'Hardware',
      custom: 'Custom',
    };

    return {
      value: category,
      label: `${labels[category]} (${counts[category]})`,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {renderHeader()}

        {inventory.features.lowStockAlerts && lowStockCount > 0 && (
          <LowStockBanner
            count={lowStockCount}
            visible={showLowStockBanner}
            onDismiss={() => setShowLowStockBanner(false)}
            onViewItems={() => {
              setActiveTab('consumables');
              setShowLowStockBanner(false);
            }}
          />
        )}

        <Searchbar
          placeholder="Search inventory..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <View style={styles.controls}>
          <SortButton
            value={sortOptions}
            onChange={setSortOptions}
          />
        </View>

        {tabButtons.length > 1 && (
          <SegmentedButtons
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as InventoryTab)}
            buttons={tabButtons}
            style={styles.tabs}
          />
        )}

        {renderContent()}
      </ScrollView>

      <QuickAddFAB defaultCategory={activeTab !== 'custom' ? activeTab : undefined} />

      {deleteDialog && (
        <ConfirmDialog
          visible={deleteDialog.visible}
          title={`Delete ${deleteDialog.type.slice(0, -1)}`}
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  searchBar: {
    marginBottom: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
  },
  tabs: {
    marginBottom: spacing.lg,
  },
});
