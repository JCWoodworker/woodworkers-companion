/**
 * Keyboard Aware ScrollView Component
 * Wrapper around react-native-keyboard-aware-scroll-view
 * Automatically scrolls focused inputs into view
 */

import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, Platform } from 'react-native';
import { KeyboardAwareScrollView as RNKeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { usePlatformSafeArea } from '@/src/hooks/usePlatformSafeArea';
import { spacing } from '@/src/theme';

interface Props {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  contentContainerStyle?: ViewStyle | ViewStyle[];
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  refreshControl?: React.ReactElement;
}

export function KeyboardAwareScrollView({
  children,
  style,
  contentContainerStyle,
  keyboardShouldPersistTaps = 'handled',
  refreshControl,
}: Props) {
  const { contentPaddingBottom } = usePlatformSafeArea();

  return (
    <RNKeyboardAwareScrollView
      style={[styles.container, style]}
      contentContainerStyle={[
        styles.contentContainer,
        // Ensure we always have enough padding at bottom
        { paddingBottom: contentPaddingBottom + spacing.xl },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={Platform.OS === 'ios' ? 120 : 150} // Increased extra spacing above keyboard
      extraHeight={200} // Increased extra height
      enableResetScrollToCoords={false} // Don't auto-scroll back when keyboard hides (can be jarring)
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </RNKeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

