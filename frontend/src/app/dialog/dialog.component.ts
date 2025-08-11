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
  private historyService: HistoryService = inject(HistoryService);
  dialogRef = inject(MatDialogRef<DialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  scores: Score[] = [];

  ngOnInit() {
    this.historyService.getAllScores().subscribe(
      (response: Score[]) => {
        this.scores = response;
      },

      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
