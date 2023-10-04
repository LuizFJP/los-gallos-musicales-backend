import { RedisClientType } from "redis";
import { Room as RoomType } from "../entities/Room";
import { Room } from "../../websocket/Room";
import { Player } from "../entities/User";

export class RoomUseCase {
  private db: RedisClientType;

  constructor(db: RedisClientType) {
    this.db = db;
  }

  public async createRoom(room: RoomType) {
    try {
      const roomStringfied = JSON.stringify(room);
      console.log(roomStringfied)
      const roomBuffered= Buffer.from(roomStringfied).toString('base64');
      await this.db.set(room.name, roomBuffered);
      new Room(room);
    } catch (error) {
      console.log(error);
    }
  }

  public async enterRoom(name: string) {
    try {
      const raw = await this.db.get(name);
      console.log(raw);
      const roomString = Buffer.from(raw as string, 'base64').toString("binary");
      const room = JSON.parse(roomString);
      console.log(room);
      return room;
    } catch (error) {
      return "";
    }
  }

  public async savePlayer(player:Player, roomName: string) {
    try {
      const room = await this.db.get(roomName);
      const roomString = Buffer.from(room as string, 'base64').toString("binary");
      const roomParsed = JSON.parse(roomString);
      roomParsed.players.push(player);
      const roomStringfied = JSON.stringify(roomParsed);
      const roomBuffered= Buffer.from(roomStringfied).toString('base64');
      await this.db.set(roomName, roomBuffered);
    } catch (error) {
      throw new Error("Falha ao salvar o player")
    }
  }

  public async incrementPlayerCount(roomName: string) {
    try {
      const room = await this.db.get(roomName);
      const roomString = Buffer.from(room as string, 'base64').toString("binary");
      const roomParsed = JSON.parse(roomString);
      roomParsed.currentPlayers++;
      const roomStringfied = JSON.stringify(roomParsed);
      const roomBuffered= Buffer.from(roomStringfied).toString('base64');
      await this.db.set(roomName, roomBuffered);
    } catch (error) {
      throw new Error("Falha ao salvar o player")
    }
  }

  public async getAllRooms(): Promise<string[]> {
    try {
      return await this.db.keys("*");
    } catch (error) {
      console.log("ERROR", error);
      return [""];
    }
  }
}
