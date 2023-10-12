import { CacheDatabase } from "../../infra/data/interfaces/cache-database";
import { Player } from "../interfaces/entities/player/player";
import { Room } from "../interfaces/entities/room/room";
import { RoomRepository } from "../interfaces/repositories/room-repository";

export class RoomRepositoryImpl implements RoomRepository {

  private db: CacheDatabase;

  constructor(db: CacheDatabase) {
    this.db = db;
  }

  public async get(roomName: string): Promise<string> {
    return await this.db.recover(roomName);
  }

  public async create(roomName: string, roomBuffered: string): Promise<any> {
    await this.db.save(roomName, roomBuffered);
    return Promise.resolve();
  }
  public async getRoom(roomName: string): Promise<any> {

  }
  public savePlayerIntoRoom(player: Player, room: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public incrementPlayerCount(room: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  
  public async getAllRooms(): Promise<string[]> {
    return await this.db.recoverAllKeys();
  }
}