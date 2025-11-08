/**
 * Category Settings Hook
 * Get active categories based on settings
 */

import { useSettingsStore } from '@/src/store/settingsStore';
import { InventoryTab } from '@/src/types/inventory';

export function useCategorySettings() {
  const { inventory } = useSettingsStore();

  const getActiveCategories = (): InventoryTab[] => {
    const categories: InventoryTab[] = [];
    
    if (inventory.enabledCategories.lumber) categories.push('lumber');
    if (inventory.enabledCategories.tools) categories.push('tools');
    if (inventory.enabledCategories.consumables) categories.push('consumables');
    if (inventory.enabledCategories.hardware) categories.push('hardware');
    if (inventory.enabledCategories.custom) categories.push('custom');
    
    return categories;
  };

  const isCategoryEnabled = (category: InventoryTab): boolean => {
    return inventory.enabledCategories[category] || false;
  };

  return {
    enabledCategories: inventory.enabledCategories,
    activeCategories: getActiveCategories(),
    isCategoryEnabled,
    showEmptyCategories: inventory.showEmptyCategories,
  };
}

