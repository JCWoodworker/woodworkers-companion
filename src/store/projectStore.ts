/**
 * Project Management Store
 * Zustand store with AsyncStorage persistence
 */

import { create } from 'zustand';
import { Project, Task, TimeEntry, Expense, ProjectStatus } from '@/src/types/project';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';
import { generateUniqueId } from '@/src/utils';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  
  // Actions
  loadProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks' | 'timeEntries' | 'expenses' | 'photos'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Task actions
  addTask: (projectId: string, title: string) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  
  // Time entry actions
  addTimeEntry: (projectId: string, entry: Omit<TimeEntry, 'id' | 'createdAt'>) => void;
  deleteTimeEntry: (projectId: string, entryId: string) => void;
  
  // Expense actions
  addExpense: (projectId: string, expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  deleteExpense: (projectId: string, expenseId: string) => void;
  
  // Computed
  getProjectById: (id: string) => Project | undefined;
  getTotalHours: (projectId: string) => number;
  getTotalExpenses: (projectId: string) => number;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: true,

  loadProjects: async () => {
    try {
      const stored = await loadData<Project[]>(STORAGE_KEYS.PROJECTS);
      if (stored) {
        set({ projects: stored, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      set({ isLoading: false });
    }
  },

  addProject: (projectData) => {
    const newProject: Project = {
      ...projectData,
      id: generateUniqueId('proj'),
      tasks: [],
      timeEntries: [],
      expenses: [],
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => {
      const updated = [...state.projects, newProject];
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  updateProject: (id, updates) => {
    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  deleteProject: (id) => {
    set((state) => {
      const updated = state.projects.filter((p) => p.id !== id);
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  addTask: (projectId, title) => {
    const newTask: Task = {
      id: generateUniqueId('task'),
      title,
      completed: false,
      createdAt: new Date(),
    };

    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? { ...p, tasks: [...p.tasks, newTask], updatedAt: new Date() }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  toggleTask: (projectId, taskId) => {
    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
              updatedAt: new Date(),
            }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  deleteTask: (projectId, taskId) => {
    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.filter((t) => t.id !== taskId),
              updatedAt: new Date(),
            }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  addTimeEntry: (projectId, entryData) => {
    const newEntry: TimeEntry = {
      ...entryData,
      id: generateUniqueId('time'),
      createdAt: new Date(),
    };

    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? { ...p, timeEntries: [...p.timeEntries, newEntry], updatedAt: new Date() }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  deleteTimeEntry: (projectId, entryId) => {
    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              timeEntries: p.timeEntries.filter((e) => e.id !== entryId),
              updatedAt: new Date(),
            }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  addExpense: (projectId, expenseData) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateUniqueId('expense'),
      createdAt: new Date(),
    };

    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? { ...p, expenses: [...p.expenses, newExpense], updatedAt: new Date() }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  deleteExpense: (projectId, expenseId) => {
    set((state) => {
      const updated = state.projects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              expenses: p.expenses.filter((e) => e.id !== expenseId),
              updatedAt: new Date(),
            }
          : p
      );
      saveData(STORAGE_KEYS.PROJECTS, updated);
      return { projects: updated };
    });
  },

  getProjectById: (id) => {
    return get().projects.find((p) => p.id === id);
  },

  getTotalHours: (projectId) => {
    const project = get().projects.find((p) => p.id === projectId);
    if (!project) return 0;
    return project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  },

  getTotalExpenses: (projectId) => {
    const project = get().projects.find((p) => p.id === projectId);
    if (!project) return 0;
    return project.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  },
}));

