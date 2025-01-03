import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupArrayByKey',
  standalone: true,
})
export class GroupArrayByKeyPipe implements PipeTransform {
  transform(value: any[], key: string, ...rest: any[]): unknown {
    return value.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);

      return result;
    }, {});
  }
}
