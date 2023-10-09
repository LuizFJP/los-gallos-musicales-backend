import { SongDTO } from "../../../../domain/dto/playlist/song";
import { Playlist } from "../interfaces/playlist/playlist";

export class PlaylistParser {
  static parse(playlists: Playlist[]): SongDTO[] {
  return  playlists.map((playlist) => {
      return {
        name: playlist.snippet.title,
        videoId: playlist.snippet.resourceId.videoId,
      };
    });
  }
}