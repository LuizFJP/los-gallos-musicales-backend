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
      console.log(raw);
      const roomString = Buffer.from(raw.canvas as string, 'base64').toString("binary");
      const room = JSON.parse(roomString);
      console.log(room);
      return room;
    } catch (error) {
      return null;
    }
  }
  
}