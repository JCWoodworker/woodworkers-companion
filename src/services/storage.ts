/**
 * AsyncStorage service wrapper
 * Provides type-safe storage for app data
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PROJECTS: '@woodworkers_companion:projects',
  INVENTORY_LUMBER: '@woodworkers_companion:inventory_lumber',
  INVENTORY_TOOLS: '@woodworkers_companion:inventory_tools',
  INVENTORY_CONSUMABLES: '@woodworkers_companion:inventory_consumables',
  INVENTORY_HARDWARE: '@woodworkers_companion:inventory_hardware',
  INVENTORY_CATEGORIES: '@woodworkers_companion:inventory_categories',
  CLIENTS: '@woodworkers_companion:clients',
  QUOTES: '@woodworkers_companion:quotes',
  INVOICES: '@woodworkers_companion:invoices',
  USER_PREFERENCES: '@woodworkers_companion:preferences',
  APP_SETTINGS: '@woodworkers_companion:app_settings',
  BOARD_FOOT_CURRENT_LIST: '@woodworkers_companion:boardfoot_current_list',
  BOARD_FOOT_SAVED_LISTS: '@woodworkers_companion:boardfoot_saved_lists',
} as const;

export { STORAGE_KEYS };

/**
 * Save data to AsyncStorage
 */
export const saveData = async <T>(key: string, data: T): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Load data from AsyncStorage
 */
export const loadData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    if (jsonData === null) return null;
    return JSON.parse(jsonData) as T;
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all app data
 */
export const clearAllData = async (): Promise<void> => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

/**
 * Export all data as JSON
 */
export const exportAllData = async (): Promise<string> => {
  try {
    const allData: Record<string, any> = {};
    const keys = Object.values(STORAGE_KEYS);
    
    for (const key of keys) {
      const data = await loadData(key);
      if (data !== null) {
        allData[key] = data;
      }
    }
    
    return JSON.stringify(allData, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
};

/**
 * Import data from JSON
 */
export const importData = async (jsonData: string): Promise<void> => {
  try {
    const data = JSON.parse(jsonData);
    
    for (const [key, value] of Object.entries(data)) {
      await saveData(key, value);
    }
  } catch (error) {
    console.error('Error importing data:', error);
    throw error;
  }
};

