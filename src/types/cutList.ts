/**
 * Type definitions for cut list optimizer
 */

export interface Part {
  id: string;
  name: string;
  width: number; // inches
  height: number; // inches
  quantity: number;
  grainDirection?: 'horizontal' | 'vertical' | 'none';
}

export interface StockPanel {
  width: number; // inches
  height: number; // inches
}

export interface PlacedPart {
  part: Part;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
}

export interface CutLayout {
  stock: StockPanel;
  placedParts: PlacedPart[];
  wastePercentage: number;
  totalAreaUsed: number;
  totalAreaAvailable: number;
  offcuts: Offcut[];
}

export interface Offcut {
  x: number;
  y: number;
  width: number;
  height: number;
  area: number;
}

