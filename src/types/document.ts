/**
 * Quote and Invoice type definitions
 */

export type QuoteStatus = 'draft' | 'sent' | 'approved' | 'rejected';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  clientId: string;
  clientName: string;
  projectId?: string;
  lineItems: LineItem[];
  subtotal: number;
  tax?: number;
  total: number;
  status: QuoteStatus;
  createdAt: Date;
  validUntil?: Date;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  quoteId?: string;
  clientId: string;
  clientName: string;
  lineItems: LineItem[];
  subtotal: number;
  tax?: number;
  total: number;
  paid: boolean;
  paidDate?: Date;
  paidAmount?: number;
  dueDate?: Date;
  createdAt: Date;
  notes?: string;
}

export interface QuoteFormData {
  clientId: string;
  projectId?: string;
  lineItems: LineItem[];
  tax?: number;
  notes?: string;
  validUntil?: Date;
}

