import * as socketIo from 'socket.io';
import * as redis from "redis";
import { Api } from '../Api';
import { Websocket } from '../Websocket';
import { Redis } from '../../db/Redis';
import { Room as RoomType } from '../domain/entities/Room';

export class Room {
  name(name: any) {
    throw new Error("Method not implemented.");
  }
  private api: Api = Api.getInstance();
  private websocket: Websocket = Websocket.getInstance();
  private room: RoomType
  private db: redis.RedisClientType = Redis.getInstance().getClient();

  constructor(room: RoomType) {
    this.room = room;
    this.start();
  }

  private start(): void {
    this.listen()
  }

  private listen(): void {

    this.websocket.getIo()?.on('connection', (socket) => {
      socket.join(this.room.name);
      console.log('a user connected to room: ', this.room.name);

      socket.on(`${this.room.name} draw`, async (data: any) => {
        await socket.to(this.room.name).emit(`${this.room.name} draw`, data);
        console.log("it has drawn", `${this.room.name} draw`)
      });

      socket.on(`${this.room.name} save`, async (data: any) => {
        const room = {...this.room, canvas: data};
        const roomStringfied = JSON.stringify(room);
        const roomBuffered= Buffer.from(roomStringfied).toString('base64');
        await this.db?.set(this.room.name, roomBuffered);
        console.log("saved in redis", this.db);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}
