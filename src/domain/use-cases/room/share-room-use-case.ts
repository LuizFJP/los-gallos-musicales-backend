import { nanoid } from "nanoid";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { ShareRoomUseCase } from "../../interfaces/use-cases/room/share-room-use-case";

export class ShareRoom implements ShareRoomUseCase {

  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(roomName: string): Promise<string> {
    const shortId = nanoid(8);
    const room = await this.roomRepository.get(roomName);
    const roomParsed = JSON.parse(room);
    roomParsed.shortId = shortId;
    await this.roomRepository.create(roomName, JSON.stringify(roomParsed)); 
    return shortId;
  }
}