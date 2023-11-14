import { SongDTO } from "../../../dto/playlist/Song";
import { Player } from "../player/player";

export interface Room {
  name: string;
  canvas?: string; 
  players?: Player[];
  genreId?: string;
  round?: number,
  maxPlayers?: number,
  currentPlayers?:number,
  numberOfPlayers?: number,
  listSongs?: SongDTO[],
  roundDuration?:string,
  roundInterval?:string,
  breakMatch?:boolean,
  song?: SongDTO,
  tip?: string[],
  numberOfTips?: number,
  tipOn?: boolean,
}