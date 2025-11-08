/**
 * Finish mixing calculations for shellac and other finishes
 */

/**
 * Calculate shellac flakes weight needed for a given pound cut
 * 
 * Pound cut system: 1-lb cut = 1 pound of flakes per 1 gallon of alcohol
 * 
 * @param poundCut - The desired cut (1, 2, 3, etc.)
 * @param volumeOz - Volume of alcohol in fluid ounces
 * @returns Weight of shellac flakes in ounces
 */
export const calculateShellacImperial = (
  poundCut: number,
  volumeOz: number
): number => {
  // 1 gallon = 128 fl oz
  // 1 pound = 16 oz
  const poundsPerGallon = poundCut;
  const ouncesPerGallon = poundsPerGallon * 16;
  const ouncesPerFluidOunce = ouncesPerGallon / 128;
  
  return volumeOz * ouncesPerFluidOunce;
};

/**
 * Calculate shellac flakes weight needed using metric system
 * 
 * @param gramsPerLiter - Grams of flakes per liter of alcohol
 * @param volumeMl - Volume of alcohol in milliliters
 * @returns Weight of shellac flakes in grams
 */
export const calculateShellacMetric = (
  gramsPerLiter: number,
  volumeMl: number
): number => {
  return (gramsPerLiter * volumeMl) / 1000;
};

/**
 * Convert pound cut to grams per liter
 * 
 * @param poundCut - The pound cut value
 * @returns Grams per liter equivalent
 */
export const poundCutToGramsPerLiter = (poundCut: number): number => {
  // 1 pound = 453.592 grams
  // 1 gallon = 3.78541 liters
  const gramsPerPound = 453.592;
  const litersPerGallon = 3.78541;
  
  return (poundCut * gramsPerPound) / litersPerGallon;
};

/**
 * Get mixing instructions based on pound cut
 */
export const getMixingInstructions = (poundCut: number): string[] => {
  const instructions = [
    'Use denatured alcohol or high-proof grain alcohol (190 proof)',
    'Add shellac flakes to alcohol (not alcohol to flakes)',
    'Seal container and shake vigorously every 15-30 minutes',
    'Allow to dissolve completely (2-24 hours depending on temperature)',
    'Strain through cheesecloth or coffee filter before use',
  ];

  if (poundCut === 1) {
    return [
      ...instructions,
      'Use as a washcoat, sanding sealer, or barrier coat',
      'Dries very quickly (15-30 minutes)',
    ];
  } else if (poundCut === 2) {
    return [
      ...instructions,
      'Most versatile cut - good for sealing and general finishing',
      'Can be thinned to 1-lb if needed',
    ];
  } else if (poundCut >= 3) {
    return [
      ...instructions,
      'Builds film quickly but may be difficult to brush',
      'Consider thinning to 2-lb for easier application',
      'Best for padding/French polish technique',
    ];
  }

  return instructions;
};

/**
 * Get shelf life information
 */
export const getShelfLife = (): string[] => {
  return [
    'Store in airtight glass or metal container',
    'Keep away from heat and direct sunlight',
    'Shellac dissolved in alcohol: 6-12 months',
    'Dry flakes (refrigerated): 2-3 years',
    'Test old shellac on scrap before use - should dry hard in 1 hour',
  ];
};

