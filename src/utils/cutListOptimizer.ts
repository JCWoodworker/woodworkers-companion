/**
 * Cut list optimization algorithm
 * Uses guillotine bin packing for 2D sheet cutting optimization
 */

import { Part, StockPanel, PlacedPart, CutLayout, Offcut } from '@/src/types/cutList';

interface FreeRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Optimize cut list layout
 * 
 * @param stock - Stock panel dimensions
 * @param parts - List of parts to cut
 * @param kerf - Saw blade width (kerf) to account for
 * @returns Optimized layout with placed parts
 */
export const optimizeCutList = (
  stock: StockPanel,
  parts: Part[],
  kerf: number = 0.125
): CutLayout => {
  const placedParts: PlacedPart[] = [];
  const freeRectangles: FreeRectangle[] = [
    { x: 0, y: 0, width: stock.width, height: stock.height }
  ];

  // Expand parts by quantity
  const expandedParts: Part[] = [];
  parts.forEach((part) => {
    for (let i = 0; i < part.quantity; i++) {
      expandedParts.push({
        ...part,
        id: `${part.id}-${i}`,
        quantity: 1,
      });
    }
  });

  // Sort parts by area (largest first) for better packing
  const sortedParts = [...expandedParts].sort((a, b) => {
    const areaA = a.width * a.height;
    const areaB = b.width * b.height;
    return areaB - areaA;
  });

  // Try to place each part
  for (const part of sortedParts) {
    let placed = false;

    // Try to fit in existing free rectangles
    for (let i = 0; i < freeRectangles.length; i++) {
      const rect = freeRectangles[i];
      
      // Try normal orientation
      if (canFit(part, rect, false, kerf)) {
        const placedPart = placePart(part, rect, false, kerf);
        placedParts.push(placedPart);
        
        // Split free rectangle
        const newRects = splitRectangle(rect, placedPart);
        freeRectangles.splice(i, 1, ...newRects);
        placed = true;
        break;
      }
      
      // Try rotated orientation (if grain allows)
      if (!placed && canRotate(part) && canFit(part, rect, true, kerf)) {
        const placedPart = placePart(part, rect, true, kerf);
        placedParts.push(placedPart);
        
        // Split free rectangle
        const newRects = splitRectangle(rect, placedPart);
        freeRectangles.splice(i, 1, ...newRects);
        placed = true;
        break;
      }
    }

    // If part couldn't be placed, it won't fit
    if (!placed) {
      console.warn(`Part ${part.name} (${part.width}×${part.height}) could not be placed`);
    }
  }

  // Calculate metrics
  const totalAreaUsed = placedParts.reduce(
    (sum, p) => sum + (p.width * p.height),
    0
  );
  const totalAreaAvailable = stock.width * stock.height;
  const wastePercentage = ((totalAreaAvailable - totalAreaUsed) / totalAreaAvailable) * 100;

  // Calculate offcuts (simplified - areas not occupied by parts)
  const offcuts = calculateOffcuts(stock, placedParts);

  return {
    stock,
    placedParts,
    wastePercentage,
    totalAreaUsed,
    totalAreaAvailable,
    offcuts,
  };
};

/**
 * Check if part can fit in rectangle
 */
const canFit = (
  part: Part,
  rect: FreeRectangle,
  rotated: boolean,
  kerf: number
): boolean => {
  const partWidth = rotated ? part.height : part.width;
  const partHeight = rotated ? part.width : part.height;
  
  // Add kerf to part dimensions
  const totalWidth = partWidth + kerf;
  const totalHeight = partHeight + kerf;
  
  return totalWidth <= rect.width && totalHeight <= rect.height;
};

/**
 * Check if part can be rotated (based on grain direction)
 */
const canRotate = (part: Part): boolean => {
  return part.grainDirection === 'none' || !part.grainDirection;
};

/**
 * Place part in rectangle
 */
const placePart = (
  part: Part,
  rect: FreeRectangle,
  rotated: boolean,
  kerf: number
): PlacedPart => {
  return {
    part,
    x: rect.x,
    y: rect.y,
    width: rotated ? part.height : part.width,
    height: rotated ? part.width : part.height,
    rotated,
  };
};

/**
 * Split free rectangle after placing a part (Guillotine split)
 */
const splitRectangle = (
  rect: FreeRectangle,
  placed: PlacedPart
): FreeRectangle[] => {
  const newRects: FreeRectangle[] = [];

  // Right rectangle
  if (rect.width > placed.width) {
    newRects.push({
      x: rect.x + placed.width,
      y: rect.y,
      width: rect.width - placed.width,
      height: rect.height,
    });
  }

  // Bottom rectangle
  if (rect.height > placed.height) {
    newRects.push({
      x: rect.x,
      y: rect.y + placed.height,
      width: placed.width,
      height: rect.height - placed.height,
    });
  }

  return newRects.filter(r => r.width > 0 && r.height > 0);
};

/**
 * Calculate usable offcuts from remaining space
 */
const calculateOffcuts = (
  stock: StockPanel,
  placedParts: PlacedPart[]
): Offcut[] => {
  const offcuts: Offcut[] = [];
  
  // Simplified: Find largest free rectangles
  // In production, this would use a more sophisticated algorithm
  
  // For now, calculate total waste area
  const usedArea = placedParts.reduce((sum, p) => sum + (p.width * p.height), 0);
  const wasteArea = (stock.width * stock.height) - usedArea;
  
  if (wasteArea > 0) {
    // Represent total waste as a single offcut for simplicity
    offcuts.push({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      area: wasteArea,
    });
  }
  
  return offcuts;
};

/**
 * Calculate total waste area
 */
export const calculateWasteArea = (layout: CutLayout): number => {
  return layout.totalAreaAvailable - layout.totalAreaUsed;
};

/**
 * Convert inches to feet and inches for display
 */
export const formatDimension = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  
  if (feet === 0) {
    return `${remainingInches}"`;
  }
  
  if (remainingInches === 0) {
    return `${feet}'`;
  }
  
  return `${feet}' ${remainingInches}"`;
};

