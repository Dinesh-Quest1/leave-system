import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'details-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './details-header.component.html',
  styleUrl: './details-header.component.scss',
})
export class DetailsHeaderComponent {
  @Input() disableLeave: boolean = false;
  @Input() title: string = '';
  @Input() header: string = '';
  @Input() renderTemplate: any = null;
  @Input() enableApplyLeave: boolean = false;
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  @Output() onApplyLeave: EventEmitter<any> = new EventEmitter();
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
}
