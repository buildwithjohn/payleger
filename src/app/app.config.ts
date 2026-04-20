import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { financeReducer } from './store/reducers/finance.reducer';
import { FinanceEffects } from './store/effects/finance.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideStore({ finance: financeReducer }),
    provideEffects([FinanceEffects]),
  ],
};
