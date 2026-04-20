# PayLedger — Personal Finance Dashboard

> Built by [John Ayomide Akinola](https://johnakinola.com) · JAA Studio

A production-grade personal finance dashboard built with **Angular 21**, **NgRx**, **RxJS**, and **Chart.js**. Features real-time transaction tracking, category-based spending analytics, budget monitoring with threshold alerts, and a multi-account balance overview — all in a responsive, banking-grade dark interface.

## Features

- Multi-account dashboard with balance overview and sparkline charts
- Transaction feed with RxJS-powered search (debounceTime + distinctUntilChanged)
- Budget tracker with colour-coded progress bars and threshold alerts
- Analytics: Chart.js doughnut (spending by category) + 6-month income vs expenses bar chart
- NgRx full architecture: Store, Actions, Reducers, Effects, Selectors

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 (standalone components) |
| State | NgRx Store, Effects, Selectors |
| Reactive | RxJS — debounceTime, distinctUntilChanged, takeUntil |
| Charts | Chart.js — Doughnut, Bar |
| Styling | SCSS with CSS custom properties |
| Deployment | Vercel |

## Angular Concepts Demonstrated

| Concept | Location |
|---|---|
| NgRx Store, Actions, Reducers, Effects, Selectors | `src/app/store/` |
| Angular Signals | `app.ts` — activeView signal |
| AfterViewInit + OnDestroy lifecycle | `analytics.ts` — Chart.js |
| takeUntil subscription cleanup | `analytics.ts` |
| ReactiveFormsModule + debounceTime | `transactions.ts` |
| ViewChild + ElementRef | `analytics.ts` — canvas refs |
| Custom PipeTransform | `naira.pipe.ts` |
| async pipe + nullish coalescing | All templates |

## Run Locally

```bash
npm install
npm start
```

## Author

**John Ayomide Akinola** — [johnakinola.com](https://johnakinola.com) · [@buildwithjaa](https://youtube.com/@buildwithjaa)

> JAA Studio — Build. Teach. Create.
