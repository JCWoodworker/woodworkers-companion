/**
 * Persisted state hook
 * Automatically saves state to AsyncStorage
 */

import { useState, useEffect, useCallback } from 'react';
import { saveData, loadData } from '@/src/services/storage';

/**
 * Hook that persists state to AsyncStorage
 * 
 * @param key - AsyncStorage key
 * @param initialValue - Default value if nothing stored
 * @returns [value, setValue, isLoading]
 */
export function usePersistedState<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const stored = await loadData<T>(key);
        if (stored !== null) {
          setState(stored);
        }
      } catch (error) {
        console.error(`Error loading persisted state for ${key}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [key]);

  // Save on state change
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        
        // Save to storage (async, don't wait)
        saveData(key, newValue).catch((error) => {
          console.error(`Error saving persisted state for ${key}:`, error);
        });
        
        return newValue;
      });
    },
    [key]
  );

  return [state, setValue, isLoading];
}

