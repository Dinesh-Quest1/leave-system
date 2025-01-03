import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DetailsHeaderComponent } from '../../../components/details-header/details-header.component';
import { getUsers } from '../../../stores/app.selector';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { PrimaryContactInfoComponent } from './primary-contact-info/primary-contact-info.component';
import { SecondaryContactInfoComponent } from './secondary-contact-info/secondary-contact-info.component';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [
    DetailsHeaderComponent,
    BasicInfoComponent,
    PrimaryContactInfoComponent,
    SecondaryContactInfoComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class UserDetails implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  store: Store = inject(Store);

  currentUser: any;

  userForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      basicInfo: formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        status: [false],
      }),
      primaryContactInfo: formBuilder.group({
        address: [''],
        street: [''],
        city: [''],
        state: [''],
        pincode: [''],
      }),
      secondaryContactInfo: formBuilder.group({
        address: [''],
        street: [''],
        city: [''],
        state: [''],
        pincode: [''],
        usePrimaryContact: [false],
      }),
    });
  }

  onSubmit(values: any) {
    console.log(this.userForm.value);
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('user');

    if (userId) {
      this.store
        .select(getUsers)
        .subscribe(
          (users) => (this.currentUser = users.find((u) => u.id === userId))
        );
    }
  }
}
