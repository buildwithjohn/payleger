import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  selectSelectedAccount, selectTotalBalance,
  selectMonthlyIncome, selectMonthlyExpenses,
  selectFilteredTransactions, selectSparklineData,
  selectLoading, selectAccounts
} from '../../store/selectors/finance.selectors';
import { NairaPipe } from '../../pipes/naira.pipe';
import { formatDate } from '../../utils/date.util';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NairaPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private store = inject(Store);

  account$      = this.store.select(selectSelectedAccount);
  totalBalance$ = this.store.select(selectTotalBalance);
  income$       = this.store.select(selectMonthlyIncome);
  expenses$     = this.store.select(selectMonthlyExpenses);
  transactions$ = this.store.select(selectFilteredTransactions);
  sparkline$    = this.store.select(selectSparklineData);
  loading$      = this.store.select(selectLoading);
  accounts$     = this.store.select(selectAccounts);

  ngOnInit() {}

  formatDate = formatDate;

  categoryIcon(cat: string): string {
    const map: Record<string, string> = {
      salary: '💼', transfer: '↔', food: '🍔', transport: '🚗',
      utilities: '💡', shopping: '🛍', healthcare: '💊', entertainment: '🎬', other: '📦',
    };
    return map[cat] ?? '📦';
  }

  sparklinePath(data: number[]): string {
    if (!data.length) return '';
    const w = 120, h = 40;
    const min = Math.min(...data), max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }
}
