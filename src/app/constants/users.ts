import { FormBuilder, Validators } from '@angular/forms';

const formBuilder = new FormBuilder();

export const formGroup = formBuilder.group({
  basicInfo: formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    status: [false],
  }),
  primaryContactInfo: formBuilder.group({
    address: [''],
    street: [''],
    city: [''],
    state: [''],
    pincode: ['', [Validators.minLength(6), Validators.maxLength(6)]],
  }),
  secondaryContactInfo: formBuilder.group({
    address: [''],
    street: [''],
    city: [''],
    state: [''],
    pincode: ['', [Validators.minLength(6), Validators.maxLength(6)]],
    usePrimaryContact: [false],
  }),
});
