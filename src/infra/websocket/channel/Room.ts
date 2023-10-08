import * as socketIo from 'socket.io';
import * as redis from "redis";
import { Api } from '../Api';
import { Websocket } from '../Websocket';
import { Redis } from '../../data/data-sources/redis/Redis';
import { Room as RoomType } from '../../../domain/interfaces/entities/room/room';
import { CacheDatabase } from '../../data/interfaces/cache-database';

export class Room {

  constructor(private api: Api, private websocket: Websocket, private room: RoomType, private cacheDataBase: CacheDatabase) {}

  public listen(): void {

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
        await this.cacheDataBase.save(this.room.name, roomBuffered);
        console.log("saved in redis", this.cacheDataBase);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}
