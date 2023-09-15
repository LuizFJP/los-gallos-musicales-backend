import * as socketIo from 'socket.io';
import * as redis from "redis";
import { Api } from '../Api';
import { Websocket } from '../Websocket';
import { Redis } from '../../db/Redis';


export class Room {
  private api: Api = Api.getInstance();
  private websocket: Websocket = Websocket.getInstance();
  private room: string;
  private db: redis.RedisClientType = Redis.getInstance().getClient();

  constructor(room: string) {
    this.room = room;
    this.start();
  }

  private start(): void {
    this.listen()
  }

  private listen(): void {

    this.websocket.getIo()?.on('connection', (socket) => {
      socket.join(this.room);
      console.log('a user connected to room: ', this.room);

      socket.on(`${this.room} draw`, async (data: any) => {
        await socket.to(this.room).emit(`${this.room} draw`, data);
        console.log("it has drawn", `${this.room} draw`)
      });

      socket.on(`${this.room} save`, async (data: any) => {
        const s = await this.db?.set(this.room, data);
        console.log("saved in redis", this.db);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}
