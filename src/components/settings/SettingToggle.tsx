/**
 * Setting Toggle Component
 * Reusable row for boolean settings
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';

interface Props {
  title: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  icon?: string;
  disabled?: boolean;
}

export function SettingToggle({ title, description, value, onValueChange, icon, disabled }: Props) {
  const theme = useTheme();

  return (
    <List.Item
      title={title}
      description={description}
      left={icon ? (props) => <List.Icon {...props} icon={icon} /> : undefined}
      right={() => (
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        />
      )}
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
    />
  );
}

const styles = StyleSheet.create({});

