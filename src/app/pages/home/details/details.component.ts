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
import { Api } from './api.service';
import { User } from '../../../models/User';

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
  usersList: User[];

  store: Store = inject(Store);
  apiService: Api = inject(Api);

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
    const payload = this.currentUser
      ? this.userForm.value
      : { ...this.userForm.value, id: this.usersList.length + 1 };
    this.apiService.createUser(payload).subscribe((response) => {
      this.apiService.fetchUsers();
      this.router.navigate(['/users']);
    });
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  applyLeave() {
    this.router.navigateByUrl(
      '/leaves/details' + '?user=' + this.currentUser.id
    );
  }

  ngOnInit() {
    const userId = this.route.snapshot.queryParams?.['user'];

    this.store.select(getUsers).subscribe((users) => {
      this.usersList = users;
      if (userId) {
        const editUser = users.find((u) => u.id === parseInt(userId));
        this.currentUser = this.userForm.patchValue(editUser);
      }
    });
  }
}
