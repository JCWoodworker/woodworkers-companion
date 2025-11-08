/**
 * App-wide constants
 */

// Common nominal lumber thicknesses (in quarters)
export const NOMINAL_THICKNESSES = [
  { label: '4/4 (1")', value: 1, quarters: '4/4' },
  { label: '5/4 (1.25")', value: 1.25, quarters: '5/4' },
  { label: '6/4 (1.5")', value: 1.5, quarters: '6/4' },
  { label: '8/4 (2")', value: 2, quarters: '8/4' },
  { label: '10/4 (2.5")', value: 2.5, quarters: '10/4' },
  { label: '12/4 (3")', value: 3, quarters: '12/4' },
  { label: '16/4 (4")', value: 4, quarters: '16/4' },
];

// Common fraction precisions
export const FRACTION_PRECISIONS = [
  { label: '1/8"', value: 8 },
  { label: '1/16"', value: 16 },
  { label: '1/32"', value: 32 },
  { label: '1/64"', value: 64 },
];

// Waste factor presets
export const WASTE_FACTORS = [
  { label: 'High Grade (15%)', value: 15 },
  { label: 'Standard (20%)', value: 20 },
  { label: 'Low Grade (30%)', value: 30 },
  { label: 'Custom', value: 0 },
];

// App metadata
export const APP_NAME = "The Woodworker's Companion";
export const APP_TAGLINE = 'Essential Tools for Every Craftsperson';
export const APP_VERSION = '1.0.0';

