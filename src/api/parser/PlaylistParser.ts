import { ListPlaylistDto } from "../domain/dto/playlist/listPlaylist";
import { Playlist } from "../service/protocols/Playlist";

export class PlaylistParser {
  static parse(playlists: Playlist[]): ListPlaylistDto[] {
  return  playlists.map((playlist) => {
      return {
        name: playlist.snippet.title,
        videoId: playlist.snippet.resourceId.videoId,
      };
    });
  }
}