/**
 * Animation and motion system for The Woodworker's Companion
 * Using React Native Reanimated for 60fps performance
 */

import { withSpring, withTiming, Easing } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

/**
 * Animation durations (in milliseconds)
 */
export const durations = {
  fast: 150,
  base: 250,
  slow: 350,
  verySlow: 500,
};

/**
 * Easing curves for natural motion
 */
export const easings = {
  // Default easing - smooth deceleration
  easeOut: Easing.out(Easing.cubic),
  // Smooth acceleration and deceleration
  easeInOut: Easing.inOut(Easing.cubic),
  // Quick start
  easeIn: Easing.in(Easing.cubic),
  // Bouncy spring-like motion
  elastic: Easing.elastic(1.5),
  // Linear motion (rare use)
  linear: Easing.linear,
};

/**
 * Spring animation configs
 * For natural, physics-based motion
 */
export const springConfigs = {
  // Gentle bounce - for cards, modals
  gentle: {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  },
  // Quick response - for buttons, toggles
  snappy: {
    damping: 15,
    stiffness: 400,
    mass: 0.3,
  },
  // Smooth, no bounce - for slides, transitions
  smooth: {
    damping: 25,
    stiffness: 250,
    mass: 0.6,
  },
};

/**
 * Timing animation configs
 * For precise, controlled motion
 */
export const timingConfigs = {
  fast: {
    duration: durations.fast,
    easing: easings.easeOut,
  },
  base: {
    duration: durations.base,
    easing: easings.easeOut,
  },
  slow: {
    duration: durations.slow,
    easing: easings.easeInOut,
  },
};

/**
 * Common animation presets
 */
export const animations = {
  // Fade animations
  fadeIn: (duration: number = durations.base) => {
    return withTiming(1, {
      duration,
      easing: easings.easeOut,
    });
  },

  fadeOut: (duration: number = durations.base) => {
    return withTiming(0, {
      duration,
      easing: easings.easeIn,
    });
  },

  // Scale animations
  scaleIn: (fromScale: number = 0.9) => {
    return withSpring(1, springConfigs.gentle);
  },

  scaleOut: (toScale: number = 0.9) => {
    return withTiming(toScale, timingConfigs.fast);
  },

  // Press animations (for buttons)
  pressIn: () => {
    return withSpring(0.95, springConfigs.snappy);
  },

  pressOut: () => {
    return withSpring(1, springConfigs.snappy);
  },

  // Slide animations
  slideInLeft: (distance: number = 100) => {
    return withTiming(0, {
      duration: durations.base,
      easing: easings.easeOut,
    });
  },

  slideInRight: (distance: number = 100) => {
    return withTiming(0, {
      duration: durations.base,
      easing: easings.easeOut,
    });
  },
};

/**
 * Haptic feedback utilities
 * Provides tactile feedback for user interactions
 */
export const haptics = {
  // Light impact - for subtle interactions
  light: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },

  // Medium impact - for button presses
  medium: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },

  // Heavy impact - for important actions
  heavy: async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },

  // Selection change - for pickers, toggles
  selection: async () => {
    await Haptics.selectionAsync();
  },

  // Success notification
  success: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },

  // Warning notification
  warning: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },

  // Error notification
  error: async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
};

/**
 * Animation helper for cards/buttons
 */
export const createPressAnimation = () => {
  return {
    onPressIn: () => animations.pressIn(),
    onPressOut: () => animations.pressOut(),
  };
};

