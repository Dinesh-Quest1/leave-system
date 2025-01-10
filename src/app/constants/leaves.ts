import { FormBuilder, Validators } from '@angular/forms';
import { minDate } from '../validators/leave';

const formBuilder = new FormBuilder();

export const formGroup = formBuilder.group(
  {
    typeOfLeave: ['', [Validators.required]],
    comments: [''],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
  },
  { validators: [minDate()] }
);
export const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
