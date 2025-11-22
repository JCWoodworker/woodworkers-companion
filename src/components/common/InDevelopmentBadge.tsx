/**
 * In Development Badge
 * Small badge to indicate a feature is currently in development or locked
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { spacing } from '@/src/theme';

interface Props {
  label?: string;
}

export function InDevelopmentBadge({ label = 'In Development' }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.secondaryContainer },
      ]}
    >
      <Text
        variant="labelSmall"
        style={[styles.text, { color: theme.colors.onSecondaryContainer }]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 10,
  },
});

