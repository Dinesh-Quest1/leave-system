import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
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
import { User } from '../../../models/User';
import { StorageService } from '../../../services/storage.service';
import { snackBar, startLoader, stopLoader } from '../../../stores/app.action';
import { getUsers } from '../../../stores/app.selector';
import { Api } from './api.service';
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
export class UserDetails implements OnInit, AfterViewInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  usersList: User[];

  store: Store = inject(Store);
  apiService: Api = inject(Api);

  currentUser: any;

  userForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private readonly storage: StorageService
  ) {
    this.userForm = formBuilder.group({
      basicInfo: formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
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
  }

  onSubmit(values: any) {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
      return;
    }
    if (this.currentUser) this.updateUser();
    else this.createUser();
  }

  createUser() {
    this.store.dispatch(startLoader());
    this.apiService
      .createUser({ ...this.userForm.value })
      .subscribe((response) => {
        this.store.dispatch(snackBar({ message: 'User created successfully' }));
        this.apiService.fetchUsers();
        this.store.dispatch(stopLoader());
        this.router.navigate(['/users']);
      });
  }

  updateUser() {
    this.store.dispatch(startLoader());
    this.apiService
      .updateUser({ ...this.userForm.value }, this.currentUser.id)
      .subscribe((response) => {
        this.store.dispatch(snackBar({ message: 'User updated successfully' }));
        this.apiService.fetchUsers();
        this.store.dispatch(stopLoader());
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
        const editUser = users.find((u) => u.id === userId);
        this.currentUser = editUser;
        this.userForm.patchValue(editUser);
      }
    });

    this.userForm.patchValue(this.storage.getItem('userForm'));
  }

  updateUrlState(key: string, value: string) {
    this.router.navigate([], {
      state: { [key]: value },
    });
  }

  ngAfterViewInit() {
    this.userForm
      .get('secondaryContactInfo.usePrimaryContact')
      .valueChanges.subscribe((value: any) => {
        if (value) {
          this.userForm
            .get('secondaryContactInfo')
            .patchValue(this.userForm.get('primaryContactInfo').value);
        }
      });

    this.userForm.get('primaryContactInfo').valueChanges.subscribe((value) => {
      if (this.userForm.get('secondaryContactInfo.usePrimaryContact').value) {
        this.userForm.get('secondaryContactInfo').patchValue(value);
      }
    });

    this.userForm.valueChanges.subscribe((value: User) => {
      this.storage.storeItem('userForm', value);
    });
  }

  ngOnDestroy() {
    this.storage.removeItem('userForm');
  }
}
