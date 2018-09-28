import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArtistComponent } from './artist.component';
import { ArtistRoutes } from './artist.routes';
import { AlbumComponent } from './components/album/album.component';
import { HeroComponent } from './components/hero/hero.component';
import { TrackComponent } from './components/track/track.component';
import { FeaturedArtistComponent } from './components/featured-artist/featured-artist.component';

@NgModule({
  declarations: [
    ArtistComponent,
    AlbumComponent,
    HeroComponent,
    TrackComponent,
    FeaturedArtistComponent,
  ],
  imports: [CommonModule, ArtistRoutes],
})
export class ArtistModule {}
