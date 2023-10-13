import { Api } from '../api';
import { Websocket } from '../websocket';
import { Room as RoomType } from '../../../domain/interfaces/entities/room/room';
import { CacheDatabase } from '../../data/interfaces/cache-database';
import { Player } from '../../../domain/interfaces/entities/player/player';

export class Room {

  constructor(private websocket: Websocket, private roomName: string, private cacheDataBase: CacheDatabase) {}

  public listen(): void {
    this.websocket.getIo()?.on('connect', (socket) => {
      console.log("entrou aqui??")
         const {room: roomName} = socket.handshake.query;
      console.log('a user connected');
      socket.join(roomName as string);

      socket.on(`update-players`, async (roomName: string, player: Player) =>{
        // console.log('joined to room', roomName)
        
        const room = await this.cacheDataBase.recover(roomName);
        const roomParsed = JSON.parse(room);
        socket.to(roomName).emit(`update-players`, roomParsed);
      });

      socket.on(`draw`, (roomName: string,data: any) => {
        socket.to(roomName).emit(`draw`, data);
      });

      socket.on(`save`, async (roomName: string, room: RoomType) => {
        const newRoom = { ...room, canvas: room.canvas };
 
        const roomStringify = JSON.stringify(newRoom);
        await this.cacheDataBase.save(roomName, roomStringify);
      });

      socket.on('leave-room', async (roomName: string, username: string) => {
        console.log('aaaa saiu')
        const room = await this.cacheDataBase.recover(roomName);
        const roomParsed = JSON.parse(room);
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
