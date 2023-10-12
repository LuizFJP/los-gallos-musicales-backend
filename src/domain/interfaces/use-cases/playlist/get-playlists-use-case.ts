import { SongDTO } from "../../../dto/playlist/song";

export interface GetPlaylistsUseCase {
  execute(name: string): Promise<SongDTO[]>;
}