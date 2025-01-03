import { Component, inject } from '@angular/core';
import { ListHeaderComponent } from '../../../components/list-header/list-header.component';
import { MatListModule } from '@angular/material/list';
import { leaves } from '../../../constants/mockData';
import { Store } from '@ngrx/store';
import { getLeaves, getUsers } from '../../../stores/app.selector';
import { Router } from '@angular/router';
import { CardComponent } from '../../../components/card/card.component';
import { GroupArrayByKeyPipe } from '../../../pipes/group-array-by-key.pipe';
import { CommonModule } from '@angular/common';

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
  list: any[];
  users: any[];
  constructor(private router: Router) {}

  store: Store = inject(Store);

  ngOnInit() {
    this.store.select(getLeaves).subscribe((value: any[]) => {
      this.list = value;
    });
    this.store.select(getUsers).subscribe((value: any[]) => {
      this.users = value;
    });
  }
}
