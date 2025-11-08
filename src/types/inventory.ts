/**
 * Inventory Management type definitions
 */

export interface LumberEntry {
  id: string;
  species: string;
  thickness: number; // inches (nominal)
  width?: number; // inches
  length?: number; // feet
  boardFeet: number;
  costPerBF: number;
  totalCost: number;
  location?: string;
  notes?: string;
  dateAdded: Date;
}

export interface Tool {
  id: string;
  name: string;
  category?: string;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  notes?: string;
  dateAdded: Date;
}

export interface Consumable {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel?: number;
  notes?: string;
  dateAdded: Date;
}

export type InventoryTab = 'lumber' | 'tools' | 'consumables';

