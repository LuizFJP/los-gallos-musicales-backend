import { EntityRepository } from "./protocols/EntityRepository";
import { UpdatePlaylistDto } from "../domain/dto/playlist/updatePlaylist";
import { GenreModel, PlaylistModel } from "../../db/mongo/schema/schemas";

export class GenreRepository implements EntityRepository {

  constructor() {}
  async findByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async create(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<any[]> {
    return await GenreModel.find({});
  }

  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
