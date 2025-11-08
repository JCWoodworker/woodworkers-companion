/**
 * Inventory Management type definitions
 */

// Individual board within a lumber entry
export interface IndividualBoard {
  id: string;
  thickness: number; // inches
  width: number; // inches
  length: number; // feet
  boardFeet: number;
  notes?: string;
  defects?: string;
}

// Extended lumber entry with all professional features
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
  
  // Advanced fields
  moistureContent?: number; // percentage
  supplier?: string;
  purchaseDate?: Date;
  gradeQuality?: string; // FAS, Select, #1 Common, etc.
  
  // Individual boards tracking
  trackIndividualBoards?: boolean;
  individualBoards?: IndividualBoard[];
  
  // Common fields
  barcode?: string;
  photos?: string[];
  dateAdded: Date;
  dateModified?: Date;
  usageHistory?: UsageRecord[];
}

// Tool entry with maintenance tracking
export interface Tool {
  id: string;
  name: string;
  category?: string; // Hand Tool, Power Tool, etc.
  brand?: string;
  model?: string;
  serialNumber?: string;
  
  purchaseDate?: Date;
  purchasePrice?: number;
  location?: string;
  condition?: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_repair';
  
  // Maintenance tracking
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  maintenanceInterval?: number; // days
  maintenanceNotes?: string;
  
  notes?: string;
  barcode?: string;
  photos?: string[];
  dateAdded: Date;
  dateModified?: Date;
}

// Consumable/supply entry
export interface Consumable {
  id: string;
  name: string;
  category?: string; // Sandpaper, Glue, Finish, etc.
  quantity: number;
  unit: string; // sheets, oz, gal, etc.
  costPerUnit?: number;
  totalCost?: number;
  
  reorderLevel?: number;
  supplier?: string;
  location?: string;
  expirationDate?: Date;
  
  notes?: string;
  barcode?: string;
  photos?: string[];
  dateAdded: Date;
  dateModified?: Date;
  usageHistory?: UsageRecord[];
}

// Hardware entry (screws, hinges, slides, etc.)
export interface Hardware {
  id: string;
  name: string;
  category?: string; // Screws, Hinges, Drawer Slides, etc.
  size?: string; // e.g., "#8 x 1-1/4", "3/4 overlay"
  material?: string; // Brass, Steel, Stainless, etc.
  finish?: string; // Zinc, Nickel, Bronze, etc.
  
  quantity: number;
  unit: string; // pieces, pairs, sets
  costPerUnit?: number;
  totalCost?: number;
  
  reorderLevel?: number;
  supplier?: string;
  location?: string;
  
  notes?: string;
  barcode?: string;
  photos?: string[];
  dateAdded: Date;
  dateModified?: Date;
  usageHistory?: UsageRecord[];
}

// Usage tracking record
export interface UsageRecord {
  id: string;
  date: Date;
  quantity: number;
  projectId?: string;
  projectName?: string;
  notes?: string;
}

// Union type for all inventory items
export type InventoryItem = LumberEntry | Tool | Consumable | Hardware;

// Item type discriminator
export type InventoryItemType = 'lumber' | 'tool' | 'consumable' | 'hardware' | 'custom';

// Tab type for UI
export type InventoryTab = 'lumber' | 'tools' | 'consumables' | 'hardware' | 'custom';

// Filter options
export interface InventoryFilter {
  searchQuery?: string;
  category?: string;
  location?: string;
  minValue?: number;
  maxValue?: number;
  lowStockOnly?: boolean;
  needsMaintenanceOnly?: boolean;
}

// Sort options
export type SortField = 'name' | 'dateAdded' | 'dateModified' | 'value' | 'quantity' | 'species' | 'location';
export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}
