import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../components/formFields/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'primary-contact-info',
  standalone: true,
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    TextFieldModule,
    InputFieldComponent,
  ],
  templateUrl: './primary-contact-info.component.html',
  styleUrl: './primary-contact-info.component.scss',
})
export class PrimaryContactInfoComponent {
  @Input() fromGroup: any;
}
