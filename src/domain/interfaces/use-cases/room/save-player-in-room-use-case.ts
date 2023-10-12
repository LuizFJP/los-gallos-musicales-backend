import { Player } from "../../entities/player/player";

export interface SavePlayerInRoomUseCase {
  execute(roomName: string, player:Player): Promise<void>;
}