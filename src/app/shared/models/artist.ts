import { Album } from './album';

export interface Artist {
  id: number;
  url: string;
  name: string;
  bio: string;
  genre?: string;
  tags: string[];
  albums?: Album[];
  heroImage?: string;
  thumbnail?: string;
  relatedArtists?: Partial<Artist>[];
}
