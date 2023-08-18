import { Api } from "../Api";
import { Room } from "../websocket/Room";

export class RoomUseCase {
    public static async createRoom(room: string) {
        return new Room(room);
    }
}