/**
 * Input parsing and validation utilities
 * Eliminates repeated parseFloat/parseInt patterns
 */

/**
 * Safely parse float from string input
 * @param value - String value from input field
 * @param defaultValue - Value to return if parsing fails
 * @returns Parsed number or default value
 */
export const safeParseFloat = (value: string, defaultValue: number = 0): number => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Safely parse integer from string input
 * @param value - String value from input field
 * @param defaultValue - Value to return if parsing fails
 * @returns Parsed integer or default value
 */
export const safeParseInt = (value: string, defaultValue: number = 0): number => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Parse numeric input, return null if invalid
 * Useful when you need to distinguish between 0 and invalid input
 */
export const parseNumericInput = (value: string): number | null => {
  if (!value || value.trim() === '') return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

/**
 * Validate numeric input is within range
 */
export const validateNumberRange = (
  value: number,
  min?: number,
  max?: number
): boolean => {
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
};

/**
 * Format number for input field (handle empty, decimals)
 */
export const formatNumberInput = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return value.toString();
};

/**
 * Generate unique ID for items
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export const generateId = (prefix?: string): string => {
  const id = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}-${id}` : id;
};

/**
 * Generate timestamp-based unique ID
 * More reliable for ensuring uniqueness
 */
export const generateUniqueId = (prefix?: string): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  const id = `${timestamp}-${random}`;
  return prefix ? `${prefix}-${id}` : id;
};

