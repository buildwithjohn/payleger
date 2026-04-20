import { Account, Transaction, Budget } from '../models/finance.model';

export const SEED_ACCOUNTS: Account[] = [
  { id: 'acc1', name: 'Main Account',    number: '**** 4521', balance: 1_842_500, currency: 'NGN', type: 'checking',   color: '#1B2A4A' },
  { id: 'acc2', name: 'Savings Vault',   number: '**** 8834', balance: 3_650_000, currency: 'NGN', type: 'savings',    color: '#065F46' },
  { id: 'acc3', name: 'USD Wallet',      number: '**** 2291', balance: 4_210,     currency: 'USD', type: 'investment', color: '#7C2D12' },
];

export const SEED_TRANSACTIONS: Transaction[] = [
  { id: 't01', date: '2026-04-18', description: 'Monthly Salary - Bloomy Technologies', amount: 350_000, type: 'credit', category: 'salary',        accountId: 'acc1', status: 'completed' },
  { id: 't02', date: '2026-04-17', description: 'Shoprite Groceries',                   amount: 12_400,  type: 'debit',  category: 'food',           accountId: 'acc1', status: 'completed' },
  { id: 't03', date: '2026-04-17', description: 'Uber Lagos',                            amount: 3_200,   type: 'debit',  category: 'transport',      accountId: 'acc1', status: 'completed' },
  { id: 't04', date: '2026-04-16', description: 'MTN Airtime & Data',                   amount: 5_000,   type: 'debit',  category: 'utilities',      accountId: 'acc1', status: 'completed' },
  { id: 't05', date: '2026-04-15', description: 'Transfer to Savings Vault',            amount: 100_000, type: 'debit',  category: 'transfer',       accountId: 'acc1', status: 'completed' },
  { id: 't06', date: '2026-04-15', description: 'Transfer from Main Account',           amount: 100_000, type: 'credit', category: 'transfer',       accountId: 'acc2', status: 'completed' },
  { id: 't07', date: '2026-04-14', description: 'Netflix Subscription',                 amount: 4_800,   type: 'debit',  category: 'entertainment',  accountId: 'acc1', status: 'completed' },
  { id: 't08', date: '2026-04-14', description: 'Zara Online Shopping',                 amount: 28_000,  type: 'debit',  category: 'shopping',       accountId: 'acc1', status: 'completed' },
  { id: 't09', date: '2026-04-13', description: 'JAA Studio Client Payment',            amount: 180_000, type: 'credit', category: 'salary',         accountId: 'acc1', status: 'completed' },
  { id: 't10', date: '2026-04-12', description: 'EKEDC Electricity Bill',               amount: 15_000,  type: 'debit',  category: 'utilities',      accountId: 'acc1', status: 'completed' },
  { id: 't11', date: '2026-04-11', description: 'Domino\'s Pizza',                      amount: 7_500,   type: 'debit',  category: 'food',           accountId: 'acc1', status: 'completed' },
  { id: 't12', date: '2026-04-10', description: 'Pharmacyplus Meds',                    amount: 9_200,   type: 'debit',  category: 'healthcare',     accountId: 'acc1', status: 'completed' },
  { id: 't13', date: '2026-04-09', description: 'Amazon KDP Royalties',                 amount: 12_600,  type: 'credit', category: 'salary',         accountId: 'acc3', status: 'completed' },
  { id: 't14', date: '2026-04-08', description: 'Bolt Ride',                            amount: 2_100,   type: 'debit',  category: 'transport',      accountId: 'acc1', status: 'completed' },
  { id: 't15', date: '2026-04-07', description: 'Spotify Premium',                      amount: 2_400,   type: 'debit',  category: 'entertainment',  accountId: 'acc1', status: 'completed' },
  { id: 't16', date: '2026-04-06', description: 'Jumia Order #JM8821',                  amount: 18_500,  type: 'debit',  category: 'shopping',       accountId: 'acc1', status: 'completed' },
  { id: 't17', date: '2026-04-05', description: 'Tantalizers Fast Food',                amount: 4_200,   type: 'debit',  category: 'food',           accountId: 'acc1', status: 'pending'   },
  { id: 't18', date: '2026-04-04', description: 'LAWMA Waste Bill',                     amount: 3_500,   type: 'debit',  category: 'utilities',      accountId: 'acc1', status: 'completed' },
  { id: 't19', date: '2026-04-03', description: 'Freelance - Ahren Foundation',         amount: 250_000, type: 'credit', category: 'salary',         accountId: 'acc1', status: 'completed' },
  { id: 't20', date: '2026-04-02', description: 'CowryWise Investment',                 amount: 50_000,  type: 'debit',  category: 'other',          accountId: 'acc2', status: 'completed' },
];

export const SEED_BUDGETS: Budget[] = [
  { id: 'b1', category: 'food',          limit: 40_000,  spent: 24_100, period: 'monthly' },
  { id: 'b2', category: 'transport',     limit: 20_000,  spent: 5_300,  period: 'monthly' },
  { id: 'b3', category: 'utilities',     limit: 30_000,  spent: 23_500, period: 'monthly' },
  { id: 'b4', category: 'shopping',      limit: 50_000,  spent: 46_500, period: 'monthly' },
  { id: 'b5', category: 'entertainment', limit: 15_000,  spent: 7_200,  period: 'monthly' },
  { id: 'b6', category: 'healthcare',    limit: 20_000,  spent: 9_200,  period: 'monthly' },
];
