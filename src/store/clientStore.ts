/**
 * Client (CRM) Store
 * Zustand store with AsyncStorage persistence
 */

import { create } from 'zustand';
import { Client } from '@/src/types/client';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';
import { generateUniqueId } from '@/src/utils';

interface ClientStore {
  clients: Client[];
  isLoading: boolean;

  // Actions
  loadClients: () => Promise<void>;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'tags' | 'photos'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Computed
  getClientById: (id: string) => Client | undefined;
  searchClients: (query: string) => Client[];
}

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  isLoading: true,

  loadClients: async () => {
    try {
      const stored = await loadData<Client[]>(STORAGE_KEYS.CLIENTS);
      if (stored) {
        set({ clients: stored, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading clients:', error);
      set({ isLoading: false });
    }
  },

  addClient: (clientData) => {
    const newClient: Client = {
      ...clientData,
      id: generateUniqueId('client'),
      tags: [],
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => {
      const updated = [...state.clients, newClient];
      saveData(STORAGE_KEYS.CLIENTS, updated);
      return { clients: updated };
    });
  },

  updateClient: (id, updates) => {
    set((state) => {
      const updated = state.clients.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
      );
      saveData(STORAGE_KEYS.CLIENTS, updated);
      return { clients: updated };
    });
  },

  deleteClient: (id) => {
    set((state) => {
      const updated = state.clients.filter((c) => c.id !== id);
      saveData(STORAGE_KEYS.CLIENTS, updated);
      return { clients: updated };
    });
  },

  getClientById: (id) => {
    return get().clients.find((c) => c.id === id);
  },

  searchClients: (query) => {
    const lowerQuery = query.toLowerCase();
    return get().clients.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email?.toLowerCase().includes(lowerQuery) ||
        c.phone?.toLowerCase().includes(lowerQuery)
    );
  },
}));

