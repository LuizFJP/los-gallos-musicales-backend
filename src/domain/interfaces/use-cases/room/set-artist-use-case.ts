import { Room } from "../../entities/room/room";

export interface SetArtistUseCase {
  execute(roomName: string): Promise<Room>;
}