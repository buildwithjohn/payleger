import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, Transaction } from '../../models/finance.model';
import { subDays, parseISO, isAfter } from '../../utils/date.util';

export const selectFinance = createFeatureSelector<AppState>('finance');

export const selectAccounts       = createSelector(selectFinance, s => s.accounts);
export const selectAllTransactions= createSelector(selectFinance, s => s.transactions);
export const selectBudgets        = createSelector(selectFinance, s => s.budgets);
export const selectSelectedId     = createSelector(selectFinance, s => s.selectedAccountId);
export const selectFilter         = createSelector(selectFinance, s => s.filter);
export const selectLoading        = createSelector(selectFinance, s => s.loading);

export const selectSelectedAccount = createSelector(
  selectAccounts, selectSelectedId,
  (accounts, id) => accounts.find(a => a.id === id) ?? null
);

export const selectTotalBalance = createSelector(
  selectAccounts,
  accounts => accounts.filter(a => a.currency === 'NGN').reduce((sum, a) => sum + a.balance, 0)
);

export const selectFilteredTransactions = createSelector(
  selectAllTransactions, selectFilter, selectSelectedId,
  (txs, filter, accountId) => {
    let result = accountId ? txs.filter(t => t.accountId === accountId) : txs;

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(t => t.description.toLowerCase().includes(q));
    }
    if (filter.category !== 'all') result = result.filter(t => t.category === filter.category);
    if (filter.type !== 'all')     result = result.filter(t => t.type === filter.type);
    if (filter.dateRange !== 'all') {
      const days = filter.dateRange === '7d' ? 7 : filter.dateRange === '30d' ? 30 : 90;
      const cutoff = subDays(new Date(), days);
      result = result.filter(t => isAfter(parseISO(t.date), cutoff));
    }
    return result;
  }
);

export const selectMonthlyIncome = createSelector(
  selectAllTransactions, selectSelectedId,
  (txs, id) => {
    const now = new Date();
    return txs
      .filter(t => t.accountId === id && t.type === 'credit' && new Date(t.date).getMonth() === now.getMonth())
      .reduce((s, t) => s + t.amount, 0);
  }
);

export const selectMonthlyExpenses = createSelector(
  selectAllTransactions, selectSelectedId,
  (txs, id) => {
    const now = new Date();
    return txs
      .filter(t => t.accountId === id && t.type === 'debit' && new Date(t.date).getMonth() === now.getMonth())
      .reduce((s, t) => s + t.amount, 0);
  }
);

export const selectCategoryBreakdown = createSelector(
  selectAllTransactions, selectSelectedId,
  (txs, id) => {
    const debits = txs.filter(t => t.accountId === id && t.type === 'debit');
    const map: Record<string, number> = {};
    debits.forEach(t => { map[t.category] = (map[t.category] ?? 0) + t.amount; });
    return map;
  }
);

export const selectSparklineData = createSelector(
  selectAllTransactions, selectSelectedId,
  (txs, id) => {
    // Last 7 days net flow
    const result: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const ds = d.toISOString().split('T')[0];
      const dayTxs = txs.filter(t => t.accountId === id && t.date === ds);
      const net = dayTxs.reduce((s, t) => s + (t.type === 'credit' ? t.amount : -t.amount), 0);
      result.push(net);
    }
    return result;
  }
);
