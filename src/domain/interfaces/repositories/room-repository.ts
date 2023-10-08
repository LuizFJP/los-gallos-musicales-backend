import { Player } from "../entities/player/player";
import { Room } from "../entities/room/room";

export interface RoomRepository {
  create(roomName: string, roomBuffered: string): Promise<any>;
  get(roomName: string): Promise<Room>;
  savePlayerIntoRoom(player: Player, room: string): Promise<any>;
  incrementPlayerCount(room: string): Promise<any>;
  getAllRooms(): Promise<string[]>;
}