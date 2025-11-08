import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, TextInput, SegmentedButtons, List, Searchbar } from 'react-native-paper';
import { CalculatorLayout } from '@/src/components/common/CalculatorLayout';
import { calculatorStyles, spacing } from '@/src/theme';
import { calculateWoodMovement, getCoefficient, getMovementGuidance, safeParseFloat } from '@/src/utils';
import { WOOD_SPECIES_DATABASE, searchWoodSpecies } from '@/src/data/woodSpecies';
import { WoodSpecies, CutType } from '@/src/types/woodSpecies';
import { MOISTURE_ENVIRONMENTS } from '@/src/constants';

/**
 * Wood Movement Calculator Screen
 * Predict seasonal wood expansion/contraction
 */
export default function WoodMovementScreen() {
  const [boardWidth, setBoardWidth] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<WoodSpecies | null>(null);
  const [cutType, setCutType] = useState<CutType>('flatsawn');
  const [moistureChange, setMoistureChange] = useState('4');
  const [showSpeciesPicker, setShowSpeciesPicker] = useState(false);
  const [speciesSearch, setSpeciesSearch] = useState('');
  
  const [result, setResult] = useState<{
    movement: number;
    guidance: string;
    coefficient: number;
  } | null>(null);

  const handleCalculate = () => {
    const width = safeParseFloat(boardWidth);
    const mc = safeParseFloat(moistureChange);

    if (width > 0 && mc > 0 && selectedSpecies) {
      const coefficient = getCoefficient(selectedSpecies, cutType);
      const movement = calculateWoodMovement(width, mc, coefficient);
      const guidance = getMovementGuidance(movement, width, selectedSpecies.name, cutType);
      
      setResult({
        movement,
        guidance,
        coefficient,
      });
    }
  };

  const handleReset = () => {
    setBoardWidth('');
    setSelectedSpecies(null);
    setCutType('flatsawn');
    setMoistureChange('4');
    setResult(null);
    setSpeciesSearch('');
  };

  const filteredSpecies = speciesSearch 
    ? searchWoodSpecies(speciesSearch)
    : WOOD_SPECIES_DATABASE;

  const groupedSpecies = {
    hardwood: filteredSpecies.filter(s => s.type === 'hardwood'),
    softwood: filteredSpecies.filter(s => s.type === 'softwood'),
    exotic: filteredSpecies.filter(s => s.type === 'exotic'),
  };

  return (
    <CalculatorLayout
      onCalculate={handleCalculate}
      onReset={handleReset}
      calculateLabel="Calculate Movement"
      isCalculateDisabled={!selectedSpecies || !boardWidth || !moistureChange}
    >
      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Board Dimensions
          </Text>

          <TextInput
            label="Board Width (inches)"
            value={boardWidth}
            onChangeText={setBoardWidth}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            left={<TextInput.Icon icon="ruler" />}
          />

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Width is measured across the grain (perpendicular to grain direction)
          </Text>
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Wood Species
          </Text>

          {selectedSpecies ? (
            <View style={styles.selectedSpecies}>
              <List.Item
                title={selectedSpecies.name}
                description={selectedSpecies.scientificName}
                left={() => <List.Icon icon="tree" />}
                right={() => <List.Icon icon="pencil" />}
                onPress={() => setShowSpeciesPicker(!showSpeciesPicker)}
              />
            </View>
          ) : (
            <List.Item
              title="Select Wood Species"
              description="Tap to choose from database"
              left={() => <List.Icon icon="tree" />}
              onPress={() => setShowSpeciesPicker(true)}
              style={styles.selectPrompt}
            />
          )}

          {showSpeciesPicker && (
            <View style={styles.speciesPicker}>
              <Searchbar
                placeholder="Search species..."
                onChangeText={setSpeciesSearch}
                value={speciesSearch}
                style={styles.searchBar}
              />

              <ScrollView style={styles.speciesList} nestedScrollEnabled>
                {groupedSpecies.hardwood.length > 0 && (
                  <>
                    <List.Subheader>Hardwoods</List.Subheader>
                    {groupedSpecies.hardwood.map((species) => (
                      <List.Item
                        key={species.id}
                        title={species.name}
                        description={species.scientificName}
                        onPress={() => {
                          setSelectedSpecies(species);
                          setShowSpeciesPicker(false);
                          setSpeciesSearch('');
                        }}
                        left={() => <List.Icon icon="check-circle-outline" />}
                      />
                    ))}
                  </>
                )}

                {groupedSpecies.softwood.length > 0 && (
                  <>
                    <List.Subheader>Softwoods</List.Subheader>
                    {groupedSpecies.softwood.map((species) => (
                      <List.Item
                        key={species.id}
                        title={species.name}
                        description={species.scientificName}
                        onPress={() => {
                          setSelectedSpecies(species);
                          setShowSpeciesPicker(false);
                          setSpeciesSearch('');
                        }}
                        left={() => <List.Icon icon="check-circle-outline" />}
                      />
                    ))}
                  </>
                )}

                {groupedSpecies.exotic.length > 0 && (
                  <>
                    <List.Subheader>Exotic Woods</List.Subheader>
                    {groupedSpecies.exotic.map((species) => (
                      <List.Item
                        key={species.id}
                        title={species.name}
                        description={species.scientificName}
                        onPress={() => {
                          setSelectedSpecies(species);
                          setShowSpeciesPicker(false);
                          setSpeciesSearch('');
                        }}
                        left={() => <List.Icon icon="check-circle-outline" />}
                      />
                    ))}
                  </>
                )}
              </ScrollView>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Lumber Cut Type
          </Text>

          <SegmentedButtons
            value={cutType}
            onValueChange={(value) => setCutType(value as CutType)}
            buttons={[
              { value: 'flatsawn', label: 'Flatsawn (F/S)', icon: 'waves' },
              { value: 'quartersawn', label: 'Quartersawn (Q/S)', icon: 'horizontal-rotate' },
            ]}
            style={calculatorStyles.segmentedButtons}
          />

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            {cutType === 'flatsawn' 
              ? 'More movement - growth rings run across the face'
              : 'More stable - growth rings run perpendicular to the face'}
          </Text>
        </Card.Content>
      </Card>

      <Card style={calculatorStyles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
            Moisture Change
          </Text>

          <TextInput
            label="Moisture Content Change (%)"
            value={moistureChange}
            onChangeText={setMoistureChange}
            keyboardType="decimal-pad"
            mode="outlined"
            style={calculatorStyles.input}
            right={<TextInput.Icon icon="percent" />}
          />

          <Text variant="labelMedium" style={calculatorStyles.label}>
            Environment Presets
          </Text>

          {MOISTURE_ENVIRONMENTS.map((env) => (
            <List.Item
              key={env.label}
              title={env.label}
              description={env.description}
              onPress={() => env.value > 0 && setMoistureChange(env.value.toString())}
              left={() => <List.Icon icon="home-thermometer-outline" />}
              disabled={env.value === 0}
              style={styles.envPreset}
            />
          ))}

          <Text variant="bodySmall" style={calculatorStyles.helperText}>
            Example: Home varies from 12% (summer) to 8% (winter) = 4% change
          </Text>
        </Card.Content>
      </Card>

      {result && (
        <Card style={[calculatorStyles.card, calculatorStyles.resultCard]} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={calculatorStyles.resultTitle}>
              Predicted Movement
            </Text>
            
            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Total Movement:</Text>
              <Text variant="displaySmall" style={[calculatorStyles.resultValue, calculatorStyles.totalValue]}>
                {result.movement.toFixed(4)}"
              </Text>
            </View>

            <View style={calculatorStyles.resultRow}>
              <Text variant="bodyLarge">Coefficient Used:</Text>
              <Text variant="bodyMedium" style={calculatorStyles.resultValue}>
                {result.coefficient.toFixed(5)}
              </Text>
            </View>

            <View style={calculatorStyles.divider} />

            <Text variant="titleMedium" style={styles.guidanceTitle}>
              Recommendations
            </Text>

            <Text variant="bodyMedium" style={styles.guidance}>
              {result.guidance}
            </Text>
          </Card.Content>
        </Card>
      )}
    </CalculatorLayout>
  );
}

const styles = StyleSheet.create({
  selectedSpecies: {
    marginBottom: spacing.sm,
  },
  selectPrompt: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  speciesPicker: {
    marginTop: spacing.md,
    maxHeight: 300,
  },
  searchBar: {
    marginBottom: spacing.sm,
  },
  speciesList: {
    maxHeight: 240,
  },
  envPreset: {
    paddingVertical: spacing.xs,
  },
  guidanceTitle: {
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  guidance: {
    lineHeight: 22,
  },
});

