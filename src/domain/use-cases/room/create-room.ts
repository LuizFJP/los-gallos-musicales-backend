import { randomInt } from "crypto";
import { CacheDatabase } from "../../../infra/data/interfaces/cache-database";
import { Room } from "../../../infra/websocket/channel/room/room";
import { Room as RoomModel } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { CreateRoomUseCase } from "../../interfaces/use-cases/room/create-room-use-case";
import { Tip } from "../../interfaces/entities/room/tip";

export class CreateRoom implements CreateRoomUseCase {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(room: RoomModel): Promise<any> {
    try {
      console.log(room)
      room.song = room?.listSongs ? room.listSongs[randomInt(0, room.listSongs.length - 1)] : undefined;
      room.numberOfPlayers = 1;
      room.canvas = "";

      (room.tip as Tip).numberOfTips = Math.ceil(room.song.name.length * 0.25);
      (room.tip as Tip).tipOn = false;
      (room.tip as Tip).tips = new Array(room.song.name.length).fill('_');

      room.breakMatch = false;
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