import { EntityRepository } from "./protocols/EntityRepository";
import { CreatePlaylistDto } from "../domain/dto/playlist/create-playlist";
import { UpdatePlaylistDto } from "../domain/dto/playlist/update-playlist";
import { PrismaService } from "../service/PrismaService";

export class PlaylistRepository implements EntityRepository {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  create(playlistDto: CreatePlaylistDto): Promise<any> {
    return this.prismaService.playlist.create({
      data: playlistDto,
    });
  }

  findById(id: string): Promise<any> {
    return this.prismaService.playlist.findUniqueOrThrow({
      where: { id },
    });
  }

  findAll(): Promise<any[]> {
    return this.prismaService.playlist.findMany();
  }

  delete(id: string): Promise<any> {
    return this.prismaService.playlist.delete({
      where: { id },
    });
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<any> {
    return this.prismaService.playlist.update({
      where: { id },
      data: updatePlaylistDto,
    });
  }
}
