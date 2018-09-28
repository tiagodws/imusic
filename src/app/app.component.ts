import { transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { fadeIn, fade } from './shared/animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loadTransition', [transition('void => *', fadeIn)]),
    trigger('routeTransition', [
      transition(':increment', fade),
      transition(':decrement', fade),
    ]),
  ],
})
export class AppComponent {
  public animationState: number;

  constructor(private route: ActivatedRoute) {}

  public onActivate() {
    this.animationState = this.route.firstChild.snapshot.data.transitionIndex;
  }
}
