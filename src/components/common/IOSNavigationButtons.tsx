/**
 * iOS Navigation Buttons Component
 * Floating home and back buttons for iOS only
 */

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  hideHome?: boolean; // Don't show home button on home screen
}

export function IOSNavigationButtons({ hideHome = false }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  // Only render on iOS
  if (Platform.OS !== 'ios') {
    return null;
  }

  const canGoBack = router.canGoBack();

  return (
    <View style={[styles.container, { top: insets.top + 8 }]}>
      {canGoBack && (
        <View style={[styles.buttonWrapper, { backgroundColor: theme.colors.surface }]}>
          <IconButton
            icon="chevron-left"
            size={24}
            iconColor={theme.colors.primary}
            onPress={() => router.back()}
          />
        </View>
      )}
      
      {!hideHome && (
        <View style={[styles.buttonWrapper, { backgroundColor: theme.colors.surface }]}>
          <IconButton
            icon="home"
            size={24}
            iconColor={theme.colors.primary}
            onPress={() => router.push('/home' as any)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 8,
    flexDirection: 'row',
    gap: 4,
    zIndex: 1000,
  },
  buttonWrapper: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    opacity: 0.95,
  },
});

