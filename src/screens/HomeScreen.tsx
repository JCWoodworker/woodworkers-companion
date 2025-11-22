import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, useTheme, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { APP_NAME, APP_TAGLINE } from '@/src/constants';
import { spacing, touchTargets } from '@/src/theme';
import { FeatureCard } from '@/src/components/common/FeatureCard';
import { FeatureId } from '@/src/config/features';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: string;
  route: string;
  featureId: FeatureId;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon,
  route,
  featureId,
}) => {
  const theme = useTheme();

  return (
    <FeatureCard
      featureId={featureId}
      onPress={() => router.push(route as any)}
      style={{ marginBottom: spacing.md }}
    >
      <Card
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface },
        ]}
        mode="elevated"
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
          </View>
        </Card.Content>
      </Card>
    </FeatureCard>
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
          featureId="calculator_board_foot"
        />

        <CalculatorCard
          title="Fraction Calculator"
          description="Precision math for tape measure measurements"
          icon="ruler"
          route="/calculators/fraction"
          featureId="calculator_fraction"
        />

        <CalculatorCard
          title="Project Pricing"
          description="Calculate costs and generate professional quotes"
          icon="currency-usd"
          route="/calculators/pricing"
          featureId="calculator_pricing"
        />
      </View>

      {/* Phase 2: Advanced Tools */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Advanced Tools
        </Text>

        <CalculatorCard
          title="Cut List Optimizer"
          description="Minimize waste with optimized cutting diagrams"
          icon="content-cut"
          route="/calculators/cut-list"
          featureId="calculator_cut_list"
        />

        <CalculatorCard
          title="Wood Movement Calculator"
          description="Predict seasonal expansion and contraction"
          icon="swap-horizontal"
          route="/calculators/wood-movement"
          featureId="calculator_wood_movement"
        />

        <CalculatorCard
          title="Finish Mixing Calculator"
          description="Perfect ratios for shellac and custom finishes"
          icon="palette"
          route="/calculators/finish-mixing"
          featureId="calculator_finish_mixing"
        />
      </View>

      {/* Phase 3: Business Tools */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Business Tools
        </Text>

        <CalculatorCard
          title="Project Management"
          description="Track tasks, time, and expenses for your builds"
          icon="clipboard-text"
          route="/projects"
          featureId="module_projects"
        />

        <CalculatorCard
          title="Inventory"
          description="Manage lumber, tools, and materials"
          icon="warehouse"
          route="/inventory"
          featureId="module_inventory"
        />

        <CalculatorCard
          title="Clients & Quotes"
          description="CRM and professional documents"
          icon="account-group"
          route="/clients"
          featureId="module_clients"
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
    padding: spacing.base,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
    marginTop: spacing.base,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  tagline: {
    fontStyle: 'italic',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  card: {
    marginBottom: spacing.md,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: touchTargets.minimum,
  },
  iconContainer: {
    marginRight: spacing.base,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cardDescription: {
    opacity: 0.7,
  },
  comingSoon: {
    marginTop: spacing.xs,
    fontStyle: 'italic',
    opacity: 0.6,
  },
});

