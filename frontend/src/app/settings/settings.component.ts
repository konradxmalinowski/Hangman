import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { message: 'Message' },
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => console.log('Modal has been closed', result));
  }
}
