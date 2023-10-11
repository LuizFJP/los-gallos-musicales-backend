import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { EnterRoomUserCase } from "../../interfaces/use-cases/room/enter-room-use-case";

export class EnterRoom implements EnterRoomUserCase {
  private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
      this.roomRepository = roomRepository
    }

  async execute(name: string): Promise<any> {
    try {
      const raw = await this.roomRepository.get(name);
      const roomString = Buffer.from(raw, 'base64').toString("binary");
      console.log(roomString);
      const room = JSON.parse(roomString);
      return room;
    } catch (error) {
      return null;
    }
  }
}