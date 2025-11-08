/**
 * Category Icon Component
 * Dynamic icon based on inventory category
 */

import React from 'react';
import { Icon } from 'react-native-paper';
import { InventoryTab } from '@/src/types/inventory';

interface Props {
  category: InventoryTab | string;
  size?: number;
  color?: string;
}

export function CategoryIcon({ category, size = 24, color }: Props) {
  const getIconName = (): string => {
    switch (category) {
      case 'lumber':
        return 'tree';
      case 'tools':
        return 'hammer-wrench';
      case 'consumables':
        return 'package-variant';
      case 'hardware':
        return 'screw-machine-flat-top';
      case 'custom':
        return 'shape-plus';
      default:
        return 'package';
    }
  };

  return <Icon source={getIconName()} size={size} color={color} />;
}

