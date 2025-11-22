/**
 * Board Foot History Screen
 * View and manage saved board lists
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Searchbar, FAB, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useBoardFootStore } from '@/src/store/boardFootStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { BoardListCard } from '@/src/components/calculators/BoardListCard';
import { FilterChips } from '@/src/components/inventory/FilterChips';
import { BoardListSortButton } from '@/src/components/calculators/BoardListSortButton';
import { EmptyState } from '@/src/components/common/EmptyState';
import { spacing } from '@/src/theme';
import { BoardList, BoardListSortOptions } from '@/src/types/boardFootList';

export default function BoardFootHistoryScreen() {
  const theme = useTheme();
  const { complexityMode } = useSettingsStore();
  const { savedLists, loadBoardLists } = useBoardFootStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortOptions, setSortOptions] = useState<BoardListSortOptions>({
    field: 'dateCreated',
    order: 'desc',
  });

  const isAdvancedMode = complexityMode === 'professional' || complexityMode === 'lumberyard';

  useEffect(() => {
    loadBoardLists();
  }, []);

  // Filter lists
  const filteredLists = savedLists.filter((list) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const nameMatch = list.name.toLowerCase().includes(query);
      const clientMatch = list.clientName?.toLowerCase().includes(query);
      const notesMatch = list.notes?.toLowerCase().includes(query);
      
      if (!nameMatch && !clientMatch && !notesMatch) {
        return false;
      }
    }

    // Status filter
    if (selectedStatuses.length > 0 && list.status) {
      if (!selectedStatuses.includes(list.status)) {
        return false;
      }
    }

    return true;
  });

  // Sort lists
  const sortedLists = [...filteredLists].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortOptions.field) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'dateCreated':
        aValue = new Date(a.dateCreated).getTime();
        bValue = new Date(b.dateCreated).getTime();
        break;
      case 'totalBoardFeet':
        aValue = a.totalBoardFeet;
        bValue = b.totalBoardFeet;
        break;
      case 'totalCost':
        aValue = a.totalCost;
        bValue = b.totalCost;
        break;
      case 'client':
        aValue = (a.clientName || '').toLowerCase();
        bValue = (b.clientName || '').toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOptions.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOptions.order === 'asc' ? 1 : -1;
    return 0;
  });

  const statusOptions = [
    { label: 'Quote', value: 'quote', icon: 'file-document' },
    { label: 'Ordered', value: 'ordered', icon: 'cart' },
    { label: 'Paid', value: 'paid', icon: 'cash' },
    { label: 'Delivered', value: 'delivered', icon: 'truck-delivery' },
    { label: 'Picked Up', value: 'picked-up', icon: 'hand-back-right' },
  ];

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Saved Lists
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {savedLists.length} saved list{savedLists.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <Searchbar
          placeholder="Search lists..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <View style={styles.controls}>
          <BoardListSortButton
            value={sortOptions}
            onChange={setSortOptions}
          />
        </View>

        {isAdvancedMode && (
          <FilterChips
            options={statusOptions}
            selectedValues={selectedStatuses}
            onToggle={toggleStatus}
            multiSelect
          />
        )}

        {sortedLists.length === 0 ? (
          <EmptyState
            icon="format-list-checkbox"
            title={searchQuery || selectedStatuses.length > 0 ? 'No lists found' : 'No saved lists'}
            description={searchQuery || selectedStatuses.length > 0 ? 'Try adjusting your filters' : 'Create board lists in the calculator and save them here'}
            actionLabel={searchQuery || selectedStatuses.length > 0 ? undefined : 'Go to Calculator'}
            onAction={searchQuery || selectedStatuses.length > 0 ? undefined : () => router.push('/calculators/board-foot' as any)}
          />
        ) : (
          sortedLists.map((list) => (
            <BoardListCard
              key={list.id}
              list={list}
              onPress={() => router.push(`/calculators/board-foot-list/${list.id}` as any)}
              showStatus={isAdvancedMode}
            />
          ))
        )}
      </ScrollView>

      <FAB
        icon="calculator"
        label="Calculator"
        style={styles.fab}
        onPress={() => router.push('/calculators/board-foot' as any)}
      />
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
  searchBar: {
    marginBottom: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
  },
  fab: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
  },
});

