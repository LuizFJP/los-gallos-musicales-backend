import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { DecrementNumberOfTipsUseCase } from "../../interfaces/use-cases/room/decrement-number-of-tips-use-case";

export class DecrementNumberOfTips implements DecrementNumberOfTipsUseCase {
  
  constructor(private roomRepository: RoomRepository) {}

  public async execute(roomName: string): Promise<Room> {
    const room = await this.roomRepository.get(roomName);
    const roomParsed = JSON.parse(room);
    roomParsed.numberOfTips = roomParsed.numberOfTips > 0 ? roomParsed.numberOfTips - 1 : 0;
    console.log(roomParsed.numberOfTips, "legal")
    await this.roomRepository.create(roomName, JSON.stringify(roomParsed));
    console.log("chamou no decrementNumberOfTips");
    const roomUpdated = await this.roomRepository.get(roomName);
    return JSON.parse(roomUpdated);
    
  }
}