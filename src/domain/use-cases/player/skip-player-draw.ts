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
  
  async execute(roomName: string, username: string): Promise<boolean> {
    const room            = await this.roomRepository.get(roomName);
    const roomJson        = JSON.parse(room);
    const reportingPlayer = roomJson.players.find((player: Player) => player.username === username);
    const currentArtist   = roomJson.players.find((player: Player) => player.artist === true);
    if(this.verifyPlayerAlreadyReported(roomJson, reportingPlayer)) {
      return false;
    }
    this.reportPlayerList.reportingPlayers.push(reportingPlayer);
    currentArtist.penalties++;
    this.reportPlayerList.reportedPlayer.push(currentArtist);
    console.log(currentArtist.penalties);
    //Efetivando a penalidade e skipando a vez
    if(currentArtist.penalties === (Math.round(roomJson.players.length / 2))){
      currentArtist.penalties  = 0;
      const newPlayerList = roomJson.players.filter((player: Player) =>  player.username != currentArtist.username);
      console.log(newPlayerList);
      newPlayerList.push(currentArtist);
      roomJson.players = newPlayerList;
      console.log(roomJson.players);
      await this.roomRepository.create(roomName, JSON.stringify(roomJson));
      return true;
    }
    return false;
  }

  verifyPlayerAlreadyReported(room: Room, player: Player) {
    return this.reportPlayerList.reportingPlayers.includes(player);
  }
}