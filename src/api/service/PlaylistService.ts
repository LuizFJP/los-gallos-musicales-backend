import { Playlist } from "../domain/entities/Playlist";
import { EntityRepository } from "../repository/protocols/EntityRepository";

export class PlaylistService {
  private playlistRepository: EntityRepository;

  constructor(imageRepository: EntityRepository) {
    this.playlistRepository = imageRepository;
  }

  public async createPlaylist(playlist: Playlist): Promise<void> {
    // await this.playlistRepository.create({ genre: {id: playlist.genre, genre: }, playlist: playlist.playlist  });
  }
}