import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { IncrementPlayerCountUseCase } from "../../interfaces/use-cases/room/increment-player-count-use-case";

export class incrementPlayerCount implements IncrementPlayerCountUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  async execute(roomName: string): Promise<void> {
    try {
      const room = await this.roomRepository.get(roomName);
      const roomString = Buffer.from(room.name as string, 'base64').toString("binary"); // i put anything here for do not break
      const roomParsed = JSON.parse(roomString);
      roomParsed.currentPlayers++;
      const roomStringfied = JSON.stringify(roomParsed);
      const roomBuffered= Buffer.from(roomStringfied).toString('base64');
      await this.roomRepository.create(roomName, roomBuffered);
    } catch (error) {
      throw new Error("Falha ao salvar o player")
    }
  }
}