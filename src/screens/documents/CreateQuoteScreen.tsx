/**
 * Create Quote Screen (MVP)
 * Simple quote generation
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme, Menu, List, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useDocumentStore } from '@/src/store/documentStore';
import { useClientStore } from '@/src/store/clientStore';
import { LineItem } from '@/src/types/document';
import { useArrayState, useFormState } from '@/src/hooks';
import { spacing, calculatorStyles } from '@/src/theme';
import { safeParseFloat, generateId, formatCurrency } from '@/src/utils';

export default function CreateQuoteScreen() {
  const theme = useTheme();
  const { addQuote } = useDocumentStore();
  const { clients, loadClients } = useClientStore();
  
  const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(null);
  const [clientMenuVisible, setClientMenuVisible] = useState(false);
  
  const lineItems = useArrayState<LineItem>([]);
  const { values: itemValues, setValue: setItemValue, reset: resetItemForm } = useFormState({
    description: '',
    quantity: '1',
    unitPrice: '',
  });

  useEffect(() => {
    loadClients();
  }, []);

  const handleAddLineItem = () => {
    const qty = safeParseFloat(itemValues.quantity, 1);
    const price = safeParseFloat(itemValues.unitPrice);

    if (itemValues.description.trim() && qty > 0 && price > 0) {
      const newItem: LineItem = {
        id: generateId('item'),
        description: itemValues.description,
        quantity: qty,
        unitPrice: price,
        total: qty * price,
      };

      lineItems.add(newItem);
      resetItemForm();
    }
  };

  const handleCreateQuote = () => {
    if (!selectedClient || lineItems.items.length === 0) return;

    addQuote({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      lineItems: lineItems.items,
      status: 'draft',
    });

    router.back();
  };

  const subtotal = lineItems.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Client
            </Text>

            <Menu
              visible={clientMenuVisible}
              onDismiss={() => setClientMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setClientMenuVisible(true)}
                  icon="account"
                  style={styles.clientButton}
                >
                  {selectedClient ? selectedClient.name : 'Select Client'}
                </Button>
              }
            >
              {clients.map((client) => (
                <Menu.Item
                  key={client.id}
                  onPress={() => {
                    setSelectedClient({ id: client.id, name: client.name });
                    setClientMenuVisible(false);
                  }}
                  title={client.name}
                />
              ))}
            </Menu>
          </Card.Content>
        </Card>

        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Add Line Items
            </Text>

            <TextInput
              label="Description"
              value={itemValues.description}
              onChangeText={(text) => setItemValue('description', text)}
              mode="outlined"
              style={calculatorStyles.input}
              placeholder="e.g., Custom dining table"
            />

            <View style={styles.itemRow}>
              <TextInput
                label="Quantity"
                value={itemValues.quantity}
                onChangeText={(text) => setItemValue('quantity', text)}
                keyboardType="decimal-pad"
                mode="outlined"
                style={styles.qtyInput}
              />
              <TextInput
                label="Unit Price ($)"
                value={itemValues.unitPrice}
                onChangeText={(text) => setItemValue('unitPrice', text)}
                keyboardType="decimal-pad"
                mode="outlined"
                style={styles.priceInput}
                left={<TextInput.Icon icon="currency-usd" />}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleAddLineItem}
              icon="plus"
              style={styles.addItemButton}
              disabled={!itemValues.description.trim() || !itemValues.unitPrice}
            >
              Add Item
            </Button>
          </Card.Content>
        </Card>

        {lineItems.items.length > 0 && (
          <Card style={calculatorStyles.card} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
                Quote Items ({lineItems.items.length})
              </Text>

              {lineItems.items.map((item, index) => (
                <List.Item
                  key={item.id}
                  title={item.description}
                  description={`${item.quantity} × ${formatCurrency(item.unitPrice)}`}
                  right={() => (
                    <View style={styles.itemRight}>
                      <Text variant="bodyLarge" style={styles.itemTotal}>
                        {formatCurrency(item.total)}
                      </Text>
                      <IconButton
                        icon="delete"
                        size={20}
                        onPress={() => lineItems.remove(index)}
                      />
                    </View>
                  )}
                />
              ))}

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text variant="titleLarge">Total:</Text>
                <Text variant="titleLarge" style={styles.total}>
                  {formatCurrency(subtotal)}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={styles.button}
          >
            Cancel
          </Button>

          <Button
            mode="contained"
            onPress={handleCreateQuote}
            style={styles.button}
            disabled={!selectedClient || lineItems.items.length === 0}
          >
            Create Quote
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.base,
    paddingBottom: spacing.xl,
  },
  clientButton: {
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  qtyInput: {
    flex: 1,
  },
  priceInput: {
    flex: 2,
  },
  addItemButton: {
    marginTop: spacing.sm,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTotal: {
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

