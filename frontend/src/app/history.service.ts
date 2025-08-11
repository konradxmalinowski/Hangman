import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from './types';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private URL = 'http://localhost:8080/scores';
  private httpClient: HttpClient = inject(HttpClient);

  getAllScores(): Observable<Score[]> {
    return this.httpClient.get<Score[]>(this.URL);
  }

  getScoreById(id: number): Observable<Score> {
    return this.httpClient.get<Score>(`${this.URL}/${id}`);
  }

  addScore(score: Score): Observable<Score> {
    return this.httpClient.post<Score>(this.URL, score);
  }
}
