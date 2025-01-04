import { Component } from '@angular/core';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';
import { UsersList } from '../home/list/list.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { API_PATHS } from '../../constants/apiPaths';
import { loadLeave, loadUser } from '../../stores/app.action';
import { Store } from '@ngrx/store';
import { Api } from '../home/details/api.service';

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

    this.apiService.getAll(API_PATHS.LEAVES).subscribe((value: any) => {
      this.store.dispatch(loadLeave({ value }));
    });
  }
}
