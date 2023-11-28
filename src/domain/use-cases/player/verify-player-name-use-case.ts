import { Player } from "../../interfaces/entities/player/player";
import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { VerifyPlayerNameUseCase } from '../../interfaces/use-cases/player/verify-player-name-use-case';

export class VerifyPlayerName implements VerifyPlayerNameUseCase {
  private roomRepository: RoomRepository;

    constructor(roomRepository: RoomRepository) {
      this.roomRepository = roomRepository
    }

  async execute(username: string, roomName: string): Promise<any> {
    try {
      const room = await this.roomRepository.get(roomName);
      if(room) {
        const roomParsed = JSON.parse(room);
        const playerExists = roomParsed.players.find((p: Player) => p.username === username);
        let newUsername: string = '';
        playerExists ? newUsername = `${username}#${Math.floor(Math.random() * 1000)}` : newUsername = username;
        return newUsername;
      }
      return username;
    } catch (error) {
      return null;
    }
  }
}
