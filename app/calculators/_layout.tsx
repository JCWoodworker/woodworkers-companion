import { Stack } from 'expo-router';
import React from 'react';

/**
 * Calculator Stack Navigator
 * Handles navigation between different calculator screens
 */
export default function CalculatorLayout() {
  return (
    <Stack>
      {/* Phase 1 Calculators */}
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

      {/* Phase 2 Calculators */}
      <Stack.Screen
        name="cut-list"
        options={{
          title: 'Cut List Optimizer',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="wood-movement"
        options={{
          title: 'Wood Movement Calculator',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="finish-mixing"
        options={{
          title: 'Finish Mixing Calculator',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

