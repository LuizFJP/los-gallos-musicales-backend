import { Room } from "../../entities/room/room";

export interface ChooseSongRoomUseCase {
  execute(room: Room): Promise<Room>;
}
