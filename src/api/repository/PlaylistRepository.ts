import { EntityRepository } from "./protocols/EntityRepository";
import { CreatePlaylistDto } from "../domain/dto/playlist/createPlaylist";
import { UpdatePlaylistDto } from "../domain/dto/playlist/updatePlaylist";
import { playlistModel } from "../../db/mongo/schema/schemas";
import { Playlist } from "../domain/entities/Playlist";

export class PlaylistRepository implements EntityRepository {

  constructor() {}
  async findByName(name: string): Promise<Playlist[]> {
    return await playlistModel.find({'genre.name': `${name}`}).exec() as Playlist[];
  }

  async create(playlistDto: CreatePlaylistDto): Promise<any> {
    throw new Error("Method not implemented.");
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
