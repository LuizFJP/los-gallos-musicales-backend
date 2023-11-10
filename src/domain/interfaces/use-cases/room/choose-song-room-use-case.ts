import { SongDTO } from "../../../dto/playlist/song";

export interface ChooseSongRoomUseCase {
  execute(roomName: string): Promise<SongDTO>;
}