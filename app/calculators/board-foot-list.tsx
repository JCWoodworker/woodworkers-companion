/**
 * Current Board List Screen
 * View and manage boards in current list
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Card, useTheme, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { useBoardFootStore } from '@/src/store/boardFootStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { BoardEntryCard } from '@/src/components/calculators/BoardEntryCard';
import { SaveBoardListDialog } from '@/src/components/calculators/SaveBoardListDialog';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { EmptyState } from '@/src/components/common/EmptyState';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';

export default function CurrentBoardListScreen() {
  const theme = useTheme();
  const { complexityMode } = useSettingsStore();
  const {
    currentList,
    removeBoardFromCurrentList,
    clearCurrentList,
    getCurrentListTotal,
    saveCurrentListToHistory,
  } = useBoardFootStore();

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

  const totals = getCurrentListTotal();
  const isAdvancedMode = complexityMode === 'professional' || complexityMode === 'lumberyard';

  const handleSave = (data: any) => {
    const savedList = saveCurrentListToHistory(data);
    if (savedList) {
      router.back(); // Go back to calculator
    }
  };

  const handleClear = () => {
    clearCurrentList();
    setShowClearDialog(false);
    router.back();
  };

  if (currentList.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState
          icon="format-list-numbered"
          title="No boards in list"
          description="Calculate board feet in the calculator and add boards to create a list"
          actionLabel="Back to Calculator"
          onAction={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.summaryCard} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={styles.summaryTitle}>
              Current List
            </Text>
            <Text variant="headlineMedium" style={styles.totalBF}>
              {totals.boardFeet.toFixed(1)} BF
            </Text>
            {totals.cost > 0 && (
              <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Total Cost: {formatCurrency(totals.cost)}
              </Text>
            )}
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {currentList.length} board{currentList.length !== 1 ? 's' : ''}
            </Text>
          </Card.Content>
        </Card>

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Boards
        </Text>

        {currentList.map((board) => (
          <BoardEntryCard
            key={board.id}
            board={board}
            onDelete={() => removeBoardFromCurrentList(board.id)}
            showAdvancedFields={isAdvancedMode}
          />
        ))}

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => setShowClearDialog(true)}
            style={styles.button}
            textColor={theme.colors.error}
          >
            Clear List
          </Button>
          <Button
            mode="contained"
            onPress={() => setShowSaveDialog(true)}
            style={styles.button}
            icon="content-save"
          >
            Save to History
          </Button>
        </View>
      </ScrollView>

      <FAB
        icon="calculator"
        label="Back to Calculator"
        style={styles.fab}
        onPress={() => router.back()}
      />

      <SaveBoardListDialog
        visible={showSaveDialog}
        onDismiss={() => setShowSaveDialog(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        visible={showClearDialog}
        title="Clear List"
        message="Are you sure you want to remove all boards from the current list?"
        confirmLabel="Clear"
        onConfirm={handleClear}
        onCancel={() => setShowClearDialog(false)}
        destructive
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
  summaryCard: {
    marginBottom: spacing.lg,
    backgroundColor: '#F5F5F5',
  },
  summaryTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  totalBF: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
  },
});

