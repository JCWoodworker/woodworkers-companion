/**
 * Inventory Sort Hook
 * Sorting logic for inventory items
 */

import { useMemo } from 'react';
import { LumberEntry, Tool, Consumable, Hardware, SortOptions } from '@/src/types/inventory';
import { CustomCategoryItem } from '@/src/types/customCategory';

export function useInventorySort<T extends LumberEntry | Tool | Consumable | Hardware | CustomCategoryItem>(
  items: T[],
  sortOptions: SortOptions
) {
  return useMemo(() => {
    const sorted = [...items];

    sorted.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortOptions.field) {
        case 'name':
          if ('species' in a && 'species' in b) {
            aValue = a.species.toLowerCase();
            bValue = b.species.toLowerCase();
          } else if ('name' in a && 'name' in b) {
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
          }
          break;

        case 'dateAdded':
          aValue = new Date(a.dateAdded).getTime();
          bValue = new Date(b.dateAdded).getTime();
          break;

        case 'dateModified':
          if ('dateModified' in a && 'dateModified' in b) {
            aValue = a.dateModified ? new Date(a.dateModified).getTime() : 0;
            bValue = b.dateModified ? new Date(b.dateModified).getTime() : 0;
          }
          break;

        case 'value':
          if ('totalCost' in a && 'totalCost' in b) {
            aValue = a.totalCost || 0;
            bValue = b.totalCost || 0;
          } else if ('purchasePrice' in a && 'purchasePrice' in b) {
            aValue = a.purchasePrice || 0;
            bValue = b.purchasePrice || 0;
          }
          break;

        case 'quantity':
          if ('boardFeet' in a && 'boardFeet' in b) {
            aValue = a.boardFeet;
            bValue = b.boardFeet;
          } else if ('quantity' in a && 'quantity' in b) {
            aValue = a.quantity;
            bValue = b.quantity;
          }
          break;

        case 'location':
          if ('location' in a && 'location' in b) {
            aValue = (a.location || '').toLowerCase();
            bValue = (b.location || '').toLowerCase();
          }
          break;

        default:
          return 0;
      }

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      // Compare values
      if (aValue < bValue) {
        return sortOptions.order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOptions.order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [items, sortOptions]);
}

