/**
 * Client Detail Screen
 * Full client profile with history
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, IconButton, Divider, List, useTheme } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { useClientStore } from '@/src/store/clientStore';
import { useDocumentStore } from '@/src/store/documentStore';
import { useProjectStore } from '@/src/store/projectStore';
import { ConfirmDialog } from '@/src/components/common/ConfirmDialog';
import { StatusBadge } from '@/src/components/common/StatusBadge';
import { spacing } from '@/src/theme';
import { formatDate, formatCurrency } from '@/src/utils/projectUtils';

export default function ClientDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getClientById, deleteClient } = useClientStore();
  const { getQuotesByClient, getInvoicesByClient } = useDocumentStore();
  const { projects } = useProjectStore();
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const client = id ? getClientById(id) : undefined;
  const clientQuotes = id ? getQuotesByClient(id) : [];
  const clientInvoices = id ? getInvoicesByClient(id) : [];
  const clientProjects = projects.filter((p) => p.clientId === id);

  if (!client) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Client not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteClient(client.id);
    setShowDeleteDialog(false);
    router.back();
  };

  const totalRevenue = clientInvoices
    .filter((inv) => inv.paid)
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <View style={styles.header}>
              <Text variant="headlineSmall" style={styles.name}>
                {client.name}
              </Text>
              <View style={styles.actions}>
                <IconButton
                  icon="pencil"
                  size={24}
                  onPress={() => router.push(`/clients/edit/${client.id}`)}
                />
                <IconButton
                  icon="delete"
                  size={24}
                  onPress={() => setShowDeleteDialog(true)}
                />
              </View>
            </View>

            {client.email && (
              <Text variant="bodyMedium" style={styles.contact}>
                ✉️ {client.email}
              </Text>
            )}
            {client.phone && (
              <Text variant="bodyMedium" style={styles.contact}>
                📞 {client.phone}
              </Text>
            )}
            {client.address && (
              <Text variant="bodyMedium" style={styles.contact}>
                📍 {client.address}
              </Text>
            )}

            {client.notes && (
              <>
                <Divider style={styles.divider} />
                <Text variant="bodyMedium">{client.notes}</Text>
              </>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Summary
            </Text>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Projects:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {clientProjects.length}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Quotes:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {clientQuotes.length}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Invoices:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {clientInvoices.length}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text variant="bodyMedium">Total Revenue:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {formatCurrency(totalRevenue)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {clientQuotes.length > 0 && (
          <Card style={styles.card} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Recent Quotes
              </Text>
              
              {clientQuotes.slice(0, 5).map((quote) => (
                <List.Item
                  key={quote.id}
                  title={quote.quoteNumber}
                  description={`${formatCurrency(quote.total)} • ${formatDate(quote.createdAt)}`}
                  right={() => <StatusBadge status={quote.status} type="quote" />}
                  onPress={() => router.push(`/documents/quotes` as any)}
                />
              ))}
            </Card.Content>
          </Card>
        )}

        {clientProjects.length > 0 && (
          <Card style={styles.card} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Projects
              </Text>
              
              {clientProjects.map((project) => (
                <List.Item
                  key={project.id}
                  title={project.name}
                  description={formatDate(project.createdAt)}
                  right={() => <StatusBadge status={project.status} type="project" />}
                  onPress={() => router.push(`/projects/${project.id}`)}
                />
              ))}
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      <ConfirmDialog
        visible={showDeleteDialog}
        title="Delete Client"
        message={`Are you sure you want to delete "${client.name}"? This will not delete their associated projects or quotes.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        destructive
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
    paddingBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontWeight: 'bold',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  contact: {
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  divider: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryValue: {
    fontWeight: '600',
    color: '#8B4513',
  },
});

