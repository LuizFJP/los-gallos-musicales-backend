import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GetRoomByShortIdUseCase } from "../../interfaces/use-cases/room/get-room-by-shortid-use-case";

export class GetRoomByShortId implements GetRoomByShortIdUseCase {

  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(shortId: string) {
    const roomList       = await this.roomRepository.getAllRooms();
    const roomListParsed = JSON.parse(JSON.stringify(roomList));
    const roomFound      = roomListParsed.find((room: Room) => room.shortId === shortId);
    console.log(roomFound);
    return roomFound;
  }
}