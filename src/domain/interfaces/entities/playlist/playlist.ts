import { Genre } from "../genre/genre";

export interface Playlist {
  id: number;
  genre: Genre;
  playlistsUrl: string[];
}