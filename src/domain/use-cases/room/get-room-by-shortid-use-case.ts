import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GetRoomByShortIdUseCase } from "../../interfaces/use-cases/room/get-room-by-shortid-use-case";

export class GetRoomByShortId implements GetRoomByShortIdUseCase {

  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(shortId: string) {
    const roomList       = await this.roomRepository.getAllRooms();
    const roomListParsed = JSON.parse(JSON.stringify(roomList));
    let roomFound;
    for(let i = 0; i < roomListParsed.length; i++) {
      const room = await this.roomRepository.get(roomListParsed[i]);
      const roomParsed: Room = JSON.parse(room);
      if (roomParsed.shortId === shortId) {
        roomFound =  roomParsed;
      }
    }
    return roomFound as Room;
  }
}