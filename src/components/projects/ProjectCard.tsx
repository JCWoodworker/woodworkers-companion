/**
 * Project Card Component
 * Displays project summary in list view
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Project } from '@/src/types/project';
import { StatusBadge } from '@/src/components/common/StatusBadge';
import { spacing } from '@/src/theme';
import { calculateCompletionPercentage, isProjectOverdue, formatDate } from '@/src/utils/projectUtils';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
  const completion = calculateCompletionPercentage(project);
  const overdue = isProjectOverdue(project);

  return (
    <Card style={styles.card} mode="elevated" onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {project.name}
          </Text>
          <StatusBadge status={project.status} type="project" />
        </View>

        {project.clientName && (
          <Text variant="bodySmall" style={styles.client}>
            Client: {project.clientName}
          </Text>
        )}

        {project.tasks.length > 0 && (
          <Text variant="bodySmall" style={styles.tasks}>
            Tasks: {completion.toFixed(0)}% complete
          </Text>
        )}

        {project.deadline && (
          <Text
            variant="bodySmall"
            style={[styles.deadline, overdue && styles.overdue]}
          >
            {overdue ? '⚠️ ' : ''}Due: {formatDate(project.deadline)}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

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
  client: {
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  tasks: {
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  deadline: {
    opacity: 0.7,
  },
  overdue: {
    color: '#B00020',
    fontWeight: '600',
  },
});

