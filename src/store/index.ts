import { create } from 'zustand';

/**
 * User Preferences Store
 * Manages global app settings and user preferences
 */
interface UserPreferencesState {
  // Unit system preference
  useMetric: boolean;
  setUseMetric: (useMetric: boolean) => void;

  // Precision settings for fraction calculator
  fractionPrecision: 8 | 16 | 32 | 64;
  setFractionPrecision: (precision: 8 | 16 | 32 | 64) => void;

  // Decimal places for display
  decimalPlaces: number;
  setDecimalPlaces: (places: number) => void;
}

export const usePreferencesStore = create<UserPreferencesState>((set) => ({
  useMetric: false,
  setUseMetric: (useMetric) => set({ useMetric }),

  fractionPrecision: 16,
  setFractionPrecision: (precision) => set({ fractionPrecision: precision }),

  decimalPlaces: 2,
  setDecimalPlaces: (places) => set({ decimalPlaces: places }),
}));

/**
 * Calculator History Store
 * Stores recent calculations for quick recall
 */
interface CalculationHistoryItem {
  id: string;
  type: 'board-foot' | 'fraction' | 'pricing';
  timestamp: number;
  inputs: Record<string, any>;
  result: any;
}

interface CalculatorHistoryState {
  history: CalculationHistoryItem[];
  addToHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}

export const useCalculatorHistoryStore = create<CalculatorHistoryState>((set) => ({
  history: [],
  addToHistory: (item) =>
    set((state) => ({
      history: [
        {
          ...item,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
        },
        ...state.history.slice(0, 49), // Keep last 50 items
      ],
    })),
  clearHistory: () => set({ history: [] }),
  removeFromHistory: (id) =>
    set((state) => ({
      history: state.history.filter((item) => item.id !== id),
    })),
}));

