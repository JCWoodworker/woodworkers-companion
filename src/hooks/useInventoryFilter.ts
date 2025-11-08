/**
 * Inventory Filter Hook
 * Filtering and search logic for inventory items
 */

import { useMemo } from 'react';
import { LumberEntry, Tool, Consumable, Hardware, InventoryFilter } from '@/src/types/inventory';
import { CustomCategoryItem } from '@/src/types/customCategory';

export function useInventoryFilter<T extends LumberEntry | Tool | Consumable | Hardware | CustomCategoryItem>(
  items: T[],
  filter: InventoryFilter
) {
  return useMemo(() => {
    let filtered = [...items];

    // Search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        // Type-specific searches
        if ('species' in item) {
          return item.species.toLowerCase().includes(query);
        }
        if ('name' in item) {
          const nameMatch = item.name.toLowerCase().includes(query);
          const locationMatch = item.location?.toLowerCase().includes(query);
          const notesMatch = 'notes' in item && item.notes?.toLowerCase().includes(query);
          return nameMatch || locationMatch || notesMatch;
        }
        return false;
      });
    }

    // Category filter
    if (filter.category) {
      filtered = filtered.filter((item) => {
        if ('category' in item) {
          return item.category?.toLowerCase() === filter.category?.toLowerCase();
        }
        return true;
      });
    }

    // Location filter
    if (filter.location) {
      filtered = filtered.filter((item) => {
        if ('location' in item) {
          return item.location?.toLowerCase() === filter.location?.toLowerCase();
        }
        return true;
      });
    }

    // Value range filter
    if (filter.minValue !== undefined || filter.maxValue !== undefined) {
      filtered = filtered.filter((item) => {
        let value = 0;
        if ('totalCost' in item) {
          value = item.totalCost || 0;
        } else if ('purchasePrice' in item) {
          value = item.purchasePrice || 0;
        }
        
        if (filter.minValue !== undefined && value < filter.minValue) return false;
        if (filter.maxValue !== undefined && value > filter.maxValue) return false;
        return true;
      });
    }

    // Low stock only
    if (filter.lowStockOnly) {
      filtered = filtered.filter((item) => {
        if ('reorderLevel' in item && 'quantity' in item) {
          return item.reorderLevel !== undefined && item.quantity <= item.reorderLevel;
        }
        return false;
      });
    }

    // Needs maintenance only
    if (filter.needsMaintenanceOnly) {
      const today = new Date();
      filtered = filtered.filter((item) => {
        if ('nextMaintenance' in item) {
          return item.nextMaintenance && new Date(item.nextMaintenance) <= today;
        }
        return false;
      });
    }

    return filtered;
  }, [items, filter]);
}

