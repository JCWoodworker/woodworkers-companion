/**
 * Board List Card Component
 * Displays saved board list in history
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Chip, useTheme } from 'react-native-paper';
import { BoardList } from '@/src/types/boardFootList';
import { ListStatusBadge } from './ListStatusBadge';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';

interface Props {
  list: BoardList;
  onPress?: () => void;
  showStatus?: boolean; // Professional/Lumber Yard mode
}

export function BoardListCard({ list, onPress, showStatus }: Props) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated" onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {list.name}
          </Text>
          {showStatus && list.status && (
            <ListStatusBadge status={list.status} />
          )}
        </View>

        {list.clientName && (
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            👤 {list.clientName}
          </Text>
        )}

        <View style={styles.stats}>
          <Text variant="bodyLarge" style={styles.statText}>
            {list.totalBoardFeet.toFixed(1)} BF
          </Text>
          {list.totalCost > 0 && (
            <Text variant="bodyLarge" style={styles.statText}>
              • {formatCurrency(list.totalCost)}
            </Text>
          )}
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            • {list.boards.length} board{list.boards.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {new Date(list.dateCreated).toLocaleDateString()}
        </Text>

        {list.notes && (
          <Text variant="bodySmall" style={[styles.notes, { color: theme.colors.onSurfaceVariant }]}>
            {list.notes}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontWeight: '600',
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  statText: {
    fontWeight: '600',
  },
  notes: {
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});

