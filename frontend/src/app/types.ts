export interface checkLetterObject {
  letter: string;
  guessedLetter: string;
}

export interface Score {
  id?: number;
  date?: Date;
  leftChances: number;
  win: boolean;
}
