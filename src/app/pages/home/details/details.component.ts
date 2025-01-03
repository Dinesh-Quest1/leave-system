import { Component, inject, NgModule, OnInit } from '@angular/core';
import { DetailsHeaderComponent } from '../../../components/details-header/details-header.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { PrimaryContactInfoComponent } from './primary-contact-info/primary-contact-info.component';
import { SecondaryContactInfoComponent } from './secondary-contact-info/secondary-contact-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUsers } from '../../../stores/app.selector';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputFieldComponent } from '../../../components/formFields/input-field/input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [
    DetailsHeaderComponent,
    BasicInfoComponent,
    PrimaryContactInfoComponent,
    SecondaryContactInfoComponent,
    InputFieldComponent,
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

  constructor() {
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  onSubmit(values: any) {
    console.log(values);
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
