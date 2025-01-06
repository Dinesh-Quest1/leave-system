import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string = 'Sure ?';
  @Input() content: string = 'This is a modal content.';
  @Output() onConfirm: EventEmitter<string> = new EventEmitter();
  @Output() onDismiss: EventEmitter<void> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      if (!changes['title'].currentValue) {
        this.dialogRef.close();
      }
    }
  }

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}
  dismiss(): void {
    this.dialogRef.close();
  }
}
