/**
 * Type definitions for wood species data
 */

export interface WoodSpecies {
  id: string;
  name: string;
  scientificName: string;
  type: 'hardwood' | 'softwood' | 'exotic';
  /**
   * Dimensional change coefficients
   * Values represent change per 1% moisture content change
   */
  coefficients: {
    flatsawn: number;  // Tangential coefficient
    quartersawn: number; // Radial coefficient
  };
  /**
   * Janka hardness rating (lbf)
   */
  jankaHardness?: number;
  /**
   * Common uses
   */
  commonUses?: string[];
}

export type CutType = 'flatsawn' | 'quartersawn';

