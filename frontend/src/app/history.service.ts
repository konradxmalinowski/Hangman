import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from './types';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private URL = 'http://localhost:8080/scores';
  private httpClient: HttpClient = inject(HttpClient);
  private scores: Score[] = [];

  getAllScoresFromDatabase(): Observable<Score[]> {
    return this.httpClient.get<Score[]>(this.URL);
  }

  getScoreByIdFromDatabase(id: number): Observable<Score> {
    return this.httpClient.get<Score>(`${this.URL}/${id}`);
  }

  addScoreToDatabase(score: Score): Observable<Score> {
    return this.httpClient.post<Score>(this.URL, score);
  }

  deleteScoreFromDatabase(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/${id}`);
  }

  deleteScore(id: number): Score[] {
    this.deleteScoreFromDatabase(id).subscribe(
      () => {
        this.scores = this.scores.filter((score) => score.id !== id);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    return this.scores;
  }

  addScore(win: boolean, leftChances: number): Score[] {
    this.addScoreToDatabase({
      leftChances: leftChances,
      win: win,
    } as Score).subscribe(
      (score: Score) => {
        console.log('Score has been added');
        this.scores.push(score);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

    return this.scores;
  }
}
