/**
 * Privacy Policy Screen
 * Displays app privacy policy
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, useTheme, Divider } from 'react-native-paper';
import { spacing } from '@/src/theme';

export default function PrivacyPolicyScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="displaySmall" style={styles.mainTitle}>
          Privacy Policy
        </Text>
        <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          Last Updated: November 8, 2025
        </Text>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Overview
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              The Woodworker's Companion ("we", "our", or "the app") is committed to protecting your privacy. This Privacy Policy explains how we handle information in our mobile application.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Information We Collect
            </Text>
            
            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Data You Provide
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              The Woodworker's Companion allows you to create and store the following types of information:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>
              • <Text style={styles.bold}>Projects</Text>: Project names, descriptions, status, dates, estimated costs, client associations, tasks, time entries, and expenses
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>
              • <Text style={styles.bold}>Inventory</Text>: Lumber species and quantities, tool information, consumable supplies, hardware items, and associated details (costs, locations, notes)
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>
              • <Text style={styles.bold}>Clients</Text>: Client names, contact information (email, phone), addresses, and notes
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>
              • <Text style={styles.bold}>Documents</Text>: Quotes with item descriptions, quantities, and pricing
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>
              • <Text style={styles.bold}>Settings</Text>: Application preferences and customization options
            </Text>

            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Automatically Collected Data
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              We do <Text style={styles.bold}>NOT</Text> collect:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No analytics or tracking data</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No usage statistics</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No device identifiers</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No location data</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No personal identifiable information beyond what you enter</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              How We Store Your Data
            </Text>
            
            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Local Storage Only
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              <Text style={styles.bold}>All data is stored locally on your device</Text> using:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Android: AsyncStorage (local device storage)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• iOS: AsyncStorage (local device storage)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Web: localStorage (browser storage)</Text>

            <Text variant="bodyMedium" style={styles.paragraph}>
              <Text style={styles.bold}>Important:</Text>
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No data is transmitted to our servers or any third-party servers</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• No cloud backup or synchronization (unless you manually export data)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Data never leaves your device unless you explicitly share it</Text>

            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Data Security
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• All data is stored in your device's secure storage</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Data is protected by your device's security features (lock screen, encryption)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Only The Woodworker's Companion app can access this data</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Uninstalling the app will delete all stored data</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              How We Use Your Data
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              The data you enter is used <Text style={styles.bold}>exclusively</Text> for:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>1. Displaying your information within the app</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>2. Performing calculations (board feet, pricing, wood movement, etc.)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>3. Generating reports and quotes for your woodworking projects</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>4. Organizing and managing your inventory and projects</Text>

            <Text variant="bodyMedium" style={styles.paragraph}>
              We do <Text style={styles.bold}>NOT</Text>:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Share your data with anyone</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Sell your data to third parties</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Use your data for advertising</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Transmit your data to external servers</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Profile or track you</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Permissions
            </Text>
            
            <Text variant="bodyMedium" style={styles.paragraph}>
              The Woodworker's Companion requests the following permissions:
            </Text>

            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Android Permissions
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>CAMERA</Text>: Optional. Only used if you choose to attach photos to inventory items. This feature is disabled by default and only available in Professional mode.</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>READ/WRITE_EXTERNAL_STORAGE</Text>: To save your project and inventory data locally on your device</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>VIBRATE</Text>: To provide haptic feedback (can be disabled in settings)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>INTERNET</Text>: Required for app framework (no data is transmitted)</Text>

            <Text variant="bodyMedium" style={[styles.paragraph, { marginTop: spacing.md }]}>
              <Text style={styles.bold}>Camera Permission:</Text> Only requested when you explicitly try to add a photo. You can use the app fully without granting camera permission. No photos are uploaded to servers.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Third-Party Services
            </Text>
            
            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Expo Framework
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              The app is built using Expo, a React Native framework. Expo may collect:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Error logs and crash reports (if you consent in your device settings)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Basic app performance metrics</Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              For Expo's privacy practices, see: https://expo.dev/privacy
            </Text>

            <Text variant="titleMedium" style={styles.subsectionTitle}>
              No Other Third Parties
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              We do <Text style={styles.bold}>NOT</Text> use:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Analytics services (Google Analytics, Firebase, etc.)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Advertising networks</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Social media integrations</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Cloud storage providers</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Payment processors</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Email marketing services</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Your Rights and Choices
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              You have complete control over your data:
            </Text>
            
            <Text variant="titleMedium" style={styles.subsectionTitle}>
              You Can:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>✅ <Text style={styles.bold}>View</Text> all your data within the app</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>✅ <Text style={styles.bold}>Edit</Text> any information you've entered</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>✅ <Text style={styles.bold}>Delete</Text> individual items or all data</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>✅ <Text style={styles.bold}>Export</Text> your data (when enabled in settings)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>✅ <Text style={styles.bold}>Control</Text> which features and fields are visible (Hobbyist/Professional/Custom modes)</Text>

            <Text variant="titleMedium" style={styles.subsectionTitle}>
              Data Deletion
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Within App</Text>: Delete individual projects, inventory items, clients, or quotes</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Complete Deletion</Text>: Clear app data in device settings or uninstall the app</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              GDPR Compliance
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              For EU/EEA residents:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Legal Basis</Text>: We process data based on your consent (you choose what to enter)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Data Controller</Text>: You are the controller of your data; we merely provide the tools</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Data Processing</Text>: All processing happens locally on your device</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Right to Access</Text>: View all your data within the app</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Right to Deletion</Text>: Delete data within the app or uninstall</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>Right to Portability</Text>: Export your data (when feature is enabled)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• <Text style={styles.bold}>No Data Transfers</Text>: Data never leaves your device</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Contact Us
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              If you have questions about this Privacy Policy or our data practices:
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              <Text style={styles.bold}>Email</Text>: [Your email address]
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              <Text style={styles.bold}>Developer</Text>: [Your name or company name]
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.summaryCard]} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              Summary (TL;DR)
            </Text>
            <View style={styles.summaryBox}>
              <SummaryRow label="What we collect" value="Only the project, inventory, and client data you choose to enter" />
              <SummaryRow label="Where it's stored" value="Locally on your device only" />
              <SummaryRow label="Who has access" value="Only you, on your device" />
              <SummaryRow label="What we do with it" value="Nothing. It never leaves your device." />
              <SummaryRow label="How to delete it" value="Delete items in the app, clear app data, or uninstall" />
            </View>
            
            <Divider style={styles.divider} />
            
            <Text variant="bodyLarge" style={[styles.tagline, { color: theme.colors.primary }]}>
              Your privacy is paramount. We built this app to be a tool for you, not to collect data from you.
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="headlineSmall" style={styles.sectionTitle}>
              App Store Compliance
            </Text>
            <Text variant="bodyMedium" style={styles.paragraph}>
              This app complies with:
            </Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Google Play Store policies</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• Apple App Store guidelines</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• COPPA (Children's Online Privacy Protection Act)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• GDPR (General Data Protection Regulation)</Text>
            <Text variant="bodyMedium" style={styles.bulletPoint}>• CCPA (California Consumer Privacy Act)</Text>
          </Card.Content>
        </Card>

        <Text variant="bodySmall" style={[styles.footer, { color: theme.colors.onSurfaceVariant }]}>
          Version 1.0 • Effective Date: November 8, 2025
        </Text>
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View style={styles.summaryRow}>
      <Text variant="labelLarge" style={[styles.summaryLabel, { color: theme.colors.onSurfaceVariant }]}>
        {label}:
      </Text>
      <Text variant="bodyMedium" style={styles.summaryValue}>
        {value}
      </Text>
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
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  mainTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  summaryCard: {
    borderWidth: 2,
    borderColor: '#8B4513',
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  subsectionTitle: {
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  paragraph: {
    marginBottom: spacing.sm,
    lineHeight: 24,
  },
  bulletPoint: {
    marginBottom: spacing.xs,
    marginLeft: spacing.sm,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
  },
  summaryBox: {
    marginBottom: spacing.md,
  },
  summaryRow: {
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    marginBottom: spacing.xs,
  },
  summaryValue: {
    marginLeft: spacing.sm,
  },
  divider: {
    marginVertical: spacing.md,
  },
  tagline: {
    fontWeight: '600',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    textAlign: 'center',
    marginTop: spacing.xl,
    fontStyle: 'italic',
  },
});

