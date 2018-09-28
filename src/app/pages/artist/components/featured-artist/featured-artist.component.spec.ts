import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtistComponent } from './featured-artist.component';

describe('FeaturedArtistComponent', () => {
  let component: FeaturedArtistComponent;
  let fixture: ComponentFixture<FeaturedArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
