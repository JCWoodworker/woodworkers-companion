/**
 * Board Foot List Type Definitions
 * For managing board lists and history
 */

export interface BoardEntry {
  id: string;
  thickness: number; // inches (stored as decimal)
  thicknessQuarters?: number; // for display in quarters mode
  width: number; // inches
  length: number; // feet or inches based on lengthUnit
  lengthUnit: 'feet' | 'inches';
  quantity: number;
  boardFeet: number;
  species?: string;
  grade?: string; // Professional/Lumber Yard only (FAS, Select, #1 Common, etc.)
  moistureContent?: number; // Professional/Lumber Yard only (percentage)
  pricePerBF?: number;
  totalCost?: number;
  notes?: string;
  dateAdded: Date;
}

export interface BoardList {
  id: string;
  name: string;
  boards: BoardEntry[];
  totalBoardFeet: number;
  totalCost: number;
  
  // Client association (Professional/Lumber Yard)
  clientId?: string;
  clientName?: string;
  
  notes?: string;
  
  // Status tracking (Professional/Lumber Yard only)
  status?: 'quote' | 'ordered' | 'paid' | 'delivered' | 'picked-up';
  orderDate?: Date;
  paidDate?: Date;
  deliveryDate?: Date;
  
  dateCreated: Date;
  dateModified?: Date;
}

// Filter options for saved lists
export interface BoardListFilter {
  searchQuery?: string;
  clientId?: string;
  status?: BoardList['status'];
  dateFrom?: Date;
  dateTo?: Date;
}

// Sort options for saved lists
export type BoardListSortField = 'name' | 'dateCreated' | 'dateModified' | 'totalBoardFeet' | 'totalCost' | 'client';
export type BoardListSortOrder = 'asc' | 'desc';

export interface BoardListSortOptions {
  field: BoardListSortField;
  order: BoardListSortOrder;
}

