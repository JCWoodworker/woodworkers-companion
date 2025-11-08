import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { APP_NAME, APP_TAGLINE } from '@/src/constants';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: string;
  route: string;
  disabled?: boolean;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon,
  route,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        disabled && { opacity: 0.5 },
        { backgroundColor: theme.colors.surface },
      ]}
      mode="elevated"
      onPress={() => !disabled && router.push(route as any)}
      disabled={disabled}
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Icon source={icon} size={40} color={theme.colors.primary} />
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {title}
          </Text>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            {description}
          </Text>
          {disabled && (
            <Text variant="bodySmall" style={styles.comingSoon}>
              Coming Soon
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
          {APP_NAME}
        </Text>
        <Text variant="bodyLarge" style={[styles.tagline, { color: theme.colors.onSurfaceVariant }]}>
          {APP_TAGLINE}
        </Text>
      </View>

      {/* Phase 1: Core Calculators */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Essential Calculators
        </Text>

        <CalculatorCard
          title="Board Foot Calculator"
          description="Calculate lumber volume, costs, and apply waste factors"
          icon="hammer-wrench"
          route="/calculators/board-foot"
        />

        <CalculatorCard
          title="Fraction Calculator"
          description="Precision math for tape measure measurements"
          icon="ruler"
          route="/calculators/fraction"
        />

        <CalculatorCard
          title="Project Pricing"
          description="Calculate costs and generate professional quotes"
          icon="currency-usd"
          route="/calculators/pricing"
        />
      </View>

      {/* Phase 2: Advanced Tools (Coming Soon) */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Advanced Tools
        </Text>

        <CalculatorCard
          title="Cut List Optimizer"
          description="Minimize waste with optimized cutting diagrams"
          icon="content-cut"
          route="/calculators/cut-list"
          disabled
        />

        <CalculatorCard
          title="Wood Movement Calculator"
          description="Predict seasonal expansion and contraction"
          icon="swap-horizontal"
          route="/calculators/wood-movement"
          disabled
        />

        <CalculatorCard
          title="Finish Mixing Calculator"
          description="Perfect ratios for shellac and custom finishes"
          icon="palette"
          route="/calculators/finish-mixing"
          disabled
        />
      </View>

      {/* Phase 3: Business Tools (Coming Soon) */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Business Tools
        </Text>

        <CalculatorCard
          title="Project Management"
          description="Track tasks, time, and expenses for your builds"
          icon="clipboard-text"
          route="/projects"
          disabled
        />

        <CalculatorCard
          title="Inventory"
          description="Manage lumber, tools, and materials"
          icon="warehouse"
          route="/inventory"
          disabled
        />

        <CalculatorCard
          title="Quotes & Invoices"
          description="Professional documents for your clients"
          icon="file-document"
          route="/documents"
          disabled
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tagline: {
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: '600',
  },
  card: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    opacity: 0.7,
  },
  comingSoon: {
    marginTop: 4,
    fontStyle: 'italic',
    opacity: 0.6,
  },
});

