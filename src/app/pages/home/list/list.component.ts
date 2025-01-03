import { Component, inject, Inject, OnInit } from '@angular/core';
import { mockList } from '../../../constants/mockData';
import { CommonModule, formatPercent, UpperCasePipe } from '@angular/common';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { MatBaseTableComponent } from '../../../components/mat-base-table/mat-base-table.component';
import { MatPaginationComponent } from '../../../components/mat-pagination/mat-pagination.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Store } from '@ngrx/store';
import { getUsers } from '../../../stores/app.selector';

const columns = [
  {
    header: 'Name',
    field: 'name',
  },
  {
    header: 'Phone Number',
    field: 'phoneNumber',
  },
  {
    header: 'Primary Address',
    field: 'primaryAddress',
  },
  {
    header: 'Pincode',
    field: 'pincode',
  },
  {
    header: 'Date of Birth',
    field: 'dateOfBirth',
  },
  {
    header: 'Status',
    field: 'status',
    format: (data: any) => (data ? 'Active' : 'Inactive'),
  },
  {
    header: 'Actions',
    field: 'actions',
    actions: [
      {
        header: 'edit',
        icon: 'edit',
        label: 'Edit',
        action: (item: any, router: Router) => {
          router.navigateByUrl('/users/details?action=edit&user=' + item?.id);
        },
      },
      {
        header: 'view',
        icon: 'view',
        label: 'View',
        action: (item: any, router: Router) => {
          router.navigateByUrl('/users/details?action=view&user=' + item?.id);
        },
      },
      {
        header: 'delete',
        icon: 'delete',
        label: 'Delete',
        action: (item: any) => console.log('Delete clicked', item),
      },
    ],
  },
];

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [
    CommonModule,
    BaseTableComponent,
    MatBaseTableComponent,
    MatPaginationComponent,
    ModalComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class UsersList implements OnInit {
  displayedColumns: any[] = columns;
  list: any[] = [];
  currentPage = 0;
  pageSize = 5;
  columns: any[] = columns;
  deleteId: any;

  constructor(private router: Router) {}

  store: Store = inject(Store);

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
