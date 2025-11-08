/**
 * Project List Screen
 * Dashboard view of all projects
 */

import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FAB, Searchbar, SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useProjectStore } from '@/src/store/projectStore';
import { ProjectCard } from '@/src/components/projects/ProjectCard';
import { EmptyState } from '@/src/components/common/EmptyState';
import { spacing } from '@/src/theme';
import { ProjectStatus } from '@/src/types/project';

export default function ProjectListScreen() {
  const theme = useTheme();
  const { projects, isLoading, loadProjects } = useProjectStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<ProjectStatus | 'all'>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeProjects = projects.filter((p) => p.status !== 'complete').length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Projects
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {activeProjects} active • {projects.length} total
          </Text>
        </View>

        <Searchbar
          placeholder="Search projects..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        <SegmentedButtons
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'in-progress', label: 'Active' },
            { value: 'complete', label: 'Done' },
          ]}
          style={styles.filterButtons}
        />

        {filteredProjects.length === 0 ? (
          <EmptyState
            icon="folder-open-outline"
            title={searchQuery ? 'No projects found' : 'No projects yet'}
            description={searchQuery ? 'Try a different search term' : 'Create your first project to get started'}
            actionLabel={searchQuery ? undefined : 'Create Project'}
            onAction={searchQuery ? undefined : () => router.push('/projects/add')}
          />
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => router.push(`/projects/${project.id}`)}
            />
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/projects/add')}
        label="New Project"
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
    paddingBottom: 100, // Space for FAB
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    opacity: 0.7,
  },
  searchBar: {
    marginBottom: spacing.md,
  },
  filterButtons: {
    marginBottom: spacing.lg,
  },
  fab: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
  },
});

