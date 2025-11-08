/**
 * Wood movement calculations
 * Based on dimensional change coefficients
 */

import { WoodSpecies, CutType } from '@/src/types/woodSpecies';

/**
 * Calculate wood movement
 * 
 * Formula: Movement = Width × ΔMC × Coefficient
 * 
 * @param width - Board width in inches
 * @param moistureChange - Change in moisture content (%)
 * @param coefficient - Dimensional change coefficient (from species data)
 * @returns Movement in inches
 */
export const calculateWoodMovement = (
  width: number,
  moistureChange: number,
  coefficient: number
): number => {
  return width * moistureChange * coefficient;
};

/**
 * Get coefficient for species and cut type
 */
export const getCoefficient = (
  species: WoodSpecies,
  cutType: CutType
): number => {
  return cutType === 'flatsawn' 
    ? species.coefficients.flatsawn 
    : species.coefficients.quartersawn;
};

/**
 * Generate actionable guidance text
 */
export const getMovementGuidance = (
  movement: number,
  width: number,
  speciesName: string,
  cutType: CutType
): string => {
  const cutTypeLabel = cutType === 'flatsawn' ? 'flatsawn' : 'quartersawn';
  const fractionMovement = convertToFraction(movement);
  
  if (movement < 0.03125) { // Less than 1/32"
    return `This ${width}" wide ${cutTypeLabel} ${speciesName} panel will have minimal movement (less than 1/32"). Standard joinery should be sufficient.`;
  } else if (movement < 0.125) { // Less than 1/8"
    return `This ${width}" wide ${cutTypeLabel} ${speciesName} panel will move approximately ${fractionMovement}" seasonally. Allow for expansion in fixed joints and use slotted screw holes.`;
  } else if (movement < 0.25) { // Less than 1/4"
    return `This ${width}" wide ${cutTypeLabel} ${speciesName} panel will move approximately ${fractionMovement}" seasonally. Use proper breadboard ends, floating panels, or figure-8 fasteners to allow movement.`;
  } else {
    return `This ${width}" wide ${cutTypeLabel} ${speciesName} panel will move approximately ${fractionMovement}" seasonally. This is significant movement! Use floating panel construction, sliding dovetails, or dedicated expansion joinery. Do NOT rigidly fix across the grain.`;
  }
};

/**
 * Convert decimal to nearest fraction for display
 */
const convertToFraction = (decimal: number): string => {
  const precision = 32; // 1/32" precision
  const whole = Math.floor(decimal);
  const fractional = decimal - whole;
  
  if (fractional < 0.015625) return whole.toString(); // Less than 1/64"
  
  const numerator = Math.round(fractional * precision);
  
  // Simplify
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(numerator, precision);
  
  const simplifiedNum = numerator / divisor;
  const simplifiedDen = precision / divisor;
  
  if (whole > 0) {
    return simplifiedNum > 0 ? `${whole} ${simplifiedNum}/${simplifiedDen}` : `${whole}`;
  }
  return `${simplifiedNum}/${simplifiedDen}`;
};

/**
 * Calculate recommended moisture content change based on environment
 */
export const getMoistureChangeForEnvironment = (environment: string): number => {
  const environments: Record<string, number> = {
    'climate-controlled': 2,
    'standard-home': 4,
    'garage': 6,
    'outdoor': 8,
  };
  
  return environments[environment] || 4;
};

