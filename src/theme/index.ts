// Color system
export { Colors } from './colors';
export type { ColorScheme } from './colors';

// Typography system
export { typography, fontFamilies, fontWeights } from './typography';
export type { TypographyVariant } from './typography';

// Spacing and sizing
export {
  spacing,
  borderRadius,
  iconSizes,
  touchTargets,
  screenPadding,
  cardSpacing,
  inputSizes,
  buttonSizes,
  elevations,
} from './spacing';

// Animation and motion
export {
  durations,
  easings,
  springConfigs,
  timingConfigs,
  animations,
  haptics,
  createPressAnimation,
} from './animations';

// Accessibility utilities
export {
  getContrastRatio,
  meetsWCAG_AA,
  WCAG_AA,
  touchTargetStyles,
  createAccessibilityLabel,
  accessibleButton,
  accessibleTextInput,
  accessibleLink,
  accessibleHeading,
  focusUtils,
  isScreenReaderEnabled,
  isReduceMotionEnabled,
} from './accessibility';

// React Native Paper themes
export { lightTheme, darkTheme } from './paper-theme';

