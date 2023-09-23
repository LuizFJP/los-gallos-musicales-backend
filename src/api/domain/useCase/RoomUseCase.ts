import { RedisClientType } from "redis";
import { Room } from "../../websocket/Room";

export class RoomUseCase {
  private db: RedisClientType;

  constructor(db: RedisClientType) {
    this.db = db;
  }

  public async createRoom(room: string) {
    return new Room(room);
  }

  public async enterRoom(name: string) {
    console.log(this.db);
    try {
      return await this.db.get(name);
    } catch (error) {
      return "";
    }
  }
}
