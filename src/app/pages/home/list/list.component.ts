import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { MatBaseTableComponent } from '../../../components/mat-base-table/mat-base-table.component';
import { MatPaginationComponent } from '../../../components/mat-pagination/mat-pagination.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { getUsers } from '../../../stores/app.selector';
import { ApiService } from '../../../services/api.service';
import { API_PATHS } from '../../../constants/apiPaths';
import { addUser, loadUser } from '../../../stores/app.action';

const columns = [
  {
    header: 'Name',
    field: 'basicInfo',
    format: (data: any) => {
      console.log(data);
      return data?.firstName + ' ' + data?.lastName || '';
    },
  },
  {
    header: 'Phone Number',
    field: 'basicInfo',
    format: (data: any) => data?.phoneNumber || '',
  },
  {
    header: 'Primary Address',
    field: 'primaryContactInfo',
    format: (data: any) => data?.address || '',
  },
  {
    header: 'Pincode',
    field: 'primaryContactInfo',
    format: (data: any) => data?.pincode || '',
  },
  {
    header: 'Status',
    field: 'primaryContactInfo',
    format: (data: any) => (data?.status ? 'Active' : 'Inactive'),
  },
  {
    header: 'Actions',
    field: 'actions',
    actions: [
      {
        header: 'edit',
        icon: 'edit',
        iconColor: 'primary',
        label: 'Edit',
        action: (item: any, router: Router) => {
          router.navigateByUrl('/users/details?action=edit&user=' + item?.id);
        },
      },
      {
        header: 'view',
        icon: 'visibility',
        iconColor: 'accent',
        label: 'View',
        action: (item: any, router: Router) => {
          router.navigateByUrl('/users/details?action=view&user=' + item?.id);
        },
      },
      {
        header: 'delete',
        icon: 'delete',
        iconColor: 'warn',

        label: 'Delete',
        action: (item: any) => console.log('Delete clicked', item),
      },
    ],
  },
];

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, MatBaseTableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ApiService],
})
export class UsersList implements OnInit {
  displayedColumns: any[] = columns;
  list: any[] = [];
  currentPage = 0;
  pageSize = 5;
  columns: any[] = columns;
  deleteId: any;

  constructor(private readonly router: Router, private readonly store: Store) {}

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
}
