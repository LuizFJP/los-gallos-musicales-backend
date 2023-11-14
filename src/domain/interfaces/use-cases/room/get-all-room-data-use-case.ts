import { Room } from "../../entities/room/room";

export interface GetAllRoomDataUseCase {
    execute(): Promise<Room[]>;
}