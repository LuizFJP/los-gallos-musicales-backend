import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { CheckRoomIsFullUseCase } from "../../interfaces/use-cases/room/check-room-is-full-use-case";

export class CheckRoomIsFull implements CheckRoomIsFullUseCase {
  constructor(private roomRepository: RoomRepository) {}

  public async execute(roomName: string): Promise<boolean>{
    const room = await this.roomRepository.get(roomName);
    const roomParsed = JSON.parse(room);
    return roomParsed.numberOfPlayers === parseInt(roomParsed.maxPlayers);
  }
}