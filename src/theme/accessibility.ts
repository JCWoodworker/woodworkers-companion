/**
 * Accessibility utilities for The Woodworker's Companion
 * Ensuring WCAG AA compliance
 */

import { StyleSheet, AccessibilityInfo, Platform } from 'react-native';
import { touchTargets } from './spacing';

/**
 * Check if color contrast meets WCAG AA standards
 * Formula from WCAG 2.1 guidelines
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const getLuminance = (hex: string): number => {
    // Convert hex to RGB
    const rgb = hex.replace('#', '').match(/.{2}/g)?.map(x => parseInt(x, 16)) || [0, 0, 0];
    
    // Convert to relative luminance
    const [r, g, b] = rgb.map(val => {
      const normalized = val / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * WCAG AA standards
 */
export const WCAG_AA = {
  normalText: 4.5, // Minimum for normal text
  largeText: 3.0,  // Minimum for large text (18px+ or 14px+ bold)
  uiComponents: 3.0, // Minimum for UI components and graphics
};

/**
 * Validate if contrast ratio meets WCAG AA
 */
export const meetsWCAG_AA = (
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  const threshold = isLargeText ? WCAG_AA.largeText : WCAG_AA.normalText;
  return ratio >= threshold;
};

/**
 * Ensure minimum touch target size (44x44px for WCAG AA)
 */
export const touchTargetStyles = StyleSheet.create({
  minimum: {
    minWidth: touchTargets.minimum,
    minHeight: touchTargets.minimum,
  },
  comfortable: {
    minWidth: touchTargets.comfortable,
    minHeight: touchTargets.comfortable,
  },
  large: {
    minWidth: touchTargets.large,
    minHeight: touchTargets.large,
  },
});

/**
 * Create accessible label for screen readers
 */
export const createAccessibilityLabel = (
  label: string,
  hint?: string,
  value?: string
): string => {
  let accessibilityLabel = label;
  
  if (value) {
    accessibilityLabel += `, ${value}`;
  }
  
  if (hint) {
    accessibilityLabel += `. ${hint}`;
  }
  
  return accessibilityLabel;
};

/**
 * Accessibility props for interactive elements
 */
export const accessibleButton = (label: string, hint?: string) => ({
  accessible: true,
  accessibilityRole: 'button' as const,
  accessibilityLabel: label,
  accessibilityHint: hint,
  ...touchTargetStyles.minimum,
});

export const accessibleTextInput = (label: string, value?: string) => ({
  accessible: true,
  accessibilityRole: 'text' as const,
  accessibilityLabel: label,
  accessibilityValue: value ? { text: value } : undefined,
});

export const accessibleLink = (label: string, hint?: string) => ({
  accessible: true,
  accessibilityRole: 'link' as const,
  accessibilityLabel: label,
  accessibilityHint: hint,
});

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Announce message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibility(message);
    } else {
      // Android supports priority
      AccessibilityInfo.announceForAccessibility(message);
    }
  },

  /**
   * Set focus to a specific element (requires ref)
   */
  setFocus: (ref: any) => {
    if (ref?.current?.focus) {
      ref.current.focus();
    }
  },
};

/**
 * Semantic heading levels for screen readers
 */
export const accessibleHeading = (level: 1 | 2 | 3 | 4 | 5 | 6, text: string) => ({
  accessible: true,
  accessibilityRole: 'header' as const,
  accessibilityLabel: text,
  accessibilityLevel: level,
});

/**
 * Check if user has enabled screen reader
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  return await AccessibilityInfo.isScreenReaderEnabled();
};

/**
 * Check if user prefers reduced motion
 */
export const isReduceMotionEnabled = async (): Promise<boolean> => {
  return await AccessibilityInfo.isReduceMotionEnabled();
};

