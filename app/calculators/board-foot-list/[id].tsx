/**
 * Board List Detail Screen
 * View and edit saved board list
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Button, Card, useTheme, Divider, TextInput, Menu, SegmentedButtons } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useBoardFootStore } from '@/src/store/boardFootStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { useClientStore } from '@/src/store/clientStore';
import { BoardEntryCard } from '@/src/components/calculators/BoardEntryCard';
import { ListStatusBadge } from '@/src/components/calculators/ListStatusBadge';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { spacing, calculatorStyles } from '@/src/theme';
import { formatCurrency } from '@/src/utils';
import { BoardList } from '@/src/types/boardFootList';

export default function BoardListDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { complexityMode } = useSettingsStore();
  const { clients } = useClientStore();
  const { getSavedListById, updateSavedList, deleteSavedList, duplicateSavedList } = useBoardFootStore();

  const [list, setList] = useState<BoardList | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedNotes, setEditedNotes] = useState('');
  const [editedStatus, setEditedStatus] = useState<BoardList['status']>('quote');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showClientMenu, setShowClientMenu] = useState(false);
  const [editedClientId, setEditedClientId] = useState<string | undefined>();

  const isAdvancedMode = complexityMode === 'professional' || complexityMode === 'lumberyard';

  useEffect(() => {
    const foundList = getSavedListById(id);
    if (foundList) {
      setList(foundList);
      setEditedName(foundList.name);
      setEditedNotes(foundList.notes || '');
      setEditedStatus(foundList.status || 'quote');
      setEditedClientId(foundList.clientId);
    }
  }, [id]);

  if (!list) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>List not found</Text>
      </View>
    );
  }

  const selectedClient = editedClientId ? clients.find((c) => c.id === editedClientId) : undefined;

  const handleSave = () => {
    const updates: Partial<BoardList> = {
      name: editedName.trim(),
      notes: editedNotes.trim() || undefined,
    };

    if (isAdvancedMode) {
      updates.clientId = editedClientId;
      updates.clientName = selectedClient?.name;
      updates.status = editedStatus;
    }

    updateSavedList(id, updates);
    setIsEditing(false);
    
    // Refresh list
    const updated = getSavedListById(id);
    if (updated) setList(updated);
  };

  const handleDelete = () => {
    deleteSavedList(id);
    setShowDeleteDialog(false);
    router.back();
  };

  const handleDuplicate = () => {
    const duplicate = duplicateSavedList(id);
    if (duplicate) {
      router.replace(`/calculators/board-foot-list/${duplicate.id}` as any);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.headerCard} mode="elevated">
          <Card.Content>
            {isEditing ? (
              <>
                <TextInput
                  label="List Name"
                  value={editedName}
                  onChangeText={setEditedName}
                  mode="outlined"
                  style={calculatorStyles.input}
                />
                <TextInput
                  label="Notes"
                  value={editedNotes}
                  onChangeText={setEditedNotes}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={calculatorStyles.input}
                />

                {isAdvancedMode && (
                  <>
                    <Text variant="labelLarge" style={styles.label}>Client</Text>
                    <Menu
                      visible={showClientMenu}
                      onDismiss={() => setShowClientMenu(false)}
                      anchor={
                        <Button
                          mode="outlined"
                          onPress={() => setShowClientMenu(true)}
                          icon="account"
                          style={styles.menuButton}
                        >
                          {selectedClient ? selectedClient.name : 'No Client'}
                        </Button>
                      }
                    >
                      <Menu.Item
                        title="No Client"
                        onPress={() => {
                          setEditedClientId(undefined);
                          setShowClientMenu(false);
                        }}
                        leadingIcon={!editedClientId ? 'check' : undefined}
                      />
                      {clients.map((client) => (
                        <Menu.Item
                          key={client.id}
                          title={client.name}
                          onPress={() => {
                            setEditedClientId(client.id);
                            setShowClientMenu(false);
                          }}
                          leadingIcon={editedClientId === client.id ? 'check' : undefined}
                        />
                      ))}
                    </Menu>

                    <Text variant="labelLarge" style={styles.label}>Status</Text>
                    <SegmentedButtons
                      value={editedStatus || 'quote'}
                      onValueChange={(value) => setEditedStatus(value as BoardList['status'])}
                      buttons={[
                        { value: 'quote', label: 'Quote' },
                        { value: 'ordered', label: 'Ordered' },
                        { value: 'paid', label: 'Paid' },
                      ]}
                      style={styles.statusButtons}
                    />
                    <SegmentedButtons
                      value={editedStatus || 'quote'}
                      onValueChange={(value) => setEditedStatus(value as BoardList['status'])}
                      buttons={[
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'picked-up', label: 'Picked Up' },
                      ]}
                      style={styles.statusButtons}
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <View style={styles.titleRow}>
                  <Text variant="headlineSmall" style={styles.listName}>
                    {list.name}
                  </Text>
                  {isAdvancedMode && list.status && (
                    <ListStatusBadge status={list.status} size="medium" />
                  )}
                </View>

                {list.clientName && (
                  <Text variant="titleMedium" style={{ color: theme.colors.primary, marginTop: spacing.sm }}>
                    👤 {list.clientName}
                  </Text>
                )}

                {list.notes && (
                  <Text variant="bodyMedium" style={[styles.notes, { color: theme.colors.onSurfaceVariant }]}>
                    {list.notes}
                  </Text>
                )}

                <Divider style={styles.divider} />

                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                      Total Board Feet
                    </Text>
                    <Text variant="headlineMedium" style={styles.statValue}>
                      {list.totalBoardFeet.toFixed(1)} BF
                    </Text>
                  </View>
                  {list.totalCost > 0 && (
                    <View style={styles.stat}>
                      <Text variant="labelLarge" style={{ color: theme.colors.onSurfaceVariant }}>
                        Total Cost
                      </Text>
                      <Text variant="headlineMedium" style={styles.statValue}>
                        {formatCurrency(list.totalCost)}
                      </Text>
                    </View>
                  )}
                </View>

                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  Created: {new Date(list.dateCreated).toLocaleString()}
                </Text>
              </>
            )}
          </Card.Content>
        </Card>

        {!isEditing && (
          <>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Boards ({list.boards.length})
              </Text>
            </View>

            {list.boards.map((board) => (
              <BoardEntryCard
                key={board.id}
                board={board}
                showAdvancedFields={isAdvancedMode}
              />
            ))}
          </>
        )}

        <View style={styles.actions}>
          {isEditing ? (
            <>
              <Button
                mode="outlined"
                onPress={() => {
                  setIsEditing(false);
                  setEditedName(list.name);
                  setEditedNotes(list.notes || '');
                  setEditedStatus(list.status || 'quote');
                  setEditedClientId(list.clientId);
                }}
                style={styles.button}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                style={styles.button}
                disabled={!editedName.trim()}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                mode="outlined"
                onPress={() => setIsEditing(true)}
                style={styles.button}
                icon="pencil"
              >
                Edit
              </Button>
              <Button
                mode="outlined"
                onPress={handleDuplicate}
                style={styles.button}
                icon="content-copy"
              >
                Duplicate
              </Button>
            </>
          )}
        </View>

        {!isEditing && (
          <Button
            mode="outlined"
            onPress={() => setShowDeleteDialog(true)}
            style={styles.deleteButton}
            textColor={theme.colors.error}
            icon="delete"
          >
            Delete List
          </Button>
        )}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete List"
        message={`Are you sure you want to delete "${list.name}"? This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
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
    paddingBottom: spacing.xl,
  },
  headerCard: {
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listName: {
    fontWeight: 'bold',
    flex: 1,
  },
  notes: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
  divider: {
    marginVertical: spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginBottom: spacing.md,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    marginTop: spacing.md,
  },
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  menuButton: {
    marginBottom: spacing.md,
  },
  statusButtons: {
    marginBottom: spacing.sm,
  },
});

