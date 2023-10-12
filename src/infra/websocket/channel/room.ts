import { Api } from '../api';
import { Websocket } from '../websocket';
import { Room as RoomType } from '../../../domain/interfaces/entities/room/room';
import { CacheDatabase } from '../../data/interfaces/cache-database';

export class Room {

  constructor(private websocket: Websocket, private room: RoomType, private cacheDataBase: CacheDatabase) { 
    this.listen();
  }

  public listen(): void {

    this.websocket.getIo()?.on('connection', (socket) => {
      socket.join(this.room.name);
      console.log('a user connected');
      socket.on(`${this.room.name} draw`, async (data: any) => {
        console.log('irru')
        await socket.to(this.room.name).emit(`${this.room.name} draw`, data);

      });

      socket.on(`${this.room.name} save`, async (data: any) => {
        const room = { ...this.room, canvas: data };
        console.log(room);
        const roomStringfied = JSON.stringify(room);
        const roomBuffered = Buffer.from(roomStringfied).toString('base64');
        await this.cacheDataBase.save(this.room.name, roomBuffered);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
} 
