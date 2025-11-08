import { Stack } from 'expo-router';
import React from 'react';

export default function DocumentsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="quotes"
        options={{
          title: 'Quotes',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="create-quote"
        options={{
          title: 'New Quote',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

