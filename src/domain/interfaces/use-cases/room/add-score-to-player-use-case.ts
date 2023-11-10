import { Room } from "../../entities/room/room";

export interface AddScoreToPlayerUseCase {
  execute(roomName: string, username: string, score: number): Promise<Room>;
}