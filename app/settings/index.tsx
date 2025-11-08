/**
 * Main Settings Screen
 * App-wide settings and preferences
 */

import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, List, Divider, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useSettingsStore } from '@/src/store/settingsStore';
import { ComplexityModeSelector } from '@/src/components/settings/ComplexityModeSelector';
import { SettingToggle } from '@/src/components/settings/SettingToggle';
import { spacing } from '@/src/theme';

export default function SettingsScreen() {
  const theme = useTheme();
  const {
    complexityMode,
    hapticFeedback,
    loadSettings,
    setComplexityMode,
    setHapticFeedback,
  } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ComplexityModeSelector
          value={complexityMode}
          onChange={setComplexityMode}
        />

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          App Preferences
        </Text>

        <List.Section>
          <SettingToggle
            title="Haptic Feedback"
            description="Vibrate on button presses and actions"
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            icon="vibrate"
          />

          <List.Item
            title="Inventory Settings"
            description="Customize inventory features and fields"
            left={(props) => <List.Icon {...props} icon="package-variant-closed" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/settings/inventory' as any)}
          />
        </List.Section>

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          About
        </Text>

        <List.Section>
          <List.Item
            title="Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
          
          <List.Item
            title="Privacy Policy"
            description="How we handle your data"
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => router.push('/privacy-policy' as any)}
          />
        </List.Section>
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
  sectionTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  divider: {
    marginVertical: spacing.lg,
  },
});

