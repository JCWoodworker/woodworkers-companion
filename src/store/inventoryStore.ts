/**
 * Inventory Management Store
 * Zustand store with AsyncStorage persistence
 */

import { create } from 'zustand';
import { LumberEntry, Tool, Consumable, Hardware, UsageRecord } from '@/src/types/inventory';
import { CustomCategory, CustomCategoryItem } from '@/src/types/customCategory';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';
import { generateUniqueId } from '@/src/utils';

interface InventoryStore {
  lumber: LumberEntry[];
  tools: Tool[];
  consumables: Consumable[];
  hardware: Hardware[];
  customCategories: CustomCategory[];
  customItems: CustomCategoryItem[];
  isLoading: boolean;

  // Load all inventory data
  loadInventory: () => Promise<void>;

  // Lumber actions
  addLumber: (entry: Omit<LumberEntry, 'id' | 'dateAdded' | 'totalCost'>) => void;
  removeLumber: (id: string) => void;
  updateLumber: (id: string, updates: Partial<LumberEntry>) => void;
  useLumber: (id: string, quantity: number, projectId?: string, projectName?: string) => void;

  // Tool actions
  addTool: (tool: Omit<Tool, 'id' | 'dateAdded'>) => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<Tool>) => void;
  recordMaintenance: (id: string, notes?: string) => void;

  // Consumable actions
  addConsumable: (consumable: Omit<Consumable, 'id' | 'dateAdded' | 'totalCost'>) => void;
  removeConsumable: (id: string) => void;
  updateConsumable: (id: string, updates: Partial<Consumable>) => void;
  useConsumable: (id: string, quantity: number, projectId?: string, projectName?: string) => void;

  // Hardware actions
  addHardware: (hardware: Omit<Hardware, 'id' | 'dateAdded' | 'totalCost'>) => void;
  removeHardware: (id: string) => void;
  updateHardware: (id: string, updates: Partial<Hardware>) => void;
  useHardware: (id: string, quantity: number, projectId?: string, projectName?: string) => void;

  // Custom category actions
  addCustomCategory: (category: Omit<CustomCategory, 'id' | 'dateCreated'>) => void;
  removeCustomCategory: (id: string) => void;
  updateCustomCategory: (id: string, updates: Partial<CustomCategory>) => void;

  // Custom item actions
  addCustomItem: (item: Omit<CustomCategoryItem, 'id' | 'dateAdded'>) => void;
  removeCustomItem: (id: string) => void;
  updateCustomItem: (id: string, updates: Partial<CustomCategoryItem>) => void;

  // Computed values
  getTotalBoardFeet: () => number;
  getTotalLumberValue: () => number;
  getTotalInventoryValue: () => number;
  getLowStockConsumables: () => Consumable[];
  getLowStockHardware: () => Hardware[];
  getToolsNeedingMaintenance: () => Tool[];
  
  // Search and filter helpers
  searchAll: (query: string) => {
    lumber: LumberEntry[];
    tools: Tool[];
    consumables: Consumable[];
    hardware: Hardware[];
    customItems: CustomCategoryItem[];
  };
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  lumber: [],
  tools: [],
  consumables: [],
  hardware: [],
  customCategories: [],
  customItems: [],
  isLoading: true,

  loadInventory: async () => {
    try {
      const [storedLumber, storedTools, storedConsumables, storedHardware, storedCategories, storedCustomItems] = await Promise.all([
        loadData<LumberEntry[]>(STORAGE_KEYS.INVENTORY_LUMBER),
        loadData<Tool[]>(STORAGE_KEYS.INVENTORY_TOOLS),
        loadData<Consumable[]>(STORAGE_KEYS.INVENTORY_CONSUMABLES),
        loadData<Hardware[]>(STORAGE_KEYS.INVENTORY_HARDWARE),
        loadData<CustomCategory[]>(STORAGE_KEYS.INVENTORY_CATEGORIES),
        loadData<CustomCategoryItem[]>(STORAGE_KEYS.INVENTORY_CATEGORIES + '_items'),
      ]);

      set({
        lumber: storedLumber || [],
        tools: storedTools || [],
        consumables: storedConsumables || [],
        hardware: storedHardware || [],
        customCategories: storedCategories || [],
        customItems: storedCustomItems || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading inventory:', error);
      set({ isLoading: false });
    }
  },

  // Lumber actions
  addLumber: (entryData) => {
    const newEntry: LumberEntry = {
      ...entryData,
      id: generateUniqueId('lumber'),
      totalCost: entryData.boardFeet * entryData.costPerBF,
      dateAdded: new Date(),
      usageHistory: [],
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
          const updatedEntry = { ...l, ...updates, dateModified: new Date() };
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

  useLumber: (id, quantity, projectId, projectName) => {
    set((state) => {
      const updated = state.lumber.map((l) => {
        if (l.id === id) {
          const usageRecord: UsageRecord = {
            id: generateUniqueId('usage'),
            date: new Date(),
            quantity,
            projectId,
            projectName,
          };
          
          return {
            ...l,
            boardFeet: Math.max(0, l.boardFeet - quantity),
            usageHistory: [...(l.usageHistory || []), usageRecord],
            dateModified: new Date(),
          };
        }
        return l;
      });
      saveData(STORAGE_KEYS.INVENTORY_LUMBER, updated);
      return { lumber: updated };
    });
  },

  // Tool actions
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
        t.id === id ? { ...t, ...updates, dateModified: new Date() } : t
      );
      saveData(STORAGE_KEYS.INVENTORY_TOOLS, updated);
      return { tools: updated };
    });
  },

  recordMaintenance: (id, notes) => {
    set((state) => {
      const updated = state.tools.map((t) => {
        if (t.id === id) {
          const today = new Date();
          const nextMaintenance = t.maintenanceInterval
            ? new Date(today.getTime() + t.maintenanceInterval * 24 * 60 * 60 * 1000)
            : undefined;
          
          return {
            ...t,
            lastMaintenance: today,
            nextMaintenance,
            maintenanceNotes: notes || t.maintenanceNotes,
            dateModified: today,
          };
        }
        return t;
      });
      saveData(STORAGE_KEYS.INVENTORY_TOOLS, updated);
      return { tools: updated };
    });
  },

  // Consumable actions
  addConsumable: (consumableData) => {
    const newConsumable: Consumable = {
      ...consumableData,
      id: generateUniqueId('consumable'),
      totalCost: consumableData.costPerUnit && consumableData.quantity 
        ? consumableData.costPerUnit * consumableData.quantity 
        : undefined,
      dateAdded: new Date(),
      usageHistory: [],
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
      const updated = state.consumables.map((c) => {
        if (c.id === id) {
          const updatedItem = { ...c, ...updates, dateModified: new Date() };
          if (updates.quantity !== undefined || updates.costPerUnit !== undefined) {
            updatedItem.totalCost = updatedItem.costPerUnit && updatedItem.quantity
              ? updatedItem.costPerUnit * updatedItem.quantity
              : undefined;
          }
          return updatedItem;
        }
        return c;
      });
      saveData(STORAGE_KEYS.INVENTORY_CONSUMABLES, updated);
      return { consumables: updated };
    });
  },

  useConsumable: (id, quantity, projectId, projectName) => {
    set((state) => {
      const updated = state.consumables.map((c) => {
        if (c.id === id) {
          const usageRecord: UsageRecord = {
            id: generateUniqueId('usage'),
            date: new Date(),
            quantity,
            projectId,
            projectName,
          };
          
          return {
            ...c,
            quantity: Math.max(0, c.quantity - quantity),
            usageHistory: [...(c.usageHistory || []), usageRecord],
            dateModified: new Date(),
          };
        }
        return c;
      });
      saveData(STORAGE_KEYS.INVENTORY_CONSUMABLES, updated);
      return { consumables: updated };
    });
  },

  // Hardware actions
  addHardware: (hardwareData) => {
    const newHardware: Hardware = {
      ...hardwareData,
      id: generateUniqueId('hardware'),
      totalCost: hardwareData.costPerUnit && hardwareData.quantity
        ? hardwareData.costPerUnit * hardwareData.quantity
        : undefined,
      dateAdded: new Date(),
      usageHistory: [],
    };

    set((state) => {
      const updated = [...state.hardware, newHardware];
      saveData(STORAGE_KEYS.INVENTORY_HARDWARE, updated);
      return { hardware: updated };
    });
  },

  removeHardware: (id) => {
    set((state) => {
      const updated = state.hardware.filter((h) => h.id !== id);
      saveData(STORAGE_KEYS.INVENTORY_HARDWARE, updated);
      return { hardware: updated };
    });
  },

  updateHardware: (id, updates) => {
    set((state) => {
      const updated = state.hardware.map((h) => {
        if (h.id === id) {
          const updatedItem = { ...h, ...updates, dateModified: new Date() };
          if (updates.quantity !== undefined || updates.costPerUnit !== undefined) {
            updatedItem.totalCost = updatedItem.costPerUnit && updatedItem.quantity
              ? updatedItem.costPerUnit * updatedItem.quantity
              : undefined;
          }
          return updatedItem;
        }
        return h;
      });
      saveData(STORAGE_KEYS.INVENTORY_HARDWARE, updated);
      return { hardware: updated };
    });
  },

  useHardware: (id, quantity, projectId, projectName) => {
    set((state) => {
      const updated = state.hardware.map((h) => {
        if (h.id === id) {
          const usageRecord: UsageRecord = {
            id: generateUniqueId('usage'),
            date: new Date(),
            quantity,
            projectId,
            projectName,
          };
          
          return {
            ...h,
            quantity: Math.max(0, h.quantity - quantity),
            usageHistory: [...(h.usageHistory || []), usageRecord],
            dateModified: new Date(),
          };
        }
        return h;
      });
      saveData(STORAGE_KEYS.INVENTORY_HARDWARE, updated);
      return { hardware: updated };
    });
  },

  // Custom category actions
  addCustomCategory: (categoryData) => {
    const newCategory: CustomCategory = {
      ...categoryData,
      id: generateUniqueId('category'),
      dateCreated: new Date(),
    };

    set((state) => {
      const updated = [...state.customCategories, newCategory];
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES, updated);
      return { customCategories: updated };
    });
  },

  removeCustomCategory: (id) => {
    set((state) => {
      const updatedCategories = state.customCategories.filter((c) => c.id !== id);
      const updatedItems = state.customItems.filter((i) => i.categoryId !== id);
      
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES, updatedCategories);
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES + '_items', updatedItems);
      
      return { customCategories: updatedCategories, customItems: updatedItems };
    });
  },

  updateCustomCategory: (id, updates) => {
    set((state) => {
      const updated = state.customCategories.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      );
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES, updated);
      return { customCategories: updated };
    });
  },

  // Custom item actions
  addCustomItem: (itemData) => {
    const newItem: CustomCategoryItem = {
      ...itemData,
      id: generateUniqueId('customitem'),
      dateAdded: new Date(),
    };

    set((state) => {
      const updated = [...state.customItems, newItem];
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES + '_items', updated);
      return { customItems: updated };
    });
  },

  removeCustomItem: (id) => {
    set((state) => {
      const updated = state.customItems.filter((i) => i.id !== id);
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES + '_items', updated);
      return { customItems: updated };
    });
  },

  updateCustomItem: (id, updates) => {
    set((state) => {
      const updated = state.customItems.map((i) =>
        i.id === id ? { ...i, ...updates, dateModified: new Date() } : i
      );
      saveData(STORAGE_KEYS.INVENTORY_CATEGORIES + '_items', updated);
      return { customItems: updated };
    });
  },

  // Computed values
  getTotalBoardFeet: () => {
    return get().lumber.reduce((sum, entry) => sum + entry.boardFeet, 0);
  },

  getTotalLumberValue: () => {
    return get().lumber.reduce((sum, entry) => sum + entry.totalCost, 0);
  },

  getTotalInventoryValue: () => {
    const lumberValue = get().lumber.reduce((sum, l) => sum + l.totalCost, 0);
    const consumableValue = get().consumables.reduce((sum, c) => sum + (c.totalCost || 0), 0);
    const hardwareValue = get().hardware.reduce((sum, h) => sum + (h.totalCost || 0), 0);
    const toolValue = get().tools.reduce((sum, t) => sum + (t.purchasePrice || 0), 0);
    return lumberValue + consumableValue + hardwareValue + toolValue;
  },

  getLowStockConsumables: () => {
    return get().consumables.filter(
      (c) => c.reorderLevel !== undefined && c.quantity <= c.reorderLevel
    );
  },

  getLowStockHardware: () => {
    return get().hardware.filter(
      (h) => h.reorderLevel !== undefined && h.quantity <= h.reorderLevel
    );
  },

  getToolsNeedingMaintenance: () => {
    const today = new Date();
    return get().tools.filter((t) => {
      if (!t.nextMaintenance) return false;
      return new Date(t.nextMaintenance) <= today;
    });
  },

  searchAll: (query) => {
    const lowerQuery = query.toLowerCase();
    
    return {
      lumber: get().lumber.filter((l) =>
        l.species.toLowerCase().includes(lowerQuery) ||
        l.location?.toLowerCase().includes(lowerQuery) ||
        l.notes?.toLowerCase().includes(lowerQuery)
      ),
      tools: get().tools.filter((t) =>
        t.name.toLowerCase().includes(lowerQuery) ||
        t.brand?.toLowerCase().includes(lowerQuery) ||
        t.category?.toLowerCase().includes(lowerQuery) ||
        t.location?.toLowerCase().includes(lowerQuery)
      ),
      consumables: get().consumables.filter((c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.category?.toLowerCase().includes(lowerQuery) ||
        c.location?.toLowerCase().includes(lowerQuery)
      ),
      hardware: get().hardware.filter((h) =>
        h.name.toLowerCase().includes(lowerQuery) ||
        h.category?.toLowerCase().includes(lowerQuery) ||
        h.size?.toLowerCase().includes(lowerQuery) ||
        h.location?.toLowerCase().includes(lowerQuery)
      ),
      customItems: get().customItems.filter((i) =>
        i.name.toLowerCase().includes(lowerQuery) ||
        i.location?.toLowerCase().includes(lowerQuery)
      ),
    };
  },
}));
