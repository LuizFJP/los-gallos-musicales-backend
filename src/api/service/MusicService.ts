import 'dotenv/config';
import { google } from 'googleapis';
import { PlaylistParser } from '../parser/PlaylistParser';
import { Playlist } from './protocols/Playlist';

export class MusicService {
  
  public async getPlaylistById(id: string) {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    });

    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId: id,
      maxResults: 100
    });

    return PlaylistParser.parse(response.data.items as Playlist[]);
  }
}

