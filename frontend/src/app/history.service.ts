import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Score } from './types';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private URL = 'http://localhost:8080/scores';
  private httpClient: HttpClient = inject(HttpClient);

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

  deleteScore(id: number): Observable<Score[]> {
    return this.deleteScoreFromDatabase(id).pipe(
      switchMap(() => this.getAllScoresFromDatabase())
    );
  }

  addScore(win: boolean, leftChances: number): Observable<Score[]> {
    const score: Score = {
      leftChances: leftChances,
      win: win,
      date: new Date(),
    };

    return this.addScoreToDatabase(score).pipe(
      switchMap(() => {
        return this.getAllScoresFromDatabase();
      })
    );
  }
}
