import { google } from "googleapis";
import { PlaylistParser } from "../../../infra/http/youtube/parser/playlist-parser";
import { SongDTO } from "../../dto/playlist/song";
import { PlaylistRepository } from "../../interfaces/repositories/playlist-repository";
import { GetPlaylistsUseCase } from "../../interfaces/use-cases/playlist/get-playlists-use-case";
import { Playlist } from "../../../infra/http/youtube/interfaces/playlist/playlist";

export class GetPlaylists implements GetPlaylistsUseCase {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  async execute(name: string): Promise<SongDTO[]> {
    const playlists = await this.playlistRepository.findByName(name);
    const playlistId =
      playlists[0].playlistsUrl[
        this.getRandomArbitrary(0, playlists[0].playlistsUrl.length) - 1
      ];
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });
    const response = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: playlistId,
      maxResults: 100,
    });

    return PlaylistParser.parse(response.data.items as Playlist[]);
  }

  private getRandomArbitrary(min: number, max: number) {
    return min + Math.floor((max - min + 1) * Math.random());
  }
}
