import { Component, inject } from '@angular/core';
import { getUsers } from '../../../stores/app.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DetailsHeaderComponent } from '../../../components/details-header/details-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { DateFieldComponent } from '../../../components/formFields/date-field/date-field.component';
import { InputFieldComponent } from '../../../components/formFields/input-field/input-field.component';
import { TextAreaComponent } from '../../../components/formFields/text-area/text-area.component';
import { Api } from './api.service';

@Component({
  selector: 'app-leave-details',
  standalone: true,
  imports: [
    DetailsHeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    DateFieldComponent,
    InputFieldComponent,
    TextAreaComponent,
  ],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss',
})
export class LeaveDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  store: Store = inject(Store);

  currentUser: any;

  leaveForm: FormGroup;
  usersList: any[];

  onCancel() {
    this.router.navigate(['/leaves']);
  }

  constructor(formBuilder: FormBuilder, private readonly apiService: Api) {
    this.leaveForm = formBuilder.group({
      typeOfLeave: ['', [Validators.required]],
      comments: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  onSubmit(values: any) {
    if (!this.leaveForm.valid) {
      this.leaveForm.markAllAsTouched();
      this.leaveForm.markAsDirty();
      return;
    }
    this.createLeave();
  }

  createLeave() {
    this.apiService
      .createLeave({ ...this.leaveForm.value, userId: this.currentUser.id })
      .subscribe((response) => {
        this.apiService.fetchLeaves();
        this.router.navigate(['/leaves']);
      });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap?.get('user');

    this.store.select(getUsers).subscribe((users) => {
      this.usersList = users;
      if (userId) {
        const editUser = users.find((u) => u.id === userId);
        this.currentUser = editUser;
        this.leaveForm.patchValue(editUser);
      }
    });
  }
}
