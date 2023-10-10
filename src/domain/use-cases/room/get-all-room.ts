import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { GetAllRoomsUseCase } from "../../interfaces/use-cases/room/get-all-rooms";

export class GetAllRoom implements GetAllRoomsUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  public async execute(): Promise<string[]> {
    try {
      return await this.roomRepository.getAllRooms();
    } catch (error) {
      console.log("ERROR", error);
      return [""];
    }
  }
}