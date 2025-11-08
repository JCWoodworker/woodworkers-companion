/**
 * Task List Component
 * Manages tasks for a project
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Checkbox, IconButton, TextInput, Button, Text } from 'react-native-paper';
import { Task } from '@/src/types/project';
import { spacing } from '@/src/theme';
import { EmptyState } from '@/src/components/common/EmptyState';

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onAdd: (title: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  onAdd,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newTaskTitle.trim()) {
      onAdd(newTaskTitle);
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  if (tasks.length === 0 && !isAdding) {
    return (
      <EmptyState
        icon="clipboard-check-outline"
        title="No tasks yet"
        description="Add tasks to break down your project into manageable steps"
        actionLabel="Add First Task"
        onAction={() => setIsAdding(true)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {tasks.length > 0 && (
        <Text variant="bodyMedium" style={styles.progress}>
          {completedCount} of {tasks.length} completed ({progress.toFixed(0)}%)
        </Text>
      )}

      {tasks.map((task) => (
        <List.Item
          key={task.id}
          title={task.title}
          titleStyle={task.completed ? styles.completedText : undefined}
          left={() => (
            <Checkbox
              status={task.completed ? 'checked' : 'unchecked'}
              onPress={() => onToggle(task.id)}
            />
          )}
          right={() => (
            <IconButton
              icon="delete"
              size={20}
              onPress={() => onDelete(task.id)}
            />
          )}
          style={styles.taskItem}
        />
      ))}

      {isAdding ? (
        <View style={styles.addForm}>
          <TextInput
            label="Task title"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            mode="outlined"
            style={styles.input}
            autoFocus
            onSubmitEditing={handleAdd}
          />
          <View style={styles.addButtons}>
            <Button mode="text" onPress={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleAdd} disabled={!newTaskTitle.trim()}>
              Add Task
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
          Add Task
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  progress: {
    marginBottom: spacing.sm,
    opacity: 0.7,
  },
  taskItem: {
    paddingVertical: spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
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

