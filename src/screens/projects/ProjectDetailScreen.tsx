/**
 * Project Detail Screen
 * View and manage individual project
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, Button, useTheme, IconButton, Divider } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useProjectStore } from '@/src/store/projectStore';
import { StatusBadge } from '@/src/components/common/StatusBadge';
import { TaskList } from '@/src/components/projects/TaskList';
import { TimeEntryList } from '@/src/components/projects/TimeEntryList';
import { ExpenseList } from '@/src/components/projects/ExpenseList';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { spacing } from '@/src/theme';
import { formatDate, calculateTotalHours, calculateTotalExpenses, formatCurrency, formatDuration } from '@/src/utils/projectUtils';

export default function ProjectDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getProjectById, deleteProject, addTask, toggleTask, deleteTask, addTimeEntry, deleteTimeEntry, addExpense, deleteExpense } = useProjectStore();
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'time' | 'expenses'>('tasks');

  const project = id ? getProjectById(id) : undefined;

  if (!project) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Project not found</Text>
      </View>
    );
  }

  const totalHours = calculateTotalHours(project);
  const totalExpenses = calculateTotalExpenses(project);

  const handleDelete = () => {
    deleteProject(project.id);
    setShowDeleteDialog(false);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Card */}
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text variant="headlineSmall" style={styles.title}>
                  {project.name}
                </Text>
                <StatusBadge status={project.status} type="project" />
              </View>
              <View style={styles.headerActions}>
                <IconButton
                  icon="pencil"
                  size={24}
                  onPress={() => router.push(`/projects/edit/${project.id}`)}
                />
                <IconButton
                  icon="delete"
                  size={24}
                  onPress={() => setShowDeleteDialog(true)}
                />
              </View>
            </View>

            {project.clientName && (
              <Text variant="bodyMedium" style={styles.client}>
                Client: {project.clientName}
              </Text>
            )}

            {project.deadline && (
              <Text variant="bodyMedium" style={styles.deadline}>
                Deadline: {formatDate(project.deadline)}
              </Text>
            )}

            {project.notes && (
              <>
                <Divider style={styles.divider} />
                <Text variant="bodyMedium">{project.notes}</Text>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Summary Card */}
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Project Summary
            </Text>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Total Hours:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatDuration(totalHours)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Total Expenses:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(totalExpenses)}
              </Text>
            </View>

            {project.estimatedHours && (
              <View style={styles.summaryRow}>
                <Text variant="bodyMedium">Estimated Hours:</Text>
                <Text variant="bodyMedium" style={styles.estimated}>
                  {project.estimatedHours} hrs
                </Text>
              </View>
            )}

            {project.estimatedCost && (
              <View style={styles.summaryRow}>
                <Text variant="bodyMedium">Estimated Cost:</Text>
                <Text variant="bodyMedium" style={styles.estimated}>
                  {formatCurrency(project.estimatedCost)}
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Tab Content */}
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <View style={styles.tabs}>
              <Button
                mode={activeTab === 'tasks' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('tasks')}
                style={styles.tab}
              >
                Tasks ({project.tasks.length})
              </Button>
              <Button
                mode={activeTab === 'time' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('time')}
                style={styles.tab}
              >
                Time ({project.timeEntries.length})
              </Button>
              <Button
                mode={activeTab === 'expenses' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('expenses')}
                style={styles.tab}
              >
                Expenses ({project.expenses.length})
              </Button>
            </View>

            {activeTab === 'tasks' && (
              <TaskList
                tasks={project.tasks}
                onAdd={(title) => addTask(project.id, title)}
                onToggle={(taskId) => toggleTask(project.id, taskId)}
                onDelete={(taskId) => deleteTask(project.id, taskId)}
              />
            )}

            {activeTab === 'time' && (
              <TimeEntryList
                timeEntries={project.timeEntries}
                onAdd={(entry) => addTimeEntry(project.id, entry)}
                onDelete={(entryId) => deleteTimeEntry(project.id, entryId)}
              />
            )}

            {activeTab === 'expenses' && (
              <ExpenseList
                expenses={project.expenses}
                onAdd={(expense) => addExpense(project.id, expense)}
                onDelete={(expenseId) => deleteExpense(project.id, expenseId)}
              />
            )}
          </Card.Content>
        </Card>
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
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
  card: {
    marginBottom: spacing.base,
  },
  header: {
    marginBottom: spacing.md,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  client: {
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  deadline: {
    opacity: 0.7,
  },
  divider: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryValue: {
    fontWeight: '600',
    color: '#8B4513',
  },
  estimated: {
    opacity: 0.7,
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
  },
});

