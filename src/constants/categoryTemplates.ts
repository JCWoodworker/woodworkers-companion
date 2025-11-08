/**
 * Pre-defined category templates for custom categories
 */

import { CustomCategory, CustomField } from '@/src/types/customCategory';

export interface CategoryTemplate {
  name: string;
  icon: string;
  color?: string;
  suggestedFields: Omit<CustomField, 'id'>[];
}

export const CATEGORY_TEMPLATES: CategoryTemplate[] = [
  {
    name: 'Finishes',
    icon: 'water',
    color: '#8B4513',
    suggestedFields: [
      { name: 'Type', type: 'select', required: true, options: ['Oil', 'Polyurethane', 'Lacquer', 'Shellac', 'Wax', 'Water-based'] },
      { name: 'Brand', type: 'text', required: false },
      { name: 'Sheen', type: 'select', required: false, options: ['Gloss', 'Semi-gloss', 'Satin', 'Matte'] },
      { name: 'Volume', type: 'number', required: true, unit: 'oz' },
      { name: 'Opened', type: 'boolean', required: false },
    ],
  },
  {
    name: 'Sandpaper',
    icon: 'texture-box',
    color: '#D2691E',
    suggestedFields: [
      { name: 'Grit', type: 'number', required: true },
      { name: 'Type', type: 'select', required: false, options: ['Sheet', 'Roll', 'Disc', 'Belt'] },
      { name: 'Size', type: 'text', required: false },
      { name: 'Quantity', type: 'number', required: true, unit: 'sheets' },
    ],
  },
  {
    name: 'Adhesives',
    icon: 'water-outline',
    color: '#FFD700',
    suggestedFields: [
      { name: 'Type', type: 'select', required: true, options: ['PVA', 'Polyurethane', 'Epoxy', 'CA (Super Glue)', 'Hide Glue'] },
      { name: 'Brand', type: 'text', required: false },
      { name: 'Volume', type: 'number', required: true, unit: 'oz' },
      { name: 'Open Time', type: 'text', required: false },
    ],
  },
  {
    name: 'Fasteners',
    icon: 'nail',
    color: '#708090',
    suggestedFields: [
      { name: 'Type', type: 'select', required: true, options: ['Nails', 'Screws', 'Staples', 'Brads'] },
      { name: 'Size', type: 'text', required: true },
      { name: 'Material', type: 'select', required: false, options: ['Steel', 'Stainless', 'Brass', 'Aluminum'] },
      { name: 'Quantity', type: 'number', required: true, unit: 'pcs' },
    ],
  },
  {
    name: 'Abrasives',
    icon: 'shimmer',
    color: '#A0522D',
    suggestedFields: [
      { name: 'Type', type: 'select', required: true, options: ['Sandpaper', 'Steel Wool', 'Buffing Compound', 'Grinding Wheel'] },
      { name: 'Grit/Grade', type: 'text', required: true },
      { name: 'Quantity', type: 'number', required: true },
      { name: 'Unit', type: 'text', required: true },
    ],
  },
  {
    name: 'Safety Equipment',
    icon: 'safety-goggles',
    color: '#FF6347',
    suggestedFields: [
      { name: 'Type', type: 'select', required: true, options: ['Safety Glasses', 'Hearing Protection', 'Dust Mask', 'Respirator', 'Gloves'] },
      { name: 'Size', type: 'text', required: false },
      { name: 'Quantity', type: 'number', required: true },
      { name: 'Expiration Date', type: 'date', required: false },
    ],
  },
  {
    name: 'Veneers',
    icon: 'layers',
    color: '#DEB887',
    suggestedFields: [
      { name: 'Species', type: 'text', required: true },
      { name: 'Thickness', type: 'number', required: false, unit: 'inch' },
      { name: 'Sheet Size', type: 'text', required: false },
      { name: 'Sheets', type: 'number', required: true },
      { name: 'Square Feet', type: 'number', required: false },
    ],
  },
  {
    name: 'Edge Banding',
    icon: 'tape-measure',
    color: '#CD853F',
    suggestedFields: [
      { name: 'Species/Color', type: 'text', required: true },
      { name: 'Width', type: 'number', required: true, unit: 'inch' },
      { name: 'Thickness', type: 'number', required: false, unit: 'mil' },
      { name: 'Length', type: 'number', required: true, unit: 'ft' },
      { name: 'Pre-glued', type: 'boolean', required: false },
    ],
  },
];

// Helper to create a custom category from a template
export function createCategoryFromTemplate(
  template: CategoryTemplate,
  generateId: () => string
): CustomCategory {
  return {
    id: generateId(),
    name: template.name,
    icon: template.icon,
    color: template.color,
    customFields: template.suggestedFields.map(field => ({
      ...field,
      id: generateId(),
    })),
    dateCreated: new Date(),
  };
}

