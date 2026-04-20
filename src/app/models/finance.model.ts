export type TransactionType = 'credit' | 'debit';

export type TransactionCategory =
  | 'salary' | 'transfer' | 'food' | 'transport'
  | 'utilities' | 'shopping' | 'healthcare' | 'entertainment' | 'other';

export interface Transaction {
  id: string;
  date: string;         // ISO date string
  description: string;
  amount: number;       // always positive; type determines sign
  type: TransactionType;
  category: TransactionCategory;
  accountId: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Account {
  id: string;
  name: string;
  number: string;       // masked e.g. **** 4521
  balance: number;
  currency: string;
  type: 'checking' | 'savings' | 'investment';
  color: string;        // hex for card gradient
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  limit: number;
  spent: number;
  period: 'monthly';
}

export interface AppState {
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  selectedAccountId: string | null;
  filter: TransactionFilter;
  loading: boolean;
}

export interface TransactionFilter {
  search: string;
  category: TransactionCategory | 'all';
  type: TransactionType | 'all';
  dateRange: 'all' | '7d' | '30d' | '90d';
}
