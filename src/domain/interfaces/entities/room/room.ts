import { Player } from "../player/player";

export interface Room {
  name: string;
  canvas?: string; 
  players?: Player[];
  genreId?: string;
  round?: number,
  maxPlayers?: number,
  currentPlayers?:number,
  playlistId?: string,
  roundDuration?:number,
  roundInterval?:number
}