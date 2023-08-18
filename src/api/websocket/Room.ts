import * as socketIo from 'socket.io';
import * as redis from "redis";
import { Api } from '../Api';
import { Websocket } from '../Websocket';


export class Room {
  private api: Api = Api.get();
  private websocket: Websocket = Websocket.get();
  private room: string;
  private redisClient: redis.RedisClientType;

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

      socket.on('draw', (data: any) => {
        socket.to(this.room).emit('draw', data)
      });

      socket.on('save', async (data: any) => {
        console.log("called");
        await this.redisClient?.SET(this.room, data);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}
