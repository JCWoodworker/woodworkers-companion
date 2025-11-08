import { Stack } from 'expo-router';
import React from 'react';

export default function ClientsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Clients',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Client Details',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'New Client',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

