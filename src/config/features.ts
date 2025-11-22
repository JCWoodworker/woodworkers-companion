/**
 * Feature Flags Configuration
 * Controls availability of app features for release management and monetization
 */

export type FeatureId = 
  // Calculators
  | 'calculator_board_foot'
  | 'calculator_fraction'
  | 'calculator_pricing'
  | 'calculator_cut_list'
  | 'calculator_wood_movement'
  | 'calculator_finish_mixing'
  // Main Modules
  | 'module_projects'
  | 'module_inventory'
  | 'module_clients'
  | 'module_documents';

// Feature configuration object
export const FEATURES: Record<FeatureId, boolean> = {
  // Calculators - Only Board Foot enabled for initial release
  calculator_board_foot: true,
  calculator_fraction: true,
  calculator_pricing: true,
  calculator_cut_list: false,
  calculator_wood_movement: false,
  calculator_finish_mixing: false,

  // Main Modules - Disabled for initial release
  module_projects: false,
  module_inventory: false,
  module_clients: false,
  module_documents: false,
};

export const isFeatureEnabled = (featureId: FeatureId): boolean => {
  return FEATURES[featureId] ?? false;
};

