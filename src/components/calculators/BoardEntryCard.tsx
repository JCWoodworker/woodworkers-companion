/**
 * Board Entry Card Component
 * Displays individual board in a list
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton, useTheme } from 'react-native-paper';
import { BoardEntry } from '@/src/types/boardFootList';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';

interface Props {
  board: BoardEntry;
  onDelete?: () => void;
  onEdit?: () => void;
  showAdvancedFields?: boolean; // Professional/Lumber Yard mode
}

export function BoardEntryCard({ board, onDelete, onEdit, showAdvancedFields }: Props) {
  const theme = useTheme();

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.content}>
            {board.species && (
              <Text variant="titleMedium" style={styles.species}>
                {board.species}
              </Text>
            )}
            <Text variant="bodyMedium">
              {board.thicknessQuarters ? `${board.thicknessQuarters}/4` : `${board.thickness}"`} × {board.width}" × {board.length}{board.lengthUnit === 'feet' ? "'" : '"'}
              {board.quantity > 1 && ` × ${board.quantity}`}
            </Text>
            <Text variant="bodyLarge" style={styles.boardFeet}>
              {board.boardFeet.toFixed(2)} BF
            </Text>
            {board.pricePerBF && (
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                {formatCurrency(board.pricePerBF)}/BF • Total: {formatCurrency(board.totalCost || 0)}
              </Text>
            )}
            
            {showAdvancedFields && (
              <>
                {board.grade && (
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    Grade: {board.grade}
                  </Text>
                )}
                {board.moistureContent && (
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    MC: {board.moistureContent}%
                  </Text>
                )}
              </>
            )}
            
            {board.notes && (
              <Text variant="bodySmall" style={[styles.notes, { color: theme.colors.onSurfaceVariant }]}>
                {board.notes}
              </Text>
            )}
          </View>
          {(onDelete || onEdit) && (
            <View style={styles.actions}>
              {onEdit && (
                <IconButton icon="pencil" size={20} onPress={onEdit} />
              )}
              {onDelete && (
                <IconButton icon="delete" size={20} onPress={onDelete} />
              )}
            </View>
          )}
        </View>
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
  },
  content: {
    flex: 1,
  },
  species: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  boardFeet: {
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  notes: {
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
  },
});

