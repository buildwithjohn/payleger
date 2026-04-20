import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '../utils/date.util';

@Pipe({ name: 'naira', standalone: true })
export class NairaPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = 'NGN'): string {
    if (value == null) return formatCurrency(0, currency);
    return formatCurrency(value, currency);
  }
}
