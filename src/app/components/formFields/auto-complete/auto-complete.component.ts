import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'auto-complete',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @Input() label: string = 'Name';
  @Input() control: FormControl<any> | null = null;
  @Input() options: any[] = [];
  @Input() displayWith?: string = 'name';
  @Input() renderOption?: Function = () => {};
  @Input() name: string = 'name';
  @Input() placeholder: string = 'Name';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: any = '';

  filteredOptions: any[];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter((option) => {
      let optionValue;
      if (this.renderOption) {
        optionValue = this.renderOption(option);
      } else if (this.displayWith) {
        optionValue = option?.[this.displayWith];
      } else {
        optionValue = option;
      }
      return optionValue.toLowerCase().includes(filterValue);
    });
  }

  getOptionValue(option: any): string {
    if (this.renderOption) {
      return this.renderOption(option);
    }
    if (this.displayWith) {
      return option?.[this.displayWith] || '';
    }
    return option;
  }

  onClear(): void {
    this.input.nativeElement.value = '';
    this.control.setValue('');
    this.filteredOptions = this.options.slice();
  }
}
