import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DetailsHeaderComponent } from '../../../components/details-header/details-header.component';
import { formGroup } from '../../../constants/users';
import { ConcatStringPipe } from '../../../pipes/concat-string.pipe';
import { StorageService } from '../../../services/storage.service';
import { snackBar, startLoader, stopLoader } from '../../../stores/app.action';
import { getUsers } from '../../../stores/app.selector';
import { User } from '../../../ts/User.types';
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
    ConcatStringPipe,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class UserDetails implements OnInit, AfterViewInit {
  usersList: User[];
  currentUser: User;
  isViewMode: boolean | null = false;

  userForm: FormGroup;

  constructor(
    private readonly storage: StorageService,
    private readonly apiService: Api,
    private readonly store: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.userForm = formGroup;
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
      return;
    }
    if (this.currentUser) this.updateUser();
    else this.createUser();
  }

  createUser(): void {
    this.store.dispatch(startLoader());
    this.apiService.createUser({ ...this.userForm.value }).subscribe(() => {
      this.store.dispatch(snackBar({ message: 'User created successfully' }));
      this.apiService.fetchUsers();
      this.store.dispatch(stopLoader());
      this.router.navigate(['/users']);
    });
  }

  updateUser(): void {
    this.store.dispatch(startLoader());
    this.apiService
      .updateUser({ ...this.userForm.value }, this.currentUser.id)
      .subscribe(() => {
        this.store.dispatch(snackBar({ message: 'User updated successfully' }));
        this.apiService.fetchUsers();
        this.store.dispatch(stopLoader());
        this.router.navigate(['/users']);
      });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }

  applyLeave(): void {
    this.router.navigateByUrl('/leaves/details/' + this.currentUser.id);
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('user');
    this.isViewMode = this.route.snapshot.queryParams?.['action'] === 'view';

    this.store.select(getUsers).subscribe((users: User[]) => {
      this.usersList = users;
      if (userId) {
        const editUser = users.find((user: User) => user.id === userId);
        this.currentUser = editUser;
        this.userForm.patchValue(editUser);
      }
    });

    this.userForm.patchValue(this.storage.getItem('userForm'));
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
