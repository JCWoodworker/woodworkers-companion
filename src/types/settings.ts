/**
 * Settings and user preferences type definitions
 */

export type ComplexityMode = 'hobbyist' | 'professional' | 'lumberyard' | 'custom';

export interface InventorySettings {
  // Enabled categories
  enabledCategories: {
    lumber: boolean;
    tools: boolean;
    consumables: boolean;
    hardware: boolean;
    custom: boolean;
  };
  
  // Field visibility for lumber
  lumberFields: {
    thickness: boolean;
    width: boolean;
    length: boolean;
    boardFeet: boolean;
    costPerBF: boolean;
    location: boolean;
    notes: boolean;
    moistureContent: boolean;
    supplier: boolean;
    purchaseDate: boolean;
    individualBoards: boolean;
    barcode: boolean;
    photos: boolean;
  };
  
  // Field visibility for tools
  toolFields: {
    category: boolean;
    brand: boolean;
    model: boolean;
    serialNumber: boolean;
    purchaseDate: boolean;
    purchasePrice: boolean;
    location: boolean;
    condition: boolean;
    lastMaintenance: boolean;
    nextMaintenance: boolean;
    maintenanceNotes: boolean;
    barcode: boolean;
    photos: boolean;
  };
  
  // Field visibility for consumables
  consumableFields: {
    category: boolean;
    unit: boolean;
    quantity: boolean;
    costPerUnit: boolean;
    reorderLevel: boolean;
    supplier: boolean;
    location: boolean;
    expirationDate: boolean;
    barcode: boolean;
    photos: boolean;
  };
  
  // Field visibility for hardware
  hardwareFields: {
    category: boolean;
    size: boolean;
    material: boolean;
    finish: boolean;
    quantity: boolean;
    unit: boolean;
    costPerUnit: boolean;
    reorderLevel: boolean;
    supplier: boolean;
    location: boolean;
    barcode: boolean;
    photos: boolean;
  };
  
  // Features
  features: {
    analytics: boolean;
    barcodeScanning: boolean;
    photoAttachments: boolean;
    projectIntegration: boolean;
    importExport: boolean;
    customCategories: boolean;
    lowStockAlerts: boolean;
    maintenanceTracking: boolean;
  };
  
  // Display preferences
  defaultView: 'list' | 'grid' | 'compact';
  defaultSortBy: 'name' | 'dateAdded' | 'value' | 'quantity';
  defaultSortOrder: 'asc' | 'desc';
  showEmptyCategories: boolean;
}

export interface AppSettings {
  // Global complexity mode
  complexityMode: ComplexityMode;
  
  // Inventory-specific settings
  inventory: InventorySettings;
  
  // App-wide preferences
  theme: 'light' | 'dark' | 'auto';
  hapticFeedback: boolean;
  
  // First-time setup
  hasCompletedOnboarding: boolean;
}

// Default settings for each mode
export const DEFAULT_HOBBYIST_SETTINGS: InventorySettings = {
  enabledCategories: {
    lumber: true,
    tools: true,
    consumables: true,
    hardware: false,
    custom: false,
  },
  lumberFields: {
    thickness: true,
    width: false,
    length: false,
    boardFeet: true,
    costPerBF: true,
    location: true,
    notes: true,
    moistureContent: false,
    supplier: false,
    purchaseDate: false,
    individualBoards: false,
    barcode: false,
    photos: false,
  },
  toolFields: {
    category: false,
    brand: false,
    model: false,
    serialNumber: false,
    purchaseDate: false,
    purchasePrice: false,
    location: true,
    condition: false,
    lastMaintenance: false,
    nextMaintenance: false,
    maintenanceNotes: false,
    barcode: false,
    photos: false,
  },
  consumableFields: {
    category: false,
    unit: true,
    quantity: true,
    costPerUnit: false,
    reorderLevel: true,
    supplier: false,
    location: true,
    expirationDate: false,
    barcode: false,
    photos: false,
  },
  hardwareFields: {
    category: false,
    size: true,
    material: false,
    finish: false,
    quantity: true,
    unit: true,
    costPerUnit: false,
    reorderLevel: false,
    supplier: false,
    location: true,
    barcode: false,
    photos: false,
  },
  features: {
    analytics: false,
    barcodeScanning: false,
    photoAttachments: false,
    projectIntegration: false,
    importExport: false,
    customCategories: false,
    lowStockAlerts: true,
    maintenanceTracking: false,
  },
  defaultView: 'list',
  defaultSortBy: 'name',
  defaultSortOrder: 'asc',
  showEmptyCategories: false,
};

export const DEFAULT_PROFESSIONAL_SETTINGS: InventorySettings = {
  enabledCategories: {
    lumber: true,
    tools: true,
    consumables: true,
    hardware: true,
    custom: true,
  },
  lumberFields: {
    thickness: true,
    width: true,
    length: true,
    boardFeet: true,
    costPerBF: true,
    location: true,
    notes: true,
    moistureContent: true,
    supplier: true,
    purchaseDate: true,
    individualBoards: true,
    barcode: true,
    photos: true,
  },
  toolFields: {
    category: true,
    brand: true,
    model: true,
    serialNumber: true,
    purchaseDate: true,
    purchasePrice: true,
    location: true,
    condition: true,
    lastMaintenance: true,
    nextMaintenance: true,
    maintenanceNotes: true,
    barcode: true,
    photos: true,
  },
  consumableFields: {
    category: true,
    unit: true,
    quantity: true,
    costPerUnit: true,
    reorderLevel: true,
    supplier: true,
    location: true,
    expirationDate: true,
    barcode: true,
    photos: true,
  },
  hardwareFields: {
    category: true,
    size: true,
    material: true,
    finish: true,
    quantity: true,
    unit: true,
    costPerUnit: true,
    reorderLevel: true,
    supplier: true,
    location: true,
    barcode: true,
    photos: true,
  },
  features: {
    analytics: true,
    barcodeScanning: true,
    photoAttachments: true,
    projectIntegration: true,
    importExport: true,
    customCategories: true,
    lowStockAlerts: true,
    maintenanceTracking: true,
  },
  defaultView: 'list',
  defaultSortBy: 'dateAdded',
  defaultSortOrder: 'desc',
  showEmptyCategories: true,
};

export const DEFAULT_LUMBERYARD_SETTINGS: InventorySettings = {
  enabledCategories: {
    lumber: true,
    tools: true,
    consumables: true,
    hardware: true,
    custom: false,
  },
  lumberFields: {
    thickness: true,
    width: true,
    length: true,
    boardFeet: true,
    costPerBF: true,
    location: true,
    notes: true,
    moistureContent: true, // Important for lumber yards
    supplier: true,
    purchaseDate: true,
    individualBoards: true,
    barcode: true,
    photos: true,
  },
  toolFields: {
    category: false,
    brand: true,
    model: true,
    serialNumber: true,
    purchaseDate: true,
    purchasePrice: true,
    location: true,
    condition: true,
    lastMaintenance: false,
    nextMaintenance: false,
    maintenanceNotes: false,
    barcode: true,
    photos: false,
  },
  consumableFields: {
    category: true,
    unit: true,
    quantity: true,
    costPerUnit: true,
    reorderLevel: true,
    supplier: true,
    location: true,
    expirationDate: false,
    barcode: true,
    photos: false,
  },
  hardwareFields: {
    category: true,
    size: true,
    material: true,
    finish: true,
    quantity: true,
    unit: true,
    costPerUnit: true,
    reorderLevel: true,
    supplier: true,
    location: true,
    barcode: true,
    photos: false,
  },
  features: {
    analytics: true,
    barcodeScanning: true,
    photoAttachments: false,
    projectIntegration: true,
    importExport: true,
    customCategories: false,
    lowStockAlerts: true,
    maintenanceTracking: false,
  },
  defaultView: 'list',
  defaultSortBy: 'dateAdded',
  defaultSortOrder: 'desc',
  showEmptyCategories: false,
};

