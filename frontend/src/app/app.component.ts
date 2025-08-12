import { Component, inject } from '@angular/core';
import { ALPHABET, WORDS } from './Constants';
import { checkLetterObject, Score } from './types';
import { HistoryService } from './history.service';
import { HttpErrorResponse } from '@angular/common/http';

function generateWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

function createStructure(word: string[]): checkLetterObject[] {
  return word.map(
    (letter: string) => ({ letter, guessedLetter: '' } as checkLetterObject)
  );
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  leftChances: number = 5;
  guessedLetters: checkLetterObject[] = [];
  generatedWord: string[] = [];
  ALPHABET: string[] = ALPHABET.map((letter) => letter.toUpperCase());
  isEnded: boolean = false;
  historyService: HistoryService = inject(HistoryService);
  scores: Score[] = [];

  ngOnInit() {
    this.handleGenerateWord();
    this.historyService.getAllScoresFromDatabase().subscribe(
      (scores: Score[]) => (this.scores = scores),
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  checkIfLetterInWord(letter: string) {
    const foundItem = this.guessedLetters.find(
      (item) => item.letter === letter
    );

    if (!foundItem) {
      console.log('Letter was not found');

      if (this.leftChances > 0) {
        this.leftChances--;
      } else {
        this.fillMissingLetters();
        this.isEnded = true;
        this.handleAddScore(false, 0);
        alert(`Game over!`);
      }
      return;
    }

    this.guessedLetters.forEach((item) => {
      if (item.letter === letter) {
        item.guessedLetter = letter;
      }
    });

    if (this.checkIfGuessed()) {
      this.handleAddScore(true, this.leftChances);
      this.isEnded = true;
      alert('Congrats!! You won');
    }
  }

  fillMissingLetters() {
    this.guessedLetters = this.guessedLetters.map((item) => {
      item.guessedLetter = item.letter;

      return item;
    });
  }

  handleGenerateWord() {
    this.generatedWord = generateWord().split('');
    this.guessedLetters = createStructure(this.generatedWord);
    this.leftChances = 5;
    this.isEnded = false;
  }

  checkIfGuessed() {
    return this.guessedLetters.every(
      (item) => item.letter === item.guessedLetter
    );
  }

  handleAddScore(win: boolean, leftChances: number) {
    this.historyService.addScore(win, leftChances).subscribe(
      (scores: Score[]) => {
        this.scores = scores;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
