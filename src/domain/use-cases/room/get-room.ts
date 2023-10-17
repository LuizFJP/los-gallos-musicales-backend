import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GetRoomUseCase } from "../../interfaces/use-cases/room/get-room-use-case";

export class GetRoom implements GetRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async execute(name: string): Promise<any> {
    try {
      const room = await this.roomRepository.get(name);
      const roomParsed = JSON.parse(room);
      return roomParsed;
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}