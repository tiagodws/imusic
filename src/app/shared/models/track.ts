export interface Track {
  id: number;
  albumId: number;
  name: string;
  artistName: string;
  url: string;
  previewUrl: string;
  millis: number;
  thumbnail?: string;
}
