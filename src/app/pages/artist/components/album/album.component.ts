import { transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { fadeIn } from '../../../../shared/animations/animations';
import { Album } from '../../../../shared/models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  animations: [trigger('loadTransition', [transition('void => *', fadeIn)])],
})
export class AlbumComponent {
  @Input()
  public album: Album;
}
