import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../ts/User.types';
import { AutoCompleteComponent } from '../formFields/auto-complete/auto-complete.component';

@Component({
  selector: 'list-header',
  standalone: true,
  imports: [CommonModule, AutoCompleteComponent],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
})
export class ListHeaderComponent {
  @Input() title: string = '';
  @Input() hideSave: boolean = false;
  @Input() hideCancel: boolean = false;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onApplyLeave: EventEmitter<any> = new EventEmitter();
  @Input() options: User[] = [];
  @Output() onUserSelect: EventEmitter<any> = new EventEmitter();

  userFilter: FormControl = new FormControl('');

  renderOption = (option: User): string => {
    return option.basicInfo.firstName + ' ' + option.basicInfo.lastName || '';
  };

  ngOnInit(): void {
    this.userFilter.valueChanges.subscribe((value) => {
      console.log(value);
      this.onUserSelect.emit(value);
    });
  }
}
