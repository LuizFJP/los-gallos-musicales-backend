import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { EnterRoomUserCase } from "../../interfaces/use-cases/room/enter-room-use-case";

export class EnterRoom implements EnterRoomUserCase {
  private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
      this.roomRepository = roomRepository
    }

  async execute(name: string): Promise<any> {
    try {
      const room = await this.roomRepository.get(name);
      const roomStringify = JSON.parse(room);
      return roomStringify;
    } catch (error) {
      return null;
    }
  }
}