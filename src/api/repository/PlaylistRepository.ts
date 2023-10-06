import { EntityRepository } from "./protocols/EntityRepository";
import { CreatePlaylistDto } from "../domain/dto/playlist/createPlaylist";
import { UpdatePlaylistDto } from "../domain/dto/playlist/updatePlaylist";
import { PlaylistModel } from "../../db/mongo/schema/schemas";

export class PlaylistRepository implements EntityRepository {

  constructor() {}

  async create(playlistDto: CreatePlaylistDto): Promise<any> {
    const playlist = new PlaylistModel(playlistDto);
    return await playlist.save();
  }

  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
