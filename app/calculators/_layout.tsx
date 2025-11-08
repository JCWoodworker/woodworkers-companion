import { Stack } from 'expo-router';
import React from 'react';

/**
 * Calculator Stack Navigator
 * Handles navigation between different calculator screens
 */
export default function CalculatorLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="board-foot"
        options={{
          title: 'Board Foot Calculator',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="fraction"
        options={{
          title: 'Fraction Calculator',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pricing"
        options={{
          title: 'Project Pricing',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

