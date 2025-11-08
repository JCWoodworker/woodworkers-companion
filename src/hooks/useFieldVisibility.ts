/**
 * Field Visibility Hook
 * Determines which fields to show based on complexity mode and settings
 */

import { useSettingsStore } from '@/src/store/settingsStore';

export function useFieldVisibility() {
  const { complexityMode, inventory } = useSettingsStore();

  return {
    // Lumber fields
    lumber: {
      thickness: inventory.lumberFields.thickness,
      width: inventory.lumberFields.width,
      length: inventory.lumberFields.length,
      boardFeet: inventory.lumberFields.boardFeet,
      costPerBF: inventory.lumberFields.costPerBF,
      location: inventory.lumberFields.location,
      notes: inventory.lumberFields.notes,
      moistureContent: inventory.lumberFields.moistureContent,
      supplier: inventory.lumberFields.supplier,
      purchaseDate: inventory.lumberFields.purchaseDate,
      individualBoards: inventory.lumberFields.individualBoards,
      barcode: inventory.lumberFields.barcode,
      photos: inventory.lumberFields.photos,
    },
    
    // Tool fields
    tool: {
      category: inventory.toolFields.category,
      brand: inventory.toolFields.brand,
      model: inventory.toolFields.model,
      serialNumber: inventory.toolFields.serialNumber,
      purchaseDate: inventory.toolFields.purchaseDate,
      purchasePrice: inventory.toolFields.purchasePrice,
      location: inventory.toolFields.location,
      condition: inventory.toolFields.condition,
      lastMaintenance: inventory.toolFields.lastMaintenance,
      nextMaintenance: inventory.toolFields.nextMaintenance,
      maintenanceNotes: inventory.toolFields.maintenanceNotes,
      barcode: inventory.toolFields.barcode,
      photos: inventory.toolFields.photos,
    },
    
    // Consumable fields
    consumable: {
      category: inventory.consumableFields.category,
      unit: inventory.consumableFields.unit,
      quantity: inventory.consumableFields.quantity,
      costPerUnit: inventory.consumableFields.costPerUnit,
      reorderLevel: inventory.consumableFields.reorderLevel,
      supplier: inventory.consumableFields.supplier,
      location: inventory.consumableFields.location,
      expirationDate: inventory.consumableFields.expirationDate,
      barcode: inventory.consumableFields.barcode,
      photos: inventory.consumableFields.photos,
    },
    
    // Hardware fields
    hardware: {
      category: inventory.hardwareFields.category,
      size: inventory.hardwareFields.size,
      material: inventory.hardwareFields.material,
      finish: inventory.hardwareFields.finish,
      quantity: inventory.hardwareFields.quantity,
      unit: inventory.hardwareFields.unit,
      costPerUnit: inventory.hardwareFields.costPerUnit,
      reorderLevel: inventory.hardwareFields.reorderLevel,
      supplier: inventory.hardwareFields.supplier,
      location: inventory.hardwareFields.location,
      barcode: inventory.hardwareFields.barcode,
      photos: inventory.hardwareFields.photos,
    },
    
    // Features
    features: inventory.features,
    
    // Mode
    complexityMode,
    isHobbyist: complexityMode === 'hobbyist',
    isProfessional: complexityMode === 'professional',
    isCustom: complexityMode === 'custom',
  };
}

