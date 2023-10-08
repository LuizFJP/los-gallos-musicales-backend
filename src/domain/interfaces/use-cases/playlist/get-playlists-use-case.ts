import { ListPlaylistDto } from "../../../dto/playlist/listPlaylist";

export interface GetPlaylistsUseCase {
  execute(name: string): Promise<ListPlaylistDto[]>;
}