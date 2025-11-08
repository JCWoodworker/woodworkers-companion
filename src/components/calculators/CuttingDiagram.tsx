/**
 * Visual cutting diagram component
 * Displays optimized cutting layout on sheet goods
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Rect, Line, Text as SvgText, G } from 'react-native-svg';
import { CutLayout } from '@/src/types/cutList';
import { spacing } from '@/src/theme';

interface CuttingDiagramProps {
  layout: CutLayout;
  showDimensions?: boolean;
  showGrainDirection?: boolean;
}

export const CuttingDiagram: React.FC<CuttingDiagramProps> = ({
  layout,
  showDimensions = true,
  showGrainDirection = true,
}) => {
  const screenWidth = Dimensions.get('window').width - (spacing.base * 2);
  const maxDiagramWidth = Math.min(screenWidth, 400);
  
  // Calculate scale to fit diagram in available space
  const scale = Math.min(
    maxDiagramWidth / layout.stock.width,
    300 / layout.stock.height
  );
  
  const diagramWidth = layout.stock.width * scale;
  const diagramHeight = layout.stock.height * scale;

  // Color palette for parts
  const partColors = [
    '#8B4513', // Brown
    '#CD853F', // Peru
    '#DEB887', // Burlywood
    '#D2691E', // Chocolate
    '#A0522D', // Sienna
    '#6B4423', // Dark brown
  ];

  return (
    <View style={styles.container}>
      <Text variant="labelMedium" style={styles.label}>
        Cutting Diagram (Scale: {(1/scale).toFixed(1)}:1)
      </Text>
      
      <Svg
        width={diagramWidth}
        height={diagramHeight}
        viewBox={`0 0 ${layout.stock.width} ${layout.stock.height}`}
        style={styles.svg}
      >
        {/* Stock panel outline */}
        <Rect
          x={0}
          y={0}
          width={layout.stock.width}
          height={layout.stock.height}
          fill="#FAFAF5"
          stroke="#5D5D5D"
          strokeWidth={0.5}
        />

        {/* Grid lines (every foot) */}
        {Array.from({ length: Math.floor(layout.stock.width / 12) }).map((_, i) => (
          <Line
            key={`v-${i}`}
            x1={(i + 1) * 12}
            y1={0}
            x2={(i + 1) * 12}
            y2={layout.stock.height}
            stroke="#E0E0E0"
            strokeWidth={0.25}
            strokeDasharray="2,2"
          />
        ))}
        {Array.from({ length: Math.floor(layout.stock.height / 12) }).map((_, i) => (
          <Line
            key={`h-${i}`}
            x1={0}
            y1={(i + 1) * 12}
            x2={layout.stock.width}
            y2={(i + 1) * 12}
            stroke="#E0E0E0"
            strokeWidth={0.25}
            strokeDasharray="2,2"
          />
        ))}

        {/* Placed parts */}
        {layout.placedParts.map((placedPart, index) => {
          const color = partColors[index % partColors.length];
          const centerX = placedPart.x + placedPart.width / 2;
          const centerY = placedPart.y + placedPart.height / 2;

          return (
            <G key={placedPart.part.id}>
              {/* Part rectangle */}
              <Rect
                x={placedPart.x}
                y={placedPart.y}
                width={placedPart.width}
                height={placedPart.height}
                fill={color}
                fillOpacity={0.7}
                stroke="#2C1810"
                strokeWidth={0.5}
              />

              {/* Part label */}
              {showDimensions && (
                <>
                  <SvgText
                    x={centerX}
                    y={centerY - 1}
                    fill="#FFFFFF"
                    fontSize={3}
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {placedPart.part.name}
                  </SvgText>
                  <SvgText
                    x={centerX}
                    y={centerY + 2.5}
                    fill="#FFFFFF"
                    fontSize={2.5}
                    textAnchor="middle"
                  >
                    {placedPart.width.toFixed(1)}" × {placedPart.height.toFixed(1)}"
                  </SvgText>
                </>
              )}

              {/* Grain direction arrow */}
              {showGrainDirection && placedPart.part.grainDirection && placedPart.part.grainDirection !== 'none' && (
                <Line
                  x1={centerX - 2}
                  y1={centerY + 4}
                  x2={centerX + 2}
                  y2={centerY + 4}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  markerEnd="url(#arrowhead)"
                />
              )}
            </G>
          );
        })}
      </Svg>

      {/* Legend */}
      <View style={styles.legend}>
        <Text variant="bodySmall">
          Sheet: {layout.stock.width}" × {layout.stock.height}" 
          ({((layout.stock.width / 12).toFixed(1))}' × {((layout.stock.height / 12).toFixed(1))}'
          )
        </Text>
        <Text variant="bodySmall">
          Parts Placed: {layout.placedParts.length}
        </Text>
        <Text variant="bodySmall">
          Waste: {layout.wastePercentage.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  svg: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  legend: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: '#F5F5F0',
    borderRadius: 8,
    width: '100%',
  },
});

