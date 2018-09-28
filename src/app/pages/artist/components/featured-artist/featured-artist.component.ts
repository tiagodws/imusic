import { transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { fadeIn } from '../../../../shared/animations/animations';
import { Artist } from '../../../../shared/models/artist';

@Component({
  selector: 'app-featured-artist',
  templateUrl: './featured-artist.component.html',
  styleUrls: ['./featured-artist.component.scss'],
  animations: [trigger('loadTransition', [transition('void => *', fadeIn)])],
})
export class FeaturedArtistComponent {
  @Input()
  public artist: Artist;
}
