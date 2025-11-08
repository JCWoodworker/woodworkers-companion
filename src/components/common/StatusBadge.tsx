/**
 * Status Badge Component
 * Color-coded status indicators for projects, quotes, etc.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

export type ProjectStatus = 'quoted' | 'design' | 'in-progress' | 'finishing' | 'complete';
export type QuoteStatus = 'draft' | 'sent' | 'approved' | 'rejected';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'overdue';

interface StatusBadgeProps {
  status: ProjectStatus | QuoteStatus | PaymentStatus | string;
  type?: 'project' | 'quote' | 'payment';
}

const getStatusConfig = (status: string, type?: string) => {
  // Project statuses
  if (type === 'project') {
    switch (status) {
      case 'quoted':
        return { label: 'Quoted', color: '#9E9E9E' };
      case 'design':
        return { label: 'Design', color: '#2196F3' };
      case 'in-progress':
        return { label: 'In Progress', color: '#FF9800' };
      case 'finishing':
        return { label: 'Finishing', color: '#9C27B0' };
      case 'complete':
        return { label: 'Complete', color: '#4CAF50' };
      default:
        return { label: status, color: '#757575' };
    }
  }

  // Quote statuses
  if (type === 'quote') {
    switch (status) {
      case 'draft':
        return { label: 'Draft', color: '#9E9E9E' };
      case 'sent':
        return { label: 'Sent', color: '#2196F3' };
      case 'approved':
        return { label: 'Approved', color: '#4CAF50' };
      case 'rejected':
        return { label: 'Rejected', color: '#F44336' };
      default:
        return { label: status, color: '#757575' };
    }
  }

  // Payment statuses
  if (type === 'payment') {
    switch (status) {
      case 'unpaid':
        return { label: 'Unpaid', color: '#FF9800' };
      case 'partial':
        return { label: 'Partial', color: '#2196F3' };
      case 'paid':
        return { label: 'Paid', color: '#4CAF50' };
      case 'overdue':
        return { label: 'Overdue', color: '#F44336' };
      default:
        return { label: status, color: '#757575' };
    }
  }

  // Default
  return { label: status, color: '#757575' };
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  const config = getStatusConfig(status, type);

  return (
    <Chip
      mode="flat"
      textStyle={[styles.text, { color: config.color }]}
      style={[styles.chip, { backgroundColor: `${config.color}20` }]}
    >
      {config.label}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

