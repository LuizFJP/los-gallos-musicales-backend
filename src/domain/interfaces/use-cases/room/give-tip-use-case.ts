import { Room } from "../../entities/room/room";

export interface GiveTipUseCase {
  execute(room: Room, tip: string[], tipOn:boolean): Promise<void>;
}