/**
 * Project Management type definitions
 */

export type ProjectStatus = 'quoted' | 'design' | 'in-progress' | 'finishing' | 'complete';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TimeEntry {
  id: string;
  description: string;
  hours: number;
  date: Date;
  createdAt: Date;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'materials' | 'hardware' | 'consumables' | 'other';
  date: Date;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  clientId?: string;
  clientName?: string;
  status: ProjectStatus;
  estimatedHours?: number;
  estimatedCost?: number;
  deadline?: Date;
  tasks: Task[];
  timeEntries: TimeEntry[];
  expenses: Expense[];
  notes: string;
  photos: string[]; // URIs
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFormData {
  name: string;
  clientId?: string;
  clientName?: string;
  status: ProjectStatus;
  estimatedHours?: string;
  estimatedCost?: string;
  deadline?: Date;
  notes: string;
}

