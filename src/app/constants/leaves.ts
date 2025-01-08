import { FormBuilder, Validators } from '@angular/forms';

const formBuilder = new FormBuilder();

export const formGroup = formBuilder.group({
  typeOfLeave: ['', [Validators.required]],
  comments: [''],
  startDate: ['', [Validators.required]],
  endDate: ['', [Validators.required]],
});
