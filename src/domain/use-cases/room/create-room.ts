import { randomInt } from "crypto";
import { CacheDatabase } from "../../../infra/data/interfaces/cache-database";
import { Room } from "../../../infra/websocket/channel/room/room";
import { Room as RoomModel } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { CreateRoomUseCase } from "../../interfaces/use-cases/room/create-room-use-case";

export class CreateRoom implements CreateRoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(room: RoomModel): Promise<any> {
    try {
      room.song = room?.listSongs ? room.listSongs[randomInt(0, room.listSongs.length - 1)] : undefined;
      room.numberOfPlayers = 1;
      room.numberOfTips = Math.ceil(room.song.name.length * 0.25);
      room.tipOn = false;
      room.breakMatch = false;
      room.tip = new Array(room.song.name.length).fill('_');
      const roomStringfied = JSON.stringify(room);
      const roomList = await this.roomRepository.getAllRooms();
      if (roomList.includes(room.name)) {
        return false;
      }
      this.roomRepository.create(room.name, roomStringfied);
      return room.name
    } catch (error) {
      console.log(error);
    }
  }
}