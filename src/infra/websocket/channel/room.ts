import { Api } from '../api';
import { Websocket } from '../websocket';
import { Room as RoomType } from '../../../domain/interfaces/entities/room/room';
import { CacheDatabase } from '../../data/interfaces/cache-database';
import { Player } from '../../../domain/interfaces/entities/player/player';

export class Room {

  constructor(private websocket: Websocket, private cacheDataBase: CacheDatabase) { }

  public listen(): void {
    console.log('channel de room criado')
    this.websocket.getIo()?.on('connect', (socket) => {
      const { name: roomName } = socket.handshake.query;

      console.log('a user connected', roomName, socket.id);

      socket.join(roomName as string);

      socket.on(`update-players`, async (roomName: string, player: Player) => {
        const room = await this.cacheDataBase.recover(roomName);
        const roomParsed = JSON.parse(room);
        socket.to(roomName).emit(`update-players`, roomParsed);
      });

      socket.on(`draw`, (roomName: string, data: any) => {
        console.log('draw', roomName)
        socket.to(roomName).emit(`draw`, data);
      });

      socket.on(`save`, async (roomName: string, room: RoomType) => {
        const newRoom = { ...room, canvas: room.canvas };

        const roomStringify = JSON.stringify(newRoom);
        await this.cacheDataBase.save(roomName, roomStringify);
      });

      socket.on('leave-room', async (roomName: string, username: string) => {
        console.log('saiu da sala', roomName, username)
        const room = await this.cacheDataBase.recover(roomName);
        const roomParsed = JSON.parse(room);
        const players = roomParsed.players.filter((player: Player) => player.username !== username);
        socket.to(roomName).emit(`update-players`, { ...roomParsed, players });
        socket.leave(roomName);
      });

      socket.on('disconnect', () => {
        console.log('user disconnected')
      });
    });
  }
}
