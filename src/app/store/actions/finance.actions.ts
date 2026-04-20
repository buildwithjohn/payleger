import { createAction, props } from '@ngrx/store';
import { Transaction, TransactionFilter, Account } from '../../models/finance.model';

export const loadData        = createAction('[Finance] Load Data');
export const loadDataSuccess = createAction('[Finance] Load Data Success');

export const selectAccount = createAction(
  '[Finance] Select Account',
  props<{ accountId: string | null }>()
);

export const updateFilter = createAction(
  '[Finance] Update Filter',
  props<{ filter: Partial<TransactionFilter> }>()
);

export const addTransaction = createAction(
  '[Finance] Add Transaction',
  props<{ transaction: Transaction }>()
);
