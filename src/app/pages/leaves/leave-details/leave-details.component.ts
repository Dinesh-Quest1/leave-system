import { Component, inject } from '@angular/core';
import { getUsers } from '../../../stores/app.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leave-details',
  standalone: true,
  imports: [],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss',
})
export class LeaveDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  store: Store = inject(Store);

  currentUser: any;

  userForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.userForm = formBuilder.group({
      typeOfLeave: [''],
      comments: [''],
      startDate: [''],
      endDate: [''],
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
