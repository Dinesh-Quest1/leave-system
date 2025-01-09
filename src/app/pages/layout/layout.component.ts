import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { API_PATHS } from '../../constants/apiPaths';
import { ApiService } from '../../services/api.service';
import { loadLeave, stopLoader } from '../../stores/app.action';
import { Api } from '../home/details/api.service';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    private readonly apiService: ApiService,
    private readonly store: Store,
    private readonly api: Api
  ) {}
  ngOnInit() {
    this.api.fetchUsers();
    this.apiService.getAll(API_PATHS.LEAVES).subscribe((value: any) => {
      this.store.dispatch(loadLeave({ value }));
      this.store.dispatch(stopLoader());
    });
  }
}
