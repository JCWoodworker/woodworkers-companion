/**
 * Settings Store
 * Manages app-wide settings with persistence
 */

import { create } from 'zustand';
import { AppSettings, ComplexityMode, InventorySettings, DEFAULT_HOBBYIST_SETTINGS, DEFAULT_PROFESSIONAL_SETTINGS } from '@/src/types/settings';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';

const DEFAULT_APP_SETTINGS: AppSettings = {
  complexityMode: 'hobbyist',
  inventory: DEFAULT_HOBBYIST_SETTINGS,
  theme: 'auto',
  hapticFeedback: true,
  hasCompletedOnboarding: false,
};

interface SettingsStore extends AppSettings {
  isLoading: boolean;
  
  // Actions
  loadSettings: () => Promise<void>;
  setComplexityMode: (mode: ComplexityMode) => void;
  updateInventorySettings: (settings: Partial<InventorySettings>) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setHapticFeedback: (enabled: boolean) => void;
  completeOnboarding: () => void;
  resetToDefaults: (mode?: ComplexityMode) => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  ...DEFAULT_APP_SETTINGS,
  isLoading: true,

  loadSettings: async () => {
    try {
      const stored = await loadData<AppSettings>(STORAGE_KEYS.APP_SETTINGS);
      if (stored) {
        set({ ...stored, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      set({ isLoading: false });
    }
  },

  setComplexityMode: (mode) => {
    const newInventorySettings = mode === 'hobbyist' 
      ? DEFAULT_HOBBYIST_SETTINGS 
      : mode === 'professional'
      ? DEFAULT_PROFESSIONAL_SETTINGS
      : get().inventory; // Keep current settings for custom mode

    const newSettings: AppSettings = {
      ...get(),
      complexityMode: mode,
      inventory: newInventorySettings,
      isLoading: false,
    };
    
    delete (newSettings as any).isLoading;
    delete (newSettings as any).loadSettings;
    delete (newSettings as any).setComplexityMode;
    delete (newSettings as any).updateInventorySettings;
    delete (newSettings as any).setTheme;
    delete (newSettings as any).setHapticFeedback;
    delete (newSettings as any).completeOnboarding;
    delete (newSettings as any).resetToDefaults;
    
    saveData(STORAGE_KEYS.APP_SETTINGS, newSettings);
    set({ complexityMode: mode, inventory: newInventorySettings });
  },

  updateInventorySettings: (updates) => {
    const newInventory = { ...get().inventory, ...updates };
    const newSettings: AppSettings = {
      ...get(),
      complexityMode: 'custom', // Switching to custom mode when manually adjusting
      inventory: newInventory,
      isLoading: false,
    };
    
    delete (newSettings as any).isLoading;
    delete (newSettings as any).loadSettings;
    delete (newSettings as any).setComplexityMode;
    delete (newSettings as any).updateInventorySettings;
    delete (newSettings as any).setTheme;
    delete (newSettings as any).setHapticFeedback;
    delete (newSettings as any).completeOnboarding;
    delete (newSettings as any).resetToDefaults;
    
    saveData(STORAGE_KEYS.APP_SETTINGS, newSettings);
    set({ complexityMode: 'custom', inventory: newInventory });
  },

  setTheme: (theme) => {
    const newSettings: AppSettings = { ...get(), theme, isLoading: false };
    delete (newSettings as any).isLoading;
    delete (newSettings as any).loadSettings;
    delete (newSettings as any).setComplexityMode;
    delete (newSettings as any).updateInventorySettings;
    delete (newSettings as any).setTheme;
    delete (newSettings as any).setHapticFeedback;
    delete (newSettings as any).completeOnboarding;
    delete (newSettings as any).resetToDefaults;
    
    saveData(STORAGE_KEYS.APP_SETTINGS, newSettings);
    set({ theme });
  },

  setHapticFeedback: (enabled) => {
    const newSettings: AppSettings = { ...get(), hapticFeedback: enabled, isLoading: false };
    delete (newSettings as any).isLoading;
    delete (newSettings as any).loadSettings;
    delete (newSettings as any).setComplexityMode;
    delete (newSettings as any).updateInventorySettings;
    delete (newSettings as any).setTheme;
    delete (newSettings as any).setHapticFeedback;
    delete (newSettings as any).completeOnboarding;
    delete (newSettings as any).resetToDefaults;
    
    saveData(STORAGE_KEYS.APP_SETTINGS, newSettings);
    set({ hapticFeedback: enabled });
  },

  completeOnboarding: () => {
    const newSettings: AppSettings = { ...get(), hasCompletedOnboarding: true, isLoading: false };
    delete (newSettings as any).isLoading;
    delete (newSettings as any).loadSettings;
    delete (newSettings as any).setComplexityMode;
    delete (newSettings as any).updateInventorySettings;
    delete (newSettings as any).setTheme;
    delete (newSettings as any).setHapticFeedback;
    delete (newSettings as any).completeOnboarding;
    delete (newSettings as any).resetToDefaults;
    
    saveData(STORAGE_KEYS.APP_SETTINGS, newSettings);
    set({ hasCompletedOnboarding: true });
  },

  resetToDefaults: (mode) => {
    const targetMode = mode || get().complexityMode;
    const newSettings: AppSettings = {
      ...DEFAULT_APP_SETTINGS,
      complexityMode: targetMode,
      inventory: targetMode === 'hobbyist' ? DEFAULT_HOBBYIST_SETTINGS : DEFAULT_PROFESSIONAL_SETTINGS,
      hasCompletedOnboarding: get().hasCompletedOnboarding,
    };
    
    saveData(STORAGE_KEYS.APP_SETTINGS, newSettings);
    set(newSettings);
  },
}));

