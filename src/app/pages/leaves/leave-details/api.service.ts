import { Injectable } from '@angular/core';
import { Leave } from '../../../ts/Leave.types';
import { ApiService } from '../../../services/api.service';
import { API_PATHS } from '../../../constants/apiPaths';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadLeave } from '../../../stores/app.action';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store
  ) {}

  createLeave(leave: Leave): Observable<Leave> {
    const payload: Leave = {
      ...leave,
      startDate: formatDate(leave.startDate, 'yyyy-MM-dd', 'en-gb'),
      endDate: formatDate(leave.endDate, 'yyyy-MM-dd', 'en-gb'),
    };

    const response = this.apiService.post(API_PATHS.LEAVES, payload);
    this.fetchLeaves();
    return response;
  }

  fetchLeaves(): void {
    this.apiService.getAll(API_PATHS.LEAVES).subscribe((leaves: Leave[]) => {
      this.store.dispatch(
        loadLeave({
          value: leaves.sort((a: any, b: any) => b.userId - a.userId),
        })
      );
    });
  }
}
