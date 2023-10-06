import { ListPlaylistDto } from "../domain/dto/playlist/listPlaylist";
import { Playlist } from "../service/protocols/Playlist";

export class PlaylistParser {
  static parse(playlists: Playlist[]): ListPlaylistDto {
    return playlists.map((playlist) => {
      return {
        title: playlist.snippet.title,
        playlistURLs: playlists.map((playlist) => {
          return {
            name: playlist.snippet.title,
            url: playlist.snippet.resourceId.videoId,
          };
        }),
      };
    })[0];
  }
}