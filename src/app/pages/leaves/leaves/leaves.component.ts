import { Component, inject } from '@angular/core';
import { ListHeaderComponent } from '../../../components/list-header/list-header.component';
import { Store } from '@ngrx/store';
import { getLeaves, getUsers } from '../../../stores/app.selector';
import { Router } from '@angular/router';
import { CardComponent } from '../../../components/card/card.component';
import { GroupArrayByKeyPipe } from '../../../pipes/group-array-by-key.pipe';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { Leave } from '../../../models/Leave';

@Component({
  selector: 'leaves',
  standalone: true,
  imports: [
    ListHeaderComponent,
    CardComponent,
    GroupArrayByKeyPipe,
    CommonModule,
  ],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss',
})
export class LeavesComponent {
  constructor(private router: Router) {}

  list: any[];
  users: any[];
  filteredList: Leave[] = [];

  selectedUser: User = null;

  onSelectedUser(user: User): void {
    if (!user) {
      this.selectedUser = null;
      this.filteredList = this.list;
      return;
    }
    this.selectedUser = user;

    this.filteredList = this.list.filter(
      (user) => user.id === this.selectedUser?.id
    );
  }

  store: Store = inject(Store);

  ngOnInit() {
    this.store.select(getLeaves).subscribe((value: any[]) => {
      this.list = value;
      this.filteredList = value;
    });
    this.store.select(getUsers).subscribe((value: any[]) => {
      this.users = value;
    });
  }
}
