/**
 * Calculation utilities for woodworking
 * Contains formulas for board feet, wood movement, and other calculations
 */

/**
 * Calculate board feet from dimensions
 * Formula: (Thickness" × Width" × Length') / 12
 * or: (Thickness" × Width" × Length") / 144
 */
export const calculateBoardFeet = (
  thickness: number, // inches
  width: number, // inches
  length: number, // feet or inches
  lengthUnit: 'feet' | 'inches' = 'feet'
): number => {
  if (lengthUnit === 'feet') {
    return (thickness * width * length) / 12;
  } else {
    return (thickness * width * length) / 144;
  }
};

/**
 * Apply waste factor to board footage
 */
export const applyWasteFactor = (
  boardFeet: number,
  wasteFactor: number // percentage (e.g., 15 for 15%)
): number => {
  return boardFeet * (1 + wasteFactor / 100);
};

/**
 * Convert fraction to decimal
 */
export const fractionToDecimal = (
  whole: number,
  numerator: number,
  denominator: number
): number => {
  return whole + numerator / denominator;
};

/**
 * Convert decimal to fraction
 * Returns [whole, numerator, denominator]
 */
export const decimalToFraction = (
  decimal: number,
  precision: number = 16 // denominator precision (8, 16, 32, 64)
): [number, number, number] => {
  const whole = Math.floor(decimal);
  const fractional = decimal - whole;
  
  if (fractional === 0) {
    return [whole, 0, 1];
  }

  // Find closest fraction with given precision
  const numerator = Math.round(fractional * precision);
  
  // Simplify the fraction
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, precision);
  
  return [whole, numerator / divisor, precision / divisor];
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

