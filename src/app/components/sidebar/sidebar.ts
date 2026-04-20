import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAccounts, selectSelectedId } from '../../store/selectors/finance.selectors';
import { selectAccount } from '../../store/actions/finance.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  private store = inject(Store);
  @Output() navChange = new EventEmitter<string>();

  accounts$   = this.store.select(selectAccounts);
  selectedId$ = this.store.select(selectSelectedId);

  activeNav = 'dashboard';

  navItems = [
    { id: 'dashboard',    label: 'Dashboard',    icon: '⊞' },
    { id: 'transactions', label: 'Transactions',  icon: '↕' },
    { id: 'budgets',      label: 'Budgets',       icon: '◎' },
    { id: 'analytics',    label: 'Analytics',     icon: '∿' },
  ];

  setNav(id: string) {
    this.activeNav = id;
    this.navChange.emit(id);
  }

  selectAcc(id: string) {
    this.store.dispatch(selectAccount({ accountId: id }));
  }
}
