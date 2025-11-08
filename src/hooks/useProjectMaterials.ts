/**
 * Project Materials Hook
 * Link materials to projects and track usage
 */

import { useState, useCallback } from 'react';
import { useInventoryStore } from '@/src/store/inventoryStore';

export interface LinkedMaterial {
  id: string;
  inventoryId: string;
  inventoryType: 'lumber' | 'consumable' | 'hardware' | 'custom';
  name: string;
  quantityUsed: number;
  unit?: string;
  dateUsed: Date;
}

export function useProjectMaterials(projectId: string, projectName: string) {
  const [linkedMaterials, setLinkedMaterials] = useState<LinkedMaterial[]>([]);
  const { useLumber, useConsumable, useHardware } = useInventoryStore();

  const addMaterial = useCallback((
    inventoryId: string,
    inventoryType: 'lumber' | 'consumable' | 'hardware' | 'custom',
    name: string,
    quantity: number,
    unit?: string
  ) => {
    const newMaterial: LinkedMaterial = {
      id: `${inventoryId}_${Date.now()}`,
      inventoryId,
      inventoryType,
      name,
      quantityUsed: quantity,
      unit,
      dateUsed: new Date(),
    };

    // Deduct from inventory
    if (inventoryType === 'lumber') {
      useLumber(inventoryId, quantity, projectId, projectName);
    } else if (inventoryType === 'consumable') {
      useConsumable(inventoryId, quantity, projectId, projectName);
    } else if (inventoryType === 'hardware') {
      useHardware(inventoryId, quantity, projectId, projectName);
    }

    setLinkedMaterials((prev) => [...prev, newMaterial]);
    return newMaterial;
  }, [projectId, projectName, useLumber, useConsumable, useHardware]);

  const removeMaterial = useCallback((id: string) => {
    setLinkedMaterials((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const getTotalMaterialCost = useCallback(() => {
    // This would need to lookup actual costs from inventory
    return 0; // Placeholder
  }, [linkedMaterials]);

  return {
    linkedMaterials,
    addMaterial,
    removeMaterial,
    getTotalMaterialCost: getTotalMaterialCost(),
    materialCount: linkedMaterials.length,
  };
}

