import { Genre } from "./Genre";

export interface Playlist {
  genre: Genre;
  playlistsUrl: string[];
}