import { Player } from "../../interfaces/entities/player/player";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { SavePlayerInRoomUseCase } from "../../interfaces/use-cases/room/save-player-in-room-use-case";

export class SavePlayerInRoom implements SavePlayerInRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}
  
  public async execute(roomName: string, player: Player): Promise<void> {
    try {
      console.log(roomName);
      let room = await this.roomRepository.get(roomName);
      const roomParsed = JSON.parse(room);
      roomParsed.players!.push(player);
      room = JSON.stringify(roomParsed);
      await this.roomRepository.create(roomName, room);
    } catch (error) {
      throw new Error("Falha ao salvar o player")
    }
  }
} 
