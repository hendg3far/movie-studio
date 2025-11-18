import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas',
  standalone: true
})
export class NumberWithCommasPipe implements PipeTransform {
  transform(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
