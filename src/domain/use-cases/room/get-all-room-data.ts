import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GetAllRoomDataUseCase } from "../../interfaces/use-cases/room/get-all-room-data-use-case";

export class GetAllRoomData implements GetAllRoomDataUseCase {

  constructor(private roomRepository: RoomRepository) { }

  public async execute(): Promise<Room[]> {
    const roomsName = await this.roomRepository.getAllRooms();
    console.log(roomsName)
    return await this.roomRepository.getMultipleDataRooms(roomsName);
  }
}