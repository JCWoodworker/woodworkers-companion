/**
 * Add/Edit Project Screen
 * Create new or edit existing project
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, SegmentedButtons, useTheme } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useProjectStore } from '@/src/store/projectStore';
import { ProjectStatus } from '@/src/types/project';
import { spacing, calculatorStyles } from '@/src/theme';
import { useFormState } from '@/src/hooks';
import { safeParseFloat } from '@/src/utils';

export default function AddEditProjectScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getProjectById, addProject, updateProject } = useProjectStore();
  
  const project = id ? getProjectById(id) : undefined;
  const isEditing = !!project;

  const { values, setValue, setMultipleValues } = useFormState({
    name: project?.name || '',
    clientName: project?.clientName || '',
    status: (project?.status || 'design') as ProjectStatus,
    estimatedHours: project?.estimatedHours?.toString() || '',
    estimatedCost: project?.estimatedCost?.toString() || '',
    notes: project?.notes || '',
  });

  const handleSave = () => {
    if (!values.name.trim()) return;

    const projectData = {
      name: values.name,
      clientName: values.clientName || undefined,
      status: values.status,
      estimatedHours: safeParseFloat(values.estimatedHours) || undefined,
      estimatedCost: safeParseFloat(values.estimatedCost) || undefined,
      notes: values.notes,
    };

    if (isEditing) {
      updateProject(project.id, projectData);
    } else {
      addProject(projectData);
    }

    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Project Information
            </Text>

            <TextInput
              label="Project Name *"
              value={values.name}
              onChangeText={(text) => setValue('name', text)}
              mode="outlined"
              style={calculatorStyles.input}
            />

            <TextInput
              label="Client Name"
              value={values.clientName}
              onChangeText={(text) => setValue('clientName', text)}
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="Optional"
            />

            <Text variant="labelMedium" style={calculatorStyles.label}>
              Status
            </Text>
            <SegmentedButtons
              value={values.status}
              onValueChange={(value) => setValue('status', value as ProjectStatus)}
              buttons={[
                { value: 'quoted', label: 'Quoted' },
                { value: 'design', label: 'Design' },
                { value: 'in-progress', label: 'Active' },
                { value: 'finishing', label: 'Finishing' },
                { value: 'complete', label: 'Done' },
              ]}
              style={calculatorStyles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Estimates
            </Text>

            <TextInput
              label="Estimated Hours"
              value={values.estimatedHours}
              onChangeText={(text) => setValue('estimatedHours', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              left={<TextInput.Icon icon="clock-outline" />}
            />

            <TextInput
              label="Estimated Cost ($)"
              value={values.estimatedCost}
              onChangeText={(text) => setValue('estimatedCost', text)}
              keyboardType="decimal-pad"
              mode="outlined"
              style={calculatorStyles.input}
              left={<TextInput.Icon icon="currency-usd" />}
            />
          </Card.Content>
        </Card>

        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Notes
            </Text>

            <TextInput
              label="Project Notes"
              value={values.notes}
              onChangeText={(text) => setValue('notes', text)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={calculatorStyles.input}
              placeholder="Design details, client preferences, special requirements..."
            />
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.button}
          >
            Cancel
          </Button>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
            disabled={!values.name.trim()}
          >
            {isEditing ? 'Update Project' : 'Create Project'}
          </Button>
        </View>
      </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

