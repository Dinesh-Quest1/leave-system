import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    FormsModule,
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
  @Input() valid: boolean = true;

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges?.['error']) {
      console.log(simpleChanges);
    }
  }

  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      console.log({ value });
      console.log(this.control.valid, 'valid');
    });
  }
}
