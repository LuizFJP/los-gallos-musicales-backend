import { Player } from "../../interfaces/entities/player/player";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { SavePlayerInRoomUseCase } from "../../interfaces/use-cases/room/save-player-in-room-use-case";

export class SavePlayerInRoom implements SavePlayerInRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}
  
  public async execute(player: Player, roomName: string): Promise<void> {
    try {
      const room = await this.roomRepository.get(roomName);
      const roomString = Buffer.from(room.canvas as string, 'base64').toString("binary");
      const roomParsed = JSON.parse(roomString);
      roomParsed.players.push(player);
      const roomStringfied = JSON.stringify(roomParsed);
      const roomBuffered= Buffer.from(roomStringfied).toString('base64');
      await this.roomRepository.create(roomName, roomBuffered);
    } catch (error) {
      throw new Error("Falha ao salvar o player")
    }
  }
  
}