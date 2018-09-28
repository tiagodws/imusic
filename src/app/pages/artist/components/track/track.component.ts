import { Component, Input } from '@angular/core';

import { Track } from '../../../../shared/models/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent {
  @Input()
  public track: Track;
}
