import { Room } from "../../entities/room/room";

export interface ChooseSongRoomUseCase {
  execute(roomName: string): Promise<Room>;
}
