import { Player } from "../../entities/player/player";
import { Room } from "../../entities/room/room";

export interface SkipPlayerDrawUseCase {
  execute(roomName: string, username: string): Promise<void>;
  verifyPlayerAlreadyReported(room: Room, player: Player): boolean;
}