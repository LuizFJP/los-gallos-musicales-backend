import { Room } from "../../entities/room/room";

export interface GetRoomByShortIdUseCase {
  execute(shortId: string): Promise<Room | null>;
}