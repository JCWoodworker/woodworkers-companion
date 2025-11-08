/**
 * Time Entry List Component
 * Track time spent on project
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, IconButton, TextInput, Button, Text } from 'react-native-paper';
import { TimeEntry } from '@/src/types/project';
import { spacing } from '@/src/theme';
import { formatDuration, formatDate } from '@/src/utils/projectUtils';
import { EmptyState } from '@/src/components/common/EmptyState';

interface TimeEntryListProps {
  timeEntries: TimeEntry[];
  onAdd: (entry: Omit<TimeEntry, 'id' | 'createdAt'>) => void;
  onDelete: (entryId: string) => void;
}

export const TimeEntryList: React.FC<TimeEntryListProps> = ({
  timeEntries,
  onAdd,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');

  const handleAdd = () => {
    const parsedHours = parseFloat(hours);
    if (description.trim() && parsedHours > 0) {
      onAdd({
        description,
        hours: parsedHours,
        date: new Date(),
      });
      setDescription('');
      setHours('');
      setIsAdding(false);
    }
  };

  const totalHours = timeEntries.reduce((sum, e) => sum + e.hours, 0);

  if (timeEntries.length === 0 && !isAdding) {
    return (
      <EmptyState
        icon="clock-outline"
        title="No time entries"
        description="Track hours spent on this project for accurate costing"
        actionLabel="Add Time Entry"
        onAction={() => setIsAdding(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {timeEntries.length > 0 && (
        <Text variant="bodyLarge" style={styles.total}>
          Total: {formatDuration(totalHours)}
        </Text>
      )}

      {timeEntries.map((entry) => (
        <List.Item
          key={entry.id}
          title={entry.description}
          description={formatDate(entry.date)}
          right={() => (
            <View style={styles.right}>
              <Text variant="bodyLarge" style={styles.hours}>
                {formatDuration(entry.hours)}
              </Text>
              <IconButton
                icon="delete"
                size={20}
                onPress={() => onDelete(entry.id)}
              />
            </View>
          )}
          style={styles.entryItem}
        />
      ))}

      {isAdding ? (
        <View style={styles.addForm}>
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., Cutting joinery, Assembly"
            autoFocus
          />

          <TextInput
            label="Hours"
            value={hours}
            onChangeText={setHours}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="clock-outline" />}
          />

          <View style={styles.addButtons}>
            <Button mode="text" onPress={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleAdd}
              disabled={!description.trim() || !hours}
            >
              Add Time
            </Button>
          </View>
        </View>
      ) : (
        <Button
          mode="outlined"
          icon="plus"
          onPress={() => setIsAdding(true)}
          style={styles.addButton}
        >
          Add Time Entry
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  total: {
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    color: '#8B4513',
  },
  entryItem: {
    paddingVertical: spacing.xs,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hours: {
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  addForm: {
    marginTop: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
  addButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  addButton: {
    marginTop: spacing.md,
  },
});

