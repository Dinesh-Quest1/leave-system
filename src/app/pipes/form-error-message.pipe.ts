import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'formErrorMessage',
  standalone: true,
})
export class FormErrorMessagePipe implements PipeTransform {
  transform(
    controlObj: { control: FormControl<any>; error?: string | null } | null,
    label: string,
    error?: string | null,
    ...args: unknown[]
  ): string {
    if (error) return error;
    if (controlObj?.control?.errors?.['required'])
      return label + ' is required';
    if (controlObj?.control?.errors?.['minlength'])
      return `Minimum length is
      ${controlObj?.control.errors['minlength'].requiredLength} characters.`;
    if (controlObj?.control?.errors?.['maxlength'])
      return `Maximum length is
      ${controlObj?.control.errors['maxlength'].requiredLength} characters.`;
    if (controlObj?.control?.errors?.['email'])
      return 'Please enter a valid email address.';
    return '';
  }
}
