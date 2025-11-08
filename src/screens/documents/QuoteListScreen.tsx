/**
 * Quote List Screen
 * View all quotes and their status
 */

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, FAB, SegmentedButtons, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { useDocumentStore } from '@/src/store/documentStore';
import { EmptyState } from '@/src/components/common/EmptyState';
import { StatusBadge } from '@/src/components/common/StatusBadge';
import { spacing } from '@/src/theme';
import { QuoteStatus } from '@/src/types/document';
import { formatDate, formatCurrency } from '@/src/utils/projectUtils';

export default function QuoteListScreen() {
  const theme = useTheme();
  const { quotes, loadDocuments } = useDocumentStore();
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all');

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredQuotes = quotes.filter((quote) =>
    statusFilter === 'all' || quote.status === statusFilter
  );

  const pendingCount = quotes.filter((q) => q.status === 'sent').length;
  const totalValue = quotes.reduce((sum, q) => sum + q.total, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Quotes
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {pendingCount} pending • {formatCurrency(totalValue)} total
          </Text>
        </View>

        <SegmentedButtons
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as QuoteStatus | 'all')}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'draft', label: 'Draft' },
            { value: 'sent', label: 'Sent' },
            { value: 'approved', label: 'Approved' },
          ]}
          style={styles.filterButtons}
        />

        {filteredQuotes.length === 0 ? (
          <EmptyState
            icon="file-document-outline"
            title={statusFilter === 'all' ? 'No quotes yet' : 'No quotes in this status'}
            description={statusFilter === 'all' ? 'Create quotes for your clients' : undefined}
            actionLabel={statusFilter === 'all' ? 'Create Quote' : undefined}
            onAction={statusFilter === 'all' ? () => router.push('/documents/create-quote') : undefined}
          />
        ) : (
          filteredQuotes.map((quote) => (
            <Card key={quote.id} style={styles.card} mode="elevated" onPress={() => {}}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text variant="titleMedium" style={styles.cardTitle}>
                    {quote.quoteNumber}
                  </Text>
                  <StatusBadge status={quote.status} type="quote" />
                </View>

                <Text variant="bodyMedium" style={styles.client}>
                  {quote.clientName}
                </Text>

                <Text variant="bodyMedium">
                  {formatCurrency(quote.total)} • {formatDate(quote.createdAt)}
                </Text>

                {quote.validUntil && (
                  <Text variant="bodySmall" style={styles.validity}>
                    Valid until: {formatDate(quote.validUntil)}
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
        onPress={() => router.push('/documents/create-quote')}
        label="New Quote"
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
  filterButtons: {
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
  client: {
    marginBottom: spacing.xs,
  },
  validity: {
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

