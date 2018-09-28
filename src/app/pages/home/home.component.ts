import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';

import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('search')
  public search: ElementRef;
  public searching = false;

  private unsubscribe$ = new Subject();

  constructor(private service: ArtistService, private router: Router) {
    this.onSearch = this.onSearch.bind(this);
  }

  public ngOnInit() {
    this.search.nativeElement.focus();
  }

  public resultFormatter(value: any) {
    return value.artistName;
  }

  public onSearch(search$: Observable<string>) {
    return search$.pipe(
      debounceTime(400),
      tap(() => (this.searching = true)),
      mergeMap(term => (term.length > 2 ? this.service.listArtists(term) : of([]))),
      tap(() => (this.searching = false))
    );
  }

  public onSelect(event: any) {
    event.preventDefault();
    this.search.nativeElement.value = '';
    this.router.navigate(['/artist', event.item.id]);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
