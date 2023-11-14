import { Player } from "../entities/player/player";
import { Room } from "../entities/room/room";

export interface RoomRepository {
  create(roomName: string, roomStringfy: string): Promise<void>;
  get(roomName: string): Promise<string>;
  savePlayerIntoRoom(player: Player, room: string): Promise<any>;
  incrementPlayerCount(room: string): Promise<any>;
  getAllRooms(): Promise<string[]>;
  getMultipleDataRooms(roomNames: string[]): Promise<Room[]>;
}