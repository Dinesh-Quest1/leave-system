import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatString',
  standalone: true,
})
export class ConcatStringPipe implements PipeTransform {
  transform(
    firstValue: string | null | undefined,
    concatStrings: string[] | null | undefined,
    defaultValue?: string | null,
    ...args: unknown[]
  ): string {
    let result = defaultValue;
    if (!firstValue) return defaultValue || '';
    if (!concatStrings || concatStrings.length === 0) return firstValue;
    result = concatStrings.reduce((accumulator, currentValue) => {
      return accumulator + (accumulator ? ' ' : '') + currentValue || '';
    }, firstValue);
    if (!result) result = defaultValue;
    return result;
  }
}
