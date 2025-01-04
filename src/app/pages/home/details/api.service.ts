import { Injectable } from '@angular/core';
import { User } from '../../../models/User';
import { ApiService } from '../../../services/api.service';
import { API_PATHS } from '../../../constants/apiPaths';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadUser } from '../../../stores/app.action';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store
  ) {}

  createUser(user: User): Observable<User> {
    return this.apiService.post(API_PATHS.USERS, user);
  }

  fetchUsers(): void {
    this.apiService.getAll(API_PATHS.USERS).subscribe((users: User[]) => {
      this.store.dispatch(
        loadUser({ value: users.sort((a: User, b: User) => b.id - a.id) })
      );
    });
  }
}
