/**
 * Client (CRM) type definitions
 */

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  tags?: string[];
  photos?: string[]; // URIs
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientFormData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

