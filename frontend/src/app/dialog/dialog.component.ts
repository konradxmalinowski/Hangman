import { Component, inject } from '@angular/core';
import { HistoryService } from '../history.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Score } from '../types';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  historyService: HistoryService = inject(HistoryService);
  dialogRef = inject(MatDialogRef<DialogComponent>);
  scores: Score[] = inject(MAT_DIALOG_DATA);

  handleDeleteScore(id: number) {
    this.historyService.deleteScore(id).subscribe(
      (scores: Score[]) => {
        this.scores = scores;
        console.log(this.scores);
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting score:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
