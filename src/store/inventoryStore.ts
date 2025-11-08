/**
 * Inventory Management Store
 * Zustand store with AsyncStorage persistence
 */

import { create } from 'zustand';
import { LumberEntry, Tool, Consumable } from '@/src/types/inventory';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';
import { generateUniqueId } from '@/src/utils';

interface InventoryStore {
  lumber: LumberEntry[];
  tools: Tool[];
  consumables: Consumable[];
  isLoading: boolean;

  // Lumber actions
  loadInventory: () => Promise<void>;
  addLumber: (entry: Omit<LumberEntry, 'id' | 'dateAdded' | 'totalCost'>) => void;
  removeLumber: (id: string) => void;
  updateLumber: (id: string, updates: Partial<LumberEntry>) => void;

  // Tool actions
  addTool: (tool: Omit<Tool, 'id' | 'dateAdded'>) => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<Tool>) => void;

  // Consumable actions
  addConsumable: (consumable: Omit<Consumable, 'id' | 'dateAdded'>) => void;
  removeConsumable: (id: string) => void;
  updateConsumable: (id: string, updates: Partial<Consumable>) => void;

  // Computed
  getTotalBoardFeet: () => number;
  getTotalLumberValue: () => number;
  getLowStockConsumables: () => Consumable[];
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  lumber: [],
  tools: [],
  consumables: [],
  isLoading: true,

  loadInventory: async () => {
    try {
      const [storedLumber, storedTools, storedConsumables] = await Promise.all([
        loadData<LumberEntry[]>(STORAGE_KEYS.INVENTORY_LUMBER),
        loadData<Tool[]>(STORAGE_KEYS.INVENTORY_TOOLS),
        loadData<Consumable[]>(STORAGE_KEYS.INVENTORY_CONSUMABLES),
      ]);

      set({
        lumber: storedLumber || [],
        tools: storedTools || [],
        consumables: storedConsumables || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading inventory:', error);
      set({ isLoading: false });
    }
  },

  addLumber: (entryData) => {
    const newEntry: LumberEntry = {
      ...entryData,
      id: generateUniqueId('lumber'),
      totalCost: entryData.boardFeet * entryData.costPerBF,
      dateAdded: new Date(),
    };

    set((state) => {
      const updated = [...state.lumber, newEntry];
      saveData(STORAGE_KEYS.INVENTORY_LUMBER, updated);
      return { lumber: updated };
    });
  },

  removeLumber: (id) => {
    set((state) => {
      const updated = state.lumber.filter((l) => l.id !== id);
      saveData(STORAGE_KEYS.INVENTORY_LUMBER, updated);
      return { lumber: updated };
    });
  },

  updateLumber: (id, updates) => {
    set((state) => {
      const updated = state.lumber.map((l) => {
        if (l.id === id) {
          const updatedEntry = { ...l, ...updates };
          // Recalculate total cost if BF or cost/BF changed
          if (updates.boardFeet !== undefined || updates.costPerBF !== undefined) {
            updatedEntry.totalCost = updatedEntry.boardFeet * updatedEntry.costPerBF;
          }
          return updatedEntry;
        }
        return l;
      });
      saveData(STORAGE_KEYS.INVENTORY_LUMBER, updated);
      return { lumber: updated };
    });
  },

  addTool: (toolData) => {
    const newTool: Tool = {
      ...toolData,
      id: generateUniqueId('tool'),
      dateAdded: new Date(),
    };

    set((state) => {
      const updated = [...state.tools, newTool];
      saveData(STORAGE_KEYS.INVENTORY_TOOLS, updated);
      return { tools: updated };
    });
  },

  removeTool: (id) => {
    set((state) => {
      const updated = state.tools.filter((t) => t.id !== id);
      saveData(STORAGE_KEYS.INVENTORY_TOOLS, updated);
      return { tools: updated };
    });
  },

  updateTool: (id, updates) => {
    set((state) => {
      const updated = state.tools.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      saveData(STORAGE_KEYS.INVENTORY_TOOLS, updated);
      return { tools: updated };
    });
  },

  addConsumable: (consumableData) => {
    const newConsumable: Consumable = {
      ...consumableData,
      id: generateUniqueId('consumable'),
      dateAdded: new Date(),
    };

    set((state) => {
      const updated = [...state.consumables, newConsumable];
      saveData(STORAGE_KEYS.INVENTORY_CONSUMABLES, updated);
      return { consumables: updated };
    });
  },

  removeConsumable: (id) => {
    set((state) => {
      const updated = state.consumables.filter((c) => c.id !== id);
      saveData(STORAGE_KEYS.INVENTORY_CONSUMABLES, updated);
      return { consumables: updated };
    });
  },

  updateConsumable: (id, updates) => {
    set((state) => {
      const updated = state.consumables.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      );
      saveData(STORAGE_KEYS.INVENTORY_CONSUMABLES, updated);
      return { consumables: updated };
    });
  },

  getTotalBoardFeet: () => {
    return get().lumber.reduce((sum, entry) => sum + entry.boardFeet, 0);
  },

  getTotalLumberValue: () => {
    return get().lumber.reduce((sum, entry) => sum + entry.totalCost, 0);
  },

  getLowStockConsumables: () => {
    return get().consumables.filter(
      (c) => c.reorderLevel !== undefined && c.quantity <= c.reorderLevel
    );
  },
}));

