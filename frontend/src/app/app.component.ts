import { Component } from '@angular/core';
import { ALPHABET, WORDS } from './Constants';
import { checkLetterObject } from './types';

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

  ngOnInit() {
    this.handleGenerateWord();
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
        alert(`Game over!`);
      }
      return;
    }

    this.guessedLetters.forEach((item) => {
      if (item.letter === letter) {
        item.guessedLetter = letter;
      }
    });
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
}
