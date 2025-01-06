import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from '../../../../components/formFields/input-field/input-field.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { SwitchComponent } from '../../../../components/formFields/switch/switch.component';

@Component({
  selector: 'basic-info',
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
    SwitchComponent,
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent {
  @Input() fromGroup!: any;
}
