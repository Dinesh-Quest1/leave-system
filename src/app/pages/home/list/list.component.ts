import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatBaseTableComponent } from '../../../components/mat-base-table/mat-base-table.component';
import { StatusComponent } from '../../../components/status/status.component';
import { columns } from '../../../constants/columns';
import { ApiService } from '../../../services/api.service';
import { snackBar } from '../../../stores/app.action';
import { getUsers } from '../../../stores/app.selector';
import { User } from '../../../ts/User.types';
import { Api } from '../details/api.service';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, MatBaseTableComponent, StatusComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ApiService],
})
export class UsersList implements OnInit, AfterViewInit {
  displayedColumns: any[] = columns;
  list: any[] = [];
  currentPage = 0;
  pageSize = 5;
  columns: any[] = columns;
  deleteId: any;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly apiService: Api,
    private readonly cdr: ChangeDetectorRef
  ) {}

  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  onValueChange(user: User, value: boolean): void {
    this.apiService
      .updateUser(
        { ...user, basicInfo: { ...user.basicInfo, status: value } },
        user?.id
      )
      .subscribe(() => {
        this.apiService.fetchUsers();
      });
  }

  handleRowAction({ action, element, actionType }: any): void {
    if (actionType === 'delete') {
      this.deleteId = element?.id;
      return;
    }
    action(element, this.router);
  }

  ngOnInit() {
    this.store.select(getUsers).subscribe((value: any[]) => {
      this.list = value;
    });
  }

  ngAfterViewInit(): void {
    this.displayedColumns = this.columns.map((column) => {
      if (column.templateName === 'statusTemplate') {
        return {
          ...column,
          template: this.statusTemplate,
        };
      }
      return column;
    });
    this.cdr.detectChanges();
  }

  deleteUser(user: any): void {
    this.apiService.deleteUser(user?.id).subscribe(() => {
      this.store.dispatch(snackBar({ message: 'User deleted successfully' }));
      this.apiService.fetchUsers();
    });
  }
}
