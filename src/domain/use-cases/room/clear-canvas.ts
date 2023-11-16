import { Room } from "../../interfaces/entities/room/room";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { ClearCanvasUseCase } from "../../interfaces/use-cases/room/clear-canvas-use-case";

export class ClearCanvas implements ClearCanvasUseCase {

  constructor(private roomRepository: RoomRepository) { }

  public async execute(roomName: string): Promise<Room> {
    const room = await this.roomRepository.get(roomName);
    const roomParsed  = JSON.parse(room);
    roomParsed.canvas = "";
    await this.roomRepository.create(roomParsed.name, JSON.stringify(room));
    const roomUpdated = await this.roomRepository.get(roomName);
    return JSON.parse(roomUpdated);
  }
}