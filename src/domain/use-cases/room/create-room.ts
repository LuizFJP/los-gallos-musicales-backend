import { CacheDatabase } from "../../../infra/data/interfaces/cache-database";
import { Room } from "../../../infra/websocket/channel/Room";
import { Room as RoomModel} from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { CreateRoomUseCase } from "../../interfaces/use-cases/room/create-room-use-case";

export class CreateRoom implements CreateRoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(room: RoomModel): Promise<void> {
    try {
      const roomStringfied = JSON.stringify(room);
      console.log(roomStringfied)
      const roomBuffered= Buffer.from(roomStringfied).toString('base64');
      await this.roomRepository.create(room.name, roomBuffered);
      new Room(room);
    } catch (error) {
      console.log(error);
    }
    console.log(room.name + " created");
    return;
  }
}