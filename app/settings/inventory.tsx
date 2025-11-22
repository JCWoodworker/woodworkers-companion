/**
 * Inventory Settings Screen
 * Customize inventory features and field visibility
 */

import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Divider, useTheme, Button } from 'react-native-paper';
import { useSettingsStore } from '@/src/store/settingsStore';
import { SettingToggle } from '@/src/components/settings/SettingToggle';
import { spacing } from '@/src/theme';

export default function InventorySettingsScreen() {
  const theme = useTheme();
  const {
    complexityMode,
    inventory,
    loadSettings,
    updateInventorySettings,
  } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, []);

  const isCustomMode = complexityMode === 'custom';

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {!isCustomMode && (
          <View style={styles.notice}>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              You're in {complexityMode === 'lumberyard' ? 'lumber yard' : complexityMode} mode. Switch to Custom mode in the main settings to adjust individual features.
            </Text>
          </View>
        )}

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Enabled Categories
        </Text>

        <SettingToggle
          title="Lumber"
          description="Track wood inventory"
          value={inventory.enabledCategories.lumber}
          onValueChange={(value) =>
            updateInventorySettings({
              enabledCategories: { ...inventory.enabledCategories, lumber: value },
            })
          }
          icon="tree"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Tools"
          description="Track hand and power tools"
          value={inventory.enabledCategories.tools}
          onValueChange={(value) =>
            updateInventorySettings({
              enabledCategories: { ...inventory.enabledCategories, tools: value },
            })
          }
          icon="hammer-wrench"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Consumables"
          description="Track sandpaper, glue, finish, etc."
          value={inventory.enabledCategories.consumables}
          onValueChange={(value) =>
            updateInventorySettings({
              enabledCategories: { ...inventory.enabledCategories, consumables: value },
            })
          }
          icon="package-variant"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Hardware"
          description="Track screws, hinges, slides, etc."
          value={inventory.enabledCategories.hardware}
          onValueChange={(value) =>
            updateInventorySettings({
              enabledCategories: { ...inventory.enabledCategories, hardware: value },
            })
          }
          icon="screw-machine-flat-top"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Custom Categories"
          description="Create your own categories"
          value={inventory.enabledCategories.custom}
          onValueChange={(value) =>
            updateInventorySettings({
              enabledCategories: { ...inventory.enabledCategories, custom: value },
            })
          }
          icon="shape-plus"
          disabled={!isCustomMode}
        />

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Features
        </Text>

        <SettingToggle
          title="Analytics"
          description="View charts and reports"
          value={inventory.features.analytics}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, analytics: value },
            })
          }
          icon="chart-bar"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Barcode Scanning"
          description="Scan barcodes to add/find items"
          value={inventory.features.barcodeScanning}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, barcodeScanning: value },
            })
          }
          icon="barcode-scan"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Photo Attachments"
          description="Add photos to inventory items"
          value={inventory.features.photoAttachments}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, photoAttachments: value },
            })
          }
          icon="camera"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Project Integration"
          description="Link materials to projects"
          value={inventory.features.projectIntegration}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, projectIntegration: value },
            })
          }
          icon="link-variant"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Import/Export"
          description="Backup and batch import data"
          value={inventory.features.importExport}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, importExport: value },
            })
          }
          icon="database-export"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Low Stock Alerts"
          description="Get notified when items run low"
          value={inventory.features.lowStockAlerts}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, lowStockAlerts: value },
            })
          }
          icon="alert"
          disabled={!isCustomMode}
        />

        <SettingToggle
          title="Maintenance Tracking"
          description="Track tool maintenance schedules"
          value={inventory.features.maintenanceTracking}
          onValueChange={(value) =>
            updateInventorySettings({
              features: { ...inventory.features, maintenanceTracking: value },
            })
          }
          icon="calendar-clock"
          disabled={!isCustomMode}
        />

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionTitle}>
          Display
        </Text>

        <SettingToggle
          title="Show Empty Categories"
          description="Display categories with no items"
          value={inventory.showEmptyCategories}
          onValueChange={(value) =>
            updateInventorySettings({ showEmptyCategories: value })
          }
          icon="eye"
          disabled={!isCustomMode}
        />
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
  notice: {
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    marginBottom: spacing.lg,
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

