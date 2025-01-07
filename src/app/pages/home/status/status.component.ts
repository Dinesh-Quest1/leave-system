import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { User } from '../../../ts/User.types';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
})
export class StatusComponent {
  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() user: User = null;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  onChange(value: boolean): void {
    this.checked = value;
    this.onValueChange.emit(value);
  }

  ngOnInit(): void {
    console.log(this.user);
    if (this.user) {
      this.checked = this.user.basicInfo.status || false;
    }
  }
}
