import { CacheDatabase } from "../../../infra/data/interfaces/cache-database";
import { Room } from "../../../infra/websocket/channel/room/room";
import { Room as RoomModel} from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { CreateRoomUseCase } from "../../interfaces/use-cases/room/create-room-use-case";

export class CreateRoom implements CreateRoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(room: RoomModel): Promise<any> {
    try {
      const roomStringfied = JSON.stringify(room);
   
      this.roomRepository.create(room.name, roomStringfied);
      return room.name
    } catch (error) {
      console.log(error);
    }
  }
}