import { Component, Input, OnChanges } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorMessagePipe } from '../../../pipes/form-error-message.pipe';

@Component({
  selector: 'date-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
    ReactiveFormsModule,
    FormErrorMessagePipe,
  ],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DateFieldComponent implements OnChanges {
  @Input() label: string = 'Name';
  @Input() control: any = null;
  @Input() name: string = 'name';
  @Input() placeholder: string = 'Name';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: any = '';
  @Input() error: string | null = null;

  ngOnChanges() {
    console.log(this.error);
  }
}
