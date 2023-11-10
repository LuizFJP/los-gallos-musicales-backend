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
  listSongs?: SongDTO[],
  roundDuration?:number,
  roundInterval?:number,
  breakMatch?:boolean,
  song?: SongDTO,
}