import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { selectFilteredTransactions, selectFilter } from '../../store/selectors/finance.selectors';
import { updateFilter } from '../../store/actions/finance.actions';
import { NairaPipe } from '../../pipes/naira.pipe';
import { formatDate } from '../../utils/date.util';
import { TransactionCategory } from '../../models/finance.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NairaPipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class TransactionsComponent implements OnInit {
  private store = inject(Store);
  private fb    = inject(FormBuilder);

  transactions$ = this.store.select(selectFilteredTransactions);

  filterForm = this.fb.group({
    search:    [''],
    category:  ['all'],
    type:      ['all'],
    dateRange: ['30d'],
  });

  categories: { value: string; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'salary', label: 'Salary / Income' },
    { value: 'food', label: 'Food' },
    { value: 'transport', label: 'Transport' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'other', label: 'Other' },
  ];

  formatDate = formatDate;

  ngOnInit(): void {
    // RxJS debounce on search input
    this.filterForm.get('search')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => {
      this.store.dispatch(updateFilter({ filter: { search: search ?? '' } }));
    });

    // Immediate dispatch for dropdowns
    this.filterForm.get('category')!.valueChanges.subscribe(category => {
      this.store.dispatch(updateFilter({ filter: { category: (category ?? 'all') as any } }));
    });
    this.filterForm.get('type')!.valueChanges.subscribe(type => {
      this.store.dispatch(updateFilter({ filter: { type: (type ?? 'all') as any } }));
    });
    this.filterForm.get('dateRange')!.valueChanges.subscribe(dateRange => {
      this.store.dispatch(updateFilter({ filter: { dateRange: (dateRange ?? '30d') as any } }));
    });
  }

  categoryIcon(cat: string): string {
    const map: Record<string, string> = {
      salary:'💼', transfer:'↔', food:'🍔', transport:'🚗',
      utilities:'💡', shopping:'🛍', healthcare:'💊', entertainment:'🎬', other:'📦',
    };
    return map[cat] ?? '📦';
  }
}
