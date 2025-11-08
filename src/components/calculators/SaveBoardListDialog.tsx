/**
 * Save Board List Dialog Component
 * Dialog for saving current board list to history
 * Adapts to complexity mode
 */

import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Dialog, TextInput, Button, Portal, SegmentedButtons, Text, Menu, useTheme } from 'react-native-paper';
import { useClientStore } from '@/src/store/clientStore';
import { useSettingsStore } from '@/src/store/settingsStore';
import { BoardList } from '@/src/types/boardFootList';
import { spacing, calculatorStyles } from '@/src/theme';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSave: (data: Omit<BoardList, 'id' | 'boards' | 'totalBoardFeet' | 'totalCost' | 'dateCreated'>) => void;
}

export function SaveBoardListDialog({ visible, onDismiss, onSave }: Props) {
  const theme = useTheme();
  const { complexityMode } = useSettingsStore();
  const { clients } = useClientStore();

  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>();
  const [status, setStatus] = useState<BoardList['status']>('quote');
  const [showClientMenu, setShowClientMenu] = useState(false);

  const isAdvancedMode = complexityMode === 'professional' || complexityMode === 'lumberyard';
  const isLumberYard = complexityMode === 'lumberyard';

  const selectedClient = selectedClientId ? clients.find((c) => c.id === selectedClientId) : undefined;

  useEffect(() => {
    if (visible) {
      // Generate default name with date
      const today = new Date().toLocaleDateString();
      setName(`Board List - ${today}`);
    } else {
      // Reset form
      setName('');
      setNotes('');
      setSelectedClientId(undefined);
      setStatus('quote');
    }
  }, [visible]);

  const handleSave = () => {
    if (!name.trim()) return;

    const data: Omit<BoardList, 'id' | 'boards' | 'totalBoardFeet' | 'totalCost' | 'dateCreated'> = {
      name: name.trim(),
      notes: notes.trim() || undefined,
    };

    if (isAdvancedMode) {
      data.clientId = selectedClientId;
      data.clientName = selectedClient?.name;
      data.status = status;
    }

    onSave(data);
    onDismiss();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Save Board List</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={styles.content}>
            <TextInput
              label="List Name *"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={calculatorStyles.input}
              autoFocus
            />

            <TextInput
              label="Notes"
              value={notes}
              onChangeText={setNotes}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={calculatorStyles.input}
              placeholder="Optional notes about this order..."
            />

            {isAdvancedMode && (
              <>
                <Text variant="labelLarge" style={styles.label}>
                  Client {isLumberYard && '(recommended)'}
                </Text>
                <Menu
                  visible={showClientMenu}
                  onDismiss={() => setShowClientMenu(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setShowClientMenu(true)}
                      icon="account"
                      style={styles.clientButton}
                    >
                      {selectedClient ? selectedClient.name : 'Select Client (Optional)'}
                    </Button>
                  }
                >
                  <Menu.Item
                    title="No Client"
                    onPress={() => {
                      setSelectedClientId(undefined);
                      setShowClientMenu(false);
                    }}
                    leadingIcon={!selectedClientId ? 'check' : undefined}
                  />
                  {clients.map((client) => (
                    <Menu.Item
                      key={client.id}
                      title={client.name}
                      onPress={() => {
                        setSelectedClientId(client.id);
                        setShowClientMenu(false);
                      }}
                      leadingIcon={selectedClientId === client.id ? 'check' : undefined}
                    />
                  ))}
                </Menu>

                <Text variant="labelLarge" style={styles.label}>
                  Status
                </Text>
                <SegmentedButtons
                  value={status || 'quote'}
                  onValueChange={(value) => setStatus(value as BoardList['status'])}
                  buttons={[
                    { value: 'quote', label: 'Quote' },
                    { value: 'ordered', label: 'Ordered' },
                    { value: 'paid', label: 'Paid' },
                  ]}
                  style={styles.statusButtons}
                />
                <SegmentedButtons
                  value={status || 'quote'}
                  onValueChange={(value) => setStatus(value as BoardList['status'])}
                  buttons={[
                    { value: 'delivered', label: 'Delivered' },
                    { value: 'picked-up', label: 'Picked Up' },
                  ]}
                  style={styles.statusButtons}
                />
              </>
            )}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleSave} mode="contained" disabled={!name.trim()}>
            Save
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    maxHeight: '80%',
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  clientButton: {
    marginBottom: spacing.md,
  },
  statusButtons: {
    marginBottom: spacing.sm,
  },
});

