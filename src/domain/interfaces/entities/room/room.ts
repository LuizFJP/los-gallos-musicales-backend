import { SongDTO } from "../../../dto/playlist/Song";
import { Player } from "../player/player";
import { Tip } from "./tip";

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
  tip?: Tip
}