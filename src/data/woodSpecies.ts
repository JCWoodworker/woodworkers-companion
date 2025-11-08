/**
 * Wood species database with dimensional change coefficients
 * Data sourced from USDA Forest Products Laboratory Wood Handbook
 */

import { WoodSpecies } from '@/src/types/woodSpecies';

export const WOOD_SPECIES_DATABASE: WoodSpecies[] = [
  // HARDWOODS - NORTH AMERICAN
  {
    id: 'red-oak',
    name: 'Red Oak',
    scientificName: 'Quercus rubra',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00369, // Tangential
      quartersawn: 0.00177, // Radial
    },
    jankaHardness: 1290,
    commonUses: ['Furniture', 'Flooring', 'Cabinetry'],
  },
  {
    id: 'white-oak',
    name: 'White Oak',
    scientificName: 'Quercus alba',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00365,
      quartersawn: 0.00179,
    },
    jankaHardness: 1360,
    commonUses: ['Furniture', 'Barrels', 'Flooring'],
  },
  {
    id: 'hard-maple',
    name: 'Hard Maple (Sugar Maple)',
    scientificName: 'Acer saccharum',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00311,
      quartersawn: 0.00156,
    },
    jankaHardness: 1450,
    commonUses: ['Flooring', 'Cutting boards', 'Furniture'],
  },
  {
    id: 'soft-maple',
    name: 'Soft Maple',
    scientificName: 'Acer rubrum',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00284,
      quartersawn: 0.00130,
    },
    jankaHardness: 950,
    commonUses: ['Furniture', 'Cabinetry', 'Turned items'],
  },
  {
    id: 'black-walnut',
    name: 'Black Walnut',
    scientificName: 'Juglans nigra',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00305,
      quartersawn: 0.00177,
    },
    jankaHardness: 1010,
    commonUses: ['Fine furniture', 'Gunstocks', 'Veneers'],
  },
  {
    id: 'black-cherry',
    name: 'Black Cherry',
    scientificName: 'Prunus serotina',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00306,
      quartersawn: 0.00134,
    },
    jankaHardness: 995,
    commonUses: ['Furniture', 'Cabinetry', 'Musical instruments'],
  },
  {
    id: 'ash',
    name: 'White Ash',
    scientificName: 'Fraxinus americana',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00312,
      quartersawn: 0.00161,
    },
    jankaHardness: 1320,
    commonUses: ['Tool handles', 'Baseball bats', 'Furniture'],
  },
  {
    id: 'hickory',
    name: 'Hickory',
    scientificName: 'Carya spp.',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00361,
      quartersawn: 0.00238,
    },
    jankaHardness: 1820,
    commonUses: ['Tool handles', 'Flooring', 'Drumsticks'],
  },
  {
    id: 'poplar',
    name: 'Yellow Poplar',
    scientificName: 'Liriodendron tulipifera',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00347,
      quartersawn: 0.00161,
    },
    jankaHardness: 540,
    commonUses: ['Paint-grade furniture', 'Utility wood', 'Pallets'],
  },
  {
    id: 'birch',
    name: 'Yellow Birch',
    scientificName: 'Betula alleghaniensis',
    type: 'hardwood',
    coefficients: {
      flatsawn: 0.00312,
      quartersawn: 0.00228,
    },
    jankaHardness: 1260,
    commonUses: ['Furniture', 'Cabinets', 'Plywood'],
  },

  // SOFTWOODS
  {
    id: 'eastern-white-pine',
    name: 'Eastern White Pine',
    scientificName: 'Pinus strobus',
    type: 'softwood',
    coefficients: {
      flatsawn: 0.00267,
      quartersawn: 0.00084,
    },
    jankaHardness: 380,
    commonUses: ['Interior trim', 'Paneling', 'Carving'],
  },
  {
    id: 'southern-yellow-pine',
    name: 'Southern Yellow Pine',
    scientificName: 'Pinus spp.',
    type: 'softwood',
    coefficients: {
      flatsawn: 0.00295,
      quartersawn: 0.00182,
    },
    jankaHardness: 690,
    commonUses: ['Construction', 'Flooring', 'Structural'],
  },
  {
    id: 'douglas-fir',
    name: 'Douglas Fir',
    scientificName: 'Pseudotsuga menziesii',
    type: 'softwood',
    coefficients: {
      flatsawn: 0.00312,
      quartersawn: 0.00160,
    },
    jankaHardness: 660,
    commonUses: ['Construction', 'Structural timbers', 'Plywood'],
  },
  {
    id: 'western-red-cedar',
    name: 'Western Red Cedar',
    scientificName: 'Thuja plicata',
    type: 'softwood',
    coefficients: {
      flatsawn: 0.00244,
      quartersawn: 0.00092,
    },
    jankaHardness: 350,
    commonUses: ['Outdoor furniture', 'Siding', 'Shingles'],
  },

  // EXOTIC HARDWOODS
  {
    id: 'mahogany',
    name: 'Honduran Mahogany',
    scientificName: 'Swietenia macrophylla',
    type: 'exotic',
    coefficients: {
      flatsawn: 0.00205,
      quartersawn: 0.00135,
    },
    jankaHardness: 800,
    commonUses: ['Fine furniture', 'Boat building', 'Musical instruments'],
  },
  {
    id: 'teak',
    name: 'Teak',
    scientificName: 'Tectona grandis',
    type: 'exotic',
    coefficients: {
      flatsawn: 0.00184,
      quartersawn: 0.00087,
    },
    jankaHardness: 1070,
    commonUses: ['Outdoor furniture', 'Boat building', 'Flooring'],
  },
  {
    id: 'purpleheart',
    name: 'Purpleheart',
    scientificName: 'Peltogyne spp.',
    type: 'exotic',
    coefficients: {
      flatsawn: 0.00194,
      quartersawn: 0.00129,
    },
    jankaHardness: 2520,
    commonUses: ['Specialty items', 'Flooring', 'Turned objects'],
  },
  {
    id: 'padauk',
    name: 'African Padauk',
    scientificName: 'Pterocarpus soyauxii',
    type: 'exotic',
    coefficients: {
      flatsawn: 0.00215,
      quartersawn: 0.00140,
    },
    jankaHardness: 1725,
    commonUses: ['Furniture', 'Turned items', 'Specialty work'],
  },
  {
    id: 'wenge',
    name: 'Wenge',
    scientificName: 'Millettia laurentii',
    type: 'exotic',
    coefficients: {
      flatsawn: 0.00198,
      quartersawn: 0.00147,
    },
    jankaHardness: 1630,
    commonUses: ['Furniture', 'Flooring', 'Turned objects'],
  },
  {
    id: 'ipe',
    name: 'Ipe',
    scientificName: 'Handroanthus spp.',
    type: 'exotic',
    coefficients: {
      flatsawn: 0.00204,
      quartersawn: 0.00134,
    },
    jankaHardness: 3680,
    commonUses: ['Decking', 'Outdoor furniture', 'Flooring'],
  },
];

/**
 * Search wood species by name
 */
export const searchWoodSpecies = (query: string): WoodSpecies[] => {
  const lowerQuery = query.toLowerCase();
  return WOOD_SPECIES_DATABASE.filter(
    (species) =>
      species.name.toLowerCase().includes(lowerQuery) ||
      species.scientificName.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get wood species by ID
 */
export const getWoodSpeciesById = (id: string): WoodSpecies | undefined => {
  return WOOD_SPECIES_DATABASE.find((species) => species.id === id);
};

/**
 * Group species by type
 */
export const getSpeciesByType = () => {
  return {
    hardwood: WOOD_SPECIES_DATABASE.filter((s) => s.type === 'hardwood'),
    softwood: WOOD_SPECIES_DATABASE.filter((s) => s.type === 'softwood'),
    exotic: WOOD_SPECIES_DATABASE.filter((s) => s.type === 'exotic'),
  };
};

