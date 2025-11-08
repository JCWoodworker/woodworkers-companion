import { Stack } from 'expo-router';
import React from 'react';

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Projects',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Project Details',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'New Project',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

