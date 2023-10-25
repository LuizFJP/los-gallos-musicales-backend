import { Player } from "../../interfaces/entities/player/player";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { EnterRoomUserCase } from "../../interfaces/use-cases/room/enter-room-use-case";

export class EnterRoom implements EnterRoomUserCase {
  private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
      this.roomRepository = roomRepository
    }

  async execute(name: string, player: Player): Promise<any> {
    try {
      const room = await this.roomRepository.get(name);
      const roomParsed = JSON.parse(room);
      if (roomParsed.players.includes(player)) {
        pla
      }
      roomParsed.players.push(player);
      const roomStringify = JSON.stringify(roomParsed);
      await this.roomRepository.create(roomParsed.name, roomStringify);
      return roomParsed;
    } catch (error) {
      return null;
    }
  }
}
