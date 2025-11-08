/**
 * List Status Badge Component
 * Colored badge for board list status
 */

import React from 'react';
import { Chip } from 'react-native-paper';
import { BoardList } from '@/src/types/boardFootList';

interface Props {
  status: BoardList['status'];
  size?: 'small' | 'medium';
}

export function ListStatusBadge({ status, size = 'small' }: Props) {
  if (!status) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'quote':
        return { label: 'Quote', color: '#FFA500', icon: 'file-document' };
      case 'ordered':
        return { label: 'Ordered', color: '#2196F3', icon: 'cart' };
      case 'paid':
        return { label: 'Paid', color: '#4CAF50', icon: 'cash' };
      case 'delivered':
        return { label: 'Delivered', color: '#9C27B0', icon: 'truck-delivery' };
      case 'picked-up':
        return { label: 'Picked Up', color: '#795548', icon: 'hand-back-right' };
      default:
        return { label: status, color: '#757575', icon: 'help' };
    }
  };

  const config = getStatusConfig();

  return (
    <Chip
      mode="flat"
      textStyle={{ fontSize: size === 'small' ? 12 : 14, color: '#fff' }}
      style={{ backgroundColor: config.color }}
      icon={config.icon}
      compact={size === 'small'}
    >
      {config.label}
    </Chip>
  );
}

