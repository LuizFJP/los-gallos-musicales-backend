import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { SkipPlayerDrawUseCase } from "../../interfaces/use-cases/player/skip-player-draw";
import { Player } from '../../interfaces/entities/player/player';

export class SkipPlayerDraw implements SkipPlayerDrawUseCase {
  constructor(private readonly roomRepository: RoomRepository){}
  
  async execute(roomName: string): Promise<void> {
    const room = await this.roomRepository.get(roomName);
    const roomJson = JSON.parse(room);
    const currentArtist = roomJson.players.find((player: Player) => player.artist === true);
    if(currentArtist.penalties === (Math.round(roomJson.players.length / 2))){
      currentArtist.artist = false;
      currentArtist.penalties = 0;
      const nextArtist = roomJson.players.find((player: Player) => player.artist === false);
      nextArtist.artist = true;
      await this.roomRepository.create(roomName, JSON.stringify(roomJson));
      return;
    }

  }
}