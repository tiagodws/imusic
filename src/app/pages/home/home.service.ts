import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private http: HttpClient) {}

  public getHomeData(term, quantity = 10) {
    return this.http
      .jsonp(
        `https://itunes.apple.com/search?entity=musicArtist&attribute=allArtistTerm&limit=${quantity}&term=${term}`,
        'callback'
      )
      .pipe(map((response: any) => response.results));
  }
}
