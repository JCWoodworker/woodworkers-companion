/**
 * Client List Screen
 * CRM dashboard
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, FAB, Searchbar, useTheme, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useClientStore } from '@/src/store/clientStore';
import { EmptyState } from '@/src/components/common/EmptyState';
import { spacing } from '@/src/theme';

export default function ClientListScreen() {
  const theme = useTheme();
  const { clients, loadClients } = useClientStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Clients
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {clients.length} total
          </Text>
        </View>

        <Searchbar
          placeholder="Search clients..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />

        {filteredClients.length === 0 ? (
          <EmptyState
            icon="account-group"
            title={searchQuery ? 'No clients found' : 'No clients yet'}
            description={searchQuery ? undefined : 'Add clients to manage contacts and project history'}
            actionLabel={searchQuery ? undefined : 'Add Client'}
            onAction={searchQuery ? undefined : () => router.push('/clients/add')}
          />
        ) : (
          filteredClients.map((client) => (
            <Card
              key={client.id}
              style={styles.card}
              mode="elevated"
              onPress={() => router.push(`/clients/${client.id}`)}
            >
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text variant="titleMedium" style={styles.cardTitle}>
                    {client.name}
                  </Text>
                </View>

                {client.email && (
                  <Text variant="bodySmall" style={styles.contact}>
                    ✉️ {client.email}
                  </Text>
                )}
                {client.phone && (
                  <Text variant="bodySmall" style={styles.contact}>
                    📞 {client.phone}
                  </Text>
                )}
                {client.notes && (
                  <Text variant="bodySmall" style={styles.notes} numberOfLines={2}>
                    {client.notes}
                  </Text>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/clients/add')}
        label="New Client"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.base,
    paddingBottom: 100,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    opacity: 0.7,
  },
  searchBar: {
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontWeight: '600',
  },
  contact: {
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  notes: {
    opacity: 0.6,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
  },
});

