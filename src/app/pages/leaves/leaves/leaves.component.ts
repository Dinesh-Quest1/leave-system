import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../../components/card/card.component';
import { ListHeaderComponent } from '../../../components/list-header/list-header.component';
import { GroupArrayByKeyPipe } from '../../../pipes/group-array-by-key.pipe';
import { getLeaves, getUsers } from '../../../stores/app.selector';
import { Leave } from '../../../ts/Leave.types';
import { User } from '../../../ts/User.types';

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
  list: Leave[] = [];
  users: User[] = [];
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
      (leave: Leave) => leave.userId === this.selectedUser?.id
    );
  }

  store: Store = inject(Store);

  ngOnInit() {
    this.store.select(getLeaves).subscribe((value: Leave[]) => {
      this.list = value;
      this.filteredList = value;
    });
    this.store.select(getUsers).subscribe((value: User[]) => {
      this.users = value;
    });
  }
}
