import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ArtistComponent } from './artist.component';
import { AlbumComponent } from './components/album/album.component';
import { FeaturedArtistComponent } from './components/featured-artist/featured-artist.component';
import { HeroComponent } from './components/hero/hero.component';
import { TrackComponent } from './components/track/track.component';

describe('ArtistComponent', () => {
  let component: ArtistComponent;
  let fixture: ComponentFixture<ArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [
        ArtistComponent,
        AlbumComponent,
        TrackComponent,
        FeaturedArtistComponent,
        HeroComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistComponent);
    component = fixture.componentInstance;

    component.artist = {
      id: 1,
      bio: 'Bio',
      name: 'Test',
      tags: [],
      url: '',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
