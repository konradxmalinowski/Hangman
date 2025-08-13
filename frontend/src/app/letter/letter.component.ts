import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnChanges {
  @Input() letter!: string;
  @Input() isEnded!: boolean;
  wasClicked = false;

  handleClick() {
    this.wasClicked = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEnded'] && !changes['isEnded'].firstChange) {
      this.wasClicked = false;
    }
  }
}
