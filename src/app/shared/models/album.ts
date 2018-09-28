import { Track } from './track';

export interface Album {
  id: number;
  name: string;
  artistName: string;
  url: string;
  thumbnail?: string;
  tracks: Track[];
}
