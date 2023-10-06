import { Genre } from "./Genre";

export interface Playlist {
  id: number;
  genre: Genre;
  playlistsUrl: string[];
}