import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent {
  @Input() letter!: string;
  @Input() isEnded!: boolean;
  wasClicked = false;

  handleClick() {
    this.wasClicked = !this.wasClicked;
  }
}
