import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArtistService } from './artist.service';
import { transition, state, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  animations: [
    trigger('expandBio', [
      state('false', style({ height: '150px', overflow: 'hidden' })),
      state('true', style({ height: '*' })),
      transition('true <=> false', animate('400ms ease')),
    ]),
  ],
})
export class ArtistComponent implements OnInit, OnDestroy {
  public artist: any;
  public expandedBio = false;
  public maxBioLength = 500;
  private unsubscribe$ = new Subject();

  constructor(private route: ActivatedRoute, private service: ArtistService) {
    this.route.data.pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      this.artist = data.artist;
    });
  }

  public ngOnInit() {
    this.service
      .listArtistAlbums(this.artist.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(albums => (this.artist.albums = albums));
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
