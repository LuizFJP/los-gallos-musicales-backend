import { Player } from "../../entities/player/player";

export interface EnterRoomUserCase {
  execute(name: string, player: Player): Promise<void>;
}