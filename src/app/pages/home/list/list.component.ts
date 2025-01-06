import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InputFieldComponent } from '../../../components/formFields/input-field/input-field.component';
import { SwitchComponent } from '../../../components/formFields/switch/switch.component';
import { MatBaseTableComponent } from '../../../components/mat-base-table/mat-base-table.component';
import { User } from '../../../models/User';
import { ApiService } from '../../../services/api.service';
import { getUsers } from '../../../stores/app.selector';
import { Api } from '../details/api.service';

const columns = [
  {
    header: 'Name',
    field: 'basicInfo',
    format: (data: any) => {
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
    templateName: 'statusTemplate',
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
  imports: [
    CommonModule,
    MatBaseTableComponent,
    InputFieldComponent,
    SwitchComponent,
  ],
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
  apiService: Api = inject(Api);

  constructor(private readonly router: Router, private readonly store: Store) {}

  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  statusControl = new FormControl('');

  onValueChange(user: User, value: boolean): void {
    //loader
    this.apiService
      .updateUser(
        { ...user, basicInfo: { ...user.basicInfo, status: value } },
        user?.id
      )
      .subscribe((value) => {
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
  }

  deleteUser(user: any): void {
    this.apiService.deleteUser(user?.id).subscribe((response: any) => {
      this.apiService.fetchUsers();
    });
  }
}
