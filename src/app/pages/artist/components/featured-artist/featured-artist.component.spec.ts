import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FeaturedArtistComponent } from './featured-artist.component';

describe('FeaturedArtistComponent', () => {
  let component: FeaturedArtistComponent;
  let fixture: ComponentFixture<FeaturedArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule],
      declarations: [FeaturedArtistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedArtistComponent);
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
