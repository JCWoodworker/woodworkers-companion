/**
 * Add/Edit Client Screen
 * Create or edit client information
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Card, Text, useTheme } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useClientStore } from '@/src/store/clientStore';
import { useFormState } from '@/src/hooks';
import { spacing, calculatorStyles } from '@/src/theme';

export default function AddEditClientScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getClientById, addClient, updateClient } = useClientStore();
  
  const client = id ? getClientById(id) : undefined;
  const isEditing = !!client;

  const { values, setValue } = useFormState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    notes: client?.notes || '',
  });

  const handleSave = () => {
    if (!values.name.trim()) return;

    const clientData = {
      name: values.name,
      email: values.email || undefined,
      phone: values.phone || undefined,
      address: values.address || undefined,
      notes: values.notes || undefined,
    };

    if (isEditing) {
      updateClient(client.id, clientData);
    } else {
      addClient(clientData);
    }

    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Contact Information
            </Text>

            <TextInput
              label="Client Name *"
              value={values.name}
              onChangeText={(text) => setValue('name', text)}
              mode="outlined"
              style={calculatorStyles.input}
            />

            <TextInput
              label="Email"
              value={values.email}
              onChangeText={(text) => setValue('email', text)}
              keyboardType="email-address"
              mode="outlined"
              style={calculatorStyles.input}
              autoCapitalize="none"
            />

            <TextInput
              label="Phone"
              value={values.phone}
              onChangeText={(text) => setValue('phone', text)}
              keyboardType="phone-pad"
              mode="outlined"
              style={calculatorStyles.input}
            />

            <TextInput
              label="Address"
              value={values.address}
              onChangeText={(text) => setValue('address', text)}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={calculatorStyles.input}
            />
          </Card.Content>
        </Card>

        <Card style={calculatorStyles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={calculatorStyles.sectionTitle}>
              Notes
            </Text>

            <TextInput
              label="Client Notes"
              value={values.notes}
              onChangeText={(text) => setValue('notes', text)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={calculatorStyles.input}
              placeholder="Preferences, requirements, communication history..."
            />
          </Card.Content>
        </Card>

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
            onPress={handleSave}
            style={styles.button}
            disabled={!values.name.trim()}
          >
            {isEditing ? 'Update Client' : 'Add Client'}
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
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

