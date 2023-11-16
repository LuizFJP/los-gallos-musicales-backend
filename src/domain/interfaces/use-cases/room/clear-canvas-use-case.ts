import { Room } from "../../entities/room/room";

export interface ClearCanvasUseCase {
  execute(roomName: string): Promise<Room>;
}