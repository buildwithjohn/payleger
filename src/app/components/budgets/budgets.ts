import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectBudgets } from '../../store/selectors/finance.selectors';
import { NairaPipe } from '../../pipes/naira.pipe';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, NairaPipe],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
})
export class BudgetsComponent {
  private store = inject(Store);
  budgets$ = this.store.select(selectBudgets);

  percent(spent: number, limit: number): number {
    return Math.min(Math.round((spent / limit) * 100), 100);
  }

  statusClass(spent: number, limit: number): string {
    const pct = (spent / limit) * 100;
    if (pct >= 90) return 'danger';
    if (pct >= 70) return 'warning';
    return 'safe';
  }

  categoryIcon(cat: string): string {
    const map: Record<string, string> = {
      food: '🍔', transport: '🚗', utilities: '💡',
      shopping: '🛍', healthcare: '💊', entertainment: '🎬',
    };
    return map[cat] ?? '📦';
  }

  categoryLabel(cat: string): string {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }
}
