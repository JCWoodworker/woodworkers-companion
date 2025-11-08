/**
 * Document Store (Quotes & Invoices)
 * Zustand store with AsyncStorage persistence
 */

import { create } from 'zustand';
import { Quote, Invoice, QuoteStatus } from '@/src/types/document';
import { saveData, loadData, STORAGE_KEYS } from '@/src/services/storage';
import { generateUniqueId } from '@/src/utils';

interface DocumentStore {
  quotes: Quote[];
  invoices: Invoice[];
  isLoading: boolean;

  // Quote actions
  loadDocuments: () => Promise<void>;
  addQuote: (quote: Omit<Quote, 'id' | 'quoteNumber' | 'createdAt' | 'subtotal' | 'total'>) => void;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  deleteQuote: (id: string) => void;
  
  // Invoice actions
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'createdAt'>) => void;
  convertQuoteToInvoice: (quoteId: string) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;

  // Computed
  getQuoteById: (id: string) => Quote | undefined;
  getInvoiceById: (id: string) => Invoice | undefined;
  getQuotesByClient: (clientId: string) => Quote[];
  getInvoicesByClient: (clientId: string) => Invoice[];
}

const calculateTotal = (lineItems: any[], tax?: number) => {
  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = tax ? subtotal * (tax / 100) : 0;
  return { subtotal, total: subtotal + taxAmount };
};

const generateQuoteNumber = (count: number): string => {
  const year = new Date().getFullYear();
  const num = (count + 1).toString().padStart(4, '0');
  return `Q${year}-${num}`;
};

const generateInvoiceNumber = (count: number): string => {
  const year = new Date().getFullYear();
  const num = (count + 1).toString().padStart(4, '0');
  return `INV${year}-${num}`;
};

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  quotes: [],
  invoices: [],
  isLoading: true,

  loadDocuments: async () => {
    try {
      const [storedQuotes, storedInvoices] = await Promise.all([
        loadData<Quote[]>(STORAGE_KEYS.QUOTES),
        loadData<Invoice[]>(STORAGE_KEYS.INVOICES),
      ]);

      set({
        quotes: storedQuotes || [],
        invoices: storedInvoices || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading documents:', error);
      set({ isLoading: false });
    }
  },

  addQuote: (quoteData) => {
    const state = get();
    const { subtotal, total } = calculateTotal(quoteData.lineItems, quoteData.tax);
    
    const newQuote: Quote = {
      ...quoteData,
      id: generateUniqueId('quote'),
      quoteNumber: generateQuoteNumber(state.quotes.length),
      subtotal,
      total,
      createdAt: new Date(),
    };

    set((state) => {
      const updated = [...state.quotes, newQuote];
      saveData(STORAGE_KEYS.QUOTES, updated);
      return { quotes: updated };
    });
  },

  updateQuote: (id, updates) => {
    set((state) => {
      const updated = state.quotes.map((q) => {
        if (q.id === id) {
          const updatedQuote = { ...q, ...updates };
          // Recalculate totals if line items changed
          if (updates.lineItems || updates.tax !== undefined) {
            const { subtotal, total } = calculateTotal(
              updatedQuote.lineItems,
              updatedQuote.tax
            );
            updatedQuote.subtotal = subtotal;
            updatedQuote.total = total;
          }
          return updatedQuote;
        }
        return q;
      });
      saveData(STORAGE_KEYS.QUOTES, updated);
      return { quotes: updated };
    });
  },

  deleteQuote: (id) => {
    set((state) => {
      const updated = state.quotes.filter((q) => q.id !== id);
      saveData(STORAGE_KEYS.QUOTES, updated);
      return { quotes: updated };
    });
  },

  addInvoice: (invoiceData) => {
    const state = get();
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id: generateUniqueId('invoice'),
      invoiceNumber: generateInvoiceNumber(state.invoices.length),
      createdAt: new Date(),
    };

    set((state) => {
      const updated = [...state.invoices, newInvoice];
      saveData(STORAGE_KEYS.INVOICES, updated);
      return { invoices: updated };
    });
  },

  convertQuoteToInvoice: (quoteId) => {
    const quote = get().getQuoteById(quoteId);
    if (!quote) return;

    const state = get();
    const newInvoice: Invoice = {
      id: generateUniqueId('invoice'),
      invoiceNumber: generateInvoiceNumber(state.invoices.length),
      quoteId: quote.id,
      clientId: quote.clientId,
      clientName: quote.clientName,
      lineItems: quote.lineItems,
      subtotal: quote.subtotal,
      tax: quote.tax,
      total: quote.total,
      paid: false,
      createdAt: new Date(),
      notes: quote.notes,
    };

    set((state) => {
      const updated = [...state.invoices, newInvoice];
      saveData(STORAGE_KEYS.INVOICES, updated);
      // Also update quote status to approved
      get().updateQuote(quoteId, { status: 'approved' });
      return { invoices: updated };
    });
  },

  updateInvoice: (id, updates) => {
    set((state) => {
      const updated = state.invoices.map((inv) =>
        inv.id === id ? { ...inv, ...updates } : inv
      );
      saveData(STORAGE_KEYS.INVOICES, updated);
      return { invoices: updated };
    });
  },

  deleteInvoice: (id) => {
    set((state) => {
      const updated = state.invoices.filter((inv) => inv.id !== id);
      saveData(STORAGE_KEYS.INVOICES, updated);
      return { invoices: updated };
    });
  },

  getQuoteById: (id) => {
    return get().quotes.find((q) => q.id === id);
  },

  getInvoiceById: (id) => {
    return get().invoices.find((inv) => inv.id === id);
  },

  getQuotesByClient: (clientId) => {
    return get().quotes.filter((q) => q.clientId === clientId);
  },

  getInvoicesByClient: (clientId) => {
    return get().invoices.filter((inv) => inv.clientId === clientId);
  },
}));

