import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadData } from './store/actions/finance.actions';
import { SidebarComponent } from './components/sidebar/sidebar';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TransactionsComponent } from './components/transactions/transactions';
import { BudgetsComponent } from './components/budgets/budgets';
import { AnalyticsComponent } from './components/analytics/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    DashboardComponent,
    TransactionsComponent,
    BudgetsComponent,
    AnalyticsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(Store);
  activeView = signal<string>('dashboard');

  ngOnInit(): void {
    this.store.dispatch(loadData());
  }

  setView(view: string): void {
    this.activeView.set(view);
  }
}
