import { Component, inject, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  selectCategoryBreakdown, selectMonthlyIncome,
  selectMonthlyExpenses, selectFilteredTransactions
} from '../../store/selectors/finance.selectors';
import { NairaPipe } from '../../pipes/naira.pipe';
import { Chart, ArcElement, DoughnutController, BarController, BarElement,
  CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, DoughnutController, BarController, BarElement,
  CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NairaPipe],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  private store   = inject(Store);
  private destroy$ = new Subject<void>();

  @ViewChild('donutCanvas') donutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas')   barCanvas!:   ElementRef<HTMLCanvasElement>;

  income$    = this.store.select(selectMonthlyIncome);
  expenses$  = this.store.select(selectMonthlyExpenses);
  breakdown$ = this.store.select(selectCategoryBreakdown);

  breakdown: Record<string, number> = {};
  income   = 0;
  expenses = 0;

  private donutChart?: Chart;
  private barChart?: Chart;

  readonly COLORS: Record<string, string> = {
    food: '#F59E0B', transport: '#3B82F6', utilities: '#8B5CF6',
    shopping: '#EC4899', healthcare: '#10B981', entertainment: '#F97316',
    salary: '#34D399', transfer: '#6B7280', other: '#94A3B8',
  };

  ngOnInit(): void {
    this.breakdown$.pipe(takeUntil(this.destroy$)).subscribe(b => {
      this.breakdown = b;
      this.updateCharts();
    });
    this.income$.pipe(takeUntil(this.destroy$)).subscribe(v => { this.income = v; });
    this.expenses$.pipe(takeUntil(this.destroy$)).subscribe(v => { this.expenses = v; });
  }

  ngAfterViewInit(): void {
    this.buildCharts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.donutChart?.destroy();
    this.barChart?.destroy();
  }

  private buildCharts(): void {
    const cats    = Object.keys(this.breakdown);
    const amounts = Object.values(this.breakdown);
    const colors  = cats.map(c => this.COLORS[c] ?? '#94A3B8');

    // Doughnut
    if (this.donutCanvas) {
      this.donutChart = new Chart(this.donutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: cats.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
          datasets: [{ data: amounts, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }],
        },
        options: {
          cutout: '68%',
          plugins: { legend: { display: false }, tooltip: { callbacks: {
            label: ctx => ` ₦${(ctx.raw as number).toLocaleString()}`
          }}},
          animation: { animateRotate: true, duration: 800 },
        },
      });
    }

    // Bar — income vs expenses last 6 months (simulated)
    const months  = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    const incomes = [280000, 310000, 295000, 420000, 380000, this.income];
    const expArr  = [185000, 210000, 175000, 260000, 230000, this.expenses];

    if (this.barCanvas) {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            { label: 'Income',   data: incomes, backgroundColor: 'rgba(52,211,153,0.7)',  borderRadius: 4 },
            { label: 'Expenses', data: expArr,  backgroundColor: 'rgba(248,113,113,0.7)', borderRadius: 4 },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: '#6b7280', font: { size: 12 } } },
            tooltip: { callbacks: { label: ctx => ` ₦${(ctx.raw as number).toLocaleString()}` } },
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } },
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280',
              callback: v => '₦' + Number(v).toLocaleString() } },
          },
        },
      });
    }
  }

  private updateCharts(): void {
    if (!this.donutChart) return;
    const cats    = Object.keys(this.breakdown);
    const amounts = Object.values(this.breakdown);
    this.donutChart.data.labels  = cats.map(c => c.charAt(0).toUpperCase() + c.slice(1));
    this.donutChart.data.datasets[0].data = amounts;
    this.donutChart.data.datasets[0].backgroundColor = cats.map(c => this.COLORS[c] ?? '#94A3B8') as any;
    this.donutChart.update();
  }

  categoryEntries(): { key: string; value: number }[] {
    return Object.entries(this.breakdown)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value);
  }

  savingsRate(): number {
    if (!this.income) return 0;
    return Math.round(((this.income - this.expenses) / this.income) * 100);
  }
}
