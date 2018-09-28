import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from '@angular/router';

import { ArtistComponent } from './artist.component';
import { ArtistService } from '../../shared/services/artist.service';

@Injectable()
export class ArtistResolver implements Resolve<any> {
  constructor(private service: ArtistService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getArtist(Number(route.paramMap.get('id')));
  }
}

export const routes: Routes = [
  {
    path: 'artist/:id',
    component: ArtistComponent,
    data: {
      transitionIndex: 1,
    },
    resolve: {
      artist: ArtistResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ArtistResolver],
})
export class ArtistRoutes {}
