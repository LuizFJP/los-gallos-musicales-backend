import { Room } from "../../entities/room/room";

export interface DecrementNumberOfTipsUseCase {
  execute(roomName: string): Promise<Room>;
}