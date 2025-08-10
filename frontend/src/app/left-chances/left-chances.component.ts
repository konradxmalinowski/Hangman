import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-chances',
  templateUrl: './left-chances.component.html',
  styleUrls: ['./left-chances.component.scss'],
})
export class LeftChancesComponent {
  @Input() leftChances!: number;
}
