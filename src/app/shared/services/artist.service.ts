import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { Track } from '../models/track';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  constructor(private http: HttpClient) {}

  public getArtist(id: number) {
    return this.getITunesInfo(id).pipe(
      mergeMap(itInfo =>
        this.getLastFmInfo(itInfo.name).pipe(
          map(lfInfo => ({ ...itInfo, ...lfInfo } as Artist))
        )
      )
    );
  }

  public listArtists(term: string, quantity = 10) {
    return this.http
      .jsonp(
        `https://itunes.apple.com/search?entity=musicArtist&attribute=allArtistTerm&limit=${quantity}&term=${term}`,
        'callback'
      )
      .pipe(map((response: any) => response.results.map(this.parseITunesArtistInfo)));
  }

  public getITunesInfo(id: number) {
    return this.http
      .jsonp(`https://itunes.apple.com/lookup?id=${id}`, 'callback')
      .pipe(map((response: any) => this.parseITunesArtistInfo(response.results[0])));
  }

  public parseITunesArtistInfo(info: any) {
    const artist: Partial<Artist> = {};

    artist.id = info.artistId;
    artist.name = info.artistName;
    artist.genre = info.primaryGenreName;
    artist.url = info.artistLinkUrl;

    return artist as Artist;
  }

  public getLastFmInfo(name: string) {
    return this.http
      .get(
        `http://ws.audioscrobbler.com/2.0/?format=json&api_key=${
          environment.apiKey
        }&method=artist.getInfo&artist=${name}`
      )
      .pipe(map((response: any) => this.parseLastFmArtistInfo(response.artist)));
  }

  public parseLastFmArtistInfo(info: any) {
    const artist: Partial<Artist> = {};

    if (!info) return artist;

    artist.tags = info.tags.tag.map(tag => tag.name);
    // Removes LastFM "Read More" tag
    artist.bio = info.bio.content.replace(/<a[^>]*>[^>]*<\/a>/gi, '');
    artist.heroImage = this.getLastFmImage(info.image);

    if (info.similar && info.similar.artist) {
      artist.relatedArtists = info.similar.artist.map((related: any) => ({
        ...related,
        thumbnail: this.getLastFmImage(related.image),
      }));
    }

    return artist;
  }

  public getLastFmImage(imageProp: any, size = 1000) {
    if (imageProp && imageProp.length) {
      const validImage = imageProp.find(image => image['#text']);
      if (!validImage) return '';

      const url = validImage['#text'];
      const imageId = url.substring(url.lastIndexOf('/'), url.lastIndexOf('.'));
      return `https://lastfm-img2.akamaized.net/i/u/${size}/${imageId}.png`;
    }
  }

  public listArtistAlbums(id: number, limit = 200) {
    return forkJoin(
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${id}&entity=album&limit=${limit}`,
          'callback'
        )
        .pipe(map((response: any) => response.results)),
      this.http
        .jsonp(
          `https://itunes.apple.com/lookup?id=${id}&entity=song&limit=${limit}`,
          'callback'
        )
        .pipe(map((response: any) => response.results))
    ).pipe(
      map((responses: any) => {
        const [albumsResponse, tracksResponse] = responses;

        const albums = albumsResponse
          .filter(result => result.wrapperType === 'collection')
          .map(this.parseITunesAlbumInfo);

        const tracks = tracksResponse
          .filter(result => result.wrapperType === 'track')
          .map(this.parseITunesTrackInfo);

        return albums
          .map(
            album =>
              ({
                ...album,
                tracks: tracks.filter(({ albumId }) => albumId === album.id),
              } as Album)
          )
          .filter(album => album.tracks.length);
      })
    );
  }

  public parseITunesAlbumInfo(info: any) {
    const album: Partial<Album> = {};

    album.id = info.collectionId;
    album.name = info.collectionName;
    album.artistName = info.artistName;
    album.url = info.collectionViewUrl;

    if (info.artworkUrl100) {
      const url = info.artworkUrl100;
      album.thumbnail = url.replace('100x100', '300x300');
    }

    return album as Album;
  }

  public parseITunesTrackInfo(info: any) {
    const track: Partial<Track> = {};

    track.id = info.trackId;
    track.albumId = info.collectionId;
    track.name = info.trackName;
    track.artistName = info.artistName;
    track.url = info.trackViewUrl;
    track.previewUrl = info.previewUrl;
    track.millis = info.trackTimeMillis;
    track.thumbnail = info.artworkUrl60;

    return track as Track;
  }
}
