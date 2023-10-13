import { Api } from '../api';
import { Websocket } from '../websocket';
import { Room as RoomType } from '../../../domain/interfaces/entities/room/room';
import { CacheDatabase } from '../../data/interfaces/cache-database';
import { Player } from '../../../domain/interfaces/entities/player/player';

export class Room {

  constructor(private websocket: Websocket, private roomName: string, private cacheDataBase: CacheDatabase) { 
    this.listen();
  }

  public listen(): void {
    this.websocket.getIo()?.on('connection', (socket) => {
      console.log('a user connected');
      
      socket.on(`update-players`, async (roomName: string, player: Player) =>{
        socket.join(roomName);
        console.log('joined to room', roomName)
        
        const room = await this.cacheDataBase.recover(roomName);
        const roomString = Buffer.from(room, 'base64').toString("binary");
        const roomParsed = JSON.parse(roomString);
        socket.to(roomName).emit(`update-players`, roomParsed);
      });

      socket.on(`draw`, (roomName: string,data: any) => {
        socket.join(roomName);
        console.log('teste draw', roomName)
        socket.to(roomName).emit(`draw`, data);
      });

      socket.on(`save`, async (roomName: string, room: RoomType) => {
        const newRoom = { ...room, canvas: room.canvas };
 
        const roomStringfied = JSON.stringify(newRoom);
        const roomBuffered = Buffer.from(roomStringfied).toString('base64');
        await this.cacheDataBase.save(roomName, roomBuffered);
      });

      socket.on('leave-room', async (roomName: string, username: string) => {
        console.log('aaaa saiu')
        socket.join(roomName);
        const room = await this.cacheDataBase.recover(roomName);
        const roomString = Buffer.from(room, 'base64').toString("binary");
        const roomParsed = JSON.parse(roomString);
        const players = roomParsed.players.filter((player: Player) => player.username !== username);
        socket.to(roomName).emit(`update-players`, { ...roomParsed, players });
        socket.leave(roomName);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
} 
