import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-field',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() formControl: any = null;
  @Input() name: string = 'name';
  @Input() label: string = 'Name';
  @Input() placeholder: string = 'Name';
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: any = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
