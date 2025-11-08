/**
 * Custom hooks
 */

// Re-export existing hooks for convenience
export { useColorScheme } from '@/hooks/use-color-scheme';

// App-specific hooks
export { useCalculatorScreen } from './useCalculatorScreen';

// Form input hooks
export { 
  useTextInput, 
  useNumberInput, 
  useFormState, 
  useToggle,
  useArrayState 
} from './useFormInput';

// Persisted state hook
export { usePersistedState } from './usePersistedState';

