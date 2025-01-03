import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../components/formFields/input-field/input-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CheckBoxComponent } from '../../../../components/formFields/check-box/check-box.component';

@Component({
  selector: 'secondary-contact-info',
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
    CheckBoxComponent,
  ],
  templateUrl: './secondary-contact-info.component.html',
  styleUrl: './secondary-contact-info.component.scss',
})
export class SecondaryContactInfoComponent {
  @Input() fromGroup: any;
}
