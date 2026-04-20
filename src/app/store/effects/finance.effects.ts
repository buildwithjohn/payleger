import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, delay } from 'rxjs/operators';
import * as FinanceActions from '../actions/finance.actions';

@Injectable()
export class FinanceEffects {
  constructor(private actions$: Actions) {}

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceActions.loadData),
      switchMap(() =>
        // Simulate API call latency
        of(null).pipe(
          delay(600),
          map(() => FinanceActions.loadDataSuccess())
        )
      )
    )
  );
}
