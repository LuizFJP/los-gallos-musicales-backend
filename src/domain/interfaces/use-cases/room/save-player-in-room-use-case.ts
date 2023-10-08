import { Player } from "../../entities/player/player";

export interface SavePlayerInRoomUseCase {
  execute(player:Player, roomName: string): Promise<void>;
}