import { playlistModel } from "../../infra/data/interfaces/data-sources/mongodb/schemas";
import { Playlist } from "../interfaces/entities/playlist/playlist";
import { PlaylistRepository } from "../interfaces/repositories/playlist-repository";

export class PlaylistRepositoryImpl implements PlaylistRepository {
    async findByName(name: string): Promise<any> {
      return await playlistModel.find({'genre.name': `${name}`}).exec() as Playlist[];
    }
}