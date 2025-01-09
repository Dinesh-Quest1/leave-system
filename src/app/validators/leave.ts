import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minDate(): ValidatorFn {
  return (control: FormControl<any>): ValidationErrors | null => {
    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;
    const isExceeds = new Date(startDate) > new Date(endDate);
    return isExceeds
      ? { dateExceeds: { error: 'End date must be after start date' } }
      : null;
  };
}
