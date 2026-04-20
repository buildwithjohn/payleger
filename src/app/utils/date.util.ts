export function subDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

export function parseISO(s: string): Date {
  return new Date(s);
}

export function isAfter(date: Date, after: Date): boolean {
  return date.getTime() > after.getTime();
}

export function formatCurrency(amount: number, currency = 'NGN'): string {
  if (currency === 'NGN') {
    return '₦' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' });
}
