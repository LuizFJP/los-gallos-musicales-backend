import { RoomRepository } from "../../interfaces/repositories/room-repository";
import { SkipPlayerDrawUseCase } from "../../interfaces/use-cases/player/skip-player-draw-use-case";
import { Player } from '../../interfaces/entities/player/player';
import { Room } from "../../interfaces/entities/room/room";


interface ReportPlayerList {
  reportingPlayers: Player[];
  reportedPlayer: Player[];
}
export class SkipPlayerDraw implements SkipPlayerDrawUseCase {
  private reportPlayerList: ReportPlayerList;
  constructor(private readonly roomRepository: RoomRepository){
    this.reportPlayerList = {
      reportingPlayers: [],
      reportedPlayer: []
    }
  }
  
  async execute(roomName: string, username: string): Promise<void> {
    const room            = await this.roomRepository.get(roomName);
    const roomJson        = JSON.parse(room);
    const reportingPlayer = roomJson.players.find((player: Player) => player.username === username);
    const currentArtist   = roomJson.players.find((player: Player) => player.artist === true);
    console.log(reportingPlayer);
    console.log(currentArtist);
    if(this.verifyPlayerAlreadyReported(roomJson, reportingPlayer)) {
      return;
    }
    this.reportPlayerList.reportingPlayers.push(reportingPlayer);
    currentArtist.penalties++;
    this.reportPlayerList.reportedPlayer.push(currentArtist);
    //Efetivando a penalidade e skipando a vez
    if(currentArtist.penalties === (Math.round(roomJson.players.length / 2))){
      currentArtist.artist     = false;
      currentArtist.penalties  = 0;
      await this.roomRepository.create(roomName, JSON.stringify(roomJson));
      return;
    }

  }

  verifyPlayerAlreadyReported(room: Room, player: Player) {
    return this.reportPlayerList.reportingPlayers.includes(player);
  }
}