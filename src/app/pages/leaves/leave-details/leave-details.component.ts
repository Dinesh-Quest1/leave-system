import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DetailsHeaderComponent } from '../../../components/details-header/details-header.component';
import { DateFieldComponent } from '../../../components/formFields/date-field/date-field.component';
import { InputFieldComponent } from '../../../components/formFields/input-field/input-field.component';
import { TextAreaComponent } from '../../../components/formFields/text-area/text-area.component';
import { formGroup } from '../../../constants/leaves';
import { ConcatStringPipe } from '../../../pipes/concat-string.pipe';
import { getUsers } from '../../../stores/app.selector';
import { User } from '../../../ts/User.types';
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
    ConcatStringPipe,
  ],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss',
})
export class LeaveDetailsComponent {
  currentUser: User = null;
  leaveForm: FormGroup;
  usersList: User[];

  constructor(
    private readonly apiService: Api,
    private readonly router: Router,
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {
    this.leaveForm = formGroup;
  }

  onSubmit() {
    if (!this.leaveForm.valid) {
      this.leaveForm.markAllAsTouched();
      this.leaveForm.markAsDirty();
      return;
    }
    this.createLeave();
  }

  onCancel() {
    this.router.navigate(['/leaves']);
  }

  createLeave() {
    this.apiService
      .createLeave({ ...this.leaveForm.value, userId: this.currentUser.id })
      .subscribe(() => {
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
