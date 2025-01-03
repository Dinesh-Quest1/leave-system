import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDays',
  standalone: true,
})
export class ConvertDaysPipe implements PipeTransform {
  transform(
    startDate: Date | string | null,
    endDate: Date | string | null,
    ...args: unknown[]
  ): unknown {
    function daysBetween(date1, date2) {
      const time1 = new Date(date1).getTime();
      const time2 = new Date(date2).getTime();

      const differenceInMs = Math.abs(time2 - time1);

      const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

      return Math.floor(differenceInDays);
    }
    if (!endDate) return 1;

    return daysBetween(startDate, endDate);
  }
}
