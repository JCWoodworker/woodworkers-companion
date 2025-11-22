/**
 * Feature Card Wrapper
 * Wraps UI elements that represent features (calculators, modules)
 * Handles disabled state, styling, and interaction interception
 */

import React from 'react';
import { TouchableOpacity, View, Alert, StyleSheet, ViewStyle } from 'react-native';
import { isFeatureEnabled, FeatureId } from '@/src/config/features';
import { InDevelopmentBadge } from './InDevelopmentBadge';

interface Props {
  featureId: FeatureId;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function FeatureCard({ featureId, children, onPress, style }: Props) {
  const enabled = isFeatureEnabled(featureId);

  const handlePress = () => {
    if (enabled) {
      onPress?.();
    } else {
      Alert.alert(
        'Coming Soon',
        'This feature is currently in development and will be available in a future update.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={enabled ? 0.7 : 1}
      style={[styles.container, style, !enabled && styles.disabledContainer]}
    >
      <View style={[styles.content, !enabled && styles.disabledContent]}>
        {children}
      </View>
      
      {!enabled && (
        <View style={styles.badgeContainer}>
          <InDevelopmentBadge />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    width: '100%',
  },
  disabledContainer: {
    opacity: 0.8,
  },
  disabledContent: {
    opacity: 0.5,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
});

