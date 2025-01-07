import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { API_PATHS } from '../../../constants/apiPaths';
import { User } from '../../../ts/User.types';
import { ApiService } from '../../../services/api.service';
import { loadUser, startLoader, stopLoader } from '../../../stores/app.action';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store
  ) {}

  createUser(user: User): Observable<User> {
    const response = this.apiService.post(API_PATHS.USERS, user);
    this.fetchUsers();
    return response;
  }

  updateUser(user: User, id: string | number): Observable<User> {
    const response = this.apiService.put(`${API_PATHS.USERS}`, id, user);
    return response;
  }

  deleteUser(id: number | string): Observable<any> {
    const response = this.apiService.delete(`${API_PATHS.USERS}`, id);
    this.fetchUsers();
    return response;
  }

  fetchUsers(): void {
    this.store.dispatch(startLoader());
    this.apiService.getAll(API_PATHS.USERS).subscribe((users: User[]) => {
      console.log('fetching users');
      this.store.dispatch(loadUser({ value: users }));
      this.store.dispatch(stopLoader());
    });
  }
}
