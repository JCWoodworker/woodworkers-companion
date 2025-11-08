/**
 * Expense List Component
 * Track project expenses and materials
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, IconButton, TextInput, Button, Text, SegmentedButtons } from 'react-native-paper';
import { Expense } from '@/src/types/project';
import { spacing } from '@/src/theme';
import { formatCurrency } from '@/src/utils';
import { EmptyState } from '@/src/components/common/EmptyState';

interface ExpenseListProps {
  expenses: Expense[];
  onAdd: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  onDelete: (expenseId: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onAdd,
  onDelete,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('materials');

  const handleAdd = () => {
    const parsedAmount = parseFloat(amount);
    if (description.trim() && parsedAmount > 0) {
      onAdd({
        description,
        amount: parsedAmount,
        category,
        date: new Date(),
      });
      setDescription('');
      setAmount('');
      setCategory('materials');
      setIsAdding(false);
    }
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  if (expenses.length === 0 && !isAdding) {
    return (
      <EmptyState
        icon="receipt-text-outline"
        title="No expenses yet"
        description="Track material costs, hardware, and other project expenses"
        actionLabel="Add First Expense"
        onAction={() => setIsAdding(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {expenses.length > 0 && (
        <Text variant="bodyLarge" style={styles.total}>
          Total: {formatCurrency(totalExpenses)}
        </Text>
      )}

      {expenses.map((expense) => (
        <List.Item
          key={expense.id}
          title={expense.description}
          description={`${expense.category} • ${new Date(expense.date).toLocaleDateString()}`}
          right={() => (
            <View style={styles.right}>
              <Text variant="bodyLarge" style={styles.amount}>
                {formatCurrency(expense.amount)}
              </Text>
              <IconButton
                icon="delete"
                size={20}
                onPress={() => onDelete(expense.id)}
              />
            </View>
          )}
          style={styles.expenseItem}
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
            autoFocus
          />

          <TextInput
            label="Amount ($)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="currency-usd" />}
          />

          <Text variant="labelMedium" style={styles.label}>
            Category
          </Text>
          <SegmentedButtons
            value={category}
            onValueChange={(value) => setCategory(value as Expense['category'])}
            buttons={[
              { value: 'materials', label: 'Materials' },
              { value: 'hardware', label: 'Hardware' },
              { value: 'consumables', label: 'Consumables' },
              { value: 'other', label: 'Other' },
            ]}
            style={styles.categoryButtons}
          />

          <View style={styles.addButtons}>
            <Button mode="text" onPress={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleAdd}
              disabled={!description.trim() || !amount}
            >
              Add Expense
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
          Add Expense
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
  expenseItem: {
    paddingVertical: spacing.xs,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  addForm: {
    marginTop: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
  label: {
    marginBottom: spacing.sm,
  },
  categoryButtons: {
    marginBottom: spacing.md,
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

