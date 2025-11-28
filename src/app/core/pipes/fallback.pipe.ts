import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallback',
  standalone: true
})
export class FallbackPipe implements PipeTransform {

  transform(value: string, fallback: string): string {
    return value ? value : fallback;
  }
}
