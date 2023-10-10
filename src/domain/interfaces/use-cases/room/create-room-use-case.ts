import { Room } from "../../entities/room/room";

export interface CreateRoomUseCase {
  execute(room: Room): Promise<any>;
}