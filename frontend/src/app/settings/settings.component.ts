import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Score } from '../types';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  dialog = inject(MatDialog);
  historyService = inject(HistoryService);
  scores: Score[] = [];

  openDialog() {
    this.historyService.getAllScoresFromDatabase().subscribe(
      (scores: Score[]) => {
        this.scores = scores;
        const dialogRef = this.dialog.open(DialogComponent, {
          data: this.scores,
          hasBackdrop: true,
          backdropClass: 'dialog-backdrop',
          disableClose: false,
        });

        dialogRef
          .afterClosed()
          .subscribe(() => console.log('Modal has been closed'));
      },
      (error) => console.log(error)
    );
  }
}
