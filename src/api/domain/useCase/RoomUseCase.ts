import { RedisClientType } from "redis";
import { Room as RoomType } from "../entities/Room";
import { Room } from "../../websocket/Room";

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
      const roomString = Buffer.from(raw as string, 'base64').toString("binary");
      const room = JSON.parse(roomString);
      console.log(room);
      return room;
    } catch (error) {
      return "";
    }
  }

  public async getAllRooms(): Promise<string[]> {
    try {
      console.log(await this.db.keys("*"));
      return await this.db.keys("*");
    } catch (error) {
      console.log("ERROR", error);
      return [""];
    }
  }
}
