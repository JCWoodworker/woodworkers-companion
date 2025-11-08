import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Settings',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="inventory"
        options={{
          title: 'Inventory Settings',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

