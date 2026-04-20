import { createReducer, on } from '@ngrx/store';
import { AppState } from '../../models/finance.model';
import { SEED_ACCOUNTS, SEED_TRANSACTIONS, SEED_BUDGETS } from '../../models/seed-data';
import * as Actions from '../actions/finance.actions';

export const initialState: AppState = {
  accounts: [],
  transactions: [],
  budgets: [],
  selectedAccountId: null,
  filter: { search: '', category: 'all', type: 'all', dateRange: '30d' },
  loading: false,
};

export const financeReducer = createReducer(
  initialState,

  on(Actions.loadData, state => ({ ...state, loading: true })),

  on(Actions.loadDataSuccess, state => ({
    ...state,
    accounts: SEED_ACCOUNTS,
    transactions: SEED_TRANSACTIONS,
    budgets: SEED_BUDGETS,
    selectedAccountId: SEED_ACCOUNTS[0].id,
    loading: false,
  })),

  on(Actions.selectAccount, (state, { accountId }) => ({
    ...state,
    selectedAccountId: accountId,
  })),

  on(Actions.updateFilter, (state, { filter }) => ({
    ...state,
    filter: { ...state.filter, ...filter },
  })),

  on(Actions.addTransaction, (state, { transaction }) => ({
    ...state,
    transactions: [transaction, ...state.transactions],
  })),
);
