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

// Shellac cuts (Phase 2)
export const SHELLAC_CUTS = [
  { label: '1-lb Cut (Washcoat)', value: 1, description: 'Thin sealer, barrier coat' },
  { label: '2-lb Cut (Sealer)', value: 2, description: 'Most versatile, general finishing' },
  { label: '3-lb Cut (Finish)', value: 3, description: 'Builds film quickly' },
  { label: '4-lb Cut', value: 4, description: 'Padding/French polish' },
  { label: '5-lb Cut', value: 5, description: 'Very heavy bodied' },
];

// Sheet sizes for cut list optimizer (Phase 2)
export const SHEET_SIZES = [
  { label: "4' × 8' (Standard Plywood)", width: 48, height: 96 },
  { label: "4' × 10'", width: 48, height: 120 },
  { label: "5' × 5' (Baltic Birch)", width: 60, height: 60 },
  { label: "4' × 4'", width: 48, height: 48 },
  { label: 'Custom', width: 0, height: 0 },
];

// Moisture environment presets (Phase 2)
export const MOISTURE_ENVIRONMENTS = [
  { label: 'Climate Controlled (±2%)', value: 2, description: 'HVAC controlled home' },
  { label: 'Standard Home (±4%)', value: 4, description: 'Typical residential' },
  { label: 'Garage/Basement (±6%)', value: 6, description: 'Unheated space' },
  { label: 'Outdoor/Extreme (±8%)', value: 8, description: 'High humidity variation' },
  { label: 'Custom', value: 0, description: 'Enter custom value' },
];

// App metadata
export const APP_NAME = "The Woodworker's Companion";
export const APP_TAGLINE = 'Essential Tools for Every Craftsperson';
export const APP_VERSION = '1.0.0';

