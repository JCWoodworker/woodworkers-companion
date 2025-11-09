/**
 * Inventory Screen - REFACTORED
 * Comprehensive inventory management with dynamic categories
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { Searchbar, SegmentedButtons, useTheme } from 'react-native-paper';
import { useInventoryStore } from '@/src/store/inventoryStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useCategorySettings } from '@/src/hooks/useCategorySettings';
import { useInventoryFilter } from '@/src/hooks/useInventoryFilter';
import { useInventorySort } from '@/src/hooks/useInventorySort';
import { usePlatformSafeArea } from '@/src/hooks/usePlatformSafeArea';
import { InventoryHeader } from '@/src/components/inventory/InventoryHeader';
import { InventoryList } from '@/src/components/inventory/InventoryList';
import { QuickAddFAB } from '@/src/components/inventory/QuickAddFAB';
import { SortButton } from '@/src/components/inventory/SortButton';
import { LowStockBanner } from '@/src/components/inventory/LowStockBanner';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { spacing } from '@/src/theme';
import { InventoryTab, InventoryFilter, SortOptions } from '@/src/types/inventory';

export default function InventoryScreen() {
  const theme = useTheme();
  const { contentPaddingBottom } = usePlatformSafeArea();
  const {
    lumber,
    tools,
    consumables,
    hardware,
    customItems,
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
  const { activeCategories } = useCategorySettings();

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

  const filter: InventoryFilter = { searchQuery };

  // Apply filtering and sorting
  const filteredLumber = useInventorySort(useInventoryFilter(lumber, filter), sortOptions);
  const filteredTools = useInventorySort(useInventoryFilter(tools, filter), sortOptions);
  const filteredConsumables = useInventorySort(useInventoryFilter(consumables, filter), sortOptions);
  const filteredHardware = useInventorySort(useInventoryFilter(hardware, filter), sortOptions);
  const filteredCustomItems = useInventorySort(useInventoryFilter(customItems, filter), sortOptions);

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

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'lumber':
        return filteredLumber;
      case 'tools':
        return filteredTools;
      case 'consumables':
        return filteredConsumables;
      case 'hardware':
        return filteredHardware;
      case 'custom':
        return filteredCustomItems;
      default:
        return [];
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
        contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom + 100 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <InventoryHeader
          totalBoardFeet={getTotalBoardFeet()}
          totalLumberValue={getTotalLumberValue()}
          totalInventoryValue={getTotalInventoryValue()}
          showLumberStats={activeTab === 'lumber'}
          showAnalytics={inventory.features.analytics}
        />

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

        <InventoryList
          type={activeTab === 'tools' ? 'tool' : activeTab === 'consumables' ? 'consumable' : activeTab}
          items={getCurrentItems()}
          searchQuery={searchQuery}
          onDelete={(id, name) => setDeleteDialog({
            visible: true,
            type: activeTab,
            id,
            name,
          })}
        />
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
