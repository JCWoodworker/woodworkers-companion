import React from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Card, Text, useTheme, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { APP_NAME, APP_TAGLINE } from '@/src/constants';
import { spacing, touchTargets } from '@/src/theme';
import { haptics } from '@/src/theme/animations';
import { accessibleButton } from '@/src/theme/accessibility';

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
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = async () => {
    if (!disabled) {
      await haptics.light();
      router.push(route as any);
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        {...accessibleButton(title, disabled ? 'Coming soon' : description)}
        style={{ minHeight: touchTargets.minimum }}
      >
        <Card
          style={[
            styles.card,
            disabled && { opacity: 0.5 },
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
              {disabled && (
                <Text variant="bodySmall" style={styles.comingSoon}>
                  Coming Soon
                </Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </Animated.View>
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
        />

        <CalculatorCard
          title="Wood Movement Calculator"
          description="Predict seasonal expansion and contraction"
          icon="swap-horizontal"
          route="/calculators/wood-movement"
        />

        <CalculatorCard
          title="Finish Mixing Calculator"
          description="Perfect ratios for shellac and custom finishes"
          icon="palette"
          route="/calculators/finish-mixing"
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
        />

        <CalculatorCard
          title="Inventory"
          description="Manage lumber, tools, and materials"
          icon="warehouse"
          route="/inventory"
        />

        <CalculatorCard
          title="Clients & Quotes"
          description="CRM and professional documents"
          icon="account-group"
          route="/clients"
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

