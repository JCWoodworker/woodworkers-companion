/**
 * Custom Category type definitions
 */

export type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'select';

export interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[]; // For select type
  unit?: string; // For number type (e.g., "inches", "lbs")
}

export interface CustomCategory {
  id: string;
  name: string;
  icon: string;
  color?: string;
  customFields: CustomField[];
  dateCreated: Date;
}

export interface CustomCategoryItem {
  id: string;
  categoryId: string;
  name: string;
  fieldValues: Record<string, any>; // Dynamic field values
  quantity?: number;
  location?: string;
  notes?: string;
  barcode?: string;
  photos?: string[];
  dateAdded: Date;
  dateModified?: Date;
}

