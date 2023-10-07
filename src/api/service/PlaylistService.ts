import { randomInt } from "crypto";
import { Playlist } from './protocols/Playlist';
import { EntityRepository } from "../repository/protocols/EntityRepository";
import { PlaylistParser } from "../parser/PlaylistParser";
import { google } from "googleapis";

export class PlaylistService {
  private playlistRepository: EntityRepository;

  constructor(playlistRepository: EntityRepository) {
    this.playlistRepository = playlistRepository;
  }

  public async getPlaylist(name: string) {
    const playlists = await this.playlistRepository.findByName(name);
       const playlistId = playlists[0].playlistsUrl[this.getRandomArbitrary(0, randomInt(playlists[0].playlistsUrl.length) - 1)];

    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    });
    
    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: playlistId,
      maxResults: 100
    });

    return PlaylistParser.parse(response.data.items as Playlist[]);
  }

  private getRandomArbitrary(min: number, max: number) {
    return min + Math.floor((max - min + 1) * Math.random());
  }
}