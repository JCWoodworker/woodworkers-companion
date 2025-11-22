/**
 * Board Foot List Store
 * Manages current board list and saved board lists (history)
 */

import { create } from 'zustand';
import { BoardEntry, BoardList } from '@/src/types/boardFootList';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';
import { generateUniqueId } from '@/src/utils';

interface BoardFootStore {
  // Current list (in-progress)
  currentList: BoardEntry[];
  
  // Saved lists (history)
  savedLists: BoardList[];
  
  isLoading: boolean;

  // Load data
  loadBoardLists: () => Promise<void>;

  // Current list actions
  addBoardToCurrentList: (board: Omit<BoardEntry, 'id' | 'dateAdded'>) => void;
  removeBoardFromCurrentList: (id: string) => void;
  updateBoardInCurrentList: (id: string, updates: Partial<BoardEntry>) => void;
  clearCurrentList: () => void;
  getCurrentListTotal: () => { boardFeet: number; cost: number };

  // Saved lists actions
  saveCurrentListToHistory: (listData: Omit<BoardList, 'id' | 'boards' | 'totalBoardFeet' | 'totalCost' | 'dateCreated'>) => BoardList | null;
  deleteSavedList: (id: string) => void;
  updateSavedList: (id: string, updates: Partial<BoardList>) => void;
  duplicateSavedList: (id: string) => BoardList | null;
  
  // Query helpers
  getSavedListById: (id: string) => BoardList | undefined;
  getListsByClient: (clientId: string) => BoardList[];
  getListsByStatus: (status: BoardList['status']) => BoardList[];
}

export const useBoardFootStore = create<BoardFootStore>((set, get) => ({
  currentList: [],
  savedLists: [],
  isLoading: true,

  loadBoardLists: async () => {
    try {
      const [storedCurrentList, storedSavedLists] = await Promise.all([
        loadData<BoardEntry[]>(STORAGE_KEYS.BOARD_FOOT_CURRENT_LIST),
        loadData<BoardList[]>(STORAGE_KEYS.BOARD_FOOT_SAVED_LISTS),
      ]);

      set({
        currentList: storedCurrentList || [],
        savedLists: storedSavedLists || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading board lists:', error);
      set({ isLoading: false });
    }
  },

  addBoardToCurrentList: (boardData) => {
    const newBoard: BoardEntry = {
      ...boardData,
      id: generateUniqueId('board'),
      dateAdded: new Date(),
    };

    set((state) => {
      const updated = [...state.currentList, newBoard];
      saveData(STORAGE_KEYS.BOARD_FOOT_CURRENT_LIST, updated);
      return { currentList: updated };
    });
  },

  removeBoardFromCurrentList: (id) => {
    set((state) => {
      const updated = state.currentList.filter((b) => b.id !== id);
      saveData(STORAGE_KEYS.BOARD_FOOT_CURRENT_LIST, updated);
      return { currentList: updated };
    });
  },

  updateBoardInCurrentList: (id, updates) => {
    set((state) => {
      const updated = state.currentList.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      );
      saveData(STORAGE_KEYS.BOARD_FOOT_CURRENT_LIST, updated);
      return { currentList: updated };
    });
  },

  clearCurrentList: () => {
    set({ currentList: [] });
    saveData(STORAGE_KEYS.BOARD_FOOT_CURRENT_LIST, []);
  },

  getCurrentListTotal: () => {
    const { currentList } = get();
    const totalBoardFeet = currentList.reduce((sum, b) => sum + b.boardFeet, 0);
    const totalCost = currentList.reduce((sum, b) => sum + (b.totalCost || 0), 0);
    return { boardFeet: totalBoardFeet, cost: totalCost };
  },

  saveCurrentListToHistory: (listData) => {
    const { currentList } = get();
    
    if (currentList.length === 0) {
      return null;
    }

    const { boardFeet, cost } = get().getCurrentListTotal();

    const newList: BoardList = {
      ...listData,
      id: generateUniqueId('boardlist'),
      boards: currentList,
      totalBoardFeet: boardFeet,
      totalCost: cost,
      dateCreated: new Date(),
    };

    set((state) => {
      const updated = [...state.savedLists, newList];
      saveData(STORAGE_KEYS.BOARD_FOOT_SAVED_LISTS, updated);
      return { savedLists: updated, currentList: [] };
    });

    // Clear current list after saving
    saveData(STORAGE_KEYS.BOARD_FOOT_CURRENT_LIST, []);

    return newList;
  },

  deleteSavedList: (id) => {
    set((state) => {
      const updated = state.savedLists.filter((l) => l.id !== id);
      saveData(STORAGE_KEYS.BOARD_FOOT_SAVED_LISTS, updated);
      return { savedLists: updated };
    });
  },

  updateSavedList: (id, updates) => {
    set((state) => {
      const updated = state.savedLists.map((l) => {
        if (l.id === id) {
          const updatedList = { ...l, ...updates, dateModified: new Date() };
          
          // Recalculate totals if boards changed
          if (updates.boards) {
            updatedList.totalBoardFeet = updates.boards.reduce((sum, b) => sum + b.boardFeet, 0);
            updatedList.totalCost = updates.boards.reduce((sum, b) => sum + (b.totalCost || 0), 0);
          }
          
          return updatedList;
        }
        return l;
      });
      saveData(STORAGE_KEYS.BOARD_FOOT_SAVED_LISTS, updated);
      return { savedLists: updated };
    });
  },

  duplicateSavedList: (id) => {
    const original = get().savedLists.find((l) => l.id === id);
    if (!original) return null;

    const duplicate: BoardList = {
      ...original,
      id: generateUniqueId('boardlist'),
      name: `${original.name} (Copy)`,
      boards: original.boards.map((b) => ({
        ...b,
        id: generateUniqueId('board'),
        dateAdded: new Date(),
      })),
      dateCreated: new Date(),
      dateModified: undefined,
    };

    set((state) => {
      const updated = [...state.savedLists, duplicate];
      saveData(STORAGE_KEYS.BOARD_FOOT_SAVED_LISTS, updated);
      return { savedLists: updated };
    });

    return duplicate;
  },

  getSavedListById: (id) => {
    return get().savedLists.find((l) => l.id === id);
  },

  getListsByClient: (clientId) => {
    return get().savedLists.filter((l) => l.clientId === clientId);
  },

  getListsByStatus: (status) => {
    return get().savedLists.filter((l) => l.status === status);
  },
}));

