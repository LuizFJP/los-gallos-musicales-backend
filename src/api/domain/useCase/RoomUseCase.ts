import { RedisClientType } from "redis";
import { Room } from "../../websocket/Room";

export class RoomUseCase {
    private db: RedisClientType; 

    constructor(db: RedisClientType) {
        this.db = db;
    }

    public async createRoom(room: string) {
        try {
            await this.db.set(room, "");
             new Room(room);
        } catch(error) {
            console.log(error);
        }
    }

    public async enterRoom(name: string) {
        try {
          return await this.db.get(name);
        } catch (error) {
            return "";
        }
         
    }

    public async getAllRooms(): Promise<string[]> {
        try {
            return await this.db.keys('*');
        } catch(error) {
            console.log('ERROR', error)
            return [""];
        }
    }
}