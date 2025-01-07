import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';
import { API_PATHS } from '../../constants/apiPaths';
import { ApiService } from '../../services/api.service';
import { loadLeave, startLoader, stopLoader } from '../../stores/app.action';
import { Api } from '../home/details/api.service';
import { UsersList } from '../home/list/list.component';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [AppBarComponent, UsersList, RouterModule],
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
    this.store.dispatch(startLoader());
    this.apiService.getAll(API_PATHS.LEAVES).subscribe((value: any) => {
      this.store.dispatch(loadLeave({ value }));
      this.store.dispatch(stopLoader());
    });
  }
}
