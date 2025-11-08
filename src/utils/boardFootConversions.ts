/**
 * Board Foot Conversion Utilities
 * Quarters ↔ Inches conversions for lumber thickness
 */

/**
 * Convert quarters to inches
 * @param quarters - Number of quarters (e.g., 4 = 4/4 = 1 inch)
 * @returns Inches as decimal
 */
export const quartersToInches = (quarters: number): number => {
  return quarters / 4;
};

/**
 * Convert inches to quarters
 * @param inches - Decimal inches
 * @returns Number of quarters (rounded to nearest)
 */
export const inchesToQuarters = (inches: number): number => {
  return Math.round(inches * 4);
};

/**
 * Format quarters for display
 * @param quarters - Number of quarters
 * @returns Formatted string (e.g., "4/4")
 */
export const formatQuarters = (quarters: number): string => {
  return `${quarters}/4`;
};

/**
 * Common lumber thicknesses in quarters
 */
export const COMMON_QUARTERS = [
  { quarters: 3, inches: 0.75, label: '3/4' },
  { quarters: 4, inches: 1.0, label: '4/4 (1")' },
  { quarters: 5, inches: 1.25, label: '5/4' },
  { quarters: 6, inches: 1.5, label: '6/4' },
  { quarters: 8, inches: 2.0, label: '8/4 (2")' },
  { quarters: 12, inches: 3.0, label: '12/4 (3")' },
  { quarters: 16, inches: 4.0, label: '16/4 (4")' },
];

