/**
 * Form input hooks
 * Simplifies form state management and reduces repetition
 */

import { useState, useCallback } from 'react';

/**
 * Hook for text input fields
 * Returns [value, setValue, reset]
 */
export const useTextInput = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  
  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue, reset] as const;
};

/**
 * Hook for number input fields
 * Handles string ↔ number conversion
 */
export const useNumberInput = (
  initialValue: string = '',
  min?: number,
  max?: number
) => {
  const [value, setValue] = useState(initialValue);
  
  const setNumber = useCallback((newValue: string) => {
    // Allow empty string
    if (newValue === '') {
      setValue('');
      return;
    }

    // Only set if it's a valid number
    const num = parseFloat(newValue);
    if (!isNaN(num)) {
      // Apply min/max constraints if provided
      if (min !== undefined && num < min) return;
      if (max !== undefined && num > max) return;
      setValue(newValue);
    }
  }, [min, max]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setNumber, reset] as const;
};

/**
 * Hook for managing multiple form fields as an object
 * Reduces boilerplate for forms with many fields
 */
export function useFormState<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [key]: value }));
  }, []);

  const setMultipleValues = useCallback((updates: Partial<T>) => {
    setValues(prev => ({ ...prev, ...updates }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const resetField = useCallback(<K extends keyof T>(key: K) => {
    setValues(prev => ({ ...prev, [key]: initialValues[key] }));
  }, [initialValues]);

  return {
    values,
    setValue,
    setMultipleValues,
    reset,
    resetField,
  };
}

/**
 * Hook for toggle/boolean state
 */
export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse, setValue] as const;
};

/**
 * Hook for array state with common operations
 * Useful for managing lists (parts, tasks, etc.)
 */
export function useArrayState<T>(initialValue: T[] = []) {
  const [items, setItems] = useState<T[]>(initialValue);

  const add = useCallback((item: T) => {
    setItems(prev => [...prev, item]);
  }, []);

  const remove = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removeById = useCallback((id: any) => {
    setItems(prev => prev.filter((item: any) => item.id !== id));
  }, []);

  const update = useCallback((index: number, updatedItem: T) => {
    setItems(prev => prev.map((item, i) => i === index ? updatedItem : item));
  }, []);

  const updateById = useCallback((id: any, updates: Partial<T>) => {
    setItems(prev => prev.map((item: any) => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const reset = useCallback(() => {
    setItems(initialValue);
  }, [initialValue]);

  return {
    items,
    setItems,
    add,
    remove,
    removeById,
    update,
    updateById,
    clear,
    reset,
  };
}

