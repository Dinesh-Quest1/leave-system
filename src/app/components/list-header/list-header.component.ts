import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, output, Output } from '@angular/core';

@Component({
  selector: 'list-header',
  standalone: true,
  imports: [CommonModule],
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
}
