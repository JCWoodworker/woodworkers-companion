/**
 * Project utility functions
 * Calculations and reporting for project management
 */

import { Project } from '@/src/types/project';
import { formatCurrency } from './calculations';

/**
 * Calculate total hours for a project
 */
export const calculateTotalHours = (project: Project): number => {
  return project.timeEntries.reduce((sum, entry) => sum + entry.hours, 0);
};

/**
 * Calculate total expenses for a project
 */
export const calculateTotalExpenses = (project: Project): number => {
  return project.expenses.reduce((sum, expense) => sum + expense.amount, 0);
};

/**
 * Calculate actual cost (time + expenses)
 */
export const calculateActualCost = (
  project: Project,
  hourlyRate: number
): number => {
  const laborCost = calculateTotalHours(project) * hourlyRate;
  const materialCost = calculateTotalExpenses(project);
  return laborCost + materialCost;
};

/**
 * Calculate variance (estimated vs actual)
 */
export const calculateVariance = (
  estimated?: number,
  actual?: number
): { variance: number; percentage: number } | null => {
  if (estimated === undefined || actual === undefined) return null;
  
  const variance = actual - estimated;
  const percentage = estimated > 0 ? (variance / estimated) * 100 : 0;
  
  return { variance, percentage };
};

/**
 * Generate job costing report
 */
export const generateJobCostingReport = (
  project: Project,
  hourlyRate: number
): string => {
  const totalHours = calculateTotalHours(project);
  const laborCost = totalHours * hourlyRate;
  const materialCost = calculateTotalExpenses(project);
  const totalCost = laborCost + materialCost;

  const expensesByCategory = project.expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  let report = `PROJECT: ${project.name}\n`;
  report += `Status: ${project.status}\n\n`;
  
  report += `LABOR:\n`;
  report += `  Total Hours: ${totalHours.toFixed(2)}\n`;
  report += `  Hourly Rate: ${formatCurrency(hourlyRate)}\n`;
  report += `  Labor Cost: ${formatCurrency(laborCost)}\n\n`;
  
  report += `MATERIALS & EXPENSES:\n`;
  Object.entries(expensesByCategory).forEach(([category, amount]) => {
    report += `  ${category}: ${formatCurrency(amount)}\n`;
  });
  report += `  Total Expenses: ${formatCurrency(materialCost)}\n\n`;
  
  report += `TOTAL PROJECT COST: ${formatCurrency(totalCost)}\n`;
  
  if (project.estimatedCost) {
    const variance = calculateVariance(project.estimatedCost, totalCost);
    if (variance) {
      report += `\nESTIMATED vs ACTUAL:\n`;
      report += `  Estimated: ${formatCurrency(project.estimatedCost)}\n`;
      report += `  Variance: ${formatCurrency(variance.variance)} (${variance.percentage > 0 ? '+' : ''}${variance.percentage.toFixed(1)}%)\n`;
    }
  }

  return report;
};

/**
 * Calculate project completion percentage
 */
export const calculateCompletionPercentage = (project: Project): number => {
  if (project.tasks.length === 0) return 0;
  const completedTasks = project.tasks.filter((t) => t.completed).length;
  return (completedTasks / project.tasks.length) * 100;
};

/**
 * Check if project is overdue
 */
export const isProjectOverdue = (project: Project): boolean => {
  if (!project.deadline || project.status === 'complete') return false;
  return new Date(project.deadline) < new Date();
};

/**
 * Format date for display
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format time duration
 */
export const formatDuration = (hours: number): string => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} min`;
  }
  return `${hours.toFixed(1)} hrs`;
};

